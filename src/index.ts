import express from 'express'
import server from './server'
import path from 'path'

const PORT: number | string = process.env.PORT ?? 3000

server.use(express.static(path.join(__dirname, './public')))

server.listen(PORT, () => {
  console.log(`\n⚡ Server is running on port ${PORT}`)
  console.log(`click here: http://localhost:${PORT}\n`)
})
