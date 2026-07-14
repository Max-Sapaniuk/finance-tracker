/**
 * Platform primitives live in `entities` because both the connect-platform
 * feature and the persisted connections store need them, and neither may be
 * imported from the other.
 */

export type PlatformId = 'monobank' | 'freedom24' | 'inzhur' | 'manual-csv';

/** Where a platform's credentials are kept. */
export type StorageLocation = 'browser' | 'cloud';

/** Field name -> value, shaped by each platform's credential fields. */
export type PlatformCredentials = Record<string, string>;
