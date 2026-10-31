// packages/vue/src/utils/avatar.ts
// Avatar utility functions.

/** "Ada Lovelace" -> "AL", "Plato" -> "P", "" -> "". At most two letters: first and last name. */
export function getInitials(name: string | undefined): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  // Every part is a non-empty string after the filter, so each one has a first character.
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
