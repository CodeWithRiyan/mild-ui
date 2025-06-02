// vite.config.ts
import { defineConfig } from "file:///Users/mymac/Documents/riyan-id/mild-ui/node_modules/.pnpm/vite@4.5.14_@types+node@20.17.57_terser@5.40.0/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/mymac/Documents/riyan-id/mild-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.57_rollup@4.41.1_typescript@5.8.3_vite@4.5.14_@_f8b06c6ee145e0931e8767c002bef7f5/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname =
  "/Users/mymac/Documents/riyan-id/mild-ui/packages/core";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "MildUICore",
      fileName: "index",
      // This will generate index.js
      formats: ["es", "cjs"],
      // Support both ES modules and CommonJS
    },
    rollupOptions: {
      external: ["clsx", "class-variance-authority", "tailwind-merge"],
    },
  },
  plugins: [dts()],
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbXltYWMvRG9jdW1lbnRzL3JpeWFuLWlkL21pbGQtdWkvcGFja2FnZXMvY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL215bWFjL0RvY3VtZW50cy9yaXlhbi1pZC9taWxkLXVpL3BhY2thZ2VzL2NvcmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL215bWFjL0RvY3VtZW50cy9yaXlhbi1pZC9taWxkLXVpL3BhY2thZ2VzL2NvcmUvdml0ZS5jb25maWcudHNcIjsvLyBwYWNrYWdlcy9jb3JlL3ZpdGUuY29uZmlnLnRzXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICBuYW1lOiBcIk1pbGRVSUNvcmVcIixcbiAgICAgIGZpbGVOYW1lOiBcImluZGV4XCIsIC8vIFRoaXMgd2lsbCBnZW5lcmF0ZSBpbmRleC5qc1xuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIl0sIC8vIFN1cHBvcnQgYm90aCBFUyBtb2R1bGVzIGFuZCBDb21tb25KU1xuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcImNsc3hcIiwgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIiwgXCJ0YWlsd2luZC1tZXJnZVwiXSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbZHRzKCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUh4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQTtBQUFBLE1BQ1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxRQUFRLDRCQUE0QixnQkFBZ0I7QUFBQSxJQUNqRTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDakIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
