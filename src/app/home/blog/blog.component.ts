import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  constructor() { }

  // Blog Carousel
  public blog = [{
    image: 'assets/images/blog/6.jpg',
    date: '15 jun 2016',
    title: 'Lorem Ipsum has been the industry standard dummy text',
    postedBy: 'posted by johanson let, 15 hits, 30 comment',
  }, {
    image: 'assets/images/blog/7.jpg',
    date: '10 February 2012',
    title: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    postedBy: 'posted by John Shipmen, 6 hits, 8 comment',
  }, {
    image: 'assets/images/blog/8.jpg',
    date: '12 march 2015',
    title: 'The first line of Lorem Ipsum Lorem ipsum dolor sit amet comes from a line in section 1.10.32.',
    postedBy: 'posted by Mark jkcno, 10 hits, 50 comment',
  }, {
    image: 'assets/images/blog/9.jpg',
    date: '28 December 2017',
    title: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
    postedBy: 'posted by Walo Boni, 9 hits, 4 comment',
  }];


  // Blog Carousel Options
  public blogCarousel: any = {
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
        margin: 5,
        nav: false,
      },
      600: {
        items: 1,
        margin: 0,
        nav: false,
      },
      768: {
        items: 2,
      },
      1000: {
        items: 2
      }
    }
  };

}
