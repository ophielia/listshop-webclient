import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IToken, Token, TokenType} from "../dish-ingredient/token";
import {TextAndSelection} from "../ingredient-input/text-and-selection";
import {ISuggestion} from "../../model/suggestion";
import {FoodService} from "../../shared/services/food.service";
import {NGXLogger} from "ngx-logger";
import {ITokenList, TokenList} from "../dish-ingredient/token-list";
import {IIngredient, Ingredient} from "../../model/Ingredient";
import {Observable, Subject, Subscription} from "rxjs";
import {IDish} from "../../model/dish";

let allSuggestions: ISuggestion[] = [];
let currentSuggestions: ISuggestion[] = [];
let doubleSuggestions: ISuggestion[] = [];
let tokenList: ITokenList = new TokenList();
let doubleTokenStart: string;


@Component({
    selector: 'app-add-ingredient-dialog',
    templateUrl: './add-ingredient-dialog.component.html',
    styleUrls: ['./add-ingredient-dialog.component.scss']
})
export class AddIngredientDialogComponent implements OnInit, OnDestroy {

    @Input() ingredient: Observable<Ingredient>;
    @Output() editedIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
    private ingredientStartText = new Subject<string>();
    startText$ = this.ingredientStartText.asObservable();
    private amountIsActive = new Subject<boolean>();
    amountIsActive$ = this.amountIsActive.asObservable();

    private sendResult = new Subject<boolean>();
    sendResult$ = this.sendResult.asObservable();

    private unsubscribe: Subscription[] = [];

    componentTitle = "Edit Ingredient";
    debugTokens = false;
    _ingredient: IIngredient;
    loading = true;
    currentSuggestions: ISuggestion[] = [];


    constructor(
        private foodService: FoodService,
        private logger: NGXLogger
    ) {
    }

    ngOnInit(): void {
        if (!this.loading) {
            this.getSuggestionsForTag();
        }

        var $sub3 = this.ingredient.subscribe(val => {
            // deal with asynchronous Observable result
            this._ingredient = val;
            this.getSuggestionsForTag();
            this.clearDecksForNewIngredient();
            this.loading = false;
        })
        this.unsubscribe.push($sub3);
    }


    ngOnDestroy(): void {
        this.unsubscribe.forEach(s => s.unsubscribe())
    }

    getSuggestionsForTag() {
        let promise = this.foodService
            .getSuggestionsForTag(this._ingredient.tag_id, this._ingredient.is_liquid);
        promise.then(data => {
            console.log("received suggestions: " + this.currentSuggestions);
            doubleSuggestions = data.filter(s => s.text.trim().indexOf(" ") > 0);
            allSuggestions = data;
            currentSuggestions = data;
        })
    }

    // input / callback
    mapSuggestions(stringToMatch: string, lastToken: string) {

        //console.log("inner map suggestions suggestions: " + this.currentSuggestions);
        console.log("inner map suggestions stringToMatch:" + stringToMatch + "; lasttoken:" + lastToken);
        let suggestions: string[] = new Array();
        if (lastToken && doubleSuggestions != null && doubleSuggestions.length > 0) {
            console.log("inner map suggestions last token suggestions:");
            let doubleTokenSearch = doubleTokenStart + " " + stringToMatch.trim();
            let doubleTokenResults = doubleSuggestions
                .filter(s => s.text.toLowerCase().startsWith(doubleTokenSearch.toLowerCase().trim()))
                .map(s => s.text);
            suggestions = suggestions.concat(doubleTokenResults);
        }
        let results = currentSuggestions
            .filter(s => s.text.toLowerCase().startsWith(stringToMatch.toLowerCase().trim()))
            .map(s => s.text);
        suggestions = suggestions.concat(results);

        console.log("inner map suggestions suggestions:" + suggestions);


        return suggestions;
    }


    processTextInput(textAndSelection: TextAndSelection) {
        this.processTokensForInput(textAndSelection);
    }


    public tokenList = tokenList;

    private clearDecksForNewIngredient() {
        if (this._ingredient.raw_entry) {
            this.ingredientStartText.next(this._ingredient.raw_entry);
        } else {
            this.ingredientStartText.next("");
        }
        this.tokenList.listOfTokens = [];
    }

    finalizeInput() {
        // solicit last entry from  input
        this.sendResult.next(true);
    }

    processTokensForInput(textAndSelection: TextAndSelection) {
        var processingString = " " + textAndSelection.text + " ";
        var newTokenList = new Array<Token>();
        // remove all processed tokens from string
        if (tokenList && tokenList.listOfTokens.length > 0) {
            var list = processingString.split(' ')
                .filter(i => i.trim().length > 0)

            for (let token of tokenList.listOfTokens) {
                if (token.text.indexOf(" ") < 0) {
                    if (list.includes(token.text)) {
                        processingString = processingString.replace(token.matchingText, " ");
                    }
                } else {
                    processingString = processingString.replace(token.text, " ");
                }
            }
        }

        if (processingString.trim().length > 0) {

            console.log("processForInput: processing:" + processingString + ",text: " + textAndSelection.text + "; doubleTokenStart: " + doubleTokenStart);

            // process remaining tokens
            var textToProcess;
            if (textAndSelection.selected) {
                textToProcess = textAndSelection.selected.trim();
            } else {
                // check double token start
                textToProcess = processingString.trim();
            }
            var token = this.createTokenForText(textToProcess);
            if (token) {
                newTokenList.push(token);
            }
            this.checkDoubleToken(textToProcess, processingString.trim());
            console.log("processForInput end: text: " + textAndSelection.text + "; doubleTokenStart: " + doubleTokenStart);
        }

        this.reconcileTokenList(textAndSelection.text, newTokenList);
        if (textAndSelection.final) {
            // assemble tokens in ingredient , and emit
            this.editedIngredient.emit(new Ingredient());
        }
    }

     checkDoubleToken(processedText: string, value: string) {
        console.log("check double token: " + doubleTokenStart);
        // clear the token, and potentially set new token
        // look for double token starting with string
        var checkExistance = doubleSuggestions
            .filter(dt => dt.text.trim().startsWith(value.trim() + " "));
        if (checkExistance && checkExistance.length > 0 && value.trim().indexOf(" ") < 0) {
            doubleTokenStart = value.trim();
        } else {
            doubleTokenStart = undefined;
        }


    }

     reconcileTokenList(text: string, newTokenList: Token[]) {
        var processingString = " " + text + " ";
        // first remove the new token (should only be 1 - but it's in a list
        for (let token of newTokenList) {
            if (processingString.indexOf(token.text) >= 0) {
                processingString = processingString.replace(token.matchingText, " ");
            }

        }
        // put existing tokens in map
        for (let existing of tokenList.listOfTokens) {
            if (existing.text.trim().length > 0 &&
                processingString.indexOf(existing.text.trim()) >= 0) {
                processingString = processingString.replace(existing.matchingText, " ");
                newTokenList.push(existing);
            }
        }


        tokenList.listOfTokens = newTokenList;

    }

    createTokenForText(text: string) {
        console.log("createTokenForText: text:" + text);
        if (text.match(/\//)) {
            var token = new Token();
            token.text = text.trim();
            token.matchingText = " " + token.text + " ";
            token.type = TokenType.Fraction;
            return token;
        } else if (text.match(/[0-9]+/)) {
            // whole number match
            var token = new Token();
            token.text = text.trim();
            token.matchingText = " " + token.text + " ";
            token.type = TokenType.WholeNumber;
            return token;
        } else if (doubleTokenStart && doubleTokenStart != text.trim()) {
            console.log("createTokenForText - double: text:" + text);
            // first attempt with double token
            var token = this.mapTextToToken(doubleTokenStart.trim() + " " + text.trim());
            console.log("createTokenForText - double: token:" + token);
            if (!token) {
                token = this.mapTextToToken(text.trim());
            }
            doubleTokenStart = null;
            return this.tokenOrDefault(token, text.trim());
        } else {
            // check suggestions
            var token = this.mapTextToToken(text.trim());
            return this.tokenOrDefault(token, text.trim());
        }
        // not a number or fraction - doesn't match suggestion
        // will return this as a marker token
        return this.defaultToken(text);


    }

     defaultToken(text: string) {
        return Token.defaultFromText(text);
    }

     tokenOrDefault(token: IToken, text: string) {
        if (token) {
            return token;
        }
        return this.defaultToken(text);
    }

     mapTextToToken(text: string): IToken {
        var match = allSuggestions
            .filter(t => t.text.trim() == text.trim());
        if (match && match.length > 0) {
            return Token.fromSuggestion(match[0]);
        }
        return undefined;
    }

}








