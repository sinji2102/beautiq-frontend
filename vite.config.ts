import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ plugins: [["@swc/plugin-emotion", {}]] }),
    svgr({
      svgrOptions: {
        icon: true,
        memo: true,
      },
    }),
    tsconfigPaths(),
    mkcert(),
  ],
  server: {
    host: "localhost",
    port: 5173,
  },
});
