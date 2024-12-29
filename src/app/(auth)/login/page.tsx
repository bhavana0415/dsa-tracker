"use client";

import Image from 'next/image'
import { UserAuthForm } from "@/components/Authentication/user-auth-form"
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <>
            <div className="flex justify-between items-center py-4 px-20 bg-mint-400">
                <Image src="/logo.png" alt="Logo" width={200} height={100} />
                <p className="text-sm">
                    Don’t have an account?
                    <a href="/register">
                        <Button className="text-gray-700 font-bold hover:underline">Register</Button>
                    </a>
                </p>
            </div>

            <div className="container flex items-center justify-center">
                <UserAuthForm />
            </div>
        </>
    )
}
