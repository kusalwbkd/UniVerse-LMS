"use client";

import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useCouserProvider } from '@/context/StudyContext';

const MaterialCardItem = ({ item }: any) => {

  const {
    courseFullDetails,
    flashCards,
    setFlashCards,
    quiz,
    setQuiz,
    courseIntro,
    quizAndAns,
    setQuizAndAns
  } = useCouserProvider();

  type Params = {
    courseId: string;
  };
  const { courseId } = useParams<Params>();
  const [generating, setGenerating] = useState(false);
  const [matchedData, setMatchedData] = useState<any[]>([]); // this is the fix

  const itemsMap: Record<string, any[]> = {
    notes: courseFullDetails,
    flash_cards: flashCards,
    qa: quizAndAns,
    quiz:quiz
   
  };

  useEffect(() => {
    if (item?.matcher && itemsMap[item.matcher]) {
      setMatchedData(itemsMap[item.matcher]);
    }
  }, [item?.matcher, courseFullDetails, flashCards, quizAndAns]); // dependencies
 // const matchedData = item?.matcher && itemsMap[item.matcher] ? itemsMap[item.matcher] : [];


  const generateStudyMaterials = async () => {
    setGenerating(true);
    try {
      const result = await axios.post('/api/generate-content', {
        course: courseIntro[0],
        type: item?.name,
      });

      //console.log("from in material card results===>",result);

      if(result?.data?.results[0]?.type==='Q&A'){

        setQuizAndAns(result?.data?.results[0]?.content)
      }

      if(result?.data?.results[0]?.type==='Quiz'){

        setQuiz(result?.data?.results[0]?.content)
      }

      if(result?.data?.results[0]?.type==='Flash Cards'){

        setFlashCards(result?.data?.results[0]?.content)
      }

    
      
   
    
      toast.success(`${item.name} generated!`);
    } catch (error) {
      console.log(error);
    } finally {
      setGenerating(false);
    }
  };

  if (!item) return null;
  

  return (
    <div
      className={`border shadow-md rounded-lg p-8 flex flex-col items-center cursor-pointer h-full
        ${!matchedData.length && 'grayscale'}`}
    >
      {!matchedData.length ? (
        <h2 className="p-1 px-2 bg-gray-400 text-white rounded-full text-[10px] mb-2">Generate</h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-400 text-white rounded-full text-[10px] mb-2">Ready</h2>
      )}

      <Image src={item?.icon} alt={item?.name} width={50} height={50} />
      <h2 className="font-medium text-center mt-3 mb-3">{item?.name}</h2>

      {!matchedData.length ? (
        <Button
          className="mt-auto w-full cursor-pointer"
          variant="outline"
          disabled={generating}
          onClick={generateStudyMaterials}
        >
          {generating ? (
            <h2 className="text-black flex gap-2 items-center text-sm">
              <RefreshCcw className="h-5 w-5 animate-spin text-black" />
              Generating...
            </h2>
          ) : (
            <h2>Generate</h2>
          )}
        </Button>
      ) : (
        <Link href={`/course/${courseId}/${item?.path}`}>
          <Button className="mt-auto w-full cursor-pointer">View</Button>
        </Link>
      )}
    </div>
  );
};

export default MaterialCardItem;
