import fastify from 'fastify'

const app = fastify()

app.get('/', async () => {
  return { hello: 'world' }
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server is running! 🚀')
  })
