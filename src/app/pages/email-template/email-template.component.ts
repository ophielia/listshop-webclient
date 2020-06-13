import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private title: Title,
    private meta: Meta, ) { }

  ngOnInit() {
    this.title.setTitle( this.route.snapshot.data['title']);
  }

}
