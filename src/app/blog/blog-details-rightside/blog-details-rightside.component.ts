import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../shared/services/landing-fix.service';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-blog-details-rightside',
  templateUrl: './blog-details-rightside.component.html',
  styleUrls: ['./blog-details-rightside.component.scss']
})
export class BlogDetailsRightsideComponent implements OnInit, OnDestroy {

  constructor(
    private fix: LandingFixService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.fix.addFixBlogDetails();
    this.title.setTitle( this.route.snapshot.data['title']);
  }

  ngOnDestroy() {
    this.fix.removeFixBlogDetails();
  }

}
