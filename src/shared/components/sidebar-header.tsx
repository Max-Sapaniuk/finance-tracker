import { ConnectPlatformButton } from '@/features/connect-platform/ui/connect-platform-button';
import { PageTitle } from '@/shared/components/page-title';
import { Separator } from '@/shared/components/ui/separator';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';

export function SidebarHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4 self-center!"
      />
      <div className="flex items-center justify-between gap-2 flex-1">
        <PageTitle />
        <ConnectPlatformButton />
      </div>
    </header>
  );
}
