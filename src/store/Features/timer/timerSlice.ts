"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
    time: number;
    isRunning: boolean;
    activeTab: string;
    intervalId: NodeJS.Timeout | null;
}

const tabDurations = {
    pomo: 1500,
    short: 300,
    long: 900,
};

const initialState: TimerState = {
    time: tabDurations.pomo,
    isRunning: false,
    activeTab: "pomo",
    intervalId: null,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setTime(state, action: PayloadAction<number>) {
            state.time = action.payload;
        },
        setIsRunning(state, action: PayloadAction<boolean>) {
            state.isRunning = action.payload;
        },
        setActiveTab(state, action: PayloadAction<string>) {
            state.activeTab = action.payload;
            state.time = tabDurations[action.payload as keyof typeof tabDurations];
        },
        setIntervalId(state, action: PayloadAction<NodeJS.Timeout | null>) {
            state.intervalId = action.payload;
        },
    },
});

export const { setTime, setIsRunning, setActiveTab, setIntervalId } = timerSlice.actions;
export default timerSlice.reducer;
