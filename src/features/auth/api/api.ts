'use server'

import { verifyUserPassword } from "@/entities/user/api/verify-user-password"
import { createUser } from "@/entities/user/server"
import { left, mapLeft } from "@/shared/lib/either"
import { sessionService } from "@/shared/lib/session"
import { redirect } from "next/navigation"
import { z } from "zod"


const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(3)
})

interface SignForm {
    formData?: FormData;
    errors?: {
        login?: string;
        password?: string;
        _errors?: string;
    }
}

export const signUpAction = async (state: SignForm, formData: FormData): Promise<SignForm> => {
    const data = Object.fromEntries(formData.entries())
    const result = formDataSchema.safeParse(data)

    if (!result.success) {
        const formatedErrors = result.error.format()
        return {
            formData,
            errors: {
                login: formatedErrors.login?._errors.join(', '),
                password: formatedErrors.password?._errors.join(', '),
                _errors: formatedErrors._errors.join(', '),
            }
        }
    }

    const createUserResult = await createUser(result.data)

    if (createUserResult.type === 'right') {
        await sessionService.addSession(createUserResult.value)

        redirect('/')
    }

    const errors = {
        "user-login-exists": "Пользователь с таким login уже существует"
    }[createUserResult.error]

    return {
        formData,
        errors: {
            _errors: errors,
        }
    }
}

export const signInAction = async (state: SignForm, formData: FormData): Promise<SignForm> => {
    const data = Object.fromEntries(formData.entries())
    const result = formDataSchema.safeParse(data)

    if (!result.success) {
        const formatedErrors = result.error.format()
        return {
            formData,
            errors: {
                login: formatedErrors.login?._errors.join(', '),
                password: formatedErrors.password?._errors.join(', '),
                _errors: formatedErrors._errors.join(', '),
            }
        }
    }

    const verifyUserResult = await verifyUserPassword(result.data)

    if (verifyUserResult.type === 'right') {
        await sessionService.addSession(verifyUserResult.value)

        redirect('/')
    }

    const errors = {
        "wron-login-or-password": "Неверный логин или пароль"
    }[verifyUserResult.error]

    return {
        formData,
        errors: {
            _errors: errors,
        }
    }
}

export const logOutAction = async () => {
    sessionService.deleteSession();
    redirect('/sign-in')
}