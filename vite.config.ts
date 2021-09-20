import path from "path";

import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import ssr from "vite-plugin-ssr/plugin";
import reactJsx from "vite-react-jsx";

// This config is used ONLY for the production build
// dev server uses its own config in server/index.ts

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh(), reactJsx(), VitePWA(), ssr()],
    resolve: { alias: [{ find: "@", replacement: path.join(__dirname, "./src") }] },
});
