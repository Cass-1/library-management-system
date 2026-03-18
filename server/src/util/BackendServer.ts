import express from 'express'
import bodyParser from "body-parser";
import { BookRouter } from '@routes/bookRouter.js';
import assert from 'node:assert';
import { BookService } from '@services/bookService.js';
import { BookController } from '@controllers/bookController.js';
import { UserService } from '@services/userService.js';
import { UserController } from '@controllers/userController.js';
import { UserRouter } from '@routes/userRouter.js';
import { FineService } from '@services/fineService.js';
import { FineController } from '@controllers/fineController.js';
import { FineRouter } from '@routes/fineRouter.js';
import { Collection } from 'mongodb';
import { Book } from '@models/Book.js';
import { RequestRouter } from '@routes/requestRouter.js';
import { RequestController } from '@controllers/requestController.js';
import { RequestService } from '@services/requestService.js';
import { Database } from '@/util/Database.js';
import { EnvironmentVariables } from '@/util/InfisicalWrapper.js';

export class BackendServer {
    public App: any;
    public repository?: Database;
    private bookRouter?: BookRouter;
    private userRouter?: UserRouter;
    private requestRouter?: RequestRouter;
    private fineRouter?: FineRouter;
    private envVariables: EnvironmentVariables;

    constructor(envVariables: EnvironmentVariables) {
        this.envVariables = envVariables;
    }

    //TODO: test this to see if it has expected behavior when there is no database connection
    async Setup() {
        this.App = express();
        try {
            if (!this.envVariables.ATLAS_URI || !this.envVariables.DATABASE_NAME) {
                throw new Error("Missing environment variable(s)");
            }
            this.repository = new Database(this.envVariables.ATLAS_URI, this.envVariables.DATABASE_NAME);
            await this.repository.Connect();

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
        this.App.use("/books", this.bookRouter?.Router);
        this.App.use("/user", this.userRouter?.Router);
        this.App.use("/requests", this.requestRouter?.Router);
        this.App.use("/fines", this.fineRouter?.Router);
        this.App.use(this.errorHandler);

        const server = this.App.listen(this.envVariables.PORT, () => {
            console.log(`app listening on port ${this.envVariables.PORT}`)
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