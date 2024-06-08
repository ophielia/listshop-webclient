import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {FoodService} from "../../shared/services/food.service";
import {ISuggestion} from "../../model/suggestion";
import {ITokenList, TokenList} from "./token-list";
import {TextAndSelection} from "../ingredient-input/text-and-selection";
import {IToken, Token, TokenType} from "./token";


let states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
let allSuggestions: ISuggestion[] = [];
let currentSuggestions: ISuggestion[] = [];
let doubleSuggestions: ISuggestion[] = [];
let tokenList: ITokenList = new TokenList();
let doubleTokenStart: string;

@Component({
    selector: 'app-dish-ingredient',
    templateUrl: './dish-ingredient.component.html',
    styleUrls: ['./dish-ingredient.component.scss']
})
export class DishIngredientComponent implements OnInit, OnDestroy {
    tokens: string[] = [];
    tagId: string = "16";

    private unsubscribe: Subscription[] = [];




    currentSuggestions: ISuggestion[] = [];


    constructor(
        private foodService: FoodService,
        private logger: NGXLogger
    ) {
    }

    ngOnInit(): void {
        this.getSuggestionsForTag(this.tagId);
    }


    ngOnDestroy(): void {

    }

    getSuggestionsForTag(tagId: string) {
        let promise = this.foodService
            .getSuggestionsForTag(tagId);
        promise.then(data => {
            console.log("received suggestions: " + this.currentSuggestions);
            doubleSuggestions = data.filter(s => s.text.trim().indexOf(" ") > 0);
            allSuggestions = data;
            currentSuggestions = data;
        })
    }

    // input / callback
    mapSuggestions(stringToMatch: string, lastToken: string) {

        console.log("inner map suggestions suggestions: " + this.currentSuggestions);
        console.log("inner map suggestions stringToMatch:" + stringToMatch + "; lasttoken:" + lastToken);
        let suggestions: string[] = new Array();
        if (doubleSuggestions != null && doubleSuggestions.length > 0) {
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


        return suggestions;
    }


    processTextInput(textAndSelection: TextAndSelection) {
        processTokensForInput(textAndSelection);
    }


    public tokenList = tokenList;
}

function checkDoubleToken(value: string) {
    // if string is part of double token suggestions, save in double token
    if (!doubleTokenStart) {
        // look for double token starting with string
        var checkExistance = doubleSuggestions
            .filter( dt => dt.text.trim().startsWith(value.trim() + " "));
        if (checkExistance && checkExistance.length > 0) {
            doubleTokenStart = value.trim();
        }
    }


}

function processTokensForInput(textAndSelection: TextAndSelection) {
    var processingString = textAndSelection.text;
    // remove all processed tokens from string
    if (tokenList && tokenList.listOfTokens.length > 0) {
        for (let token of tokenList.listOfTokens) {
            if (processingString.indexOf(token.text) >= 0) {
                processingString = processingString.replace(token.text, "");
            }

        }
    }

console.log("processForInput: text: " + textAndSelection.text + "; doubleTokenStart: " +doubleTokenStart);

    // process remaining tokens
    var textToProcess;
    if (textAndSelection.selected) {
        textToProcess = textAndSelection.selected.trim();
    } else {
        // check double token start
         checkDoubleToken(processingString.trim());
       textToProcess = processingString.trim();
    }
    var token = createTokenForText(textToProcess);
    if (token) {
    tokenList.listOfTokens.push(token);
    }
    processingString.replace(textToProcess, "");

}

function defaultToken(text: string) {
    var token = new Token();
    token.text = text;
    token.type = TokenType.Marker;
    return token;
}

function createTokenForText(text: string) {

     if (text.match(/\//)) {
        var token = new Token();
        token.text = text.trim();
        token.type = TokenType.Fraction;
        return token;
    } else if (text.match(/[0-9]+/)) {
        // whole number match
        var token = new Token();
        token.text = text.trim();
        token.type = TokenType.WholeNumber;
        return token;
    } else if (doubleTokenStart && doubleTokenStart !=  text.trim()) {
         // first attempt with double token
         var token = mapTextToToken(doubleTokenStart.trim() + " " + text.trim());
         if (!token) {
             token = mapTextToToken(text.trim());
         }
         doubleTokenStart = null;
         if (token) {
             return token;
         }
         return defaultToken(text.trim());
     } else {
        // check suggestions
        var token = mapTextToToken(text.trim());
        if (token) {
            return token;
        }
    }
    // not a number or fraction - doesn't match suggestion
    // will return this as a marker token
    return defaultToken(text);


}

function mapTextToToken(text: string):IToken {
    var match = allSuggestions
        .filter( t => t.text.trim() == text.trim());
    if (match && match.length > 0) {
        return Token.fromSuggestion(match[0]);
    }
    return undefined;
}
