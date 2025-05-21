import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/relatorio-sem-parar/' : '/', // 👈 Adapta para dev/prod
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { // 👈 Opcional (só para desenvolvimento)
    host: "::",
    port: 8080,
  },
}));
