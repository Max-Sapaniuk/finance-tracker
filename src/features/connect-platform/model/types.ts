import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import type { z } from 'zod';

import type {
  PlatformCredentials,
  PlatformId,
  StorageLocation,
} from '@/entities/connections/model/platform';

export type { PlatformCredentials, StorageLocation };

/** One input rendered by the credentials step. */
export interface CredentialFieldDef {
  /** Key this value takes in the credentials record. */
  name: string;
  label: string;
  /** Defaults to `password` — credentials are secrets unless stated otherwise. */
  type?: 'text' | 'password';
  placeholder?: string;
  /** Hint shown under the input while it has no error. */
  description?: string;
}

export interface ReviewRow {
  label: string;
  value: ReactNode;
}

/**
 * Everything the wizard needs to know about a platform. Adding a platform means
 * adding one of these to the registry — no wizard code changes.
 */
export interface PlatformDefinition {
  id: PlatformId;
  name: string;
  /** Secondary line on the platform card, e.g. `Bank · Multi-currency`. */
  category: string;
  icon: StaticImageData;
  /** `false` renders the card disabled and unselectable. */
  available: boolean;
  fields: CredentialFieldDef[];
  schema: z.ZodType<PlatformCredentials, PlatformCredentials>;
  /** Platform-specific help shown in the credentials step. */
  instructions?: ReactNode;
  /** Storage locations this platform offers, in display order. */
  storageLocations: StorageLocation[];
  /** Extra rows appended to the review step, e.g. a masked token. */
  reviewRows?: (credentials: PlatformCredentials) => ReviewRow[];
}
