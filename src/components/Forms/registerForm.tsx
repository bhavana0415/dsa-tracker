"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userRegisterSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof userRegisterSchema>;

interface RegisterFormProps {
  user: any;
  setUser: any;
  setPage: any;
}

const RegisterForm = ({ user, setUser, setPage }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const onSubmitForm = (data: any) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      password: data.password,
    }));
    setPage(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="email"
            type="email"
            defaultValue={user.email}
            className="bg-quaternary"
            {...register("email")}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastname">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className="bg-quaternary"
          />
          {errors.password && (
            <p className="text-xs text-error">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastname">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            className="bg-quaternary"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="text-foreground bg-primary"
          style={{ width: "-webkit-fill-available" }}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
