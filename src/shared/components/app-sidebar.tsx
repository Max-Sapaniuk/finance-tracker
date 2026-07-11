'use client';

import * as React from 'react';

import { NavItems } from '@/shared/components/nav-items';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import Logo from '@/shared/assets/images/logo.png';
import Icon from '@/shared/assets/images/icon.png';
import Image from 'next/image';
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

// This is sample data.
const data: SidebarData = {
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();
  const state = sidebar.state;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {state === 'expanded' ? (
          <Image src={Logo} alt="Logo" width={200} loading="eager" />
        ) : (
          <Image src={Icon} alt="Icon" width={31} loading="eager" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavItems items={data.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavItems items={data.footer} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
