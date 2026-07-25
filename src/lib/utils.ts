type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Lightweight classnames combinator — merges truthy class strings, skips falsy values. */
export function cx(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cx(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}

/** Formats a number as a Bangladeshi Taka price string, e.g. 1250 -> "৳1,250" */
export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}
