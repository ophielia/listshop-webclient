import { Component, HostListener, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../services/windows.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit  {
  public activeClass = 'home';
  public homeOffset: any = null;
  public aboutOffset: any = null;
  public featureOffset: any = null;
    public testimonialOffset: any = null;
  public teamOffset: any = null;
  public blogOffset: any = null;
  public priceOffset: any = null;
  public contactOffset: any = null;
  public isOpenMobile = false;
  public darkHeader = false;
  public menuItems: any[];
  public isLoggedIn: boolean;

  constructor(
               @Inject(DOCUMENT) private document: Document,
               @Inject(WINDOW) private window,
               public breakpointObserver: BreakpointObserver,
               private authorizationService : AuthenticationService
    ) {
    }

    ngOnInit(): void {
      this.isLoggedIn = this.authorizationService.isAuthenticated();
    }

  ngAfterViewInit() {
    this.homeOffset = document.getElementById('home') ? document.getElementById('home').offsetTop : 0;
    this.aboutOffset = document.getElementById('about') ? document.getElementById('about').offsetTop : 0;
    this.featureOffset = document.getElementById('feature') ? document.getElementById('feature').offsetTop : 0;
    this.testimonialOffset = document.getElementById('testimonial') ? document.getElementById('testimonial').offsetTop : 0;
    this.teamOffset = document.getElementById('team') ? document.getElementById('team').offsetTop : 0;
    this.blogOffset = document.getElementById('blog') ? document.getElementById('blog').offsetTop : 0;
    this.priceOffset = document.getElementById('price') ? document.getElementById('price').offsetTop : 0;
    this.contactOffset = document.getElementById('contact') ? document.getElementById('contact').offsetTop : 0;
  }

   active(val) {
      this.activeClass = val;
   }

  // @HostListener Decorator
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number >= 60) {
      this.darkHeader = true;
    } else {
      this.darkHeader = false;
    }
    let mediaOffset;
    this.breakpointObserver
    .observe(['(min-width: 991px)'])
    .subscribe((state: BreakpointState) => {
      if (!state.matches) {
        mediaOffset = 70;
      } else {
        mediaOffset = 0;
      }
          if (window.pageYOffset >= this.homeOffset && window.pageYOffset < this.aboutOffset - mediaOffset) {
            this.activeClass = 'home';
          } else if (window.pageYOffset >= this.aboutOffset && window.pageYOffset < this.featureOffset - mediaOffset) {
            this.activeClass = 'about';
                } else if (window.pageYOffset >= this.featureOffset && window.pageYOffset < this.testimonialOffset - mediaOffset) {
            this.activeClass = 'feature';
                } else if (window.pageYOffset >= this.testimonialOffset /* && window.pageYOffset <  mediaOffset*/) {
                    this.activeClass = 'testimonial';
          } else {
            this.activeClass = 'home';
          }
  });
}
}