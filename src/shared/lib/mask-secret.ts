const MASK = '•'.repeat(8);

/** Renders a secret as dots plus its last 4 characters. */
export function maskSecret(value: string | undefined): string {
  if (!value) return MASK;
  return `${MASK}${value.slice(-4)}`;
}
