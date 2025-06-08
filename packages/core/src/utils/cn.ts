// packages/core/src/utils/cn.ts
/// Zero-dependency class name utility (replaces clsx + tailwind-merge)
/// @fileoverview Simple class name concatenation without external dependencies

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassArray
  | ClassObject;

export interface ClassArray extends Array<ClassValue> {}
export interface ClassObject
  extends Record<string, boolean | undefined | null> {}

/**
 * Simple class name concatenation utility
 * Replaces clsx functionality without external dependencies
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

/**
 * Component variant utility (replaces class-variance-authority)
 * Pure TypeScript implementation for generating component class names
 */
export interface VariantConfig<T extends Record<string, Record<string, any>>> {
  base?: string;
  variants?: T;
  compoundVariants?: Array<
    Partial<{
      [K in keyof T]: keyof T[K] | boolean;
    }> & {
      class: string;
    }
  >;
  defaultVariants?: {
    [K in keyof T]?: keyof T[K] | boolean;
  };
}

export type VariantProps<T> = T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : never;

export function cva<T extends Record<string, Record<string, any>>>(
  base: string,
  config?: VariantConfig<T>,
) {
  type Props = {
    [K in keyof T]?: keyof T[K] | boolean | undefined;
  } & {
    className?: string | undefined;
  };

  const variantFunction = (props: Props = {}) => {
    const classes: string[] = [];

    // Add base classes
    if (base) classes.push(base);

    if (!config) {
      if (props.className) classes.push(props.className);
      return cn(...classes);
    }

    // Apply default variants first, but only for defined values
    const resolvedProps: Record<string, any> = {};

    // Apply defaults
    if (config.defaultVariants) {
      Object.entries(config.defaultVariants).forEach(([key, value]) => {
        if (value !== undefined) {
          resolvedProps[key] = value;
        }
      });
    }

    // Apply provided props (override defaults)
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined && key !== "className") {
        resolvedProps[key] = value;
      }
    });

    // Add variant classes
    if (config.variants) {
      for (const [variantKey, variantValue] of Object.entries(resolvedProps)) {
        const variantMap = config.variants[variantKey];
        if (
          variantMap &&
          variantValue !== undefined &&
          variantValue !== false
        ) {
          // Handle boolean values
          const valueKey =
            typeof variantValue === "boolean"
              ? variantValue.toString()
              : (variantValue as string);

          if (variantMap[valueKey]) {
            classes.push(variantMap[valueKey]);
          }
        }
      }
    }

    // Add compound variant classes
    if (config.compoundVariants) {
      for (const compoundVariant of config.compoundVariants) {
        const { class: compoundClass, ...conditions } = compoundVariant;

        const matches = Object.entries(conditions).every(([key, value]) => {
          const resolvedValue = resolvedProps[key];
          // Handle boolean comparisons
          if (
            typeof value === "boolean" &&
            typeof resolvedValue === "boolean"
          ) {
            return resolvedValue === value;
          }
          return resolvedValue === value;
        });

        if (matches) {
          classes.push(compoundClass);
        }
      }
    }

    // Add custom className
    if (props.className) classes.push(props.className);

    return cn(...classes);
  };

  return variantFunction;
}

/**
 * Simple responsive value utility
 */
export function responsiveValue<T>(
  value: T | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", T>>,
): T | Partial<Record<string, T>> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Partial<Record<string, T>>;
  }
  return value as T;
}

/**
 * CSS custom property utility
 */
export function cssVar(name: string, fallback?: string): string {
  return fallback ? `var(--${name}, ${fallback})` : `var(--${name})`;
}

/**
 * Data attribute utility
 */
export function dataAttr(condition: boolean | undefined): true | undefined {
  return condition ? true : undefined;
}

/**
 * ARIA attribute utility
 */
export function ariaAttr(condition: boolean | undefined): boolean | undefined {
  return condition;
}
