// packages/core/src/components/Card/Card.types.ts
export interface CardCoreProps {
  className?: string;
}

export interface CardStyleProps {
  variant?: CardVariant;
  padding?: CardPadding;
  shadow?: CardShadow;
}

export type CardVariant = "default" | "outlined" | "elevated" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardShadow = "none" | "sm" | "md" | "lg";

// Header props
export interface CardHeaderCoreProps {
  className?: string;
}

// Content props
export interface CardContentCoreProps {
  className?: string;
}

// Footer props
export interface CardFooterCoreProps {
  className?: string;
}
