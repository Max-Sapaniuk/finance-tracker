import { z } from 'zod';

import { PlatformDefinition } from '@/features/connect-platform/model/types';
import CashMoney from '@/shared/assets/icons/cash-money.webp';

export const manualCsv: PlatformDefinition = {
  id: 'manual-csv',
  name: 'Manual / CSV',
  category: 'No API — file or typed',
  icon: CashMoney,
  available: false,
  fields: [],
  schema: z.object({}),
  storageLocations: ['browser'],
};
