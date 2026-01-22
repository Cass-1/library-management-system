import db from "./db/conn.mjs"
import express from 'express'

const app = express()
//TODO: need to change this so that infisical can handle it
const PORT = 3000;

app.get("/", async (req, res) => {

    const col = await db.collection("test");
    const result = await col.find({}).toArray();

    res.send(result).status(200);
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})