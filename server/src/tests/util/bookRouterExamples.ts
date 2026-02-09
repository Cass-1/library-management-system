import { Book, BookType } from "@/models/Book.js";
import { ObjectId } from "mongodb";

export const createExampleBook =
    new Book(
        new ObjectId(),
        "2309329009",
        "CREATE Example Book",
        "Random Person",
        "YA",
        BookType.PRINT,
        "Best Publisher Publishing House",
        "12/",
        true
    );

export const readExampleBook =
    new Book(
        new ObjectId(),
        "2309329009",
        "READ Example Book",
        "Random Person",
        "YA",
        BookType.PRINT,
        "Best Publisher Publishing House",
        "12/",
        true
    );

export const updateExampleBook =
    new Book(
        new ObjectId(),
        "2309329009",
        "UPDATE Example Book",
        "Random Person",
        "YA",
        BookType.PRINT,
        "Best Publisher Publishing House",
        "12/",
        true
    );

export const deleteExampleBook =
    new Book(
        new ObjectId(),
        "2309329009",
        "DELETE Example Book",
        "Random Person",
        "YA",
        BookType.PRINT,
        "Best Publisher Publishing House",
        "12/",
        true
    );