import { Button } from "@/shared/ui/button";
import { logOutAction } from "../api/api";

type Props = {

}
export const LogOutButton = ({ }: Props) => {
    return (
        <form action={logOutAction}>
            <Button type="submit">
                Выйти из аккаунта
            </Button>
        </form>

    );
}