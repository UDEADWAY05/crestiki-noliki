'use client'

import { AuthForm } from "@/entities/user";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { useActionState } from "react";
import { signUpAction } from "../api/api";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "./error-message";


export const SignUpForm = () => {
    const [formState, action, isPending] = useActionState(signUpAction, {})

    return (
        <div className="p-5 flex items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Регистрация</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4" >
                    <ErrorMessage error={formState.errors?._errors} />
                    <form action={action}>
                        <AuthForm
                            {...formState}
                        />
                        <Button className="w-full">Зарегистрироваться</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <CardDescription >
                        Есть аккаунт? <Link href="/sign-in" className="text-white font-semibold">Войти</Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}