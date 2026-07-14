'use client';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/shared/components/ui/stepper';
import { useConnectionsStore } from '@/entities/connections/model/connections-store';
import { PlatformId } from '@/entities/connections/model/platform';

import { WIZARD_STEPS, useConnectWizard } from '../model/use-connect-wizard';
import { ChoosePlatformStep } from './steps/choose-platform-step';
import { CREDENTIALS_FORM_ID, CredentialsStep } from './steps/credentials-step';
import { ReviewStep } from './steps/review-step';

/**
 * Body of the connect dialog. Mounted only while the dialog is open, so every
 * value it collects — including the token — dies with the dialog.
 */
export function ConnectPlatformWizard({
  onConnected,
}: {
  onConnected: () => void;
}) {
  const { state, platform, dispatch } = useConnectWizard();
  const addConnection = useConnectionsStore((store) => store.addConnection);
  const connections = useConnectionsStore((store) => store.connections);

  const connectedIds = Object.keys(connections) as PlatformId[];
  // Connecting an already-connected platform overwrites its entry, so the
  // wizard says "Reconnect" rather than implying a second connection.
  const isReconnect = platform ? platform.id in connections : false;

  function handleConnect() {
    if (!platform) return;

    addConnection({
      platformId: platform.id,
      credentials: state.credentials,
      storage: state.storage,
      connectedAt: Date.now(),
    });
    onConnected();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Connect a platform</DialogTitle>
      </DialogHeader>

      <Stepper
        value={state.step}
        role="group"
        aria-label="Connect a platform"
        aria-orientation={undefined}
        indicators={{ completed: <CheckIcon className="size-3.5" /> }}
        className="flex flex-col gap-6"
      >
        <StepperNav>
          {WIZARD_STEPS.map(({ step, title }, index) => (
            <StepperItem
              key={step}
              step={step}
              className="relative flex-1 items-start"
            >
              {/*
                `asChild` renders a span instead of a button: step headers are
                labels, not controls. Navigation is the footer's job only.
              */}
              <StepperTrigger
                asChild
                className="flex flex-col items-center gap-2.5"
              >
                <StepperIndicator>{step}</StepperIndicator>
                <StepperTitle>{title}</StepperTitle>
              </StepperTrigger>

              {index < WIZARD_STEPS.length - 1 && (
                <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[state=completed]/step:bg-primary group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="rounded-lg border bg-card/40 p-4 text-sm">
          <StepperContent value={1}>
            <ChoosePlatformStep
              value={state.platformId}
              connectedIds={connectedIds}
              onChange={(platformId) =>
                dispatch({ type: 'selectPlatform', platformId })
              }
            />
          </StepperContent>

          <StepperContent value={2}>
            {platform && (
              <CredentialsStep
                platform={platform}
                credentials={state.credentials}
                storage={state.storage}
                onStorageChange={(storage) =>
                  dispatch({ type: 'setStorage', storage })
                }
                onChangePlatform={() => dispatch({ type: 'changePlatform' })}
                onSubmit={(credentials) =>
                  dispatch({ type: 'submitCredentials', credentials })
                }
              />
            )}
          </StepperContent>

          <StepperContent value={3}>
            {platform && (
              <ReviewStep
                platform={platform}
                credentials={state.credentials}
                storage={state.storage}
              />
            )}
          </StepperContent>
        </StepperPanel>
      </Stepper>

      <DialogFooter>
        {state.step === 1 ? (
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch({ type: 'back' })}
          >
            <ArrowLeftIcon /> Back
          </Button>
        )}

        {state.step === 1 && (
          <Button
            type="button"
            disabled={!state.platformId}
            onClick={() => dispatch({ type: 'confirmPlatform' })}
          >
            Continue <ArrowRightIcon />
          </Button>
        )}

        {state.step === 2 && (
          <Button type="submit" form={CREDENTIALS_FORM_ID}>
            Continue <ArrowRightIcon />
          </Button>
        )}

        {state.step === 3 && platform && (
          <Button type="button" onClick={handleConnect}>
            {isReconnect ? 'Reconnect' : 'Connect'} {platform.name}{' '}
            <ArrowRightIcon />
          </Button>
        )}
      </DialogFooter>
    </>
  );
}
