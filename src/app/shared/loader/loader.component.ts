import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent implements OnInit {
  public show = true;

  constructor() {
    setTimeout(() => {
      this.show = false;
    }, 1500);
  }

  ngOnInit() {
  }

}
