import server from './server'

const PORT: number | string = process.env.PORT ?? 3000

server.listen(PORT, () => {
  console.log(`\n⚡ Server is running on port ${PORT}`)
  console.log(`click here: http://localhost:${PORT}\n`)
})
