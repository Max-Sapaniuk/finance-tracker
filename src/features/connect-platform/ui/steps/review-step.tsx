import { getStorageOption } from '../../model/storage-options';
import type {
  PlatformCredentials,
  PlatformDefinition,
  ReviewRow,
  StorageLocation,
} from '../../model/types';

interface ReviewStepProps {
  platform: PlatformDefinition;
  credentials: PlatformCredentials;
  storage: StorageLocation;
}

export function ReviewStep({
  platform,
  credentials,
  storage,
}: ReviewStepProps) {
  const rows: ReviewRow[] = [
    { label: 'Platform', value: platform.name },
    { label: 'Access scope', value: 'Read-only' },
    { label: 'Key storage', value: getStorageOption(storage).title },
    ...(platform.reviewRows?.(credentials) ?? []),
    { label: 'First sync', value: 'Immediately after connect' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading text-base font-medium">Review & connect</h3>

      <dl className="divide-y divide-border rounded-md border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-xs text-muted-foreground">
        Your key is saved in this browser only — it never touches our servers,
        and it is not encrypted, so treat this device as you would your bank
        app. You can revoke the key at any time from your {platform.name}{' '}
        account.
      </p>
    </div>
  );
}
