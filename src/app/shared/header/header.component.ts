import { Component, HostListener, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../services/windows.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  public screenshotOffset: any = null;
  public teamOffset: any = null;
  public blogOffset: any = null;
  public priceOffset: any = null;
  public contactOffset: any = null;
  public isOpenMobile = false;
  public darkHeader = false;
  public menuItems: any[];

  constructor(
               @Inject(DOCUMENT) private document: Document,
               @Inject(WINDOW) private window,
               public breakpointObserver: BreakpointObserver

  ) { }

  ngAfterViewInit() {
    this.homeOffset = document.getElementById('home') ? document.getElementById('home').offsetTop : 0;
    this.aboutOffset = document.getElementById('about') ? document.getElementById('about').offsetTop : 0;
    this.featureOffset = document.getElementById('feature') ? document.getElementById('feature').offsetTop : 0;
    this.screenshotOffset = document.getElementById('screenshot') ? document.getElementById('screenshot').offsetTop : 0;
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
          } else if (window.pageYOffset >= this.featureOffset && window.pageYOffset < this.screenshotOffset - mediaOffset) {
            this.activeClass = 'feature';
          } else if (window.pageYOffset >= this.screenshotOffset && window.pageYOffset < this.teamOffset - mediaOffset) {
            this.activeClass = 'screenshot';
          } else if (window.pageYOffset >= this.teamOffset && window.pageYOffset < this.blogOffset - mediaOffset) {
            this.activeClass = 'team';
          } else if (window.pageYOffset >= this.blogOffset && window.pageYOffset < this.priceOffset - mediaOffset) {
            this.activeClass = 'blog';
          } else if (window.pageYOffset >= this.priceOffset && window.pageYOffset < this.contactOffset - mediaOffset) {
            this.activeClass = 'price';
          } else if (window.pageYOffset >= this.contactOffset - mediaOffset) {
            this.activeClass = 'contact';
          } else {
            this.activeClass = 'home';
          }
  });
}

}
