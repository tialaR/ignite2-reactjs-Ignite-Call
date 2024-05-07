import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'],
})

/* 
    npx prisma studio -> Comando para abrir o prisma studio de forma 
    visual no browser (ver a tabela)
*/
