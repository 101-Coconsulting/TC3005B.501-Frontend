# Astro Project – `src/` Directory Structure

This project follows a modular organization within the `src/` folder to maintain clean, scalable, and maintainable code. The folder structure was designed based on clean code principles and best practices.

## Folder Structure

### `assets/`

Stores static resources such as images, fonts, and other media files used throughout the project.

### `components/`

Contains reusable UI components – modular presentation elements like buttons, forms, cards, etc.

### `consts/`

Defines global constants and project configurations, such as default values and general settings.

### `layouts/`

Includes layout templates used as the base structure for pages – for example, header, footer, and global navigation.

### `lib/`

Holds shared modules and helper functions that don't belong to a specific category. These are not generic utilities but are specific modules reused across multiple components.

### `pages/`

Contains the main pages of the project. In Astro, each file in this folder becomes a route. Subdirectories become nested routes.

### `styles/`

Stores global style files and CSS utilities, such as Tailwind definitions, CSS variables, or custom styles using Tailwind’s `@theme` features.

### `types/`

Defines TypeScript types and data structures to ensure consistency and type safety across the codebase.

### `utils/`

Includes utility functions and helpers that handle data manipulation, formatting, and repetitive logic.

## `public/` Folder (outside `src/`)

### `public/`

This folder contains static files that are served directly to the browser – such as images, favicons, and fonts. Unlike the `assets/` folder, these files are not processed by Astro and can be accessed via absolute paths.

---

**Follow this structure and these recommendations to keep the project clean, modular, and easy to maintain for all contributors.**
