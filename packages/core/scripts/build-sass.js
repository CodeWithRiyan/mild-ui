const sass = require("sass");
const fs = require("fs").promises;
const path = require("path");

async function buildSass() {
  try {
    console.log("🎨 Building SASS files...");

    // Ensure dist directories exist
    await fs.mkdir("dist", { recursive: true });
    await fs.mkdir("dist/themes", { recursive: true });

    // Compile main CSS
    const mainResult = sass.compile("src/sass/index.scss", {
      style: "expanded",
      sourceMap: true,
      loadPaths: ["src/sass"],
    });

    await fs.writeFile("dist/mild-ui.css", mainResult.css);
    console.log("✅ Built main CSS");

    // Compile minified CSS
    const minResult = sass.compile("src/sass/index.scss", {
      style: "compressed",
      loadPaths: ["src/sass"],
    });

    await fs.writeFile("dist/mild-ui.min.css", minResult.css);
    console.log("✅ Built minified CSS");

    // Compile utilities-only CSS
    const utilsResult = sass.compile("src/sass/mild-utilities.scss", {
      style: "expanded",
      sourceMap: true,
      loadPaths: ["src/sass"],
    });

    await fs.writeFile("dist/mild-utilities.css", utilsResult.css);
    console.log("✅ Built utilities-only CSS");

    // Compile minified utilities CSS
    const utilsMinResult = sass.compile("src/sass/mild-utilities.scss", {
      style: "compressed",
      loadPaths: ["src/sass"],
    });

    await fs.writeFile("dist/mild-utilities.min.css", utilsMinResult.css);
    console.log("✅ Built minified utilities-only CSS");

    // Compile theme CSS files
    const themes = ["light", "dark"];

    for (const theme of themes) {
      const themeResult = sass.compile(`src/sass/themes/${theme}.scss`, {
        style: "compressed",
        loadPaths: ["src/sass"],
      });

      await fs.writeFile(`dist/themes/${theme}.css`, themeResult.css);
      console.log(`✅ Built ${theme} theme`);
    }

    // Generate design tokens JSON
    await generateTokensJSON();

    console.log("🎉 SASS build completed successfully!");
  } catch (error) {
    console.error("❌ SASS build failed:", error);
    process.exit(1);
  }
}

async function generateTokensJSON() {
  // This would extract design tokens from SASS and create a JSON file
  // For now, we'll create a basic structure
  const tokens = {
    colors: {
      primary: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
    spacing: {
      0: "0px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    borderRadius: {
      none: "0px",
      sm: "0.125rem",
      base: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },
  };

  await fs.writeFile("dist/tokens.json", JSON.stringify(tokens, null, 2));
  console.log("✅ Generated design tokens JSON");
}

buildSass();
