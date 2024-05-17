import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { defineConfig, loadEnv } from 'vite';
import monkey from 'vite-plugin-monkey';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const skipS1 = !!env.VITE_SKIP_S1;
  const dev = mode !== 'production';

  return {
    plugins: [
      svelte({
        preprocess: [
          sveltePreprocess(),
        ],
        compilerOptions: {
          dev,
        },
      }),
      monkey({
        entry: 'src/main.ts',
        userscript: {
          name: 'S1 Reaction 帖子回应服务',
          namespace: 'https://github.com/rkanuj/s1-reaction',
          version: dev ? 'Latest' : version,
          author: 'rkanuj',
          description: '用麻将脸回应泥潭吧！',
          license: 'MIT',
          icon: 'https://bbs.saraba1st.com/favicon.ico',
          match: dev && skipS1 ? [
            env.VITE_API_URL,
          ] : [
            'https://*.saraba1st.com/2b/thread-*',
            'https://*.saraba1st.com/2b/forum.php?*tid=*',
            'https://*.saraba1st.com/2b/space-*',
            'https://*.stage1st.com/2b/thread-*',
            'https://*.stage1st.com/2b/forum.php?*tid=*',
            'https://*.stage1st.com/2b/space-*',
          ],
        },
        build: {
          fileName: 's1-reaction.user.js',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
