import Fastify, { fastify } from 'fastify'
import {PrismaClient} from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query'],
})


async function bootstrap(){
    const fastify = Fastify({
        logger: true,
    })
    await fastify.register(cors, {
        origin: true // Meu cors como true, vai permitir que qualquer aplicação tenha acesso ao meu backend
    })
    
    fastify.get('/pools/count', async () => {
      const count =  await prisma.pool.count()
        
        return { count }
    })

    await fastify.listen({port: 3333})
}
bootstrap()
// 50:34