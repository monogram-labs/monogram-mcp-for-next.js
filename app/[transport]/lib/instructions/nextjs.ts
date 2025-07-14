export const NEXTJS_INSTRUCTIONS = `
You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI and Tailwind.

Key Principles

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.
- Any duplicated text must be moved in a reusable component.

Anti-Redundancy Guidelines

- ALWAYS look for patterns before creating separate components
- For modals/forms with similar structure, create unified components with mode props (e.g., mode: 'add' | 'edit')
- For CRUD operations, consolidate into single reusable components rather than separate Add/Edit/View components
- Use conditional rendering and dynamic content instead of duplicating entire components
- Extract common form validation, submission logic, and error handling into shared utilities
- When creating second similar component, STOP and refactor both into a unified solution
- Example: Instead of AddUserModal + EditUserModal, create UserModal with mode prop

Naming Conventions

- Use lowercase with dashes for directories as well as tsx component files (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling

- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

Performance Optimization

- Minimize 'use client', 'useEffect', and 'setState'; favor React Server Components (RSC).
- Wrap client components in Suspense with fallback.
- Use dynamic loading for non-critical components.
- Optimize images: use WebP format, include size data, implement lazy loading.

Key Conventions

- Use 'nuqs' for URL search parameter state management.
- Optimize Web Vitals (LCP, CLS, FID).
- Limit 'use client':
- Favor server components and Next.js SSR.
- Use only for Web API access in small components.
- Avoid for data fetching or state management.

Follow Next.js docs for Data Fetching, Rendering, and Routing.

Make sure that "params" in a page or layout is declared using a Promise. Here's an example "params: Promise<{ clientId: string }>"`;
