import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {map, filter, tap, switchMap, distinctUntilChanged} from "rxjs/operators";
import {NGXLogger} from "ngx-logger";
import {TokenList} from "./token-list";

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];



@Component({
    selector: 'app-dish-ingredient',
    templateUrl: './dish-ingredient.component.html',
    styleUrls: ['./dish-ingredient.component.scss']
})
export class DishIngredientComponent implements OnInit {
    entryText: string;
    tokens: string[] = [];

    private entrySubject = new BehaviorSubject<string>("");
    entryChangedAction$ = this.entrySubject.asObservable();

    private lastSpaceSubject: Subject<number> = new BehaviorSubject<number>(0);
    lastSpaceChange$ = this.lastSpaceSubject.asObservable();


    ngOnInit(): void {
        this.lastSpaceChange$.pipe(
            distinctUntilChanged(),
            filter( lastSpace => lastSpace > 0),
            map( lastSpace => {
                this.processAllTokens(this.entrySubject.value)
                }

            )
        ).subscribe();


    }
    /**
    combineLatest([
                      this.entryChangedAction$,
                      this.lastSpaceChange$])
.pipe(
        // Perform the filtering
        filter(([entry,lastspace]) => lastspace > 0),
    map(([entry, lastSpace]) =>
    this.processAllTokens(entry)))


     * debounceTime(options.debounceTime),
     *       filter(value => typeof value === "string"),
     *       filter(value => {
     *         if (value === "") {
     *           return options.allowEmptyString ?? true;
     *         }
     *         return value.length >= options.minLength;
     *       })
     * @param logger
     */

    constructor(private logger: NGXLogger) {

    }


    entryChangedText$ = this.entryChangedAction$.pipe(
        map(data => "working " + data)
    );

    searchText$ = combineLatest([
        this.entryChangedAction$,
        this.lastSpaceChange$])
        .pipe(
            // Perform the filtering
            map(([entry, lastSpace]) =>
                entry.substr(lastSpace) ));

    suggestion$ = this.searchText$.pipe(
        tap(data => console.log("here we go! " + data)),
        filter(st => typeof st === "string"),
        filter(st => st.trim().length > 1),
        tap(data => console.log("with data !" + data + '!')),
        map(st => {
            let returnthingee:string[] = new Array();
            returnthingee = states.filter(s => s.includes(st.trim()));
            console.log("here we dgo " + returnthingee);
            return returnthingee;
            /**
            returnthingee.push("found ." + st);
            return returnthingee;**/

        })
    );



    //tokenList$ =
    // next up - token change listener which outputs a list of tokens


    inputChanged($event) {
        this.entrySubject.next(this.entryText);
    }

    spaceEntered() {
        console.log("here we go");
        this.lastSpaceSubject.next(this.entryText.length - 1)
    }

     processAllTokens(entry: string) {
        var list = entry.split(' ')
            .filter( i => i.trim().length > 0)
        //var tokenList = new TokenList();
        this.tokens = list;
        //return tokenList;
    }

}
