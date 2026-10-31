// packages/react/src/utils/button.css.test.ts
// Guards the contract between the class names React emits and the selectors the core
// stylesheet paints. A mismatch here is what made the primary button render transparent.
import { resolve } from "node:path";
import { compile } from "sass";
import { describe, expect, it } from "vitest";
import { getButtonProps } from "./button";

const css = compile(resolve(__dirname, "../../../core/src/sass/components/_button.scss"), {
  style: "compressed",
}).css;

/** Declarations of the first rule whose selector is exactly the given class combination. */
function declarationsFor(classes: string[]): string | undefined {
  const selector = classes.map((cls) => `.${cls}`).join("");
  const rule = css.split("}").find((chunk) => chunk.trimStart().startsWith(`${selector}{`));
  return rule?.slice(rule.indexOf("{") + 1);
}

/** The style + color classes out of a class string, the only ones the variant rules key on. */
function styleAndColor(className: string): string[] {
  const styles = ["solid", "outline", "ghost", "link"];
  const colors = ["primary", "secondary", "success", "warning", "danger", "gray"];
  const classes = className.split(" ");
  return [
    classes.find((cls) => styles.includes(cls.replace("mild-button--", ""))) ?? "",
    classes.find((cls) => colors.includes(cls.replace("mild-button--", ""))) ?? "",
  ];
}

describe("button classes vs core stylesheet", () => {
  it.each(["primary", "secondary", "destructive"] as const)(
    "variant %s resolves to a painted solid rule",
    (variant) => {
      const [style, color] = styleAndColor(getButtonProps({ variant }).className);
      const declarations = declarationsFor([style, color]);

      expect(declarations, `${style}.${color} has no rule`).toBeDefined();
      expect(declarations).toMatch(/background-color:var\(--mild-color-/);
      expect(declarations).not.toMatch(/background-color:transparent/);
    },
  );

  it.each(["outline", "ghost", "link"] as const)(
    "variant %s resolves to a rule with a visible color",
    (variant) => {
      const [style, color] = styleAndColor(getButtonProps({ variant }).className);
      const declarations = declarationsFor([style, color]);

      expect(declarations, `${style}.${color} has no rule`).toBeDefined();
      expect(declarations).toMatch(/(^|;)color:var\(--mild-color-/);
    },
  );

  it("styles the loading state off the data-loading attribute React sets", () => {
    const props = getButtonProps({ loading: true });
    expect(props["data-loading"]).toBe("");
    expect(css).toMatch(/\.mild-button\[data-loading\]/);
    expect(css).not.toMatch(/\[data-loading="true"\]/);
  });
});
