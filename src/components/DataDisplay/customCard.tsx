"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import CustomTable from "./customTable";

const CustomCard = ({ topic, data, count, solved }) => {
  return (
    <Card className="w-full bg-ternary">
      <CardHeader>
        <CardTitle>{topic}</CardTitle>
        <CardDescription>Total questions: {count}</CardDescription>
      </CardHeader>
      <CardContent>
        {solved > 0 ? `Solved: ${solved}` : "Not Stated"}
      </CardContent>
      <CardFooter className="flex justify-end w-full">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>{solved > 0 ? "Continue" : "Start Now"}</Button>
          </DrawerTrigger>
          <DrawerContent className="w-full fixed inset-0 flex items-center justify-center bg-secondary">
            <DrawerHeader>
              <DrawerTitle>{topic}</DrawerTitle>
            </DrawerHeader>
            <div className="w-full overflow-y-auto p-4">
              <CustomTable data={data} questionsData={[]} difficulty={true} />
            </div>
            <DrawerFooter className="p-4 flex justify-end">
              <DrawerClose asChild>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
