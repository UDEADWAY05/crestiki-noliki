import { GameList } from "@/features/games-list/server";


export default async function Main() {

    return (
        <div className="p-5 flex flex-col gap-8 container mx-auto">
            <h1 className="text-4xl font-bold">Игры</h1>
            <GameList />
        </div>
    );
}
