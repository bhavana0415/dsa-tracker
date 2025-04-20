"use client";

import { UserAuthForm } from "@/components/Authentication/user-auth-form";
import Loader from "@/components/Loader/loader";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-20 bg-mint-400">
        <div className="w-full text-sm flex justify-end items-center">
          Don’t have an account?
          <a href="/register">
            <Button className="text-foreground font-bold hover:underline">
              Register
            </Button>
          </a>
        </div>
      </div>
      <Suspense fallback={<Loader isLoading={true} />}>
        <div className="container flex items-center justify-center">
          <UserAuthForm />
        </div>
      </Suspense>
    </>
  );
}
