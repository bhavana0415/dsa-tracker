"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";

export default function Page() {
  return (
    <div className="p-20 text-rose">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="Arrays">
          <AccordionTrigger onClick={(e) => e.stopPropagation()}>
            Arrays
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="Easy">
                <AccordionTrigger onClick={(e) => e.stopPropagation()}>
                  Easy
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other
                  components' aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Medium">
                <AccordionTrigger onClick={(e) => e.stopPropagation()}>
                  Medium
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other
                  components' aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="Hard">
                <AccordionTrigger onClick={(e) => e.stopPropagation()}>
                  Hard
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other
                  components' aesthetic.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
