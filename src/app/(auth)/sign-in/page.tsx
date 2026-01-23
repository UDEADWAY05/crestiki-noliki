"use client";

import { SignInForm } from "@/features/auth";

export default function LoginPage() {

    return (
        <div className="p-5 flex w-screen h-screen justify-center items-center">
            <SignInForm />
        </div>
    );
}