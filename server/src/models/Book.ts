import { ObjectId } from "mongodb";

export enum BookType {
    PRINT = "PRINT",
    EBOOK = "EBOOK"
}
export class Book {
    public _id: ObjectId;
    public isbn: string;
    public title: string;
    public author: string;
    public genre: string;
    public format: BookType;
    public publisher: string;
    public sc_id: string;
    public available: boolean;

    constructor(_id: ObjectId, isbn: string, title: string, author: string, genre: string, format: BookType, publisher: string, sc_id: string, available: boolean) {
        this._id = _id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.format = format;
        this.publisher = publisher;
        this.sc_id = sc_id;
        this.available = available;
    }
}