import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.scss']
})
export class ComingsoonComponent implements OnInit {
  public seconds: number;

  constructor( private route: ActivatedRoute,
    private title: Title,
    private meta: Meta, ) {
    this.setTime();
   }

  ngOnInit() {
    this.title.setTitle( this.route.snapshot.data['title']);
  }

  setTime() {
    setInterval(function () {
      const countDown = new Date('dec 30, 2019 00:00:00').getTime();
      const now = new Date().getTime();
      const distance = countDown - now;
      this.document.getElementById('days').innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.document.getElementById('hours').innerHTML = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.document.getElementById('minutes').innerHTML = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.document.getElementById('seconds').innerHTML = Math.floor((distance % (1000 * 60)) / 1000);
    }, this.seconds);
  }


}
