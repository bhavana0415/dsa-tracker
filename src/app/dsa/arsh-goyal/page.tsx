"use client";

import { ArshGoyal } from "@/app/dsa/data";
import CustomCard from "@/components/DataDisplay/customCard";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import CustomTable from "@/components/DataDisplay/customTable";
import { Button } from "@/components/ui/button";

export default function Page() {

  const { data: userData } = useSession();
  const { id = "" } = userData?.user || {}
  const arshGoyalQuestions = useSelector((state: RootState) => state.questions.arshGoyalQuestions);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!arshGoyalQuestions && id != "") {
      dispatch(fetchQuestionsBySheetAsync({ userId: id, sheet: "arshGoyalQuestions" }));
    }
  }, [arshGoyalQuestions, dispatch, id]);

  const [showReview, setShowReview] = useState(false);

  function getReviewedQuestions() {
    let result: { topic: string; difficulty: string; link: string; q_id: string; }[] = [];
    Object.entries(ArshGoyal).forEach(([topic, topicArray]) => {
      topicArray.forEach((ques) => {
        if (arshGoyalQuestions?.some((q) => q.q_id === ques.q_id && q.review)) {
          result.push(ques);
        }
      });
    });

    return result;
  }

  return (
    <div className="p-6">
      <div className="w-full flex justify-end">
        <Button
          className="bg-quaternary"
          onClick={() => setShowReview((prev) => !prev)}
        >
          {showReview ? "Hide" : "Show"} Review Questions
        </Button>
      </div>
      {showReview ? (
        <div className="p-6">
          <CustomTable
            data={getReviewedQuestions()}
            questionsData={arshGoyalQuestions}
            sheet="apnaCollegeQuestions"
            difficulty={true}
          />
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(ArshGoyal).map(([topic, topicArray], topicIndex) => (
            <CustomCard
              key={topicIndex}
              data={topicArray}
              topic={topic}
              count={topicArray.length}
              arshGoyalQuestions={arshGoyalQuestions || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
