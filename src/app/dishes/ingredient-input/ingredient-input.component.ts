import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {EntryEvent} from "../dish-ingredient/entry-event";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {TextAndSelection} from "./text-and-selection";

@Component({
    selector: 'app-ingredient-input',
    templateUrl: './ingredient-input.component.html',
    styleUrls: ['./ingredient-input.component.scss']
})
export class IngredientInputComponent implements OnInit , OnDestroy {
    @ViewChild("ingredientInput") ingredientInput : ElementRef;

    @Input() findSuggestions: (args: string, string) => string[];
    @Input() isActive: Observable<boolean>;
    @Input() skipFirstKey: boolean;


    @Input() startText: Observable<string>;
    @Input() sendResult: Observable<boolean>;

    @Output() processAfterChange: EventEmitter<TextAndSelection> = new EventEmitter<TextAndSelection>();

    private unsubscribe: Subscription[] = [];

    entryText: string;
    tokens: string[] = [];

    searchSuggestions: string[] = [];
    doubleTokenSuggestions: string[] = [];
    searchSuggestion: string;
    doubleTokenStart: string;
    textLength: number;
    inAmountMode: boolean = true;

    showSuggestions: boolean = true;
    twoTokenMatchingPossible: boolean;


    private midLineInput = new BehaviorSubject<boolean>(false);
    midLineChange$ = this.midLineInput.asObservable();
    private searchTextInput = new BehaviorSubject<EntryEvent>(null);
    private searchTextInputChange$ = this.searchTextInput.asObservable();


    ngOnInit(): void {
        setTimeout(() => this.ingredientInput.nativeElement.focus(), 0);
        this.entryText = "";
        var $sub1 = this.midLineChange$.pipe(
            distinctUntilChanged(),
            map(midLine => {
                this.showSuggestions = !midLine;
                this.twoTokenMatchingPossible = !midLine;
            })
        ).subscribe();
        this.unsubscribe.push($sub1);

        var $sub2 = this.searchText$.pipe(
            filter(st => typeof st === "string"),
            filter(st => st.trim().length > 1),
            map(st => {
                //console.log("search text pipe for: " + st);
                this.searchSuggestions = this.findSuggestionsAndComputeDisplay(st, null);
            })
        ).subscribe();
        this.unsubscribe.push($sub2);

        var $sub3 = this.startText.subscribe(val => {
            // deal with asynchronous Observable result
            this.entryText = val;
        })
        this.unsubscribe.push($sub3);

        var $sub4 = this.sendResult.subscribe(val => {
            // deal with asynchronous Observable result
            if (val) {this.sendResultToParent();}
        })
        this.unsubscribe.push($sub4);

        var $sub5 = this.isActive
            .subscribe(val => {
                console.log("active change " + val)
            // deal with asynchronous Observable result
            this.inAmountMode = val;
        })
        this.unsubscribe.push($sub5);
    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach(s => s.unsubscribe())
    }

    searchText$ = this.searchTextInputChange$.pipe(
        debounceTime(20),
        filter(ev => ev != null),
        distinctUntilChanged(),
        map(entryEvent => {
            if (entryEvent.endPosition) {
                return this.entryText.substr(entryEvent.startPosition, entryEvent.endPosition - entryEvent.startPosition).trim();
            }
            return this.entryText.substring(entryEvent.startPosition);
        })
    )

    inputChanged($event, inputhtml: any) {
        // processing input
        let cursorPosition = inputhtml.selectionStart;

        let isMidline = cursorPosition < this.entryText.trim().length;
        let isDeletion: boolean = this.textLength > this.entryText.trim().length;
        let lastSpace = this.calculateLastSpace(isMidline, cursorPosition);
        let nextSpace = this.calculateNextSpace(isMidline, cursorPosition);
        this.textLength = this.entryText.trim().length;
        //console.log(`input changed, cursorPosition: ${cursorPosition},isMidline: ${isMidline}, lastSpace: ${lastSpace},nextSpace: ${nextSpace}`);

        // process tokens, if space or deletion
        if ($event.key === " " || isDeletion) {
            var textAndSelection = new TextAndSelection(this.entryText, null);
            this.processTokens(textAndSelection);

            if (!this.processTwoTokenMatching()) {
                this.clearSuggestions();
            }
        } //else if ($event.key === e)

        // fire is midline
        this.midLineInput.next(isMidline);
        // fire searchText change
        let entryEvent = new EntryEvent();
        entryEvent.startPosition = lastSpace;
        entryEvent.endPosition = nextSpace;
        this.searchTextInput.next(entryEvent);

    }

    processTwoTokenMatching() {
        if (!this.twoTokenMatchingPossible) {
            return false;
        }
        // double token match check
        this.doubleTokenSuggestions = this.searchSuggestions.filter(t => t.indexOf(" "));
        if (this.doubleTokenSuggestions && this.doubleTokenSuggestions.length > 0) {
            this.searchSuggestions = [];
            this.searchSuggestion = "";
            this.doubleTokenStart = this.tokens[this.tokens.length - 1];
            return true;
        }
        return false;
    }

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        console.log("key press - isActive is" + this.inAmountMode);
        if (event.key === 'Tab') {
            event.preventDefault();
            this.selectSuggestion();
        } else if (event.key === 'Enter' && this.inAmountMode && !this.skipFirstKey) {
            event.preventDefault();
            this.sendResultToParent();
        }
        this.skipFirstKey = false;

    }

    calculateLastSpace(isMidline: boolean, cursorPosition: number) {
        if (this.entryText.indexOf(" ") < 0) {
            return 0;
        }
        if (!isMidline) {
            return this.entryText.lastIndexOf(" ");
        }
        return Math.max(this.entryText.substring(0, cursorPosition).lastIndexOf(" "), 0);
    }

    calculateNextSpace(isMidline: boolean, cursorPosition: number) {
        if (this.entryText.indexOf(" ") < 0 || !isMidline) {
            return null;
        }
        return this.entryText.substring(cursorPosition).indexOf(" ") + cursorPosition;
    }

    processTokens(textAndSelection: TextAndSelection) {
        this.processAfterChange.next(textAndSelection);
        var list = this.entryText.split(' ')
            .filter(i => i.trim().length > 0)
        this.tokens = list;
    }

    clearSuggestions() {
        this.searchSuggestions = [];
        this.doubleTokenSuggestions = [];
        this.searchSuggestion = "";
        this.doubleTokenStart = null;
    }

    selectSuggestion() {
        if (this.searchSuggestions.length == 0) {
            return;
        }

        // get entry event
        let entry = this.searchTextInput.value;
        // console.log("select entry: start: " + entry.startPosition + " , end: " + entry.endPosition);
        // get suggestion
        let suggestion = this.searchSuggestions ? this.searchSuggestions[0].trim() : "";

        // insert suggestion in entry event
        let insertFirstPosition = this.getInsertFirstPosition(suggestion, entry);
        let suggestionPart = this.getSuggestionPart(suggestion, entry);
        var entryWithSuggestion = this.entryText.substr(0, insertFirstPosition).trim();
        entryWithSuggestion += suggestionPart;
        if (entry.endPosition) {
            entryWithSuggestion += " " + this.entryText.substring(entry.endPosition).trim();
        }
        entryWithSuggestion += " ";
        // clear suggestions
        this.clearSuggestions();

        // set entry text
        this.entryText = entryWithSuggestion;

        // process
        var textAndSelection = new TextAndSelection(this.entryText, suggestion);
        this.processTokens(textAndSelection);
    }

    private getInsertFirstPosition(suggestion: string, entry: EntryEvent) {
        var enteredLength;
        if (this.inTwoTokenMode(suggestion) && suggestion.toLowerCase().startsWith(this.doubleTokenStart.trim())) {
            // we have a double token match
            var entryThroughStartPos = this.entryText.substr(0, entry.startPosition);
            var doubleTokenStartPos = entryThroughStartPos.lastIndexOf(this.doubleTokenStart);
            enteredLength = this.entryText.substring(doubleTokenStartPos).length;
            return doubleTokenStartPos >= 0 ? doubleTokenStartPos + enteredLength : entry.startPosition;
        }


        if (entry.endPosition) {
            //console.log("dd " + this.entryText.substring(entry.startPosition, entry.endPosition));
            enteredLength = this.entryText.substring(entry.startPosition, entry.endPosition).length;
        } else {
            enteredLength = this.entryText.substring(entry.startPosition).length;
        }
        return entry.startPosition + enteredLength;
    }

    private getSuggestionPart(suggestion: string, entry: EntryEvent) {
        var enteredLength;
        if (this.inTwoTokenMode(suggestion) && suggestion.trim().startsWith(this.doubleTokenStart)) {
            // we have a double token match
            var entryThroughStartPos = this.entryText.substr(0, entry.startPosition);
            var doubleTokenStartPos = entryThroughStartPos.lastIndexOf(this.doubleTokenStart);
            enteredLength = this.entryText.substring(doubleTokenStartPos).length;
            return suggestion.substr(enteredLength);
        }
        if (entry.endPosition) {
            //console.log("dd " + this.entryText.substring(entry.startPosition, entry.endPosition));
            enteredLength = this.entryText.substring(entry.startPosition, entry.endPosition).trim().length;
        } else {
            enteredLength = this.entryText.substring(entry.startPosition).trim().length;
        }
        let suggestionPart = suggestion.substr(enteredLength);
        //console.log("suggestionPart: " + suggestionPart);
        return suggestionPart;
    }

    private computeSuggestionDisplay(searchString: string, suggestion: string) {
        //console.log("computeSuggestionDisplay: searchString: " + searchString +     ", suggestion: " + suggestion + ", entryText: " + this.entryText);
        //console.log("computeSuggestionDisplay: calculated: " + this.entryText + suggestion.substr(searchString.trim().length));
        var spaceLocation = suggestion.  indexOf(" ");
        if (!this.inTwoTokenMode(suggestion)) {
            //console.log("not in two token");
            return this.entryText + suggestion.substr(searchString.trim().length);
        }
        //console.log("in two token");
        var displayLengthFromRight = Math.max(suggestion.trim().length - searchString.trim().length, 0);
        return this.entryText + suggestion.substring(suggestion.length - displayLengthFromRight);
    }

    private inTwoTokenMode(suggestion: string) {
        return this.doubleTokenStart != null && suggestion.indexOf(" ") >= 0;
    }

    private findSuggestionsAndComputeDisplay(searchText: string, lastToken: string) {
        var allSuggestions = this.findSuggestions(searchText, lastToken);
        if (this.showSuggestions && allSuggestions.length > 0) {
            //this.searchSuggestion =allSuggestions[0];
            this.searchSuggestion = this.computeSuggestionDisplay(searchText, allSuggestions[0]);
        } else {
            this.searchSuggestion = "";
        }
        return allSuggestions;
    }



    // use tokens
    // modularize for use in components

    // use real values instead of states
    // (real values sorted)


    private sendResultToParent() {
        var textAndSelection = new TextAndSelection(this.entryText, null);
        textAndSelection.final = true;
        this.processTokens(textAndSelection);
    }
}
