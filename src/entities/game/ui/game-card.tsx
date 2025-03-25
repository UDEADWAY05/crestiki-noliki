import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";

type Props = {
    id: string;
    name: string;
    login: string;
    rating: number;
}
export const GameCard = ({ name, login, rating, id }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Игра с {login}</CardDescription>
            </CardHeader>

            <CardContent>Рейтинг: {rating}</CardContent>
            <CardFooter >
                <Link href={`game/${id}`}>
                    <Button >
                        Подробнее
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}