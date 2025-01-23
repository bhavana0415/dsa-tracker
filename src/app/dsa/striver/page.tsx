"use client"

import React from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

const Page = () => {

  const { data } = useSession();
  const { id = "" } = data?.user || {}
  const striverQuestions = useSelector((state: RootState) => state.questions.striverQuestions);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!striverQuestions && id != "") {
      dispatch(fetchQuestionsBySheetAsync({ userId: id, sheet: "striverQuestions" }));
    }
  }, [striverQuestions, dispatch, id]);
  const router = useRouter()

  return <div className="flex flex-wrap justify-center">
    <Card className="w-[250px] border-none m-4 shadow-white flex flex-col">
      <CardHeader>
        <CardTitle><Icons.a2z className="size-20" /></CardTitle>
        <CardDescription>Strivers A2Z DSA Course/Sheet</CardDescription>
      </CardHeader>
      <CardContent>
        <div>This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured manner. </div>
      </CardContent>
      <CardFooter className="w-full mt-auto">
        <Button onClick={() => router.push("/dsa/striver/a2z")} className="hover:scale-105 transform transition duration-300 bg-primary w-full">Try it <Icons.rightArrow className="text-foreground size-6" /></Button>
      </CardFooter>
    </Card>
    <Card className="w-[250px] border-none m-4 shadow-white flex flex-col">
      <CardHeader>
        <CardTitle><Icons.sde className="size-20" /></CardTitle>
        <CardDescription>Striver’s SDE Sheet – Top Coding Interview Problems</CardDescription>
      </CardHeader>
      <CardContent>
        <div>SDE Sheet contains very handily crafted and picked top coding interview questions from different topics of Data Structures & Algorithms.</div>
      </CardContent>
      <CardFooter className="w-full mt-auto">
        <Button onClick={() => router.push("/dsa/striver/sde")} className="hover:scale-105 transform transition duration-300 bg-primary w-full">Try it <Icons.rightArrow className="text-foreground size-6" /></Button>
      </CardFooter>
    </Card>
    <Card className="w-[250px] border-none m-4 shadow-white flex flex-col">
      <CardHeader>
        <CardTitle><Icons.s79 className="size-20" /></CardTitle>
        <CardDescription>Strivers 79 Last Moment DSA Sheet – Ace Interviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div>The Striver’s 79 Sheet contains very handily crafted and picked top coding interview questions from different topics of Data Structures & Algorithms.</div>
      </CardContent>
      <CardFooter className="w-full mt-auto">
        <Button onClick={() => router.push("/dsa/striver/s79")} className="hover:scale-105 transform transition duration-300 bg-primary w-full">Try it <Icons.rightArrow className="text-foreground size-6" /></Button>
      </CardFooter>
    </Card>
    <Card className="w-[250px] border-none m-4 shadow-white flex flex-col">
      <CardHeader>
        <CardTitle><Icons.b75 className="size-20" /></CardTitle>
        <CardDescription>Blind 75 Leetcode problems : Detailed Video Solutions</CardDescription>
      </CardHeader>
      <CardContent>
        <div>Blind 75 leetcode is a list of 75 most frequent asked leetcode questions which had helped many developers clear interviews of Google, Amazon, Microsoft, Facebook etc.</div>
      </CardContent>
      <CardFooter className="w-full mt-auto">
        <Button onClick={() => router.push("/dsa/striver/b75")} className="hover:scale-105 transform transition duration-300 bg-primary w-full">Try it <Icons.rightArrow className="text-foreground size-6" /></Button>
      </CardFooter>
    </Card>
  </div>;
};

export default Page;
