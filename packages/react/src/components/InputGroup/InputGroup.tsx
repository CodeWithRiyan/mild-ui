// packages/react/src/components/InputGroup/InputGroup.tsx
import * as React from "react";
import type { InputGroupCoreProps, InputGroupPlacement } from "../../types";
import { cn } from "../../utils";

/** What a group hands to the input inside it. */
export interface InputGroupContextValue {
  size?: InputGroupCoreProps["size"];
  /** Field wiring (`id`, `name`, `required`) a <FormControl> put on the group, for the input. */
  id?: string;
  name?: string;
  required?: boolean;
}

const InputGroupContext = React.createContext<InputGroupContextValue>({});

/** The enclosing `InputGroup`'s defaults (`{}` outside a group). */
export function useInputGroup(): InputGroupContextValue {
  return React.useContext(InputGroupContext);
}

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: InputGroupPlacement;
  children?: React.ReactNode;
}

/** Static text (or anything) that sits outside the field and shares its border. */
export const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ placement = "left", className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn("mild-input-addon", `mild-input-addon--${placement}`, className)}
      data-placement={placement}
      {...rest}
    >
      {children}
    </div>
  ),
);
InputAddon.displayName = "InputAddon";

export type InputSideAddonProps = Omit<InputAddonProps, "placement">;

export const InputLeftAddon = React.forwardRef<HTMLDivElement, InputSideAddonProps>(
  (props, ref) => <InputAddon ref={ref} placement="left" {...props} />,
);
InputLeftAddon.displayName = "InputLeftAddon";

export const InputRightAddon = React.forwardRef<HTMLDivElement, InputSideAddonProps>(
  (props, ref) => <InputAddon ref={ref} placement="right" {...props} />,
);
InputRightAddon.displayName = "InputRightAddon";

export interface InputElementProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: InputGroupPlacement;
  /**
   * The element receives pointer events (a button, a clear icon). By default it is decorative
   * and clicks fall through to the field.
   */
  interactive?: boolean;
  children?: React.ReactNode;
}

/** An icon or button overlaid inside the field; the field gets padding to make room. */
export const InputElement = React.forwardRef<HTMLDivElement, InputElementProps>(
  ({ placement = "left", interactive = false, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mild-input-element",
        `mild-input-element--${placement}`,
        interactive && "mild-input-element--interactive",
        className,
      )}
      data-placement={placement}
      {...rest}
    >
      {children}
    </div>
  ),
);
InputElement.displayName = "InputElement";

export type InputSideElementProps = Omit<InputElementProps, "placement">;

export const InputLeftElement = React.forwardRef<HTMLDivElement, InputSideElementProps>(
  (props, ref) => <InputElement ref={ref} placement="left" {...props} />,
);
InputLeftElement.displayName = "InputLeftElement";

export const InputRightElement = React.forwardRef<HTMLDivElement, InputSideElementProps>(
  (props, ref) => <InputElement ref={ref} placement="right" {...props} />,
);
InputRightElement.displayName = "InputRightElement";

export interface InputGroupProps
  extends InputGroupCoreProps, Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  children?: React.ReactNode;
  /** Goes to the input inside (so the group can be the child of a <FormField>). */
  id?: string;
  /** Goes to the input inside. */
  name?: string;
  /** Goes to the input inside. */
  required?: boolean;
}

interface Sides {
  leftAddon: boolean;
  rightAddon: boolean;
  leftElement: boolean;
  rightElement: boolean;
}

/** Which sides carry an addon / element, read from the direct children. */
function detectSides(children: React.ReactNode): Sides {
  const sides: Sides = {
    leftAddon: false,
    rightAddon: false,
    leftElement: false,
    rightElement: false,
  };
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const placement = (child.props as { placement?: InputGroupPlacement }).placement;
    const side = (explicit?: InputGroupPlacement) => explicit ?? placement ?? "left";
    switch (child.type) {
      case InputLeftAddon:
        sides.leftAddon = true;
        break;
      case InputRightAddon:
        sides.rightAddon = true;
        break;
      case InputAddon:
        sides[side() === "left" ? "leftAddon" : "rightAddon"] = true;
        break;
      case InputLeftElement:
        sides.leftElement = true;
        break;
      case InputRightElement:
        sides.rightElement = true;
        break;
      case InputElement:
        sides[side() === "left" ? "leftElement" : "rightElement"] = true;
        break;
      default:
        break;
    }
  });
  return sides;
}

/**
 * Wraps an `Input` with addons (`InputLeftAddon` / `InputRightAddon`: flush blocks outside the
 * field, e.g. "https://") and elements (`InputLeftElement` / `InputRightElement`: icons or
 * buttons inside it). The group shares its `size` with the input and makes room for the parts.
 * Inside a `FormField` the field wiring (`id`, `name`, `required`) passes through to the input.
 */
export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ size = "md", inline = false, id, name, required, className, children, ...rest }, ref) => {
    const sides = detectSides(children);
    const context = React.useMemo(() => ({ size, id, name, required }), [size, id, name, required]);
    const classes = cn(
      "mild-input-group",
      `mild-input-group--${size}`,
      inline && "mild-input-group--inline",
      sides.leftAddon && "mild-input-group--has-left-addon",
      sides.rightAddon && "mild-input-group--has-right-addon",
      sides.leftElement && "mild-input-group--has-left-element",
      sides.rightElement && "mild-input-group--has-right-element",
      className,
    );

    return (
      <InputGroupContext.Provider value={context}>
        <div ref={ref} className={classes} {...rest}>
          {children}
        </div>
      </InputGroupContext.Provider>
    );
  },
);
InputGroup.displayName = "InputGroup";
