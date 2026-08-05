# Architecture

The Art Store application follows a modern React architecture powered by **Vite** and **TanStack Start**. It is designed to be lightweight, fast, and scalable, prioritizing a pristine separation of concerns and a zero-bloat philosophy.

## Tech Stack

- **Framework:** React 19 + TanStack Start
- **Build Tool:** Vite
- **Routing:** TanStack Router (File-based SSR routing)
- **Styling:** Tailwind CSS v4 (No component libraries, pure CSS)
- **3D Rendering:** Three.js + React Three Fiber + React Three Drei
- **Database / Auth:** Supabase (Cloud) with a LocalStorage fallback for offline/demo capabilities
- **Validation:** Zod
- **Language:** TypeScript (Strict mode)

## Design Principles

1. **No Magic:** We avoid heavy abstraction layers and generic UI component libraries (e.g. Shadcn/UI, Material UI). Everything is built cleanly using semantic HTML and Tailwind CSS utilities.
2. **Domain-Driven Organization:** The codebase avoids "junk drawer" folders. Components and logic are split into specific feature domains (e.g., `src/features/admin/`, `src/features/gallery/`).
3. **Resilient Data Fetching:** The services layer (`src/services/`) acts as a repository pattern. It attempts to fetch from Supabase first, but falls back gracefully to `localStorage` and local placeholders if the cloud backend is unavailable or not configured.
4. **Database as Code:** The SQL infrastructure is defined strictly within the repository (in the `database/` folder) ensuring structural integrity and security through Row Level Security (RLS) policies.

## Component Hierarchy

- **`routes/`**: Page-level components defining the URL structure.
- **`features/`**: Complex domains containing highly-specific UI subcomponents. For example, the 3D logic is decomposed into `LightingSetup.tsx` and `FloatingObjects.tsx` within `features/gallery/`, preventing monolithic files.
- **`components/common/`**: Reusable generic UI entities (e.g., the unified `ArtworkCard`, `ImageSlider`).
- **`components/layout/`**: Structural shell components (`Navbar`, `Footer`).

## State Management

State is managed at the feature level using standard React hooks (`useState`, `useEffect`). Global state is intentionally minimal, relying securely on the data caching mechanisms provided by `localStorage`, the TanStack Router parameters, and the Supabase network layer.
