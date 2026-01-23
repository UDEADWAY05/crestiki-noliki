import { Game } from "@/features/game/server";

type Props = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <main className="p-5 flex flex-col justify-center h-full w-full grow pt-24 max-w-[400px] mx-auto">
            <Game gameId={id} />
        </main>
    );
}