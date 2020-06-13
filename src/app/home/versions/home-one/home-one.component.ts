import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingFixService } from '../../../shared/services/landing-fix.service';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit, OnDestroy {

  constructor(private fix: LandingFixService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta) { }

  ngOnInit() {
    this.fix.addFixOne();
    this.title.setTitle( this.route.snapshot.data['title']);
    this.meta.updateTag({name: 'description', content: this.route.snapshot.data['content']});
    this.meta.addTag({name: this.route.snapshot.data['title'], content: this.route.snapshot.data['content']});
    this.meta.updateTag({property: 'og:title', content: this.route.snapshot.data['content']});
  }

  ngOnDestroy() {
    this.fix.removeFixOne();
  }

}
