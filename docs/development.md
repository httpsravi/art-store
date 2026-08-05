# Development Guide

## Prerequisites

- Node.js (v18+)
- npm (Node Package Manager)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   The application requires Supabase keys to interact with the cloud backend. Copy the `.env.example` template:

   ```bash
   cp .env.example .env
   ```

   Fill in your specific keys:
   - `VITE_SUPABASE_URL`: Your Supabase project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous key.

   _Note: If `.env` is omitted or invalid, the application automatically degrades gracefully, utilizing `localStorage` to cache data locally._

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5173`.

4. **Lint and Type Check**
   Before committing, ensure your code adheres to strict formatting and type-safety rules.

   ```bash
   npm run lint        # Runs ESLint
   npm run format      # Runs Prettier
   npx tsc --noEmit    # Validates TypeScript definitions
   ```

5. **Build for Production**
   ```bash
   npm run build:dev
   ```
   _Note: This command specifically triggers the Vite build step required to parse TanStack Router bindings and compile Tailwind CSS._

## Admin Portal

The secure admin dashboard is located at `/admin`.
Authentication relies on the Supabase JWT token logic (handled within the `src/services/` layer).

## Deployment

Because the app leverages TanStack Start and SSR capabilities, building the app produces server and client artifacts.

- The `dist/` directory holds the client bundle.
- The `dist-ssr/` directory holds the server environment.

To deploy to standard Node environments or edge workers, map your hosting provider's build command to `npm run build:dev` and point the output root to the generated `dist/` folders.
