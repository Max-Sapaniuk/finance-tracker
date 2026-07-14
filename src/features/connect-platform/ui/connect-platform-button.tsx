'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import { ConnectPlatformWizard } from './connect-platform-wizard';

export function ConnectPlatformButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button data-slot="dialog-trigger">
            <PlusIcon /> Connect Platform
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <ConnectPlatformWizard onConnected={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
