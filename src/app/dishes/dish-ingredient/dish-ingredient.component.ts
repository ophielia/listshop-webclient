import {Component, OnInit} from '@angular/core';

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
    tokens: string[] = [];

    searchSuggestions: string[] = [];
    doubleTokenSuggestions: string[] = [];
    doubleTokenStart: string;

    tmpTextWithSuggestion: string;


    ngOnInit(): void {
    }

    // input / callback
    mapSuggestions(stringToMatch: string, lastToken: string) {
        console.log("map suggestions stringToMatch:" + stringToMatch + "; lasttoken:" + lastToken);
        let allSuggestions: string[] = new Array();
        if (this.doubleTokenSuggestions != null && this.doubleTokenSuggestions.length > 0) {
            let doubleTokenSearch = this.doubleTokenStart + " " + stringToMatch.trim();
            let doubleTokenResults = this.doubleTokenSuggestions.filter(s => s.toLowerCase().startsWith(doubleTokenSearch.toLowerCase().trim()));
            allSuggestions = allSuggestions.concat(doubleTokenResults);
        }
        let results = states.filter(s => s.toLowerCase().startsWith(stringToMatch.toLowerCase().trim()));
        allSuggestions = allSuggestions.concat(results);


        return allSuggestions;
    }

    newProcessTokens(newValue: string) {
        var list = newValue.split(' ')
            .filter(i => i.trim().length > 0)
        this.tokens = list;
    }


}
