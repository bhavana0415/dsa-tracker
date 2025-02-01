"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordian";
import CustomTable from "@/components/DataDisplay/customTable";
import { Striver79, StriverSDE } from "@/app/dsa/data";
import SidebarLayout from "@/app/dsa/striver/Sidebar/sidebar";
import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";

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

    return (
        <SidebarLayout stiverSheet={Striver79} striverQuestions={striverQuestions || []} page="79">
            <div className="w-full p-6">

                {(StriverSDE).map(({ step_no, head_step_no, topics }) => (
                    <>
                        <Progress value={((striverQuestions?.filter((q) => q.topic === head_step_no && q.status).length || 0) / topics.length) * 100} className="w-full h-1 mt-4" />
                        <Accordion
                            type="single"
                            collapsible
                            className="border border-primary rounded-md p-2"
                            key={`accordion-${head_step_no}-${step_no}`}
                        >
                            <AccordionItem value={head_step_no} className="border-none">
                                <AccordionTrigger>{head_step_no}</AccordionTrigger>
                                <AccordionContent>
                                    <CustomTable data={topics} questionsData={striverQuestions} difficulty={true} sheet="striverQuestions" />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </>
                ))}
            </div>
        </SidebarLayout>
    )
}

export default Page
