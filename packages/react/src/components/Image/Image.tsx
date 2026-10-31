"use client";

// packages/react/src/components/Image/Image.tsx
import * as React from "react";
import type { ImageCoreProps } from "../../types";
import { cn } from "../../utils";
import { toCssAspectRatio } from "../AspectRatio";
import { ImageIcon } from "../icons";

export interface ImageProps
  extends ImageCoreProps, Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  /** Rendered instead of the image when it fails (and `fallbackSrc` is not given). */
  fallback?: React.ReactNode;
  /** Also show the fallback (the placeholder) until the image has loaded. */
  showFallbackWhileLoading?: boolean;
  /** Class of the frame around the image (rendered when a ratio or a fallback is in play). */
  frameClassName?: string;
}

type LoadState = "loading" | "loaded" | "error";

/**
 * `<img>` that loads lazily by default and degrades gracefully: on error it swaps to
 * `fallbackSrc`, or renders `fallback` (a placeholder glyph by default). With `ratio` it fills a
 * fixed-ratio frame.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc,
      fallback,
      showFallbackWhileLoading = false,
      lazy = true,
      fit,
      ratio,
      radius,
      frameClassName,
      className,
      style,
      onLoad,
      onError,
      ...rest
    },
    ref,
  ) => {
    const [state, setState] = React.useState<LoadState>("loading");
    const [useFallbackSrc, setUseFallbackSrc] = React.useState(false);
    React.useEffect(() => {
      setState("loading");
      setUseFallbackSrc(false);
    }, [src]);

    const currentSrc = useFallbackSrc ? fallbackSrc : src;
    const failed = state === "error" || !currentSrc;
    const showPlaceholder = failed || (showFallbackWhileLoading && state === "loading");

    const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
      onError?.(event);
      if (!useFallbackSrc && fallbackSrc) {
        // Try the fallback picture first; only then give up and show the placeholder.
        setUseFallbackSrc(true);
        setState("loading");
        return;
      }
      setState("error");
    };

    const image = !failed && (
      <img
        ref={ref}
        src={currentSrc}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        decoding={lazy ? "async" : undefined}
        data-state={state}
        className={cn(
          "mild-image",
          fit && `mild-image--${fit}`,
          radius && !ratio && `mild-image--radius-${radius}`,
          className,
        )}
        style={
          showFallbackWhileLoading && state === "loading" ? { ...style, display: "none" } : style
        }
        onLoad={(event) => {
          setState("loaded");
          onLoad?.(event);
        }}
        onError={handleError}
        {...rest}
      />
    );

    const placeholder = showPlaceholder && (
      <div
        className="mild-image__fallback"
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        data-state={state}
      >
        {fallback ?? <ImageIcon />}
      </div>
    );

    // The frame is rendered whenever a placeholder may appear, so the <img> keeps its place in
    // the tree (moving it would remount it and load the picture twice).
    const framed = Boolean(ratio) || showFallbackWhileLoading || failed;
    if (!framed) return image || null;

    return (
      <div
        className={cn(
          "mild-image-frame",
          ratio && "mild-image-frame--ratio",
          radius && `mild-image-frame--radius-${radius}`,
          frameClassName,
        )}
        style={
          ratio
            ? ({ "--mild-image-ratio": toCssAspectRatio(ratio) } as React.CSSProperties)
            : undefined
        }
        data-state={state}
      >
        {image}
        {placeholder}
      </div>
    );
  },
);
Image.displayName = "Image";
