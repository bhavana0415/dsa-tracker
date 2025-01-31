"use client";

import React, { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LoveBabbar } from "../data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialogue";
import CustomTable from "@/components/DataDisplay/customTable";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

const Page = () => {
  const [open, setOpen] = useState<string | null>(null);

  const { data } = useSession();
  const { id = "" } = data?.user || {}
  const loveBabbarQuestions = useSelector((state: RootState) => state.questions.loveBabbarQuestions);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!loveBabbarQuestions && id != "") {
      dispatch(fetchQuestionsBySheetAsync({ userId: id, sheet: "loveBabbarQuestions" }));
    }
  }, [loveBabbarQuestions, dispatch, id]);

  const openDialog = (topic: string) => {
    setOpen(topic);
  };

  const currentMode = useSelector((state: RootState) => state.currentState.currentMode);
  const style = currentMode == "dark" ? "bg-black text-red-300" : "bg-red-300 text-black";

  const [showReview, setShowReview] = useState(false);

  function getReviewedQuestions() {
    let result: { topic: string; name: string; link: string; q_id: string; }[] = [];
    Object.entries(LoveBabbar).forEach(([topic, topicArray]) => {
      topicArray.forEach((ques) => {
        if (loveBabbarQuestions?.some((q) => q.q_id === ques.q_id && q.review)) {
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
            questionsData={loveBabbarQuestions}
            sheet="apnaCollegeQuestions"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 my-10">
          {Object.entries(LoveBabbar).map(([topic, topicArray], topicIndex) => (
            <React.Fragment key={topicIndex}>
              <div className="w-2/3 h-16 bg-ternary rounded-lg flex items-center justify-between px-4 text-lg font-semibold">
                <Button onClick={() => openDialog(topic)}>{topic}</Button>
                <div className="flex items-center space-x-2 w-2/3">
                  <Progress
                    value={((loveBabbarQuestions?.filter((q) => q.status && q.topic === topic).length || 0) / topicArray.length) * 100}
                    className="h-3 w-5/6 border border-secondary rounded-lg overflow-hidden"
                  />
                  <div className="text-sm w-1/6">{`${(loveBabbarQuestions?.filter((q) => q.status && q.topic === topic).length || 0)} / ${topicArray.length}`}</div>
                </div>
              </div>
              {topicIndex < Object.entries(LoveBabbar).length - 1 && (
                <ArrowDownwardIcon />
              )}
            </React.Fragment>
          ))}

          <Dialog
            open={open !== null}
            onOpenChange={(isOpen) => !isOpen && setOpen(null)}
          >
            <DialogContent className="w-4/5 max-w-none sm:max-w-none h-5/6">
              <DialogHeader>
                <DialogTitle>{open || "Topic Details"}</DialogTitle>
              </DialogHeader>
              <div className="w-full overflow-y-auto px-4">
                {open && (
                  <CustomTable
                    data={
                      open
                        ? Object.entries(LoveBabbar).find(
                          ([topic, _]) => topic === open
                        )?.[1]
                        : []
                    }
                    questionsData={loveBabbarQuestions}
                    sheet="loveBabbarQuestions"
                  />
                )}
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => setOpen(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Page;
