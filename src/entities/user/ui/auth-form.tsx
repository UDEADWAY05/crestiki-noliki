import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type Props = {
    formData?: FormData;
    errors?: {
        login?: string;
        password?: string;
    }
}
export const AuthForm = ({ ...props }: Props) => {
    return (
        <>
            <div className="mb-4">
                <Label>Login</Label>
                <Input
                    defaultValue={props.formData?.get('email')?.toString()}
                    name='login'
                    formNoValidate={false}
                    type="text"
                />
                {props.errors?.login && <p className="text-red-500">{props.errors.login}</p>}
            </div>
            <div className="mb-4">
                <Label>Пароль</Label>
                <Input
                    defaultValue={props.formData?.get('password')?.toString()}
                    name='password'
                    type="password"
                />
                {props.errors?.password && <p className="text-red-500">{props.errors.password}</p>}
            </div>

        </>
    );
}