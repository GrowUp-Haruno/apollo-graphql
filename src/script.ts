import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    // await prisma.link.create({
    //   data: {
    //     description: 'GraphQLのチュートリアルをやってみた',
    //     url:'www.example.com'
    //   },
    // });
    const allLinks = await prisma.link.findMany();
    console.log(allLinks)  
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }
};

main();
