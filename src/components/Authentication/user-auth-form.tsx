"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { userAuthSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/store/Features/currentState/currentStateSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Icons } from "@/components/icons";

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.currentState.isLoading);
  const [viewPassword, setViewPassword] = React.useState(false);

  const checkPassword = async (email: string, password: string) => {
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    try {
      const signInResult = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push(callbackUrl);
      } else {
        setError("password", {
          message: "The password you entered is incorrect.",
        });
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  const checkIfRegistered = async (email: string, password: string) => {
    dispatch(setIsLoading(true))
    try {
      const response = await fetch(
        "/api/routes/authentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();
      if (!data.exists) {
        setError("email", {
          message:
            "The email you entered isn’t connected to an account. Create a new account.",
        });
      } else {
        await checkPassword(email, password);
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    } finally {
      dispatch(setIsLoading(false))
    }
  };

  async function onSubmit(data: FormData) {
    checkIfRegistered(data.email, data.password);
  }

  return (
    <div className="grid gap-6">
      <Label className="text-center text-lg font-bold">Login to Continue</Label>
      <Card className="w-[350px]">
        <CardHeader></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="email" className="font-bold">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="text"
                    placeholder="name@example.com"
                    disabled={isLoading}
                    className={`w-full pr-10`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  )}
                  {errors.email && (
                    <p className="text-xs text-error">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="font-bold">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={viewPassword ? "text" : "password"}
                    placeholder="********"
                    disabled={isLoading}
                    className={`w-full pr-10`}
                    {...register("password")}
                  />
                  {viewPassword ? <Icons.eyeSlash className="absolute right-2 text-primary top-2 size-6 cursor-pointer" onClick={() => setViewPassword((prev) => !prev)} /> : <Icons.eye className="absolute right-2 text-primary top-2 size-6 cursor-pointer" onClick={() => setViewPassword((prev) => !prev)} />}
                  {errors.password && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                  )}
                  {errors.password && (
                    <p className="text-xs text-error">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="default"
                type="submit"
                disabled={isLoading}
                className="text-foreground bg-ternary"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/auth/forgot-password">
            <p className="text-sm text-gray-500 hover:underline font-bold">
              Forgot Password
            </p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
