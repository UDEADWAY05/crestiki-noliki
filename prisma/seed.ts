import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            login: "user",
            passwordHash: "asfafaga:agaaf;f",
            rating: 1000
        }
    })
    const user2 = await prisma.user.create({
        data: {
            login: "user2",
            passwordHash: "asfafaga:agaaf;f",
            rating: 3000
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
