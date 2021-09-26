import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
   build: {
      target: 'esnext',
      // minify: false,
      lib: {
         entry: resolve(__dirname, 'src/index.ts'),
         name: 'Vue-ON',
         formats: ['es', 'umd']
      },
      rollupOptions: {
         external: ['@vue/runtime-dom', 'nanoid']
      }
   }
});
