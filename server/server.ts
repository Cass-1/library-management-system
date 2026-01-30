import { debug } from "node:console";
import express from 'express'
import { PORT } from "./infisical.js";

const app = express()

const server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})

// on server shutdown
process.on('SIGTERM', () => {
    debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        debug('HTTP server closed')
    })
})

app.get("/", async (req, res) => {

})

