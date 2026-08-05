# Art Store

A modern, meticulously optimized, and highly-scalable online gallery and portfolio for artists, built with React, TanStack Start, Vite, and Tailwind CSS.

## Features

- **3D Canvas Gallery:** A lightweight, interactive 3D environment orchestrating Three.js and React Three Fiber.
- **Admin Studio:** A secure backend portal for cataloging artwork data, images, and managing incoming client inquiries.
- **Offline Resilience:** Gracefully degrades to a `localStorage` schema fallback if the Supabase cloud backend is unavailable or unconfigured, meaning zero downtime for viewers.
- **Zero-Bloat Architecture:** No pre-packaged UI frameworks. Designed purely with raw Tailwind CSS v4 and bespoke React 19 abstractions.

## Documentation

- [Architecture & Design](docs/architecture.md)
- [Folder Structure](docs/folder-structure.md)
- [Development & Deployment Guide](docs/development.md)

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to view the gallery.
