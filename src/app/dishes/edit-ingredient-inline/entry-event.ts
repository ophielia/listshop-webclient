export interface IEntryEvent {
    startPosition: number;
    endPosition: number;
}


export class EntryEvent implements IEntryEvent {

    constructor() {
    }


    startPosition: number;
    endPosition: number;
}
