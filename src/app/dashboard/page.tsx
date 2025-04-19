"use client";

import { TrendingUp } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserQuestionsAsync } from "@/store/Features/fetchData/fetchDataSlice";
import { Badge } from "@/components/ui/badge";
import { Label as LabelText } from "@/components/ui/label"


const chartConfig = {
    visitors: {
        label: "Solved",
    },
    safari: {
        label: "Total",
        color: "white",
    },
} satisfies ChartConfig;

const Page = () => {
    const { data } = useSession();
    const { id = "" } = data?.user || {};
    const all_questions = useSelector((state: RootState) => state.questions.all_questions);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (!all_questions && id != "") {
            dispatch(fetchUserQuestionsAsync(id));
        }
    }, [all_questions, dispatch, id]);

    const solved = all_questions?.filter((q) => q.status) || []
    const apnaCollege_questions = solved.filter((q) => q.sheet == "apnaCollegeQuestions").length
    const arshGoyal_questions = solved.filter((q) => q.sheet == "arshGoyalQuestions").length
    const loveBabbar_questions = solved.filter((q) => q.sheet == "loveBabbarQuestions").length
    const striver_questions = solved.filter((q) => q.sheet == "striverQuestions").length
    const solved_questions = solved.length

    const chartData = [
        { name: "Solved", value: solved_questions, fill: "black" },
    ];

    const angleData = [
        { "label": "Apna College", "filledAngle": (apnaCollege_questions / 375) * 360, "ratio": `${apnaCollege_questions} / ${375}`, "percent": ((apnaCollege_questions / 375) * 100).toFixed(2) },
        { "label": "Arsh Goyal", "filledAngle": (arshGoyal_questions / 293) * 360, "ratio": `${arshGoyal_questions} / ${293}`, "percent": ((arshGoyal_questions / 293) * 100).toFixed(2) },
        { "label": "Love Babbar", "filledAngle": (loveBabbar_questions / 445) * 360, "ratio": `${loveBabbar_questions} / ${445}`, "percent": ((loveBabbar_questions / 445) * 100).toFixed(2) },
        { "label": "Striver", "filledAngle": (striver_questions / 800) * 360, "ratio": `${striver_questions} / ${800}`, "percent": ((striver_questions / 800) * 100).toFixed(2) },
        { "label": "Total", "filledAngle": (solved_questions / 1913) * 360, "ratio": `${solved_questions} / ${1913}`, "percent": ((solved_questions / 1913) * 100).toFixed(2) },
    ]

    const topicCount = solved.reduce((acc, q) => {
        acc[q.topic] = (acc[q.topic] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="basis-1/4 h-fit sm:h-auto bg-ternary flex flex-col items-center p-6 shadow-lg rounded-lg">
                <LabelText className="text-2xl font-semibold text-gray-900 mb-4">📌 Topics Covered</LabelText>

                <div className="flex flex-wrap justify-center gap-1 rounded-lg w-full">
                    {Object.entries(topicCount).map(([key, value]) => (
                        <Badge
                            key={key}
                            variant="outline"
                            className="shadow-lg rounded-lg p-1 m-1 text-foreground bg-quaternary transition-all"
                        >
                            <span className="text-base font-medium">{key}</span>
                            <span className="text-sm text-gray-500 ml-2">{`X${value}`}</span>
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="basis-3/4 min-h-screen mx-auto flex flex-wrap justify-center px-4 max-w-screen-lg">
                {angleData.map((angle) => (
                    <Card key={angle.label} className="flex flex-col min-w-[250px] m-6">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>{angle.label}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <RadialBarChart
                                    data={chartData}
                                    startAngle={30}
                                    endAngle={30 + angle.filledAngle}
                                    innerRadius={80}
                                    outerRadius={110}
                                >
                                    <PolarGrid
                                        gridType="circle"
                                        radialLines={false}
                                        stroke="none"
                                        className="first:fill-gray-500 last:fill-rose-300"
                                        polarRadius={[86, 74]}
                                    />
                                    <RadialBar dataKey="value" background cornerRadius={10} />
                                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="text-2xl font-bold"
                                                            >
                                                                {angle.ratio}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Solved
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                </RadialBarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                Progress: {angle.percent}%{" "}
                                <TrendingUp className="h-4 w-4" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default Page;
