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
      middleware: [
        (req, res, next) => {
          const path = req.url.split('/')[1];
  
          // Redirect to /{folder}/index.html
          const redirectTo = `/home/index.html`;
          res.writeHead(302, { Location: redirectTo });
          if (path && path !== '' && path !== 'index.html') {
            const redirectTo = `/${path}/index.html`;
            res.writeHead(302, { Location: redirectTo });
            res.end();
          } else {
            next();
          }
        },
      ],
    },
  });