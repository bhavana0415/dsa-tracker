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
import { useEffect } from "react";

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

  return (
    <div className="p-6">
      {Object.entries(ApnaCollege).map(([topic, topicArray]) => (
        <Accordion
          type="single"
          collapsible
          className="border border-primary rounded-md p-2 m-2"
          key={`accordion-${topic}`}
        >
          <AccordionItem value={topic} className="border-none">
            <AccordionTrigger>{topic}</AccordionTrigger>
            <AccordionContent>
              <Accordion
                type="single"
                collapsible
                className="rounded-md p-2 m-2 bg-ternary border-quaternary"
                key={`${topic}-accordion`}
              >
                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <AccordionItem
                    value={`${topic}-${difficulty}`}
                    key={`${topic}-${difficulty}`}
                  >
                    <AccordionTrigger>{difficulty}</AccordionTrigger>
                    <AccordionContent>
                      {topicArray.some(
                        (item) => item.difficulty === difficulty
                      ) ? (
                        <CustomTable
                          data={topicArray.filter(
                            (item) => item.difficulty === difficulty
                          )}
                          questionsData={apnaCollegeQuestions}
                        />
                      ) : (
                        <p className="text-gray-500">
                          No questions available for this difficulty.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
