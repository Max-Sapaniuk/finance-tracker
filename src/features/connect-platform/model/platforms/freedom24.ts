import { PlatformDefinition } from '@/features/connect-platform/model/types';
import { z } from 'zod';
import Freedom24Icon from '@/shared/assets/icons/freedom24.webp';

export const freedom24: PlatformDefinition = {
  id: 'freedom24',
  name: 'Freedom24',
  category: 'Broker · Stocks, ETF',
  icon: Freedom24Icon,
  available: false,
  fields: [],
  schema: z.object({}),
  storageLocations: ['browser'],
};
