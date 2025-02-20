import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [checker({ typescript: true }), tsconfigPaths(), react(), svgr()],
  server: {
    open: true,
    host: '0.0.0.0',
  },
  envPrefix: 'APP_',
});
