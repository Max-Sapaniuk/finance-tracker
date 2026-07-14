import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type {
  PlatformCredentials,
  PlatformId,
  StorageLocation,
} from '@/entities/connections/model/platform';

export const CONNECTIONS_STORAGE_KEY = 'finance-tracker:connections';

export interface PlatformConnection {
  platformId: PlatformId;
  credentials: PlatformCredentials;
  storage: StorageLocation;
  connectedAt: number;
}

interface ConnectionsState {
  connections: Partial<Record<PlatformId, PlatformConnection>>;
  addConnection: (connection: PlatformConnection) => void;
  removeConnection: (platformId: PlatformId) => void;
}

export const useConnectionsStore = create<ConnectionsState>()(
  persist(
    (set) => ({
      connections: {},
      addConnection: (connection) =>
        set((state) => ({
          connections: {
            ...state.connections,
            [connection.platformId]: connection,
          },
        })),
      removeConnection: (platformId) =>
        set((state) => {
          const connections = { ...state.connections };
          delete connections[platformId];
          return { connections };
        }),
    }),
    {
      name: CONNECTIONS_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Credentials are stored in plain localStorage. Only connections that
      // opted into browser storage may be written — a future `cloud` location
      // must go through its own encrypted path, never this one.
      partialize: (state) => ({
        connections: Object.fromEntries(
          Object.entries(state.connections).filter(
            ([, connection]) => connection?.storage === 'browser',
          ),
        ) as ConnectionsState['connections'],
      }),
    },
  ),
);
