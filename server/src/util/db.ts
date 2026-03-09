import { Collection, Db, MongoClient } from "mongodb";
import { User } from "@/models/User.js";
import { Book } from "@/models/Book.js";
import { BookRequest } from "@/models/BookRequest.js";

// https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial

export class Database {
    private client: MongoClient;
    private databaseName: string
    private mongoDB?: Db;
    public UserCollection?: Collection<User>;
    public BookCollection?: Collection<Book | BookRequest>;
    constructor(atlasUri: string, databaseName: string) {
        this.client = new MongoClient(atlasUri);
        this.databaseName = databaseName;
    }

    async Connect() {
        try {
            await this.client.connect();
            console.log("Connected to Database");
        } catch (e) {
            console.error(e);
        }
        this.mongoDB = this.client.db(this.databaseName);
        this.UserCollection = this.mongoDB.collection("users");
        this.BookCollection = this.mongoDB.collection("books");
    }
}