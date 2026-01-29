import { debug } from "node:console";
import { mongoDB } from "./db/conn"
import express from 'express'

const app = express()
//TODO: need to change this so that infisical can handle it
const PORT = 3000;

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

    const col = await mongoDB.collection("test");
    const result = await col.find({}).toArray();

    res.send(result).status(200);
})

