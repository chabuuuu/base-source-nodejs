import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class PrismaController {
    addData(req: any, res: any, next: any) {
        async function main() {
            // ... you will write your Prisma Client queries here
            await prisma.photo.create({
                data: {
                    name: 'prisma',
                    description: 'test',
                    filename: 'nothing',
                    views: 25,
                    isPublished: true,
                },
            });
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
    readAllData(req: any, res: any, next: any) {
        async function main() {
            const allPhoto = await prisma.photo.findMany();
            console.log(allPhoto);
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
        res.send('Done read data!');
    }
}

// module.exports = new PrismaController();
