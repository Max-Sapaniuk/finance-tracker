'use client';

import { TriangleAlertIcon } from 'lucide-react';

import { PlatformId } from '@/entities/connections/model/platform';
import {
  getPlatform,
  PLATFORMS,
} from '@/features/connect-platform/model/registry';
import { PlatformIdentity } from '@/features/connect-platform/ui/platform-identity';
import { RadioGroup, RadioGroupCard } from '@/shared/components/ui/radio-group';

interface ChoosePlatformStepProps {
  value: PlatformId | null;
  connectedIds: PlatformId[];
  onChange: (platformId: PlatformId) => void;
}

export function ChoosePlatformStep({
  value,
  connectedIds,
  onChange,
}: ChoosePlatformStepProps) {
  const selectedIsConnected = value !== null && connectedIds.includes(value);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Pick a platform to connect. Everything is read-only — Finance Tracker
        can never trade or move funds.
      </p>

      <RadioGroup
        aria-label="Platform"
        value={value}
        onValueChange={(platformId) => onChange(platformId as PlatformId)}
        className="grid gap-3 sm:grid-cols-2"
      >
        {PLATFORMS.map((platform) => (
          <RadioGroupCard
            key={platform.id}
            value={platform.id}
            disabled={!platform.available}
            size="sm"
          >
            <PlatformIdentity
              platform={platform}
              connected={connectedIds.includes(platform.id)}
            />
          </RadioGroupCard>
        ))}
      </RadioGroup>

      <div role="status" aria-live="polite">
        {selectedIsConnected && (
          <div className="flex items-start gap-2.5 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" />
            <p>
              {getPlatform(value).name} is already connected. Continuing
              replaces the existing connection and its saved key.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
