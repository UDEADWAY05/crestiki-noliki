'use client'

import { AuthForm } from "@/entities/user";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { signInAction } from "../api/api";
import { useActionState } from "react";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "./error-message";

export const SignInForm = () => {
    const [formState, action, isPending] = useActionState(signInAction, {})

    return (
        <div className="p-5 flex items-center justify-center">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Вход</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4" >
                    <ErrorMessage error={formState.errors?._errors} />
                    <form action={action}>
                        <AuthForm
                            {...formState}
                        />
                        <Button className="w-full" disabled={isPending} >Войти</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <CardDescription >
                        Нет аккаунта? <Link href="/sign-up" className="text-white font-semibold">Зарегистрироваться</Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}