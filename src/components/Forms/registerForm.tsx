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

const RegisterForm = ({ user, setUser, setPage }) => {
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
            {...register("email")}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastname">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastname">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="text-white bg-red-600"
          style={{ width: "-webkit-fill-available" }}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
