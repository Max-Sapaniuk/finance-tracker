import { StorageLocation } from '@/entities/connections/model/platform';

export interface StorageOption {
  value: StorageLocation;
  title: string;
  description: string;
  available: boolean;
}

/**
 * Copy is deliberately literal: keys go into plain `localStorage` today, so we
 * do not claim any encryption. Tighten the wording only when it becomes true.
 */
export const STORAGE_OPTIONS: StorageOption[] = [
  {
    value: 'browser',
    title: 'This browser only',
    description: 'Kept in this browser. It never touches our servers.',
    available: true,
  },
  {
    value: 'cloud',
    title: 'Encrypted cloud',
    description:
      'End-to-end encrypted with your passphrase. Sync from any device.',
    available: false,
  },
];

export const DEFAULT_STORAGE_LOCATION: StorageLocation = 'browser';

export function getStorageOption(value: StorageLocation): StorageOption {
  const option = STORAGE_OPTIONS.find((candidate) => candidate.value === value);
  if (!option) {
    throw new Error(`Unknown storage location: ${value}`);
  }
  return option;
}
