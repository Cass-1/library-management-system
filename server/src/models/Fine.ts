import { ObjectId } from "mongodb";

export interface Fine {
    _id: ObjectId
    total_cost: number,
    daily_rate: number,
    book_id: ObjectId
}