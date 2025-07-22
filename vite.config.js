import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],

    server: {
        host: true, // <- allow external access
        port: 5173, // <- default Vite port
        strictPort: true,
        hmr: {
            host: "192.168.50.51",
        },
    },
});
