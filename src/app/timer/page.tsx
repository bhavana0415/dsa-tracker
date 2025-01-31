"use client"

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialogue"

const Page = () => {

    const audioRef = useRef(new Audio('/alarm.mp3'));
    const [time, setTime] = useState(1500);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [activeTab, setActiveTab] = useState("pomo");
    const [open, setOpen] = useState(false);


    const tabDurations = useMemo(() => ({
        pomo: 1500,
        short: 300,
        long: 900,
    }), []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const startTimer = useCallback(() => {
        if (intervalId) return;
        const id = setInterval(() => {
            setTime((prev) => {
                if (prev === 0) {
                    clearInterval(id);
                    setIntervalId(null);
                    playAlarm();
                    setOpen(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setIntervalId(id);
    }, [intervalId]);

    const stopTimer = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [intervalId]);

    useEffect(() => {
        stopTimer();
        setTime(tabDurations[activeTab as keyof typeof tabDurations]);
    }, [activeTab, stopTimer, tabDurations]);

    const playAlarm = () => {
        audioRef.current.play();
    };

    const stopAlarm = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.load();
        setTime(tabDurations[activeTab as keyof typeof tabDurations]);
        setOpen(false);
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card className="w-full flex flex-col justify-center items-center border-none shadow-none">
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
            {open && (
                <AlertDialog open={open}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {activeTab === "pomo"
                                    ? "Pomodoro Complete! 🍅"
                                    : activeTab === "short"
                                        ? "Short Break Over! ⏳"
                                        : "Long Break Over! ⏳"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {activeTab === "pomo"
                                    ? "Great job! Take a short break before starting your next session."
                                    : activeTab === "short"
                                        ? "Hope you feel refreshed! Time to get back to work."
                                        : "That was a well-deserved break! Now, back to focus mode."}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={stopAlarm}>Close</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

        </div>
    );
};

export default Page;
