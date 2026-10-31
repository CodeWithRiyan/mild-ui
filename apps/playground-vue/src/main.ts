// apps/playground-vue/src/main.ts
import { createApp } from "vue";
import Root from "./Root.vue";
import "./styles.scss";

const container = document.getElementById("app");
if (!container) throw new Error("#app is missing from index.html");

createApp(Root).mount(container);
