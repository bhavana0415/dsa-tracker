"use client";

import { useSelector } from "react-redux";
import { ArshGoyal } from "../data";
import CustomCard from "@/components/DataDisplay/customCard";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";

export default function Page() {

  const { data } = useSession();
  const { id = "" } = data?.user || {}
  const arshGoyalQuestions = useSelector((state: RootState) => state.questions.arshGoyalQuestions);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!arshGoyalQuestions && id != "") {
      dispatch(fetchQuestionsBySheetAsync({ userId: id, sheet: "arshGoyalQuestions" }));
    }
  }, [arshGoyalQuestions, dispatch, id]);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.entries(ArshGoyal).map(([topic, topicArray], topicIndex) => (
        <CustomCard
          key={topicIndex}
          data={topicArray}
          topic={topic}
          count={topicArray.length}
          solved={0}
        />
      ))}
    </div>
  );
}
