import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	css: {
		scss: {
			api: "modern-compiler",
		},
	},
	resolve: {
		alias: {
			"~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
		},
	},
	plugins: [react()],
});
