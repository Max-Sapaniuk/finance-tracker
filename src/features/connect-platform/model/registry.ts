import { PlatformId } from '@/entities/connections/model/platform';
import { freedom24 } from '@/features/connect-platform/model/platforms/freedom24';
import { inzhur } from '@/features/connect-platform/model/platforms/inzhur';
import { manualCsv } from '@/features/connect-platform/model/platforms/manual-csv';
import { monobank } from '@/features/connect-platform/model/platforms/monobank';
import { PlatformDefinition } from '@/features/connect-platform/model/types';

/** Display order of the platform cards in the first wizard step. */
export const PLATFORMS: PlatformDefinition[] = [
  monobank,
  freedom24,
  inzhur,
  manualCsv,
];

export function getPlatform(id: PlatformId): PlatformDefinition {
  const platform = PLATFORMS.find((candidate) => candidate.id === id);
  if (!platform) {
    throw new Error(`Unknown platform: ${id}`);
  }
  return platform;
}
