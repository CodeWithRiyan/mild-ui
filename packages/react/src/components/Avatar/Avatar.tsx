"use client";

// packages/react/src/components/Avatar/Avatar.tsx
import * as React from "react";
import type { AvatarCoreProps, AvatarGroupCoreProps, AvatarSize } from "../../types";
import { cn, getInitials, getSpacingValue } from "../../utils";
import { UserIcon } from "../icons";

interface AvatarGroupContextValue {
  size?: AvatarSize;
}

const AvatarGroupContext = React.createContext<AvatarGroupContextValue>({});

export interface AvatarProps extends AvatarCoreProps, React.HTMLAttributes<HTMLSpanElement> {
  /** Replaces the initials when there is no picture; defaults to the initials, else a person icon. */
  fallback?: React.ReactNode;
  /** Extra `<img>` attributes (`srcSet`, `loading`, ...). */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

type LoadState = "idle" | "loaded" | "error";

/**
 * A person's picture, or their initials while it loads / when it fails. The `name` is the
 * picture's alternative text; without a picture the initials are decorative and the name is
 * exposed through `aria-label`.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      name,
      size: sizeProp,
      shape = "circle",
      status,
      bordered = false,
      fallback,
      imgProps,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const group = React.useContext(AvatarGroupContext);
    const size = sizeProp ?? group.size ?? "md";
    const [state, setState] = React.useState<LoadState>("idle");
    // A new source starts over.
    React.useEffect(() => setState("idle"), [src]);

    const showImage = Boolean(src) && state !== "error";
    const initials = getInitials(name);

    return (
      <span
        ref={ref}
        role={showImage ? undefined : "img"}
        aria-label={showImage ? undefined : name}
        className={cn(
          "mild-avatar",
          `mild-avatar--${size}`,
          `mild-avatar--${shape}`,
          bordered && "mild-avatar--bordered",
          className,
        )}
        data-state={showImage ? state : "fallback"}
        {...rest}
      >
        {showImage ? (
          <img
            alt={name ?? ""}
            {...imgProps}
            src={src}
            className={cn("mild-avatar__image", imgProps?.className)}
            onLoad={(event) => {
              setState("loaded");
              imgProps?.onLoad?.(event);
            }}
            onError={(event) => {
              setState("error");
              imgProps?.onError?.(event);
            }}
          />
        ) : (
          <span className="mild-avatar__fallback" aria-hidden="true">
            {fallback ?? (initials || <UserIcon />)}
          </span>
        )}
        {children}
        {status && (
          <span
            className={cn("mild-avatar__badge", `mild-avatar__badge--${status}`)}
            role="img"
            aria-label={status}
          />
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps
  extends AvatarGroupCoreProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Accessible name of the overflow avatar. Default `"N more"`. */
  overflowLabel?: (count: number) => string;
}

/**
 * Overlapping avatars. Beyond `max`, the remaining ones are replaced by a "+N" avatar. The
 * group hands its `size` to the avatars inside.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      max,
      size,
      overlap = "3",
      overflowLabel = (count) => `${count} more`,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const all = React.Children.toArray(children).filter(React.isValidElement);
    const limit = max !== undefined && max >= 0 ? max : all.length;
    const shown = all.slice(0, limit);
    const hidden = all.length - shown.length;
    const context = React.useMemo(() => ({ size }), [size]);

    return (
      <AvatarGroupContext.Provider value={context}>
        <div
          ref={ref}
          role="group"
          className={cn("mild-avatar-group", className)}
          style={
            {
              "--mild-avatar-group-overlap": getSpacingValue(overlap),
              ...style,
            } as React.CSSProperties
          }
          {...rest}
        >
          {shown}
          {hidden > 0 && (
            <Avatar
              className="mild-avatar-group__overflow"
              name={overflowLabel(hidden)}
              fallback={`+${hidden}`}
              size={size}
              data-overflow=""
            />
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
