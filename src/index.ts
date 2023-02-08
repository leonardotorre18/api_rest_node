import express from "express";
import server from "./server"
import path from 'path'

server.use(express.static(path.join(__dirname, './public')));

server.listen(3000, () => console.log('Server on port 3000'))

