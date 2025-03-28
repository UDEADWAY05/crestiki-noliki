import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";

type Props = {
    id: string;
    name: string;
    login: string;
    rating: number;
    actions?: React.ReactNode
}
export const GameCard = ({ name, login, rating, id, actions }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Игра с {login}</CardDescription>
            </CardHeader>

            <CardContent>Рейтинг: {rating}</CardContent>
            <CardFooter className="gap-4">
                <Button asChild >
                    <Link href={`game/${id}`}>
                        Подробнее
                    </Link>
                </Button>
                {actions}
            </CardFooter>
        </Card>
    );
}