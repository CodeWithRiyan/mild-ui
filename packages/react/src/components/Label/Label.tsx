// packages/react/src/components/Label/Label.tsx
import React, { forwardRef } from "react";
import type { LabelCoreProps } from "../../types/label";
import { labelVariants } from "../../utils/label";
import { cn } from "../../utils";

export interface LabelProps extends LabelCoreProps, React.LabelHTMLAttributes<HTMLLabelElement> {}

/** Elements a `<label for>` names and activates by itself (HTML "labelable elements"). */
const LABELABLE = ["BUTTON", "INPUT", "METER", "OUTPUT", "PROGRESS", "SELECT", "TEXTAREA"];
/** Custom controls a label click should activate, as it would a native checkbox/radio. */
const ACTIVATED_BY_LABEL = ["checkbox", "radio", "switch"];

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    { required = false, error = false, ui, children, htmlFor, className, onClick, ...rest },
    ref,
  ) => {
    const classes = labelVariants({
      required,
      error,
      className,
    });

    /**
     * Clicking a label focuses its control. Browsers do this for native controls; custom
     * controls (`span[role="checkbox"]`, ...) are not labelable, so they are focused (and, for
     * checkbox-like roles, activated) here. A handler that already did this - e.g. the field
     * primitive behind <FormField> - prevents default first, so it is never done twice.
     */
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || !htmlFor) return;

      const control = event.currentTarget.ownerDocument.getElementById(htmlFor);
      if (!control || control.contains(event.target as Node)) return;

      if (LABELABLE.includes(control.tagName)) {
        // The browser activates it; only make sure it also receives focus.
        control.focus();
        return;
      }

      event.preventDefault();
      control.focus();
      if (ACTIVATED_BY_LABEL.includes(control.getAttribute("role") ?? "")) control.click();
    };

    return (
      // A label is natively clickable (it activates its control); the handler only extends that
      // native behaviour to custom controls, so no keyboard listener is needed.
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <label ref={ref} className={classes} htmlFor={htmlFor} onClick={handleClick} {...rest}>
        {children}
        {required && (
          // Decorative: the control's own `required`/`aria-required` is what gets announced,
          // so the marker is hidden from assistive tech to avoid "required" being read twice.
          <span
            className={cn("mild-label__marker", ui?.asterisk)}
            aria-hidden="true"
            data-required-marker=""
          >
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = "Label";
