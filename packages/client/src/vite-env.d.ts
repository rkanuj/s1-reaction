/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
/// <reference types="vite-plugin-monkey/global" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_S1_APP_API_URL: string;
  readonly VITE_S1_STATIC_IMAGE_URL: string;
  readonly VITE_SKIP_S1: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
