import { Book } from "@/models/Book.js";
import { bookCollection } from "@/util/db.js";
import { ObjectId } from "mongodb";

async function createBook(book: Book) {
    return await bookCollection.insertOne(book);
}

async function deleteBook(id: string) {
    const objId = new ObjectId(id);
    return await bookCollection.deleteOne({ _id: objId });
}

async function getBook(id: string): Promise<Book | null> {
    const objId = new ObjectId(id);
    return await bookCollection.findOne({ _id: objId }) as Book;
}

async function patchBook(id: string, data: Object) {
    const objId = new ObjectId(id);
    const query = {
        "_id": objId
    };
    const update = {
        "$set": {
            ...data
        }
    };
    return await bookCollection.updateOne(query, update);
}

export {
    createBook,
    deleteBook,
    getBook,
    patchBook
}