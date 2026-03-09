import { Book } from "@/models/Book.js";
import { BookRequest } from "@/models/BookRequest.js";
import { Collection, ObjectId } from "mongodb";

export class RequestService {
    private repository;

    constructor(repository: Collection<Book | BookRequest>) {
        this.repository = repository;
    }
    createRequest = async (request: BookRequest) => {
        return await this.repository.insertOne(request);
    }

    deleteRequest = async (id: string) => {
        const objId = new ObjectId(id);
        return await this.repository.deleteOne({ _id: objId });
    }

    getRequest = async (id: string): Promise<BookRequest | null> => {
        const objId = new ObjectId(id);
        return await this.repository.findOne({ _id: objId }) as BookRequest;
    }

    getAllBookRequests = async (id: string) => {
        const results = await this.repository.find({ bookId: new ObjectId(id) });
        return results.toArray();
    }

    deleteAllBookRequests = async (id: string) => {
        return await this.repository.deleteMany({ bookId: new ObjectId(id) });
    }
}

