"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import EmailForm from "../Forms/emailForm";
import VerifyCodeForm from "../Forms/verificationForm";
import RegisterForm from "../Forms/registerForm";

const userSchema = {
  email: "",
  password: "",
  questions: [],
  score: 0,
};

export function UserRegistrationForm() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [user, setUser] = React.useState(userSchema);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const verifyCode = (verificationCode: string) => {
    if (code == verificationCode) {
      setPage(3);
    }
  };

  const registerUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/routes/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
        }),
      });
      if (response.status == 200) {
        toast({
          title: "Registration successful",
          description: "Please login into your account",
          variant: "default",
        });
        router.push("/login");
      } else {
        toast({
          title: "Registration failed",
          description: "Failed to register user. Try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Error during registration", error);
      toast({
        title: "Registration failed",
        description: "Failed to register user. Try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="w-[350px] border-none shadow-none">
        <CardHeader>Register</CardHeader>
        <CardContent>
          <Progress value={Math.ceil((page * 100) / 3)} className="w-[60%]" />
          {page == 1 ? (
            <EmailForm
              user={user}
              setUser={setUser}
              setPage={setPage}
              setCode={setCode}
            />
          ) : page == 2 ? (
            <VerifyCodeForm
              user={user}
              setPage={setPage}
              verifyCode={verifyCode}
            />
          ) : (
            <RegisterForm
              user={user}
              setUser={setUser}
              registerUser={registerUser}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
