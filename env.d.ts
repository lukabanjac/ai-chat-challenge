/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_GROQ_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
