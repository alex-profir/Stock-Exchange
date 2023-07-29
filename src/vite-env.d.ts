/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_NASDAQ_API_KEY: string;
  VITE_NASDAQ_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
