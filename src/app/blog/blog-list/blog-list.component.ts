import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private fix: LandingFixService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle( this.route.snapshot.data['title']);
    this.fix.addFixBlog();
  }

  ngOnDestroy() {
    this.fix.removeFixBlog();
  }

}
