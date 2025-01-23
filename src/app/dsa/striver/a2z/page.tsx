"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordian";
import CustomTable from "@/components/DataDisplay/customTable";
import { StriverSheetA2Z } from "../../data";
import SidebarLayout from "../Sidebar/sidebar";
import { Label } from "@/components/ui/label";

const Page = () => {
    return (
        <SidebarLayout>
            <div className="w-full">
                <Label className="w-full flex justify-center py-4">Strivers A2Z DSA Course/Sheet</Label>
                {(StriverSheetA2Z).map(({ step_no, step_title, sub_steps }) => (
                    <Accordion
                        type="single"
                        collapsible
                        className="border border-primary rounded-md p-2 m-2"
                        key={`accordion-${step_title}-${step_no}`}
                    >
                        <AccordionItem value={step_title} className="border-none">
                            <AccordionTrigger>{step_title}</AccordionTrigger>
                            <AccordionContent>
                                {(sub_steps).map(({ sub_step_no, sub_step_title, topics }) => (
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="rounded-md p-2 m-2 bg-ternary border-quaternary"
                                        key={`${sub_step_title}-accordion-${sub_step_no}`}
                                    >
                                        <AccordionItem
                                            value={`${sub_step_title}`}
                                            key={`${sub_step_title}`}
                                        >
                                            <AccordionTrigger>{sub_step_title}</AccordionTrigger>
                                            <AccordionContent>
                                                <CustomTable data={topics} questionsData={[]} difficulty={true} sheet="striver" problem={true} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </SidebarLayout>
    )
}

export default Page
