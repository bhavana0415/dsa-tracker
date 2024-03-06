'use client'
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "./GlobalRedux/store";
import { fetchQuestionsAsync } from "./GlobalRedux/FetchData/fetchSlice";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  const questions = useSelector((state: RootState) => state.fetchData.currentQuestions);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(fetchQuestionsAsync() as any);
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  };

  if (questions == null) {
    fetchData();
  }

  useEffect(() => {
    console.log(questions);
  }, [questions]);


  return (
    <main>
      <div
        style={{ backgroundImage: 'url(/coder.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        className="w-[500px] h-[400px]">
      </div>

    </main>
  );
}
