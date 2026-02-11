import { resolve } from 'path';
  import { defineConfig } from 'vite';
  
  export default defineConfig({
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          home: resolve(__dirname, 'home/index.html'),
          page3: resolve(__dirname, 'page3/index.html'),
          teamreg: resolve(__dirname, 'teamreg/index.html'),
        },
      },
    },
    server: {
      port: 5173,
    },
  });