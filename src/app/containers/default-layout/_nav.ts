import { INavData } from '@coreui/angular';

export const navItemsAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Accounts',
    url: '/accounts',
    iconComponent: { name: 'cil-user-follow' }
  },
  {
    name: 'Capstone Titles',
    url: '/capstone-titles',
    iconComponent: { name: 'cil-align-left' }
  },
  {
    name: 'Panels and Adviser',
    url: '/panel-adviser',
    iconComponent: { name: 'cil-grain' }
  },
  {
    name: 'Reports',
    url: '/report',
    iconComponent: { name: 'cil-chart' }
  },
  {
    name: 'Content management',
    url: '/content-management',
    iconComponent: { name: 'cil-cog' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands'
      }
    ]
  },
];

export const navItemsCoordinator: INavData[] = [
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Accounts',
    url: '/accounts',
    iconComponent: { name: 'cil-user-follow' }
  },
  {
    name: 'Capstone Titles',
    url: '/capstone-titles',
    iconComponent: { name: 'cil-align-left' },
  },
  {
    name: 'Content management',
    url: '/content-management',
    iconComponent: { name: 'cil-cog' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands'
      }
    ]
  },
];

export const navItems: INavData[] = [
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Capstone Titles',
    url: '/capstone-titles',
    iconComponent: { name: 'cil-align-left' },
  },
  {
    name: 'Content management',
    url: '/content-management',
    iconComponent: { name: 'cil-cog' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands'
      }
    ]
  },
];
