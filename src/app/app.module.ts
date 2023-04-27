import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
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


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, AccountsComponent, ProfileComponent, CapstoneTitleComponent, AdviserPanelManagementComponent, ReportComponent, ContentManagementComponent, AddEntryComponent, ViewEntryComponent, AddMembersComponent, ViewTitleComponent, EvaluateTitleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    FormsModule,
    NgbDatepicker,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
