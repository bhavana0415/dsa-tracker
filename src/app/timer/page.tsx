"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
    const [time, setTime] = useState(1500); // Default to 25 minutes in seconds
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [activeTab, setActiveTab] = useState("pomo");

    const tabDurations = {
        pomo: 1500, // 25 minutes
        short: 300, // 5 minutes
        long: 900, // 15 minutes
    };

    // Format time as MM:SS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    // Start the timer
    const startTimer = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setTime((prev) => Math.max(prev - 1, 0));
            }, 1000);
            setIntervalId(id);
        }
    };

    const stopTimer = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [intervalId]);

    // Reset the timer when switching tabs
    useEffect(() => {
        stopTimer();
        setTime(tabDurations[activeTab as keyof typeof tabDurations]);
    }, [activeTab, stopTimer, tabDurations]);

    // Automatically stop the timer when time reaches 0
    useEffect(() => {
        if (time === 0) {
            stopTimer();
        }
    }, [time]);

    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card className="w-full flex flex-col justify-center items-center border-none">
                <CardHeader className="w-full flex flex-col justify-center items-center">
                    <CardTitle>Pomodoro Timer</CardTitle>
                    <CardDescription>Time to focus!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs
                        defaultValue="pomo"
                        onValueChange={(value) => setActiveTab(value)}
                        className="w-[400px]"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pomo">Pomodoro</TabsTrigger>
                            <TabsTrigger value="short">Short break</TabsTrigger>
                            <TabsTrigger value="long">Long break</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pomo">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pomodoro</CardTitle>
                                    <CardDescription>Stay focused for 25 minutes.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-center items-center">
                                    <h1 className="text-5xl font-bold">{formatTime(time)}</h1>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={startTimer}>Start</Button>
                                    <Button onClick={stopTimer}>Stop</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="short">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Short Break</CardTitle>
                                    <CardDescription>Take a quick 5-minute break.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-center items-center">
                                    <h1 className="text-5xl font-bold">{formatTime(time)}</h1>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={startTimer}>Start</Button>
                                    <Button onClick={stopTimer}>Stop</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="long">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Long Break</CardTitle>
                                    <CardDescription>Relax for 15 minutes.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex justify-center items-center">
                                    <h1 className="text-5xl font-bold">{formatTime(time)}</h1>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={startTimer}>Start</Button>
                                    <Button onClick={stopTimer}>Stop</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
