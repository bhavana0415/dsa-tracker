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

const CustomTable = ({ data, questionsData, ...props }) => {
  const [localQuestionsData, setLocalQuestionsData] = useState(questionsData);
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: 'asc' or 'desc'
  const [sortedData, setSortedData] = useState(data);

  const handleStatusChange = (q_id) => {
    const updatedQuestions = [...localQuestionsData];
    const index = updatedQuestions.findIndex((q) => q.q_id === q_id);
    if (index === -1) {
      updatedQuestions.push({ q_id, notes: "", review: false });
    } else {
      updatedQuestions.splice(index, 1);
    }
    setLocalQuestionsData(updatedQuestions);
  };

  const checkStatus = (q_id) => {
    return localQuestionsData.some((q) => q.q_id === q_id);
  };

  const getQuestionData = (q_id) => {
    return localQuestionsData.find((q) => q.q_id === q_id) || {};
  };

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);

    const sorted = [...data].sort((a, b) => {
      if (order === "asc") {
        return a.difficulty.localeCompare(b.difficulty);
      } else {
        return b.difficulty.localeCompare(a.difficulty);
      }
    });
    setSortedData(sorted);
  };

  return (
    <Table className="bg-quaternary rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>
            {props?.difficulty ? (
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
          <TableHead>Practice</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Review</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props?.difficulty ? sortedData : data).map((item) => {
          const questionData = getQuestionData(item.q_id);
          const { notes = "", review = false } = questionData;

          return (
            <TableRow key={item.q_id}>
              <TableCell>
                <Checkbox
                  checked={checkStatus(item.q_id)}
                  onChange={() => handleStatusChange(item.q_id)}
                />
              </TableCell>
              <TableCell>
                {props?.difficulty ? item.difficulty : item.name}
              </TableCell>
              <TableCell>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <LinkIcon />
                </a>
              </TableCell>
              <TableCell>
                <EditNoteIcon className="cursor-pointer" />
                <span className="ml-2">{notes}</span>
              </TableCell>
              <TableCell>
                {review ? <StarIcon /> : <StarBorderIcon />}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
