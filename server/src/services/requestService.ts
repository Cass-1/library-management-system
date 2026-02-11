import { BookRequest } from "@/models/BookRequest.js";
import { bookCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";

export async function createRequest(request: BookRequest) {
    return await bookCollection.insertOne(request);
}

export async function deleteRequest(id: string) {
    const objId = new ObjectId(id);
    return await bookCollection.deleteOne({ _id: objId });
}

export async function getRequest(id: string): Promise<BookRequest | null> {
    const objId = new ObjectId(id);
    return await bookCollection.findOne({ _id: objId }) as BookRequest;
}

export async function getAllBookRequests(id: string) {
    const results = await bookCollection.find({ bookId: new ObjectId(id) });
    return results.toArray();
}

export async function deleteAllBookRequests(id: string) {
    return await bookCollection.deleteMany({ bookId: new ObjectId(id) });
}