import { Book } from "@/models/Book.js";
import { Collection, DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";

export class BookService {
    private repository;

    //TODO: decouple this from mongodb by using a BookRepository interface with defined methods
    constructor(repository: Collection<Book>) {
        this.repository = repository;
    }
    //TODO: make these in the form of createBook = async () {}
    async createBook(book: Book): Promise<InsertOneResult<Book>> {
        return await this.repository.insertOne(book);
    }

    async deleteBook(id: string): Promise<DeleteResult> {
        const objId = new ObjectId(id);
        return await this.repository.deleteOne({ _id: objId });
    }

    async getBook(id: string): Promise<Book | null> {
        const objId = new ObjectId(id);
        return await this.repository.findOne({ _id: objId });
    }

    async patchBook(id: string, data: Object): Promise<UpdateResult<Book>> {
        const objId = new ObjectId(id);
        const query = {
            "_id": objId
        };
        const update = {
            "$set": {
                ...data
            }
        };
        return await this.repository.updateOne(query, update);
    }

}
