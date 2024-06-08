

export interface ITextAndSelection {
    text: string;
    selected: string;

}

export class TextAndSelection implements ITextAndSelection {
    constructor(entryText: string, selected: string) {
        this.text = entryText;
        this.selected = selected;
    }

    text: string;
    selected: string;

}

