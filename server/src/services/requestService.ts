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
    const object = await bookCollection.findOne({ _id: objId });
    if (object === null) {
        return null;
    }
    else {
        return new BookRequest(object.bookId, object.userId, object._id, object.requestDate, object.reservationEndDate, object.active);
    }
}