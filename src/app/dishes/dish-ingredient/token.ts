import {ISuggestion, Suggestion} from "../../model/suggestion";


export interface IToken {
    text: string;
    type: TokenType;
    id: string;

}

export class Token implements IToken {



    text: string;
    type: TokenType;
    id: string;

    static fromSuggestion(match: Suggestion){
        var token = new Token();
        token.text = match.text;

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

}


export enum TokenType {
    WholeNumber = 'WholeNumber',
    Fraction = 'Fraction',
    Unit = 'Unit',
    UnitSize = 'UnitSize',
    Marker = 'Marker'
}