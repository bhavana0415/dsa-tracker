"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserRegistrationForm } from "@/components/Authentication/user-registration-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-20">
        <p></p>
        <p className="text-sm">
          Already have an account?
          <a href="/login">
            <Button className="text-ternary font-bold hover:underline">
              Login
            </Button>
          </a>
        </p>
      </div>

      <div className="container flex items-center justify-center">
        <UserRegistrationForm />
      </div>
    </>
  );
}
