import { Button } from "@/shared/ui/button";
import { logOutAction } from "../api/api";

export const LogOutButton = () => {
    return (
        <form action={logOutAction}>
            <Button type="submit">
                Выйти из аккаунта
            </Button>
        </form>

    );
}