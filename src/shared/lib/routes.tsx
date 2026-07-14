import {
  ArrowLeftRightIcon,
  BriefcaseBusinessIcon,
  LandmarkIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from 'lucide-react';

interface NavItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface SidebarData {
  main: NavItem[];
  footer: NavItem[];
}

export const routes: SidebarData = {
  main: [
    {
      title: 'Dashboard',
      url: '/',
      icon: <LayoutDashboardIcon />,
    },
    {
      title: 'Portfolio',
      url: '/portfolio',
      icon: <BriefcaseBusinessIcon />,
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: <ArrowLeftRightIcon />,
    },
    {
      title: 'Platforms',
      url: '/platforms',
      icon: <LandmarkIcon />,
      isActive: true,
      items: [
        {
          title: 'Monobank',
          url: '/platforms/monobank',
        },
        {
          title: 'Binance',
          url: '/platforms/binance',
        },
        {
          title: 'Freedom24',
          url: '/platforms/freedom24',
        },
      ],
    },
  ],
  footer: [
    {
      title: 'Settings',
      url: '/settings',
      icon: <SettingsIcon />,
    },
  ],
};
