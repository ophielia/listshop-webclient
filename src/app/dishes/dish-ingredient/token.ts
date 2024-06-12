import {ISuggestion, Suggestion} from "../../model/suggestion";


export interface IToken {
    text: string;
    matchingText: string;
    type: TokenType;
    id: string;

}

export class Token implements IToken {



    text: string;
    matchingText: string;
    type: TokenType;
    id: string;

    static fromSuggestion(match: Suggestion){
        var token = new Token();
        token.text = match.text;
        token.matchingText = " " + match.text + " ";
        if (match.type == 'Unit') {
            token.type = TokenType.Unit;
            token.id = match.reference_id;
        } else if (match.type == 'Marker') {
            token.type = TokenType.Marker;
        } else if (match.type == 'UnitSize') {
            token.type = TokenType.UnitSize;
        }

        return token;
    }

    static defaultFromText(text: string){
        var token = new Token();
        token.text = text;
        token.matchingText = " " + text + " ";
        token.type = TokenType.Marker;

        return token;
    }

}


export enum TokenType {
    WholeNumber = 'WholeNumber',
    Fraction = 'Fraction',
    Unit = 'Unit',
    UnitSize = 'UnitSize',
    Marker = 'Marker'
}