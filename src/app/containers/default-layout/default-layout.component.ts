import { Component } from '@angular/core';

import { navItems, navItemsAdmin, navItemsCoordinator } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public navItemsAdmin = navItemsAdmin;
  public navItemsCoordinator = navItemsCoordinator;

  public user_type = localStorage.getItem('user_type');
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() { }
}
