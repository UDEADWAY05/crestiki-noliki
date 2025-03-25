import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

type Props = {
    error?: string
}
export const ErrorMessage = ({ error }: Props) => {
    return (
        <>
            {error && <Alert variant="destructive">
                <AlertTitle>Ошибка!</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>}
        </>
    );
}