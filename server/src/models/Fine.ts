import { ObjectId } from "mongodb";

export interface Fine {
    _id: ObjectId;
    dateIssued: Date;
    daily_rate: number;
    book_id: ObjectId;
}