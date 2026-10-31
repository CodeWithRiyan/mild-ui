// packages/react/src/components/Card/Card.tsx
import * as React from "react";
import type {
  CardCoreProps,
  CardPadding,
  PolymorphicComponent,
  PolymorphicProps,
} from "../../types";
import { cn } from "../../utils";

const CardContext = React.createContext<{ padding: CardPadding }>({ padding: "md" });

export interface CardOwnProps extends CardCoreProps {
  children?: React.ReactNode;
  className?: string;
}

/** Props of `<Card as={T}>`. */
export type CardProps<T extends React.ElementType = "div"> = PolymorphicProps<T, CardOwnProps>;

function CardInner<T extends React.ElementType = "div">(
  {
    as,
    variant = "default",
    padding = "md",
    interactive = false,
    disabled = false,
    className,
    children,
    ...rest
  }: CardProps<T>,
  // Typed loosely here; the public signature (PolymorphicComponent) narrows it per `as`.
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "div";
  const context = React.useMemo(() => ({ padding }), [padding]);
  return (
    <CardContext.Provider value={context}>
      <Component
        ref={ref}
        className={cn(
          "mild-card",
          `mild-card--${variant}`,
          interactive && "mild-card--interactive",
          disabled && "mild-card--disabled",
          className,
        )}
        data-disabled={disabled ? "" : undefined}
        {...rest}
      >
        {children}
      </Component>
    </CardContext.Provider>
  );
}

/**
 * Surface grouping related content. Compose with `CardHeader` (+ `CardTitle`,
 * `CardDescription`), `CardBody`, `CardFooter` and `CardMedia`. Renders a `div`, or the element
 * given with `as` (`article`, `section`, `a`, ...).
 */
export const Card = React.forwardRef(CardInner) as PolymorphicComponent<"div", CardOwnProps>;
Card.displayName = "Card";

interface PartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Overrides the card's padding for this part. */
  padding?: CardPadding;
  children?: React.ReactNode;
}

function paddingClass(block: string, padding: CardPadding | undefined, fallback: CardPadding) {
  const resolved = padding ?? fallback;
  return resolved !== "md" && `${block}--padding-${resolved}`;
}

export interface CardHeaderProps extends PartProps {
  /** Drop the divider under the header. */
  noBorder?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ padding, noBorder = false, className, ...rest }, ref) => {
    const card = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          "mild-card-header",
          paddingClass("mild-card-header", padding, card.padding),
          noBorder && "mild-card-header--no-border",
          className,
        )}
        {...rest}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

export interface CardTitleOwnProps {
  size?: "sm" | "md" | "lg" | "2xl";
  children?: React.ReactNode;
  className?: string;
}

export type CardTitleProps<T extends React.ElementType = "h3"> = PolymorphicProps<
  T,
  CardTitleOwnProps
>;

function CardTitleInner<T extends React.ElementType = "h3">(
  { as, size = "md", className, children, ...rest }: CardTitleProps<T>,
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? "h3";
  return (
    <Component
      ref={ref}
      className={cn("mild-card-title", size !== "md" && `mild-card-title--${size}`, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** The card's heading (an `h3` by default; pick the level with `as`). */
export const CardTitle = React.forwardRef(CardTitleInner) as PolymorphicComponent<
  "h3",
  CardTitleOwnProps
>;
CardTitle.displayName = "CardTitle";

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...rest }, ref) => (
    <p ref={ref} className={cn("mild-card-description", className)} {...rest} />
  ),
);
CardDescription.displayName = "CardDescription";

export type CardBodyProps = PartProps;

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ padding, className, ...rest }, ref) => {
    const card = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          "mild-card-content",
          paddingClass("mild-card-content", padding, card.padding),
          className,
        )}
        {...rest}
      />
    );
  },
);
CardBody.displayName = "CardBody";

export interface CardFooterProps extends PartProps {
  /** Horizontal alignment of the actions. */
  align?: "start" | "center" | "end" | "between";
  noBorder?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ padding, align, noBorder = false, className, ...rest }, ref) => {
    const card = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          "mild-card-footer",
          paddingClass("mild-card-footer", padding, card.padding),
          align && `mild-card-footer--${align}`,
          noBorder && "mild-card-footer--no-border",
          className,
        )}
        {...rest}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export interface CardMediaProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Round the corners that touch the card's edge. */
  position?: "top" | "bottom";
  fit?: "cover" | "contain";
}

/** A full-width image at the top (or bottom) of the card. */
export const CardMedia = React.forwardRef<HTMLImageElement, CardMediaProps>(
  ({ position = "top", fit = "cover", alt = "", className, ...rest }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn(
        "mild-card-media",
        `mild-card-media--rounded-${position}`,
        `mild-card-media--${fit}`,
        className,
      )}
      {...rest}
    />
  ),
);
CardMedia.displayName = "CardMedia";
