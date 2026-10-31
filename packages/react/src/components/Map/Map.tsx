// packages/react/src/components/Map/Map.tsx
import * as React from "react";
import type { MapCoreProps } from "../../types";
import { cn, openStreetMapEmbedUrl, openStreetMapUrl } from "../../utils";
import { toCssAspectRatio } from "../AspectRatio";
import { Link } from "../Link";

export interface MapProps extends MapCoreProps, Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Text of the link under the map. Default `"View larger map"`. */
  linkLabel?: React.ReactNode;
  /** Caption text next to the link. */
  caption?: React.ReactNode;
  /** Shown inside the frame instead of the embed (no network, consent not given, ...). */
  fallback?: React.ReactNode;
  /** Extra `<iframe>` attributes. */
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
}

/**
 * An embedded map: an OpenStreetMap iframe (no API key, no script) in a fixed-ratio frame,
 * named by `title` and followed by a link to the full map. Pass `src` to embed another
 * provider, or `fallback` to render something else in the frame (a static picture, a consent
 * prompt) without loading the embed.
 */
export const Map = React.forwardRef<HTMLElement, MapProps>(
  (
    {
      latitude,
      longitude,
      zoom = 13,
      title,
      provider = "openstreetmap",
      src,
      marker = true,
      ratio = "16/9",
      lazy = true,
      showLink = true,
      linkLabel = "View larger map",
      caption,
      fallback,
      iframeProps,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const location = { latitude, longitude, zoom, marker };
    const embedSrc =
      src ?? (provider === "openstreetmap" ? openStreetMapEmbedUrl(location) : undefined);
    const href = openStreetMapUrl(location);

    return (
      <figure
        ref={ref}
        className={cn("mild-map", className)}
        data-provider={src ? "custom" : provider}
        style={{ "--mild-map-ratio": toCssAspectRatio(ratio), ...style } as React.CSSProperties}
        {...rest}
      >
        <div className="mild-map__frame">
          {fallback !== undefined && fallback !== null ? (
            <div className="mild-map__fallback" role="img" aria-label={title}>
              {fallback}
            </div>
          ) : (
            <iframe
              title={title}
              src={embedSrc}
              loading={lazy ? "lazy" : undefined}
              referrerPolicy="no-referrer-when-downgrade"
              {...iframeProps}
              className={cn("mild-map__iframe", iframeProps?.className)}
            />
          )}
        </div>
        {(showLink || caption) && (
          <figcaption className="mild-map__caption">
            <span>{caption}</span>
            {showLink && (
              <Link href={href} external>
                {linkLabel}
              </Link>
            )}
          </figcaption>
        )}
      </figure>
    );
  },
);
Map.displayName = "Map";
