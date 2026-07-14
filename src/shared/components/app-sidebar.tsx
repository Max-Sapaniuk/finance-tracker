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
import { routes } from '@/shared/lib/routes';

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
        <NavItems items={routes.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavItems items={routes.footer} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
