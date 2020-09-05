import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {LandingFixService} from "../../shared/services/landing-fix.service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {


  constructor(
      private fix: LandingFixService,
      private route: ActivatedRoute,
      private title: Title,
      private meta: Meta
  ) { }

  ngOnInit() {
    this.fix.addFixBlog();
    this.title.setTitle( this.route.snapshot.data['title']);
  }

  ngOnDestroy() {
    this.fix.removeFixBlog();
  }

}
