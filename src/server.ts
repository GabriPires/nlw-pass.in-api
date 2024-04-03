import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { checkIn } from './routes/check-in'
import { createEvent } from './routes/create-event'
import { getAttendeeBadge } from './routes/get-attendee-badge'
import { getEvent } from './routes/get-event'
import { getEventAttendees } from './routes/get-event-attendees'
import { registerForEvent } from './routes/register-for-event'

const app = fastify()

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'A simple event registration API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getAttendeeBadge)
app.register(getEvent)
app.register(checkIn)
app.register(getEventAttendees)

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server is running! 🚀')
  })
