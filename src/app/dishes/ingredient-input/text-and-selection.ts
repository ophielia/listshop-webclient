

export interface ITextAndSelection {
    text: string;
    selected: string;
    final: boolean;

}

export class TextAndSelection implements ITextAndSelection {
    constructor(entryText: string, selected: string) {
        this.text = entryText;
        this.selected = selected;
        this.final = false;
    }

    text: string;
    selected: string;
    final: boolean;

}

