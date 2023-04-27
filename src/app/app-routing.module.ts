import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AccountsComponent } from './views/accounts/accounts.component';
import { ProfileComponent } from './views/profile/profile.component';
import { CapstoneTitleComponent } from './views/capstone-title/capstone-title.component';
import { AdviserPanelManagementComponent } from './views/adviser-panel-management/adviser-panel-management.component';
import { ReportComponent } from './views/report/report.component';
import { ContentManagementComponent } from './views/content-management/content-management.component';
import { AddEntryComponent } from './views/capstone-title/add-entry/add-entry.component';
import { ViewEntryComponent } from './views/capstone-title/view-entry/view-entry.component';
import { AddMembersComponent } from './views/profile/add-members/add-members.component';
import { ViewTitleComponent } from './views/capstone-title/view-title/view-title.component';
import { EvaluateTitleComponent } from './views/capstone-title/evaluate-title/evaluate-title.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent,
      },
      {
        path: 'accounts',
        title: 'Accounts',
        component: AccountsComponent,
      },
      {
        path: 'capstone-titles',
        title: 'Capstone Titles',
        component: CapstoneTitleComponent,
      },
      {
        path: 'panel-adviser',
        title: 'Panels & Adviser',
        component: AdviserPanelManagementComponent,
      },
      {
        path: 'report',
        title: 'Reports',
        component: ReportComponent,
      },
      {
        path: 'content-management',
        title: 'Content Management',
        component: ContentManagementComponent
      },
      {
        path: 'add-entry/:titleData',
        title: 'Add entry',
        component: AddEntryComponent
      },
      {
        path: 'view-entry/:titleData',
        title: 'View entry',
        component: ViewEntryComponent
      },
      {
        path: 'add-member/:currentMember',
        title: 'Add entry',
        component: AddMembersComponent
      },
      {
        path: 'view-title/:data/:index',
        title: 'View entry',
        component: ViewTitleComponent
      },
      {
        path: 'evaluate-title/:id',
        title: 'View entry',
        component: EvaluateTitleComponent
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
