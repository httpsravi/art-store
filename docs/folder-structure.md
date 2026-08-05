# Folder Structure

The repository follows a clean, production-ready structure mapped strictly to the domain of the application. The Git root corresponds directly to the project root.

```text
art-store/
├── .git/
├── database/             # Supabase / SQL schema definitions
│   ├── archive/          # Archived or obsolete migrations
│   ├── function/         # Custom database functions
│   ├── migration/        # Schema migrations
│   ├── policy/           # Row Level Security (RLS) policies
│   ├── schema/           # Core table definitions
│   ├── seed/             # Seed data scripts
│   ├── storage/          # Storage bucket policies
│   ├── trigger/          # Database triggers
│   └── view/             # SQL views
├── docs/                 # Documentation (architecture, structure, development)
├── public/               # Static assets served at the root URL (favicon, etc)
├── src/                  # Application source code
│   ├── assets/           # Internal assets (images, fonts)
│   ├── components/       # Shared UI elements
│   │   ├── common/       # Reusable components (e.g., ArtworkCard, ImageSlider, Scene3D)
│   │   └── layout/       # Structural components (Navbar, Footer)
│   ├── constants/        # Application-wide constants and fallback data
│   ├── features/         # Encapsulated domains
│   │   ├── admin/        # Admin portal and manager components
│   │   │   └── components/ # Admin-specific UI elements (e.g., AdminField)
│   │   └── gallery/      # Gallery-specific subcomponents
│   │       └── components/ # 3D subcomponents (LightingSetup, FloatingObjects)
│   ├── lib/              # Third-party integrations (Supabase client config)
│   ├── routes/           # TanStack Start file-based routing
│   ├── services/         # Data access and API communication layers
│   ├── styles/           # Global Tailwind CSS files
│   ├── types/            # TypeScript interfaces (e.g., Artwork, Medium)
│   ├── server.ts         # Server-side entry point for TanStack Start
│   └── start.ts          # Client-side entry point
├── tests/                # Test suites
├── .env.example          # Environment variable template
├── .gitignore            # Git exclusion rules
├── eslint.config.js      # Linting rules
├── package.json          # Node dependencies and npm scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

### Key Organizational Principles

- **No Placeholders:** Directories like `hooks/`, `contexts/`, or `utils/` are only created if absolutely necessary. We do not keep empty scaffolds.
- **Domain-Driven Grouping:** Complex components belonging to a specific domain (like the Admin portal or the 3D Gallery) are encapsulated within `src/features/` rather than bloating the generic `src/components/` directory.
- **Unified Package Management:** The repository relies strictly on `npm` and `package-lock.json`.
