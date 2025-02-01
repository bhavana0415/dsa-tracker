"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordian";
import CustomTable from "@/components/DataDisplay/customTable";
import { StriverSheetA2Z } from "@/app/dsa/data";
import SidebarLayout from "@/app/dsa/striver/Sidebar/sidebar";
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
        <SidebarLayout stiverSheet={StriverSheetA2Z} striverQuestions={striverQuestions || []} page="A2Z">
            <div className="w-full p-6">
                {(StriverSheetA2Z).map(({ step_no, step_title, sub_steps }) => (
                    <>
                        <Progress value={((striverQuestions?.filter((q) => q.topic === step_title && q.status).length || 0) / sub_steps.length) * 100} className="w-full h-1 mt-4" />
                        <Accordion
                            type="single"
                            collapsible
                            className="border border-primary rounded-md p-2"
                            key={`accordion-${step_title}-${step_no}`}
                        >
                            <AccordionItem value={step_title} className="border-none">
                                <AccordionTrigger>{step_title}</AccordionTrigger>
                                <AccordionContent>
                                    {(sub_steps).map(({ sub_step_no, sub_step_title, topics }) => (
                                        <>
                                            <Progress value={((topics.filter((item) => (striverQuestions?.filter((q) => q.status && item.q_id === q.q_id).length || 0) > 0).length || 0)
                                                / (topics.length || 0)) * 100} className="w-full h-1 mt-4" />
                                            <Accordion
                                                type="single"
                                                collapsible
                                                className="rounded-md p-2 bg-ternary border-quaternary"
                                                key={`${sub_step_title}-accordion-${sub_step_no}`}
                                            >
                                                <AccordionItem
                                                    value={`${sub_step_title}`}
                                                    key={`${sub_step_title}`}
                                                >
                                                    <AccordionTrigger className="w-full relative">
                                                        <div>{sub_step_title}</div>
                                                        <div className="absolute right-6 p-2 rounded-lg shadow">{`${topics.filter((item) => (striverQuestions?.filter((q) => q.status && item.q_id === q.q_id).length || 0) > 0).length || 0} / ${topics.length || 0}`}</div>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <CustomTable data={topics} questionsData={striverQuestions} difficulty={true} sheet="striverQuestions" problem={true} />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </>
                                    ))}
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
