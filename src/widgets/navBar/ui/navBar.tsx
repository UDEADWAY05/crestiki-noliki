import { getCurrentUser } from "@/entities/user/server";
import { LogOutButton } from "@/features/auth/ui/logout-button";
import { sessionService } from "@/shared/lib/session";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

type Props = {

}
export const NavBar = async ({ }: Props) => {
    const { isAuth } = await sessionService.verifySession()
    return (
        <header className="flex border-b justify-between items-center p-4 gap-2 w-screen">
            <Link href="/" className="text-xl font-bold">Крестики-нолики!</Link>


            {
                isAuth ? <LogOutButton /> : <Link href="/sign-in">
                    <Button>
                        {'Вход'}
                    </Button>
                </Link>
            }


        </header>
    );
}