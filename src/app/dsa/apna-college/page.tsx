"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import { ApnaCollege } from "../data";
import CustomTable from "@/components/DataDisplay/customTable";

export default function Page() {
  return (
    <div className="p-6">
      {Object.entries(ApnaCollege).map(([topic, topicArray]) => (
        <Accordion
          type="single"
          collapsible
          className="border border-primary rounded-md p-2 m-2"
          key={`accordion-${topic}`}
        >
          <AccordionItem value={topic} className="border-none">
            <AccordionTrigger>{topic}</AccordionTrigger>
            <AccordionContent>
              <Accordion
                type="single"
                collapsible
                className="rounded-md p-2 m-2 bg-ternary border-quaternary"
                key={`${topic}-accordion`}
              >
                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <AccordionItem
                    value={`${topic}-${difficulty}`}
                    key={`${topic}-${difficulty}`}
                  >
                    <AccordionTrigger>{difficulty}</AccordionTrigger>
                    <AccordionContent>
                      {topicArray.some(
                        (item) => item.difficulty === difficulty
                      ) ? (
                        <CustomTable
                          data={topicArray.filter(
                            (item) => item.difficulty === difficulty
                          )}
                          questionsData={[]}
                        />
                      ) : (
                        <p className="text-gray-500">
                          No questions available for this difficulty.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
