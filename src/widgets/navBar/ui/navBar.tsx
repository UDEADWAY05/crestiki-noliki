import { Button } from "@/shared/ui/button";
import Link from "next/link";

type Props = {

}
export const NavBar = ({ }: Props) => {

    return (
        <header className="flex border-b justify-between items-center p-4 gap-2 w-screen">
            <Link href="/" className="text-xl font-bold">Крестики-нолики!</Link>

            <Link href="/profile">
                <Button>
                    Профиль
                </Button>
            </Link>

        </header>
    );
}