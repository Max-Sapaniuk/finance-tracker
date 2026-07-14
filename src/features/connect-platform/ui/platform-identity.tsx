import { PlatformDefinition } from '@/features/connect-platform/model/types';
import { Badge } from '@/shared/components/ui/badge';
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/shared/components/ui/item';
import Image from 'next/image';

/**
 * Logo badge + name + category. Renders `Item` slots, so it must live inside an
 * `Item` (or a component rendering one, like `RadioGroupCard`).
 */
export function PlatformIdentity({
  platform,
  connected = false,
}: {
  platform: PlatformDefinition;
  connected?: boolean;
}) {
  return (
    <>
      <ItemMedia className="size-10 justify-center rounded-md text-sm font-medium text-foreground">
        <Image
          src={platform.icon}
          alt={platform.name}
          className="rounded-full size-10 object-cover"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{platform.name}</ItemTitle>
        <ItemDescription>{platform.category}</ItemDescription>
      </ItemContent>

      {connected && (
        <ItemActions>
          <Badge>Connected</Badge>
        </ItemActions>
      )}
    </>
  );
}
