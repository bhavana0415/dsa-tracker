"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditNoteIcon from "@mui/icons-material/EditNote";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LinkIcon from "@mui/icons-material/Link";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Icons } from "../icons";
import { useDispatch } from "react-redux";
import { postQuestionAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialogue";
import { Button } from "@mui/material";
import { Textarea } from "../ui/textarea";

interface CustomTableProps {
  data: any;
  difficulty?: boolean;
  sheet: string;
  problem?: boolean;
  questionsData?: any;
}

const CustomTable = ({
  data,
  questionsData,
  difficulty,
  sheet,
  problem,
}: CustomTableProps) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState(data);
  const [openNotes, setOpenNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  const [currentTopic, setCurrentTopic] = useState<string | null>(
    null
  );

  const { data: userData } = useSession();
  const { id = "" } = userData?.user || {};
  const dispatch = useDispatch();

  const difficultyOrder = ["Easy", "Medium", "Hard"];

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);

    const sorted = [...data].sort((a, b) => {
      const aIndex =
        typeof a.difficulty === "number"
          ? a.difficulty
          : difficultyOrder.indexOf(a.difficulty);
      const bIndex =
        typeof b.difficulty === "number"
          ? b.difficulty
          : difficultyOrder.indexOf(b.difficulty);

      return order === "asc" ? aIndex - bIndex : bIndex - aIndex;
    });

    setSortedData(sorted);
  };

  const getQuestionData = (q_id: string) =>
    questionsData?.find((q: { q_id: string }) => q.q_id === q_id) || {};

  const handleStatusChange = (q_id: string, topic: string) => {
    console.log("here", topic)
    const postData = {
      q_id,
      userId: id,
      questionData: {
        status: questionsData?.some((ques: any) => ques.q_id === q_id && ques.status) ? false : true,
        sheet: sheet,
        topic: topic,
      },
    };
    dispatch(postQuestionAsync(postData) as any);
  };

  const handleReview = (q_id: string, review: boolean, topic: string) => {
    const postData = {
      q_id,
      userId: id,
      questionData: {
        review: !review,
        sheet: sheet,
        topic: topic,
      },
    };
    dispatch(postQuestionAsync(postData) as any);
  };

  const openNotesDialog = (q_id: string, notes: string, topic: string) => {
    setCurrentNotes(notes);
    setCurrentQuestionId(q_id);
    setCurrentTopic(topic)
    setOpenNotes(true);
  };

  const saveNotes = () => {
    if (currentQuestionId) {
      const postData = {
        q_id: currentQuestionId,
        userId: id,
        questionData: {
          notes: currentNotes,
          sheet: sheet,
          topic: currentTopic,
        },
      };
      dispatch(postQuestionAsync(postData) as any);
    }
    setOpenNotes(false);
  };

  const Difficulty = ["Easy", "Medium", "Hard"];

  return (
    <>
      <Table className="bg-quaternary rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>
              {difficulty ? (
                <span
                  className="flex items-center cursor-pointer"
                  onClick={handleSort}
                >
                  Difficulty <SwapVertIcon className="ml-2" />
                </span>
              ) : (
                "Problem"
              )}
            </TableHead>
            {sheet === "striverQuestions" && (
              <>
                {problem && <TableHead>Problem</TableHead>}
                <TableHead>Article</TableHead>
                <TableHead>Youtube</TableHead>
              </>
            )}
            <TableHead>Practice</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(difficulty ? sortedData : data).map((item: any) => {
            const questionData = getQuestionData(item.q_id);
            const { notes = "", review = false } = questionData;
            console.log(item)

            return (
              <TableRow key={item.q_id}>
                <TableCell>
                  <Checkbox
                    checked={questionsData?.some((ques: any) => ques.q_id === item.q_id && ques.status)}
                    onClick={() => handleStatusChange(item.q_id, sheet !== "striverQuestions" ? item.topic : item.head_step_no || item.step_title)}
                  />
                </TableCell>
                <TableCell>
                  {difficulty
                    ? typeof item.difficulty === "number"
                      ? Difficulty[item.difficulty]
                      : item.difficulty
                    : item.name}
                </TableCell>
                {sheet === "striverQuestions" && (
                  <>
                    {problem && <TableCell>{item.question_title}</TableCell>}
                    <TableCell>
                      <a
                        href={item.post_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.post_link ? <Icons.article /> : ""}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={item.yt_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.yt_link ? <Icons.youtube /> : ""}
                      </a>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <a
                    href={
                      sheet === "striverQuestions"
                        ? item.gfg_link || item.cs_link || item.lc_link
                        : item.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon />
                  </a>
                </TableCell>
                <TableCell onClick={() => openNotesDialog(item.q_id, notes, sheet !== "striverQuestions" ? item.topic : item.head_step_no || item.step_title)}>
                  {notes === "" ? <EditNoteIcon className="cursor-pointer" /> : <Icons.editNotes className="cursor-pointer size-6" />}
                </TableCell>
                <TableCell>
                  {review ? <StarIcon className="cursor-pointer size-6" onClick={() => handleReview(item.q_id, review, sheet !== "striverQuestions" ? item.topic : item.head_step_no || item.step_title)} /> : <StarBorderIcon className="cursor-pointer size-6" onClick={() => handleReview(item.q_id, review, sheet !== "striverQuestions" ? item.topic : item.head_step_no || item.step_title)} />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Dialog open={openNotes} onOpenChange={() => setOpenNotes(false)}>
        <DialogContent className="w-1/3 max-w-none sm:max-w-none h-fit">
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
          </DialogHeader>
          <div className="w-full overflow-y-auto px-4">
            <Textarea
              placeholder="Notes..."
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
            />
          </div>
          <DialogFooter className="w-full flex justify-between">
            <Button
              className="bg-background text-foreground"
              onClick={() => setOpenNotes(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-background text-foreground"
              onClick={saveNotes}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomTable;
