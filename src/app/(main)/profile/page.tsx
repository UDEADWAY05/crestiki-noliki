import { getCurrentUser } from "@/entities/user/server";

export default async function Profile() {
    const user = await getCurrentUser()

    return (
        <div className="p-5">
            <h3 className="text-3xl font-bold">Profile: {user?.login}</h3>
            <p>{user?.rating}</p>
        </div>
    );
}