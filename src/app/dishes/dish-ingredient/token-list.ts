import {IToken, Token} from "./token";

export interface ITokenList {
    listOfTokens: IToken[];
}


export class TokenList implements ITokenList {

    constructor() {
        this.listOfTokens = [];
    }


    listOfTokens: Token[] = [];
}
