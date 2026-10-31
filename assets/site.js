// site/assets/site.js
// Dark-mode toggle for the landing page. Uses the same storage key and <html> attributes as
// ThemeProvider in @mild-ui/react and @mild-ui/vue, so a visitor's choice carries over to the
// Storybooks' Theme toolbar and any app using the library on this origin.
(function () {
  var STORAGE_KEY = "mild-ui-color-mode";
  var root = document.documentElement;

  function apply(mode) {
    var resolved =
      mode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;
    root.setAttribute("data-theme", resolved);
    root.setAttribute("data-color-mode", mode);
    root.style.colorScheme = resolved;
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-pressed", resolved === "dark" ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        resolved === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }

  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (error) {
        /* private mode: the choice lasts for this page only */
      }
      apply(next);
    });
    apply(root.getAttribute("data-color-mode") || "system");
  }

  // Follow the OS while the visitor has not chosen a mode.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (root.getAttribute("data-color-mode") === "system") apply("system");
  });

  // The preview switch is static markup; let it toggle so the card feels alive.
  var previewSwitch = document.querySelector("[data-preview-switch]");
  if (previewSwitch) {
    var flip = function () {
      var on = previewSwitch.getAttribute("aria-checked") !== "true";
      previewSwitch.setAttribute("aria-checked", on ? "true" : "false");
      previewSwitch.setAttribute("data-state", on ? "checked" : "unchecked");
      var thumb = previewSwitch.firstElementChild;
      if (thumb) thumb.setAttribute("data-state", on ? "checked" : "unchecked");
    };
    previewSwitch.addEventListener("click", flip);
    previewSwitch.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        flip();
      }
    });
  }

  var date = document.querySelector("[data-build-date]");
  if (date && document.documentElement.dataset.buildDate) {
    date.textContent = "on " + document.documentElement.dataset.buildDate;
  }
})();
