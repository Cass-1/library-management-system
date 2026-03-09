import express, { Router } from 'express'
import { ATLAS_URI, DATABASE_NAME, PORT } from "@util/infisical.js";
import bodyParser from "body-parser";
import { Database } from './util/db.js';
import { BookRouter } from '@routes/bookRouter.js';
import assert from 'node:assert';
import { BookService } from '@services/bookService.js';
import { BookController } from '@controllers/bookController.js';
import { UserService } from '@services/userService.js';
import { UserController } from '@controllers/userController.js';
import { UserRouter } from '@routes/userRouter.js';
import { FineService } from '@/services/fineService.js';
import { FineController } from '@/controllers/fineController.js';
import { FineRouter } from '@/routes/fineRouter.js';
import { Collection } from 'mongodb';
import { Book } from './models/Book.js';
import { RequestRouter } from './routes/requestRouter.js';
import { RequestController } from './controllers/requestController.js';
import { RequestService } from './services/requestService.js';

export class BackendServer {
    public App: any;
    public repository?: Database;
    private bookRouter?: BookRouter;
    private userRouter?: UserRouter;
    private requestRouter?: RequestRouter;
    private fineRouter?: FineRouter;

    //TODO: test this to see if it has expected behavior when there is no database connection
    async Setup() {
        this.App = express();
        try {
            this.repository = new Database(ATLAS_URI, DATABASE_NAME);
            await this.repository.Connect();

            assert(this.repository.BookCollection);
            assert(this.repository.UserCollection);
            const bookService = new BookService(this.repository.BookCollection as Collection<Book>);
            const userService = new UserService(this.repository.UserCollection);
            const requestService = new RequestService(this.repository.BookCollection);
            const fineService = new FineService(this.repository.UserCollection);

            const bookController = new BookController(bookService);
            const userController = new UserController(userService);
            const requestController = new RequestController(requestService);
            const fineController = new FineController(fineService);

            this.bookRouter = new BookRouter(bookController);
            this.userRouter = new UserRouter(userController);
            this.requestRouter = new RequestRouter(requestController);
            this.fineRouter = new FineRouter(fineController);
        }
        catch (err: any) {
            console.log({ error: err });
        }
    }

    async Run() {
        this.App.use(bodyParser.json());
        //TODO: think if i can fix the ! here
        this.App.use("/books", this.bookRouter?.Router);
        this.App.use("/user", this.userRouter?.Router);
        this.App.use("/requests", this.requestRouter?.Router);
        this.App.use("/fines", this.fineRouter?.Router);
        this.App.use(this.errorHandler);

        const server = this.App.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`)
        })
        // on server shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM signal received: closing HTTP server')
            server.close(() => {
                console.log('HTTP server closed')
            })
        })

        this.App.get("/", async (req: any, res: any) => {
            res.send("hello")
        })

    }
    // generic express error handler (https://expressjs.com/en/guide/error-handling.html)
    private errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(500)
        res.render('error', { error: err })
    }
}

export const server = new BackendServer();
await server.Setup();
await server.Run();