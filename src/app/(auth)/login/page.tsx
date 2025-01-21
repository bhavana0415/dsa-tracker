"use client";

import { UserAuthForm } from "@/components/Authentication/user-auth-form";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-20 bg-mint-400">
        <p></p>
        <p className="text-sm">
          Don’t have an account?
          <a href="/register">
            <Button className="text-foreground font-bold hover:underline">
              Register
            </Button>
          </a>
        </p>
      </div><div className="container flex items-center justify-center">
        <UserAuthForm />
      </div>
    </>
  );
}
