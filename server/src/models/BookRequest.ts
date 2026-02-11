import { ObjectId } from "mongodb"

export class SCID {
    readonly bookId: ObjectId;
    readonly requestId?: ObjectId;
    readonly Id: string;

    constructor(bookId: ObjectId, requestId?: ObjectId) {
        this.bookId = bookId;
        this.requestId = requestId;
        const stringRequestId: string = requestId?.toString() ?? "";
        this.Id = `${this.bookId.toString()}/${stringRequestId}`;
    }

}

export class BookRequest {
    readonly _id: ObjectId;
    readonly bookId: ObjectId;
    readonly userId: ObjectId;
    readonly requestDate: Date;
    readonly reservationEndDate: Date;
    readonly scid: SCID;
    active: boolean;

    constructor(bookId: ObjectId, userId: ObjectId, _id?: ObjectId, requestDate?: Date, reservationEndDate?: Date, active?: boolean) {
        this.bookId = bookId;
        this.userId = userId
        this.requestDate = requestDate ?? new Date()
        this.reservationEndDate = reservationEndDate ?? new Date()
        this.active = active ?? true;
        this._id = _id ?? new ObjectId();
        this.scid = new SCID(bookId, this._id);
    }
}