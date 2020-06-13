import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogLeftsideComponent } from './blog-leftside/blog-leftside.component';
import { BlogRightsideComponent } from './blog-rightside/blog-rightside.component';
import { BlogDetailsLeftsideComponent } from './blog-details-leftside/blog-details-leftside.component';
import { BlogDetailsRightsideComponent } from './blog-details-rightside/blog-details-rightside.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: BlogListComponent,
        data: {
          title: 'Blog List | Tovo Landing Page'
        }
      },
      {
        path: 'details',
        component: BlogDetailsComponent,
        data: {
          title: 'Detail Blog | Tovo Landing Page'
        }
      },
      {
        path: 'left-sidebar',
        component: BlogLeftsideComponent,
        data: {
          title: 'Left Sidebar | Tovo Landing Page'
        }
      },
      {
        path: 'right-sidebar',
        component: BlogRightsideComponent,
        data: {
          title: 'Right Sidebar | Tovo Landing Page'
        }
      },
      {
        path: 'details-left-sidebar',
        component: BlogDetailsLeftsideComponent,
        data: {
          title: 'Detail Left Sidebar | Tovo Landing Page'
        }
      },
      {
        path: 'details-right-sidebar',
        component: BlogDetailsRightsideComponent,
        data: {
          title: 'Detail Right Sidebar | Tovo Landing Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
