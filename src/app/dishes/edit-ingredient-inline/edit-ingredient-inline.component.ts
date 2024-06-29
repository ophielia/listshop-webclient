import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IToken, Token, TokenType} from "../dish-ingredient/token";
import {TextAndSelection} from "../ingredient-input/text-and-selection";
import {ISuggestion} from "../../model/suggestion";
import {FoodService} from "../../shared/services/food.service";
import {NGXLogger} from "ngx-logger";
import {ITokenList, TokenList} from "../dish-ingredient/token-list";
import {IIngredient, Ingredient} from "../../model/Ingredient";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {GroupType} from "../../shared/services/tag-tree.object";
import {Tag} from "../../model/tag";
import {TagTreeService} from "../../shared/services/tag-tree.service";

let allSuggestions: ISuggestion[] = [];
let currentSuggestions: ISuggestion[] = [];
let doubleSuggestions: ISuggestion[] = [];
let tokenList: ITokenList = new TokenList();
let doubleTokenStart: string;

@Component({
    selector: 'app-edit-ingredient-inline',
    templateUrl: './edit-ingredient-inline.component.html',
    styleUrls: ['./edit-ingredient-inline.component.scss']
})
export class EditIngredientInlineComponent implements OnInit {
    @Input() set ingredient(value: Ingredient) {
       if (!this._ingredient || !this._ingredient.tag_id ||
            (value.tag_id != this._ingredient.tag_id ||
            (this._ingredient.original_tag_id && this._ingredient.original_tag_id != value.original_tag_id))) {
            this.clearDecksForNewIngredient();
           console.log("new ingredient here");
           this.initializeForNewIngredient(value);
        }

        this._ingredient = value;
    }
    @Output() editedIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
    @Output() cancelEdit: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    private ingredientStartText = new BehaviorSubject<string>("");
    startText$ = this.ingredientStartText.asObservable();

    private sendResult = new Subject<boolean>();
    sendResult$ = this.sendResult.asObservable();

    private unsubscribe: Subscription[] = [];

    debugTokens = false;
    editingAmount = true;
    _ingredient: IIngredient;
    loading = false;
    groupTypeNoGroups: GroupType = GroupType.ExcludeGroups;
    currentSuggestions: ISuggestion[] = [];
    ingredientErrors: String[] = [];

    ERROR_TOO_SMALL = "ERROR_TOO_SMALL";
    ERROR_BAD_FRACTION = "ERROR_BAD_FRACTION";
    ERROR_DECIMAL_AND_FRACTION = "ERROR_DECIMAL_AND_FRACTION";
    ERROR_NO_QUANTITY = "ERROR_NO_QUANTITY";

    constructor(
        private foodService: FoodService,
        private logger: NGXLogger,
        private tagTreeService: TagTreeService
    ) {
    }

    ngOnInit(): void {
        if (this._ingredient && this._ingredient.raw_entry && this._ingredient.raw_entry.trim().length > 0) {
            this.ingredientStartText.next(this._ingredient.raw_entry);
        }
        if (!this.loading) {
            this.getSuggestionsForTag();
        }
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
        if (!this._ingredient) {
            return;
        }
        if (this._ingredient.raw_entry) {
            this.ingredientStartText.next(this._ingredient.raw_entry);
        } else {
            this.ingredientStartText.next("");
        }
        this.tokenList.listOfTokens = [];
        this.ingredientErrors = [];
    }

    finalizeInput() {
        // solicit last entry from  input
        this.sendResult.next(true);
    }

    cancelAddIngredient() {
        this.editingAmount = true;
        this.clearDecksForNewIngredient();
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
            this.passChangesOn(textAndSelection);
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
        if (text.match(/\d*\.\d*/)) {
            var token = new Token();
            token.text = text.trim();
            token.matchingText = " " + token.text + " ";
            token.type = TokenType.DecimalNumber;
            return token;
        } else if (text.match(/\d+\s*\/\s*\d+/)) {
            var token = new Token();
            token.text = text.trim();
            token.matchingText = " " + token.text + " ";
            token.type = TokenType.Fraction;
            return token;
        } else if (text.match(/\d+\s*-\s*\d+/)) {
            var token = new Token();
            var cleanedText = text.replace(/\s/,'');
            token.text = cleanedText;
            token.matchingText = " " + text.trim() + " ";
            token.type = TokenType.Range;
            return token;
        }else if (text.match(/[0-9]+/)) {
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

    private passChangesOn(text: TextAndSelection) {
        this.checkDashesAndSlashes(text);

        // assemble tokens in ingredient , and emit
        var list = this.tokenList.listOfTokens;
        var errors = new Map<String,String>();
        var quantityExists = false;
        var partialCount = 0;
        var ingredient = this.clearedIngredient();
        for (let token of list) {
            switch (token.type) {
                case TokenType.WholeNumber:
                    if (!ingredient.whole_quantity) {
                        quantityExists = true;
                        ingredient.whole_quantity = Number(token.text);
                    }
                    break;
                case TokenType.Range:
                    if (!ingredient.whole_quantity) {
                        quantityExists = true;
                        var rangeValues = token.text.split("-");
                        var upperRange = rangeValues[rangeValues.length - 1].trim();
                        ingredient.whole_quantity = Number(upperRange);
                    }
                    break;
                case TokenType.DecimalNumber:
                    if (!ingredient.quantity) {
                        quantityExists = true;
                        partialCount+=1;
                        ingredient.quantity = Number(token.text);
                        if (ingredient.quantity <= 0.10) {
                            errors.set(this.ERROR_TOO_SMALL,"Please enter a larger quantity");
                        }
                    }
                    break;
                case TokenType.Fraction:
                    if (ingredient.fractional_quantity == "") {
                        quantityExists = true;
                        partialCount+=1;
                        ingredient.fractional_quantity = token.text;
                        if (!this.isFractionValid(token.text)) {
                            errors.set(this.ERROR_BAD_FRACTION,"Please use a denominator of 2, 3, 4 or 8");
                        }
                    }
                    break;
                case TokenType.Unit:
                    if (ingredient.unit_id == "") {
                        ingredient.unit_id = token.id;
                    }
                    break;
                case TokenType.UnitSize, TokenType.Marker:
                    ingredient.raw_modifiers.push(token.text);
            }
        }
        // check quantity > 0.11
        if (partialCount > 1) {
            //error multiple partials
            errors.set(this.ERROR_DECIMAL_AND_FRACTION,"Please use either a decimal or a fraction, but not both.");
        }
        if (!quantityExists && text.text.trim().length > 0) {
            errors.set(this.ERROR_NO_QUANTITY,"Please enter a quantity.");
        }

        if (errors.size > 0) {
            this.ingredientErrors = Array.from(errors.values());
            return;
        }
        this.ingredientErrors = [];

        ingredient.raw_entry = text.text;
        this.clearDecksForNewIngredient();
        this.editedIngredient.emit(ingredient);
    }

    checkDashesAndSlashes(text: TextAndSelection) {
        var textWithSpaces = " " + text.text + " ";
        var slashAndDashFound = false;
        if (textWithSpaces.match(/\s+(\d+)\s+-\s+(\d+)\s+/)) {
            slashAndDashFound = true;
            textWithSpaces = textWithSpaces.replace(/\s+(\d+)\s*-\s*(\d+)\s+/," $1-$2 ");
        }
        if (textWithSpaces.match(/\s+(\d+)\s+\/\s+(\d+)\s+/)) {
            slashAndDashFound = true;
            textWithSpaces = textWithSpaces.replace(/\s+(\d+)\s*\/\s*(\d+)\s+/," $1/$2 ");
        }
        if (slashAndDashFound) {
            text.text = textWithSpaces.trim();
            this.processTextInput(text);
        }
    }

    clearedIngredient() {
        var newIngredient = Ingredient.clone(this._ingredient);
        newIngredient.whole_quantity = undefined;
        newIngredient.fractional_quantity = "";
        newIngredient.unit_id = "";
        newIngredient.raw_modifiers = [];
        newIngredient.raw_entry = "";

        return newIngredient;
    }

    beginEditTag() {
        this.editingAmount = false;
    }

    beginEditAmount() {
        this.editingAmount = true;
    }

    isShowEditTag() {
        return !this.editingAmount;
    }

    isShowErrors() {
        return true; //return this.ingredientErrors.length > 0;
    }

    isShowEditAmount() {
        return this.editingAmount;
    }

    amountDisplayWhileEditingTag() {
        if (this.ingredientStartText.value.trim().length > 0) {
            return this.ingredientStartText.getValue();
        }
        return "Edit Amount";
    }

    changeTag(tag: Tag) {
        this.editingAmount = true;
        if (!this._ingredient.original_tag_id ||
            this._ingredient.original_tag_id.trim().length == 0) {
            this._ingredient.original_tag_id = this._ingredient.tag_id;
        }
        this._ingredient.tag_id = tag.tag_id;
        this._ingredient.tag_display = tag.name;
    }

    addIngredient(tag: Tag) {
        this.editingAmount = true;
        if (!this._ingredient) {
            this._ingredient = new Ingredient();
        }
        this._ingredient.tag_id = tag.tag_id;
        this._ingredient.tag_display = tag.name;
        let lookupTag = this.tagTreeService.retrieveTag(tag.tag_id);
        this._ingredient.is_liquid = lookupTag.is_liquid;
        this.getSuggestionsForTag();
    }

    dumpEvent($event) {
        console.log("couldn't care less.");
    }

    ingredientNameDisplay() {
       if (this._ingredient == null) {
           return "";
       }
        return this._ingredient.tag_display;
    }

    private initializeForNewIngredient(ingredient: Ingredient) {
        if (!ingredient || !ingredient.raw_entry || !ingredient.tag_id ||
        ingredient.raw_entry.trim().length == 0) {
            return;
        }

        let promise = this.foodService
            .getSuggestionsForTag(ingredient.tag_id, ingredient.is_liquid);
        promise.then(data => {
            console.log("received suggestions: " + this.currentSuggestions);
            doubleSuggestions = data.filter(s => s.text.trim().indexOf(" ") > 0);
            allSuggestions = data;
            currentSuggestions = data;
            // split entry into tokens, and process each
            var stringTokens = ingredient.raw_entry.split(" ");
            var builtString ="";
            for (var i = 0; i < stringTokens.length; i++) {
                builtString = builtString + " " + stringTokens[i];
                this.processTokensForInput(new TextAndSelection(builtString,null));
            }

        })
    }

    cancelIngredientEdit() {
        this.cancelEdit.emit(true);
    }

    private isFractionValid(fractionText: string) {
        var fractionCheck = fractionText.split("/");
        var denominator = fractionCheck[1].trim();
        return ['2','3','4','8'].includes(denominator);
    }
}








