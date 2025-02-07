import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await prisma.game.findMany();

  return (
    <div>
      <Button>Hello</Button>
      {games.map((el) => (
        <Card key={el.id}>
          <CardTitle>{el.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
