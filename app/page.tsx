import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
    <div className='p-10 text-center flex flex-col items-center'>
    <h2 className="font-bold text-3xl md:text-6xl text-primary">AI-Powered Course Generator</h2>
<h2 className="mt-5 text-gray-500 text-xl">Generate personalized courses effortlessly with the power of AI.</h2>

      <Image src={'/learning.svg'} alt="learning" width={500} height={500} className="mt-10  flex"/>
      <Link 
      className="mt-10 p-3 flex items-center justify-center gap-3 rounded-full text-white 
      font-bold cursor-pointer md:w-2xl  bg-primary" href={'/dashboard'}>
        <h2>Let's Learn</h2>
        <Book/>
      </Link>
    </div>
  </div>
  );
}
