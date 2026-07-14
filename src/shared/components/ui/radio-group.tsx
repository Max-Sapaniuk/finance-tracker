'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { Item } from '@/shared/components/ui/item';
import { cn } from '@/shared/lib/utils';

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('grid w-full gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

/**
 * A whole `Item` card acting as the radio control. Compose it with the `Item*`
 * slots; pass `showIndicator` when the card should also show a radio dot.
 */
function RadioGroupCard({
  className,
  showIndicator = false,
  size = 'default',
  children,
  ...props
}: RadioPrimitive.Root.Props & {
  showIndicator?: boolean;
  size?: 'default' | 'sm' | 'xs';
}) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-card"
      // The card renders as a real <button>, so Base UI must not re-add the
      // attributes and handlers it applies to non-native buttons.
      nativeButton
      render={
        <Item variant="outline" size={size} render={<button type="button" />} />
      }
      className={cn(
        'items-start text-left outline-none transition-colors hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:border-primary data-checked:bg-primary/5 data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {showIndicator ? (
        <span
          aria-hidden
          className="relative mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-input group-data-[checked]/item:border-primary group-data-[checked]/item:bg-primary"
        >
          <RadioPrimitive.Indicator className="flex items-center justify-center">
            <span className="size-2 rounded-full bg-primary-foreground" />
          </RadioPrimitive.Indicator>
        </span>
      ) : null}
      {children}
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupCard };
