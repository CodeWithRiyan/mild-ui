// Runtime theming: the accent comes from a URL parameter (or the color picker) and is written to
// the document as a CSS custom property. Nothing is compiled; the prebuilt stylesheet reads the
// tokens live.
import "@mild-ui/core/css";
import "./demo.css";

const ACCENT = "--mild-color-accent";
const root = document.documentElement;
const picker = document.querySelector<HTMLInputElement>("#accent-picker")!;
const readout = document.querySelector<HTMLElement>("#accent-value")!;

function applyAccent(color: string | null): void {
  if (color) {
    root.style.setProperty(ACCENT, color);
    // Hover and active normally use darker shades of the brand color; derive them here so a
    // single runtime parameter re-themes every state.
    root.style.setProperty(`${ACCENT}-hover`, `color-mix(in srgb, ${color} 85%, black)`);
    root.style.setProperty(`${ACCENT}-active`, `color-mix(in srgb, ${color} 70%, black)`);
    root.style.setProperty(`${ACCENT}-soft`, `color-mix(in srgb, ${color} 50%, white)`);
    root.style.setProperty(`${ACCENT}-subtle`, `color-mix(in srgb, ${color} 10%, white)`);
    root.style.setProperty(`${ACCENT}-muted`, `color-mix(in srgb, ${color} 20%, white)`);
  } else {
    for (const suffix of ["", "-hover", "-active", "-soft", "-subtle", "-muted"]) {
      root.style.removeProperty(`${ACCENT}${suffix}`);
    }
  }
  const resolved = getComputedStyle(root).getPropertyValue(ACCENT).trim();
  readout.textContent = `${ACCENT}: ${resolved}`;
  if (color) picker.value = color;
}

// 1. Runtime parameter: ?accent=%23e11d48
applyAccent(new URLSearchParams(location.search).get("accent"));

// 2. Live changes from the picker.
picker.addEventListener("input", () => applyAccent(picker.value));
