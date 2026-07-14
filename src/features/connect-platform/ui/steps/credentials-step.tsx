'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/shared/components/ui/item';
import { RadioGroup, RadioGroupCard } from '@/shared/components/ui/radio-group';
import { cn } from '@/shared/lib/utils';

import { STORAGE_OPTIONS } from '../../model/storage-options';
import type {
  PlatformCredentials,
  PlatformDefinition,
  StorageLocation,
} from '../../model/types';
import { PlatformIdentity } from '../platform-identity';

/** The footer's Continue button submits this form from outside it. */
export const CREDENTIALS_FORM_ID = 'connect-platform-credentials';

interface CredentialsStepProps {
  platform: PlatformDefinition;
  credentials: PlatformCredentials;
  storage: StorageLocation;
  onStorageChange: (storage: StorageLocation) => void;
  onChangePlatform: () => void;
  onSubmit: (credentials: PlatformCredentials) => void;
}

export function CredentialsStep({
  platform,
  credentials,
  storage,
  onStorageChange,
  onChangePlatform,
  onSubmit,
}: CredentialsStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlatformCredentials>({
    resolver: standardSchemaResolver(platform.schema),
    // Seeded from wizard state so Back → Continue keeps what was typed.
    defaultValues: credentials,
  });

  const storageOptions = STORAGE_OPTIONS.filter((option) =>
    platform.storageLocations.includes(option.value),
  );

  return (
    <div className="flex flex-col gap-5">
      <Item variant="muted" size="sm">
        <PlatformIdentity platform={platform} />
        <ItemActions>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={onChangePlatform}
          >
            Change
          </Button>
        </ItemActions>
      </Item>

      <form
        id={CREDENTIALS_FORM_ID}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {platform.fields.map((field) => {
          const error = errors[field.name];
          const inputId = `credential-${field.name}`;
          const messageId = `${inputId}-message`;

          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={inputId} className="text-sm font-medium">
                {field.label}
              </label>
              <Input
                id={inputId}
                type={field.type ?? 'password'}
                placeholder={field.placeholder}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={Boolean(error)}
                aria-describedby={
                  error || field.description ? messageId : undefined
                }
                {...register(field.name)}
              />
              {error ? (
                <p
                  id={messageId}
                  role="alert"
                  className="text-xs text-destructive"
                >
                  {error.message}
                </p>
              ) : (
                field.description && (
                  <p id={messageId} className="text-xs text-muted-foreground">
                    {field.description}
                  </p>
                )
              )}
            </div>
          );
        })}
      </form>

      {platform.instructions && (
        <div className="flex gap-2.5 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground">
          <span
            aria-hidden
            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
          />
          <p>{platform.instructions}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Where should this key live?</p>
        <RadioGroup
          aria-label="Key storage"
          value={storage}
          onValueChange={(value) => onStorageChange(value as StorageLocation)}
          className="grid gap-3 sm:grid-cols-2"
        >
          {storageOptions.map((option) => (
            <RadioGroupCard
              key={option.value}
              value={option.value}
              disabled={!option.available}
              size="sm"
              showIndicator
              className={cn(!option.available && 'cursor-not-allowed')}
            >
              <ItemContent>
                <ItemTitle>{option.title}</ItemTitle>
                <ItemDescription>{option.description}</ItemDescription>
              </ItemContent>
            </RadioGroupCard>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
