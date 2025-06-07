// packages/core/scripts/watch-sass.js
const chokidar = require("chokidar");
const { spawn } = require("child_process");
const path = require("path");

console.log("🔍 Starting SASS watcher...");

// Watch for changes in SASS files
const watcher = chokidar.watch("src/sass/**/*.scss", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

let buildTimeout;

function buildSass() {
  // Debounce builds to avoid multiple rapid builds
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    console.log("🔄 SASS files changed, rebuilding...");

    const buildProcess = spawn("node", ["scripts/build-sass.js"], {
      stdio: "inherit",
    });

    buildProcess.on("close", (code) => {
      if (code === 0) {
        console.log("✅ SASS rebuild completed");
      } else {
        console.log("❌ SASS rebuild failed");
      }
    });
  }, 300);
}

watcher
  .on("add", (path) => {
    console.log(`📁 File ${path} has been added`);
    buildSass();
  })
  .on("change", (path) => {
    console.log(`📝 File ${path} has been changed`);
    buildSass();
  })
  .on("unlink", (path) => {
    console.log(`🗑️ File ${path} has been removed`);
    buildSass();
  })
  .on("error", (error) => {
    console.error("❌ Watcher error:", error);
  });

console.log("👀 Watching for changes in src/sass/**/*.scss");
console.log("💡 Press Ctrl+C to stop watching");
