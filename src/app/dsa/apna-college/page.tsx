"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import { ApnaCollege } from "../data";
import CustomTable from "@/components/DataDisplay/customTable";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Page() {

  const { data } = useSession();
  const { id = "" } = data?.user || {}
  const apnaCollegeQuestions = useSelector((state: RootState) => state.questions.apnaCollegeQuestions);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!apnaCollegeQuestions && id != "") {
      dispatch(fetchQuestionsBySheetAsync({ userId: id, sheet: "apnaCollegeQuestions" }));
    }
  }, [apnaCollegeQuestions, dispatch, id]);
  const currentMode = useSelector((state: RootState) => state.currentState.currentMode);
  const style = currentMode == "dark" ? "bg-black text-red-300" : "bg-red-300 text-black";

  const [showReview, setShowReview] = useState(false);

  function getReviewedQuestions() {
    let result: { topic: string; name: string; link: string; difficulty: string; q_id: string; }[] = [];
    Object.entries(ApnaCollege).forEach(([topic, topicArray]) => {
      topicArray.forEach((ques) => {
        if (apnaCollegeQuestions?.some((q) => q.q_id === ques.q_id && q.review)) {
          result.push(ques);
        }
      });
    });

    return result;
  }

  return (
    <div className="p-6">
      <div className="w-full flex justify-end"><Button className={`${style}`} onClick={() => setShowReview((prev) => !prev)}>{showReview ? "Hide" : "Show"} Review Questions</Button></div>
      {showReview ? (
        <div className="p-6">
          <CustomTable
            data={getReviewedQuestions()}
            questionsData={apnaCollegeQuestions}
            sheet="apnaCollegeQuestions"
          />
        </div>
      ) : (
        <>
          {Object.entries(ApnaCollege).map(([topic, topicArray]) => (
            <>
              <Progress value={((apnaCollegeQuestions?.filter((q) => q.topic === topic && q.status).length || 0) / topicArray.length) * 100} className="w-full h-1 mt-4" />
              <Accordion
                type="single"
                collapsible
                className="border border-primary rounded-md p-2"
                key={`accordion-${topic}`}
              >
                <AccordionItem value={topic} className="border-none">
                  <AccordionTrigger>{topic}</AccordionTrigger>
                  <AccordionContent>
                    {["Easy", "Medium", "Hard"].map((difficulty) => (
                      <>
                        {topicArray.some(
                          (item) => item.difficulty === difficulty
                        ) && (
                            <Accordion
                              type="single"
                              collapsible
                              className="rounded-md p-2 m-2 bg-ternary border-quaternary"
                              key={`${topic}-${difficulty}`}
                            >
                              <AccordionItem
                                value={`${topic}-${difficulty}`}
                              >
                                <AccordionTrigger className="w-full relative">
                                  <div>{difficulty}</div>
                                  <div className="absolute right-6 p-2 rounded-lg shadow">{`${topicArray.filter((item) => item.difficulty === difficulty && (apnaCollegeQuestions?.filter((q) => q.status && item.q_id === q.q_id).length || 0) > 0).length || 0} / ${topicArray.filter((item) => item.difficulty === difficulty).length || 0}`}</div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <CustomTable
                                    data={topicArray.filter(
                                      (item) => item.difficulty === difficulty
                                    )}
                                    questionsData={apnaCollegeQuestions}
                                    sheet="apnaCollegeQuestions"
                                  />
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          )
                        }
                      </>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          ))}
        </>
      )}
    </div>
  );
}
