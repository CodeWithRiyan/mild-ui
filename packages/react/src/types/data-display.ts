// Data display component types: Card, Badge, Tag, Avatar, AvatarGroup, Image, Stat, Map.
import type { Size } from "./common";
import type { AspectRatioValue } from "./aspect-ratio";
import type { SpaceToken } from "./tokens";

// Card
export type CardVariant = "default" | "outlined" | "elevated" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardCoreProps {
  variant?: CardVariant;
  /** Padding of the parts (header, body, footer). Default `"md"`. */
  padding?: CardPadding;
  /** Hover/active affordance for clickable cards. */
  interactive?: boolean;
  disabled?: boolean;
}

// Badge / Tag
export type BadgeVariant = "subtle" | "solid" | "outline";
export type BadgeColorScheme = "gray" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = Exclude<Size, "xs" | "xl">;

export interface BadgeCoreProps {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  /** Fully rounded. */
  pill?: boolean;
  /** Leading status dot. */
  dot?: boolean;
}

export interface TagCoreProps {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  pill?: boolean;
  disabled?: boolean;
}

// Avatar
export type AvatarSize = Size | "2xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarCoreProps {
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
}

export interface AvatarGroupCoreProps {
  /** Avatars shown; the rest become a "+N" overflow. */
  max?: number;
  /** Size handed to the avatars inside. */
  size?: AvatarSize;
  /** Overlap between avatars (spacing token). Default `"3"`. */
  overlap?: SpaceToken;
}

// Image
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface ImageCoreProps {
  src?: string;
  /** Alternative text; `""` for decorative images. */
  alt: string;
  /** Shown instead of the image when it fails to load (or while it loads, with `showFallbackWhileLoading`). */
  fallbackSrc?: string;
  /** Defer loading until the image is near the viewport. Default `true`. */
  lazy?: boolean;
  fit?: ImageFit;
  /** Fixed width/height ratio; the image fills the box. */
  ratio?: AspectRatioValue;
  radius?: ImageRadius;
}

// Stat
export type StatSize = Exclude<Size, "xs" | "xl">;
export type StatTrend = "increase" | "decrease";

export interface StatCoreProps {
  label: React.ReactNode;
  value: React.ReactNode;
  helpText?: React.ReactNode;
  /** Direction of the change, shown as an arrow and announced in words. */
  trend?: StatTrend;
  /** The change itself, e.g. "12%". */
  trendValue?: React.ReactNode;
  size?: StatSize;
}

// Map
export type MapProvider = "openstreetmap";

export interface MapCoreProps {
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
}
