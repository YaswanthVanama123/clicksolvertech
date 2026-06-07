/**
 * Combine class names, dropping any falsy values. Lightweight alternative to
 * `clsx` — no dependency, ~10 lines, handles strings/undefined/false/null.
 *
 *   cn('btn', isActive && 'btn-active', error ? 'text-rose' : null)
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
