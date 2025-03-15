import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
    plugins: [reactRouter(), tsconfigPaths()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./app"),
        },
    },
    assetsInclude: ['**/*.csv']
});