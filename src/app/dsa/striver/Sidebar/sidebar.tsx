"use client"

import CustomTable from "@/components/DataDisplay/customTable";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface SidebarLayoutProps {
    children: React.ReactNode;
    stiverSheet: any[];
    striverQuestions: any[];
    page: string;
}

const SidebarLayout = ({ children, stiverSheet, striverQuestions, page }: SidebarLayoutProps) => {
    const currentMode = useSelector((state: RootState) => state.currentState.currentMode);
    const [menuOpen, setMenuOpen] = useState(false);

    const style = currentMode == "dark" ? "bg-black text-red-300" : "bg-red-300 text-black";

    const [showReview, setShowReview] = useState(false);

    function getReviewedQuestions() {
        let result: { q_id: any; step_no?: number; step_title?: string; sub_step_no?: number; sub_step_title?: string; name?: string; link?: string; difficulty?: string; }[] = [];

        console.log("stiverSheet", stiverSheet)
        stiverSheet.forEach((step) => {
            if (step.topics) {
                step.topics.forEach((ques: any) => {
                    if (striverQuestions?.some((q) => q.q_id === ques.q_id && q.review)) {
                        result.push(ques);
                    }
                });
            } else {
                step.sub_steps.forEach((subStep: any) => {
                    subStep.topics.forEach((ques: any) => {
                        if (striverQuestions?.some((q) => q.q_id === ques.q_id && q.review)) {
                            result.push(ques);
                        }
                    });
                });
            }
        });

        return result;
    }


    return (
        <div className="relative min-h-screen md:flex">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`absolute left-2 top-2 shadow-lg rounded-full p-2 m-4 ${style} md:hidden`}
                aria-label="Toggle Menu"
            >
                {!menuOpen && (
                    <Icons.open />
                )}
            </button>
            <aside
                className={`${style} min-w-[225px] w-fit space-y-6 pt-2 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition-transform duration-200 ease-in-out overflow-y-auto ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{ zIndex: 9 }}
            >
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`w-full flex justify-end ${style}`}
                    aria-label="Toggle Menu"
                >
                    {menuOpen && (
                        <Icons.close className="size-4 mx-2" />
                    )}
                </button>

                <nav>
                    <a
                        href="/dsa/striver/a2z"
                        className={`flex py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white ${page === "A2Z" && 'bg-gray-700 text-white'}`}
                    >
                        <Icons.a2z />&ensp;Striver&apos;s A2Z Sheet
                    </a>
                    <a
                        href="/dsa/striver/sde"
                        className={`flex py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white ${page === "SDE" && 'bg-gray-700 text-white'}`}
                    >
                        <Icons.sde />&ensp;Striver&apos;s SDE Sheet
                    </a>
                    <a
                        href="/dsa/striver/s79"
                        className={`flex py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white ${page === "79" && 'bg-gray-700 text-white'}`}
                    >
                        <Icons.s79 />&ensp;Striver&apos;s 79 Sheet
                    </a>
                    <a
                        href="/dsa/striver/b75"
                        className={`flex py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white ${page === "75" && 'bg-gray-700 text-white'}`}
                    >
                        <Icons.b75 />&ensp;Blind 75 Sheet
                    </a>
                </nav>
            </aside>
            <div className="w-full p-6">
                <div className="w-full flex justify-end"><Button className="bg-quaternary" onClick={() => setShowReview((prev) => !prev)}>{showReview ? "Hide" : "Show"} Review Questions</Button></div>
                {showReview ? (
                    <div className="p-6">
                        <CustomTable
                            data={getReviewedQuestions()}
                            questionsData={striverQuestions}
                            sheet="apnaCollegeQuestions"
                        />
                    </div>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </div>

        </div>
    );
};

export default SidebarLayout;
