import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ReviewComponent } from './review/review.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FaqComponent } from './faq/faq.component';
import { DownloadComponent } from './download/download.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        data: {
          title: 'Forget-Password | Template Landing Page'
        }
      },
      {
        path: 'thank-you',
        component: ThankYouComponent,
        data: {
          title: 'Thank you | Template Landing Page'
        }
      },
      {
        path: 'review',
        component: ReviewComponent,
        data: {
          title: 'Review | Template Landing Page'
        }
      },
      {
        path: '404',
        component: ErrorPageComponent,
        data: {
          title: '404 | Template Landing Page'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ | Template Landing Page'
        }
      },
      {
        path: 'download',
        component: DownloadComponent,
        data: {
          title: 'Download | Template Landing Page'
        }
      },
      {
        path: 'coming-soon',
        component: ComingsoonComponent,
        data: {
          title: 'Comming-Soon | Template Landing Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
