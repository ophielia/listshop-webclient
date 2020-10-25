import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IDish} from "../../model/dish";
import { NgModel } from '@angular/forms';
import {Renderer} from "@angular/compiler-cli/ngcc/src/rendering/renderer";



@Component({
  selector: 'app-dish-select',
  templateUrl: './dish-select.component.html',
  styleUrls: ['./dish-select.component.scss']
})
export class DishSelectComponent implements OnInit, OnDestroy {
  @Output() dishSelected: EventEmitter<IDish> = new EventEmitter<IDish>();
  @Output() cancelSelectDish: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() tagTypes: string;
  @Input() showText: string;
  @Input() showCancelButton: boolean = false;
  @Input() passedInputStyle: any;
  @Input() showAsInputGroup: any = true;
  @Input() dishList: IDish[];


  autoSelectedDish: any;
  filteredDishList: IDish[];

  name: string;




  constructor() {

  }

  ngOnInit() {
    this.autoSelectedDish = null;
  }



  filterDishes(event) {
    console.log("in filter dishes: " + event.query)
    if (event.query) {
      if (this.dishList) {
        let filterBy = event.query.toLocaleLowerCase();
        this.filteredDishList = this.dishList.filter((dish: IDish) =>
        dish.name != null && dish.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
        console.log("filtered dishes length: " + this.filteredDishList.length)
      }
    } else {
      this.filteredDishList = null;
    }
  }

  bingo(event) {
    console.log("was in bingo");
    console.log("event is: " + event)
    this.dishSelected.emit(event);
    this.autoSelectedDish = null;
    this.filteredDishList = null;
    if (event) {
      event.panelVisible = false;
    }
  }


  checkSearchEnter(el) {
    // when the user clicks on return from the search box
    // if only one tag is in the list, select this tag
    if (this.filteredDishList && this.filteredDishList.length == 1) {
      this.bingo(this.filteredDishList[0]);
      this.autoSelectedDish = null;
      this.filteredDishList = null;
    }
  }

  cancelDishInput() {
    this.cancelSelectDish.emit(true);
  }


  ngOnDestroy() {

  }

}


