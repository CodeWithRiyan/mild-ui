// packages/vue/src/types/data-display.ts
// Data display component types: Card, Badge, Tag, Avatar, AvatarGroup, Image, Stat, Map.
import type { Size } from "./common";
import type { AspectRatioValue } from "./aspect-ratio";
import type { SpaceToken } from "./tokens";

// Card
export type CardVariant = "default" | "outlined" | "elevated" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
  variant?: CardVariant;
  /** Padding of the parts (header, body, footer). Default `"md"`. */
  padding?: CardPadding;
  /** Hover/active affordance for clickable cards. */
  interactive?: boolean;
  disabled?: boolean;
}

export interface CardPartProps {
  /** Overrides the card's padding for this part. */
  padding?: CardPadding;
}

export interface CardHeaderProps extends CardPartProps {
  /** Drop the divider under the header. */
  noBorder?: boolean;
}

export interface CardTitleProps {
  /** Element to render. Defaults to `h3`. */
  as?: string;
  size?: "sm" | "md" | "lg" | "2xl";
}

export interface CardFooterProps extends CardPartProps {
  /** Horizontal alignment of the actions. */
  align?: "start" | "center" | "end" | "between";
  noBorder?: boolean;
}

export interface CardMediaProps {
  src?: string;
  alt?: string;
  /** Round the corners that touch the card's edge. */
  position?: "top" | "bottom";
  fit?: "cover" | "contain";
}

// Badge / Tag
export type BadgeVariant = "subtle" | "solid" | "outline";
export type BadgeColorScheme = "gray" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = Exclude<Size, "xs" | "xl">;

export interface BadgeProps {
  /** Element to render. Defaults to `span`. */
  as?: string;
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  /** Fully rounded. */
  pill?: boolean;
  /** Leading status dot. */
  dot?: boolean;
}

export interface TagProps {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  pill?: boolean;
  disabled?: boolean;
  /** Shows a close button; `close` is emitted when it is pressed. */
  closable?: boolean;
  /** Accessible name of the close button. Default `"Remove"`. */
  closeLabel?: string;
}

export interface TagCloseButtonProps {
  disabled?: boolean;
  /** Accessible name. Default `"Remove"`. */
  label?: string;
}

// Avatar
export type AvatarSize = Size | "2xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  /** Picture URL. Falls back to the initials (or an icon) while loading or on error. */
  src?: string;
  /** Full name: the accessible name of the picture and the source of the initials. */
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Presence dot in the corner. */
  status?: AvatarStatus;
  /** Ring around the avatar (set by `AvatarGroup`). */
  bordered?: boolean;
  /** Replaces the initials when there is no picture; defaults to the initials, else a person icon. */
  fallback?: string;
}

export interface AvatarGroupProps {
  /** Avatars shown; the rest become a "+N" overflow. */
  max?: number;
  /** Size handed to the avatars inside. */
  size?: AvatarSize;
  /** Overlap between avatars (spacing token). Default `"3"`. */
  overlap?: SpaceToken;
  /** Accessible name of the overflow avatar. Default `"N more"`. */
  overflowLabel?: (count: number) => string;
}

// Image
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ImageProps {
  src?: string;
  /** Alternative text; `""` for decorative images. */
  alt: string;
  /** Shown instead of the image when it fails to load. */
  fallbackSrc?: string;
  /** Defer loading until the image is near the viewport. Default `true`. */
  lazy?: boolean;
  fit?: ImageFit;
  /** Fixed width/height ratio; the image fills the box. */
  ratio?: AspectRatioValue;
  radius?: ImageRadius;
  /** Also show the fallback (the placeholder) until the image has loaded. */
  showFallbackWhileLoading?: boolean;
  /** Class of the frame around the image (rendered when a ratio or a fallback is in play). */
  frameClass?: string;
}

// Stat
export type StatSize = Exclude<Size, "xs" | "xl">;
export type StatTrend = "increase" | "decrease";

export interface StatProps {
  label?: string;
  value?: string | number;
  helpText?: string;
  /** Direction of the change, shown as an arrow and announced in words. */
  trend?: StatTrend;
  /** The change itself, e.g. "12%". */
  trendValue?: string;
  size?: StatSize;
}

// Map
export type MapProvider = "openstreetmap";

export interface MapProps {
  latitude: number;
  longitude: number;
  /** Tile zoom level (1-19). Default `13`. */
  zoom?: number;
  /** Accessible name of the embedded map. */
  title: string;
  /** Embed provider. Default `"openstreetmap"`. */
  provider?: MapProvider;
  /** A complete embed URL, overriding the provider. */
  src?: string;
  /** Drop a marker at the coordinates. Default `true`. */
  marker?: boolean;
  /** Frame ratio. Default `"16/9"`. */
  ratio?: AspectRatioValue;
  /** Defer loading the embed until it is near the viewport. Default `true`. */
  lazy?: boolean;
  /** Link to the full map under the frame. Default `true`. */
  showLink?: boolean;
  /** Text of the link under the map. Default `"View larger map"`. */
  linkLabel?: string;
  /** Caption text next to the link; the `caption` slot takes rich content. */
  caption?: string;
  /** Shown inside the frame instead of the embed; the `fallback` slot takes rich content. */
  fallback?: string;
  /** Extra `<iframe>` attributes. */
  iframeProps?: Record<string, unknown>;
}
