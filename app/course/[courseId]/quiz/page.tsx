"use client"
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useCouserProvider } from "@/context/StudyContext";
import { QuizSingleItem } from "@/types";
import { Value } from "@radix-ui/react-select";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const QuizPage = () => {
  type Params = {
    courseId: string;
  };

  const { courseId } = useParams<Params>();
  const { quiz, setQuiz, loading, setLoading } = useCouserProvider();

  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState<QuizSingleItem | null>(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState(false)
  //let questionsArray: QuizSingleItem[]
  const questionsArray = quiz?.flatMap((item: any) => item.questions) || [];

  // Fetch quiz data if needed
  useEffect(() => {
    if (courseId && (!quiz || quiz.length === 0)) {
      getQuiz();
    }
  }, [courseId]);

  const getQuiz = async () => {
    setLoading(true);
    try {
      const results = await axios.get(`/api/get-quiz?courseId=${courseId}`);
      const fetchedQuiz = results?.data?.result?.qa[0]?.content || [];
      setQuiz(fetchedQuiz);
    } catch (error) {
      console.log(error);
      toast.error("Error while displaying quiz");
    } finally {
      setLoading(false);
    }
  };

  // Extract questions and set initial question once quiz is available
  useEffect(() => {
    if (quiz && quiz.length > 0) {
      const questionsArray = quiz.flatMap((item: any) => item.questions);
      if (questionsArray.length > 0) {
        setQuestion(questionsArray[0]);
      }
    }
  }, [quiz]);

  if (loading) {
    return <Loading />;
  }

  const handleClick = (type: string) => {
    let nextStep = step;

    if (type === 'INC') {
      nextStep = step + 1;
      setStep(nextStep);
      setQuestion(questionsArray[nextStep]);
      setCorrectAnswer(false);
      setSelectedOption("");

    }

    if (type === 'DEC') {
      if (step === 0) {
        nextStep = 0;
      } else {
        nextStep = step - 1;
      }
      setStep(nextStep);
      setQuestion(questionsArray[nextStep]);
      setSelectedOption("");
      setCorrectAnswer(false);
    
    }


  };

  const checkAnswer = (answer: string) => {
    if (selectedOption) return; // Prevent re-answering

    setSelectedOption(answer);

    if (answer === question?.answer) {
      setCorrectAnswer(true);
      setCorrectAnswerCount((prev) => prev + 1);
    } else {
      setCorrectAnswer(false);
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {step > 0 && <Button variant={'outline'} onClick={() => handleClick('DEC')} className="cursor-pointer">Previous</Button>}
        {step < questionsArray.length && <h2 className="font-bold text-2xl">Quiz <span >{step + 1}</span></h2>}
        {step < questionsArray.length && <Button onClick={() => handleClick('INC')} className="cursor-pointer">Next</Button>}
      </div>
      <hr />
      {questionsArray.length > 0 && question && step < questionsArray.length ? (
        <div className="mt-4">
          <p className="text-3xl font-medium text-center">{question.question}</p>
          <div className="grid grid-cols-2 gap-5 mt-6">
            {question.options?.map((item: string, index: number) => (
              <h2
                key={index}
                className={`
                  w-full border rounded-full p-3 px-3 text-xs md:text-lg text-center
                  ${selectedOption === item ? 'bg-primary text-white hover:bg-primary' : ''}
                  ${selectedOption && selectedOption !== item ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}
                `}

                onClick={() => {
                  if (!selectedOption) {
                    checkAnswer(item)
                  }
                }}

              >
                {item}
              </h2>
            ))}
          </div>
          {!correctAnswer && selectedOption && (
            <div className="border p-3 border-red-700 bg-red-200 rounded-lg mt-3">
                <h2 className="font-bold text-lg text-red-600">Incorrect!</h2>
                <p className="text-red-600">The correct answer is {question?.answer}</p>
            </div>
          )}

          {correctAnswer && selectedOption && (
            <div className="border p-3 border-green-700 bg-green-200 rounded-lg mt-3">
            <h2 className="font-bold text-lg text-green-600">correct!</h2>
            <p className="text-green-600">Yes the correct answer is {question?.answer}</p>
        </div>
          )}
        </div>
      ) : step >= questionsArray.length ? (
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-green-600">🎉 Quiz Completed!</h2>
          <p className="mt-2 text-lg text-gray-600">Well done! You’ve reached the end of the quiz.</p>
          <p className="text-3xl text-gray-600">You have got <span className=" text-green-600">{correctAnswerCount} </span>
            correct answers out of
            {" "} {questionsArray.length} questions</p>
        </div>
      ) : null}


    </div>
  );
};

export default QuizPage