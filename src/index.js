import { PrismaClient } from '@prisma/client'
// import {db} from './lib/db'
const prisma = new PrismaClient()

async function main() {
    const allUsers =await prisma.user.findMany({
      orderBy:{
          createdAt:"desc"
      }
  })
    console.log(allUsers)
  }

  main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })