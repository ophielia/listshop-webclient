import { Component, OnInit } from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-single-list-element',
  templateUrl: './single-list-element.component.html',
  styleUrls: ['./single-list-element.component.css']
})
export class SingleListElementComponent implements OnInit {

  constructor(
      private fix: LandingFixService,
      private route: ActivatedRoute,
      private title: Title,
      private meta: Meta,
  ) { }

  ngOnInit() {
   // this.fix.addFixBlogDetails();
    this.title.setTitle( this.route.snapshot.data['title']);
  }

  ngOnDestroy() {
   // this.fix.removeFixBlogDetails();
  }

}
