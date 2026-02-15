import express from 'express'
import { PORT } from "@util/infisical.js";
import bodyParser from "body-parser";
import userRouter from "@/routes/userRouter.js"
import bookRouter from "@/routes/bookRouter.js"
import requestRouter from "@routes/requestRouter.js"
import fineRouter from "@routes/fineRouter.js"

export const app = express()
app.use(bodyParser.json());

const server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})

app.use("/user", userRouter);
app.use("/books", bookRouter);
app.use("/requests", requestRouter);
app.use("/fines", fineRouter);

// on server shutdown
// process.on('SIGTERM', () => {
//     debug('SIGTERM signal received: closing HTTP server')
//     server.close(() => {
//         debug('HTTP server closed')
//     })
// })

app.get("/", async (req, res) => {
    res.send("hello")
})
