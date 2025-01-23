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

const Page = () => {
    return (
        <SidebarLayout>
            <div className="w-full">
                <Label className="w-full flex justify-center py-4">Striver’s SDE Sheet – Top Coding Interview Problems</Label>
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
                                <CustomTable data={topics} questionsData={[]} difficulty={true} sheet="striver" />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </SidebarLayout>
    )
}

export default Page
