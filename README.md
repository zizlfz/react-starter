# React Starter

A modern React starter template built with **React 19**, **TypeScript**, **Vite**, and **Feature-Sliced Design** architecture.

## Architecture

This project follows **Feature-Sliced Design (FSD)** — a methodology for organizing frontend code.

### Layer Structure

```
src/
├── app/              # Initialization, composition root
├── pages/            # Route-level composition
├── widgets/          # Reusable smart UI blocks
├── features/         # User intentions & use-cases
├── entities/         # Domain models & core business rules
└── shared/           # Truly generic building blocks
```

### Dependency Rule

```
app → pages → widgets → features → entities → shared
       ↑        ↑          ↑           ↑
       └────────┴──────────┴───────────┘   (only downward)
```

Layers can only import from layers below them. This prevents spaghetti dependencies and enables fearless refactoring.

## Code Organization

### `entities/`
Domain models and core business rules. Keep thin and pure — no hooks, no state, no side effects.

```
entities/todo/
├── model/
│   ├── types.ts          # Domain types
│   ├── lib/              # Pure functions
│   └── api/              # API methods
└── ui/                   # Dumb view pieces
```

### `features/`
User intentions and use-cases. Each feature is a self-contained unit of business logic.

```
features/
├── todo-create/           # Create todo action
├── todo-toggle/           # Toggle todo completion
├── todo-delete/          # Delete todo action
├── todo-edit/            # Edit todo action
└── todo-reorder/         # Drag-and-drop reordering
```

### `widgets/`
Composite UI blocks that combine features into reusable components.

```
widgets/todo-item/
├── ui/
└── index.ts
```

### `pages/`
Route-level composition. Almost no logic — primarily composes widgets.

```
pages/home/
└── ui/HomePage.tsx
```

### `shared/`
Truly generic building blocks with zero business knowledge.

```
shared/
├── ui/                   # Button, Input, Checkbox, etc.
├── lib/                  # Hooks, utilities, API client
└── config/               # Environment, constants
```

### `app/`
Initialization and composition root.

```
app/
├── providers/            # Context providers
└── styles/               # Global styles & tokens
```

## Styling Architecture

Three-layer styling system:

1. **Design Tokens** (`src/app/styles/tokens.css`)
   - Colors, spacing, typography, radii, shadows, motion
   - Defined via Tailwind CSS v4 `@theme`
   - Exposed as CSS variables

2. **Component Styles** (`*.css` files alongside components)
   - Complex, reusable UI components
   - Written in plain CSS
   - Always reference tokens via `var()`

3. **Layout & Composition** (JSX + Tailwind utilities)
   - Flexbox, grid, spacing, alignment
   - Written directly in JSX using Tailwind utilities

### Design Tokens Example

```css
@theme {
  --color-app-surface: #f7f4ed;
  --color-app-on-surface: #2d2a26;
  --color-app-primary: #3b82f6;
  --color-app-border: #d6d3d1;
  --color-app-error: #ef4444;
  --spacing-4: 1rem;
  --radius-md: 0.5rem;
}
```

## State Management

State placement follows ownership:

| State Type | Where It Lives |
|------------|----------------|
| Local UI state | Component (`useState`) |
| Feature UI state | `features/*/model` |
| Server state | React Query cache |
| Cross-feature UI state | `shared/store` (Zustand) |
| Domain-derived state | `entities/*/model` |

## Path Aliases

```json
{
  "@": "src",
  "@/app": "src/app",
  "@/pages": "src/pages",
  "@/widgets": "src/widgets",
  "@/features": "src/features",
  "@/entities": "src/entities",
  "@/shared": "src/shared"
}
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Preview

```bash
pnpm preview
```

## Public API Discipline

Every slice must have `index.ts` as its public API contract.

```typescript
// features/todo-create/index.ts
export { TodoCreateForm } from './ui/TodoCreateForm'
export { useCreateTodo } from './model/useCreateTodo'
```

Never do deep imports — use the slice index instead.

## Documentation

See [`docs/CODE ORGANIZATION.md`](docs/CODE ORGANIZATION.md) for detailed architecture guidelines.

See [`docs/STYLING.md`](docs/STYLING.md) for styling system documentation.

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
