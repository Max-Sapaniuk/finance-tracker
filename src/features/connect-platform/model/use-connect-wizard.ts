'use client';

import { useReducer } from 'react';

import { getPlatform } from './registry';
import { DEFAULT_STORAGE_LOCATION } from './storage-options';
import {
  PlatformCredentials,
  PlatformId,
  StorageLocation,
} from '@/entities/connections/model/platform';
import { PlatformDefinition } from '@/features/connect-platform/model/types';

export const WIZARD_STEPS = [
  { step: 1, title: 'Choose platform' },
  { step: 2, title: 'Credentials & storage' },
  { step: 3, title: 'Review' },
] as const;

export type WizardStep = 1 | 2 | 3;

interface WizardState {
  step: WizardStep;
  platformId: PlatformId | null;
  credentials: PlatformCredentials;
  storage: StorageLocation;
}

export type WizardAction =
  | { type: 'selectPlatform'; platformId: PlatformId }
  | { type: 'confirmPlatform' }
  | { type: 'changePlatform' }
  | { type: 'setStorage'; storage: StorageLocation }
  | { type: 'submitCredentials'; credentials: PlatformCredentials }
  | { type: 'back' };

const INITIAL_STATE: WizardState = {
  step: 1,
  platformId: null,
  credentials: {},
  storage: DEFAULT_STORAGE_LOCATION,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'selectPlatform': {
      if (state.platformId === action.platformId) return state;
      // A different platform asks for different credentials — drop the old ones
      // rather than carrying a stale token into the next step.
      const platform = getPlatform(action.platformId);

      return {
        ...state,
        platformId: action.platformId,
        credentials: {},
        storage: platform.storageLocations.includes(state.storage)
          ? state.storage
          : (platform.storageLocations[0] ?? DEFAULT_STORAGE_LOCATION),
      };
    }
    case 'confirmPlatform':
      return state.platformId ? { ...state, step: 2 } : state;
    case 'changePlatform':
      return { ...state, step: 1 };
    case 'setStorage':
      return { ...state, storage: action.storage };
    case 'submitCredentials':
      return { ...state, credentials: action.credentials, step: 3 };
    case 'back':
      return state.step === 1
        ? state
        : { ...state, step: (state.step - 1) as WizardStep };
  }
}

export interface ConnectWizard {
  state: WizardState;
  /** Resolved definition for the selected platform, `null` before step 1 is answered. */
  platform: PlatformDefinition | null;
  dispatch: (action: WizardAction) => void;
}

/**
 * Owns every value the wizard collects. `StepperContent` unmounts inactive
 * panels, so no step may hold state that has to survive navigation.
 */
export function useConnectWizard(): ConnectWizard {
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_STATE);
  const platform = state.platformId ? getPlatform(state.platformId) : null;

  return { state, platform, dispatch };
}
