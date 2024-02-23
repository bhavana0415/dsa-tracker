'use client'
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "./GlobalRedux/store";
import { fetchQuestionsAsync } from "./GlobalRedux/FetchData/fetchSlice";
import { useEffect } from "react";

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

  useEffect(()=>{
    console.log(questions);
  },[questions]);


  return (
    <>Welcome to DSA Tracker</>
  );
}
