import { z } from 'zod';

import { PlatformDefinition } from '@/features/connect-platform/model/types';

import InzhurIcon from '@/shared/assets/icons/inzur.webp';

export const inzhur: PlatformDefinition = {
  id: 'inzhur',
  name: 'Inzhur',
  category: 'Fund · Real estate',
  icon: InzhurIcon,
  available: false,
  fields: [],
  schema: z.object({}),
  storageLocations: ['browser'],
};
