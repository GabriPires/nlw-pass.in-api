import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import z from 'zod'
import { generateSlug } from './utils/generate-slug'

const app = fastify()

const prisma = new PrismaClient({
  log: ['query'],
})

app.post('/events', async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const { details, maximumAttendees, title } = createEventSchema.parse(
    request.body,
  )

  const slug = generateSlug(title)

  const event = await prisma.event.create({
    data: {
      title,
      details,
      maximumAttendees,
      slug,
    },
  })

  return reply.code(201).send({
    eventId: event.id,
  })
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server is running! 🚀')
  })
