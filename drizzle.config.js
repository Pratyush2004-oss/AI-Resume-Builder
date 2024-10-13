import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './config/schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: import.meta.env.VITE_PUBLIC_DATABASE_URL_CONFIG,
    }
})