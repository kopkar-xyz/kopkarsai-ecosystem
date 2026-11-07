/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KOPKARSAI_SYSTEM_URL?: string;
  readonly VITE_KOPKARSAI_MARKETPLACE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
