import { ObjectId } from "mongodb"

export class BookRequest {
    readonly _id: ObjectId;
    readonly bookId: ObjectId;
    readonly userId: ObjectId;
    readonly requestDate: Date;
    readonly reservationEndDate: Date;
    readonly scid: string;
    active: boolean;

    constructor(bookId: ObjectId, userId: ObjectId, _id: ObjectId, requestDate: Date, reservationEndDate: Date, active: boolean) {
        this.bookId = bookId;
        this.userId = userId;
        this.requestDate = requestDate;
        this.reservationEndDate = reservationEndDate;
        this.active = active;
        this._id = _id;
        this.scid = `${this.bookId}/${this._id}`;
    }
}