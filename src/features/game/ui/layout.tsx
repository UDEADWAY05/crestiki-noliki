import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
    players?: React.ReactNode;
    status?: React.ReactNode;
    field?: React.ReactNode;
    actions?: React.ReactNode;
}
export const GameLayout = ({ status, field, actions, players }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Крестики нолики 3x3
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {players}
                {status}
                <div className="flex justify-center items-center">
                    {field}
                </div>

            </CardContent>
            <CardFooter>
                {actions}
            </CardFooter>
        </Card>
    );
}