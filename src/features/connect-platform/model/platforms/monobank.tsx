import { maskSecret } from '@/shared/lib/mask-secret';
import { PlatformDefinition } from '@/features/connect-platform/model/types';
import { z } from 'zod';
import MonobankIcon from '@/shared/assets/icons/monobank.webp';

export const monobank: PlatformDefinition = {
  id: 'monobank',
  name: 'Monobank',
  category: 'Bank · Multi-currency',
  icon: MonobankIcon,
  available: true,
  fields: [
    {
      name: 'token',
      label: 'Token',
      type: 'password',
      placeholder: 'Paste your personal API token',
    },
  ],
  schema: z.object({
    token: z.string().trim().min(1, 'Token is required'),
  }),
  instructions: (
    // TODO: replace with the real step-by-step for issuing a Monobank token.
    <>
      <strong className="font-medium text-foreground">
        Read-only token required.
      </strong>{' '}
      Monobank personal tokens can only read your accounts and statements — they
      can never move money. Detailed instructions for issuing one are coming
      soon.
    </>
  ),
  storageLocations: ['browser', 'cloud'],
  reviewRows: (credentials) => [
    { label: 'Token', value: maskSecret(credentials.token) },
  ],
};
