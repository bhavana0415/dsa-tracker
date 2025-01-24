"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordian";
import CustomTable from "@/components/DataDisplay/customTable";
import { StriverSDE } from "../../data";
import SidebarLayout from "../Sidebar/sidebar";
import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchQuestionsBySheetAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

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
        <SidebarLayout>
            <div className="w-full">
                <Label className="w-full flex justify-center py-4">Strivers 79 Last Moment DSA Sheet – Ace Interviews</Label>
                {(StriverSDE).map(({ step_no, head_step_no, topics }) => (
                    <Accordion
                        type="single"
                        collapsible
                        className="border border-primary rounded-md p-2 m-2"
                        key={`accordion-${head_step_no}-${step_no}`}
                    >
                        <AccordionItem value={head_step_no} className="border-none">
                            <AccordionTrigger>{head_step_no}</AccordionTrigger>
                            <AccordionContent>
                                <CustomTable data={topics} questionsData={striverQuestions} difficulty={true} sheet="striverQuestions" />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </SidebarLayout>
    )
}

export default Page
