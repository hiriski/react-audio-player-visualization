import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  base: '/',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  assetsInclude: ['**/*.glb']
})
