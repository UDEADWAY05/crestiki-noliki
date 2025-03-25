'use client'

import { Button } from "@/shared/ui/button";
import { CreateGameAction } from "../api/api";
import { matchEither, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { startTransition } from "react";

type Props = {
}
export const CreateButton = ({ }: Props) => {
    const [data, dispatch, isPending] = useActionState(CreateGameAction, right(null))


    return (
        <div>
            <Button disabled={isPending} onClick={() => startTransition(dispatch)}>
                Создать игру
            </Button>
            {matchEither(data, {
                right: () => null,
                left: (e) => ({
                    ["can-create-only-one-game"]: "Вы можете создать только одну игру",
                    ["user-not-found"]: "Пользователя нету"
                })[e]
            })}
        </div>
    );
}