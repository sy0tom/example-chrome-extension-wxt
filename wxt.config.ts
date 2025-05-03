import tailwindcss from "@tailwindcss/vite";
import { defineConfig, WxtViteConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {},
  vite: (): WxtViteConfig | Promise<WxtViteConfig> => ({
    plugins: [tailwindcss()],
  }),
});
