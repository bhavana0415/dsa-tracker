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
import ChooseAvatar from "../Forms/chooseAvatar";

const userSchema = {
  email: "",
  password: "",
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

  const registerUser = async (avatar: Number) => {
    const data = {
      ...user,
      avatar,
    };
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/routes/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
        variant: "destructive",
      });
      console.log(JSON.stringify(error));
    } finally {
      setPage(2);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="w-[350px] border-none shadow-none">
        <CardHeader>Register</CardHeader>
        <CardContent>
          <Progress
            value={Math.ceil((page * 100) / 4)}
            className="h-3 mb-6 border w-full"
          />
          {page == 1 ? (
            <EmailForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              user={user}
              sendVerification={sendVerification}
            />
          ) : page == 2 ? (
            <VerifyCodeForm
              user={user}
              setPage={setPage}
              verifyCode={verifyCode}
            />
          ) : page == 3 ? (
            <RegisterForm user={user} setPage={setPage} setUser={setUser} />
          ) : (
            <ChooseAvatar registerUser={registerUser} isLoading={isLoading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
