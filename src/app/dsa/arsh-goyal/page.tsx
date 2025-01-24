"use client";

import { ArshGoyal } from "../data";
import CustomCard from "@/components/DataDisplay/customCard";

export default function Page() {

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.entries(ArshGoyal).map(([topic, topicArray], topicIndex) => (
        <CustomCard
          key={topicIndex}
          data={topicArray}
          topic={topic}
          count={topicArray.length}
          solved={0}
        />
      ))}
    </div>
  );
}
