"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userEmailSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";

type FormData = z.infer<typeof userEmailSchema>;

const EmailForm = ({ user, setUser, setPage, setCode }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userEmailSchema),
        defaultValues: {
            email: user.email,
        },
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmitForm = (data: { email: string }) => {
        checkIfRegistered(data.email);
    }

    const sendVerification = async (email: string) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.success) {
                setUser((prevUser: any) => ({
                    ...prevUser,
                    email: email,
                }));
                setCode(data.code);
                setPage(2);
            } else {
                toast({
                    title: "Verification failed",
                    description: "Failed to send verification.",
                });
            }
        } catch (error) {
            toast({
                title: "Verification failed",
                description: "Failed to send verification.",
            });
            console.log(JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    };

    const checkIfRegistered = async (email: string) => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/routes/authentication", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await response.json();
            if (data.exists) {
                setError("email", { message: "The email you entered already has an account." });
            } else {
                sendVerification(email);
            }
        } catch (error) {
            console.log("Error during sign-in:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="email" className="font-bold">
                        Email
                    </Label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            disabled={isLoading}
                            defaultValue={user.email}
                            className={`w-full pr-10 ${errors.email
                                ? "bg-red-300 focus:ring-red-500"
                                : "focus:bg-green-300 focus:ring-green-500"
                                }`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-red-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                />
                            </svg>
                        )}
                        {errors.email && (
                            <p className="text-xs text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button type="submit" disabled={isLoading} className="text-white bg-red-600">{isLoading ? "Loading..." : "Verify Email"}</Button>
                </div>
            </div>
        </form>
    )
}

export default EmailForm;