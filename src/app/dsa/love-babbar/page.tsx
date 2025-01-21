"use client";

import React, { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { LoveBabbar } from "../data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomTable from "@/components/DataDisplay/customTable";

const Page = () => {
  const [open, setOpen] = useState<string | null>(null);

  const openDialog = (topic: string) => {
    setOpen(topic);
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-10">
      {Object.entries(LoveBabbar).map(([topic, topicArray], topicIndex) => (
        <React.Fragment key={topicIndex}>
          <div className="w-2/3 h-16 bg-ternary rounded-lg flex items-center justify-between px-4 text-lg font-semibold">
            <Button onClick={() => openDialog(topic)}>{topic}</Button>
            <div className="flex items-center space-x-2 w-2/3">
              <Progress
                value={(0 / topicArray.length) * 100}
                className="h-3 w-full border border-secondary rounded-lg overflow-hidden"
              />
              <span className="text-sm font-normal">0/{topicArray.length}</span>
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
        <DialogContent className="w-4/5 max-w-none sm:max-w-none h-2/3">
          <DialogHeader>
            <DialogTitle>{open || "Topic Details"}</DialogTitle>
          </DialogHeader>
          <div className="w-full overflow-y-scroll px-4">
            {open && (
              <CustomTable
                data={
                  open
                    ? Object.entries(LoveBabbar).find(
                        ([topic, _]) => topic === open
                      )?.[1]
                    : []
                }
                questionsData={[]}
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
  );
};

export default Page;
