import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class PrismaController {
    getHome(req: any, res: any, next: any) {
        async function main() {
            // ... you will write your Prisma Client queries here
            const allPhotos = await prisma.photo.findMany();
            console.log(allPhotos);
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
        res.send('Done!');
    }
}
module.exports = new PrismaController();
