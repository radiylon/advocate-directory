# Advocate Directory

A searchable directory for finding health advocates with filtering, sorting, and pagination.

https://github.com/user-attachments/assets/9471e28c-9946-4cd7-b709-ea8eb2bb7ddb

## Features

- **Search** - Find advocates by name, city, or specialty
- **Filter** - Filter by US state
- **Sort** - Toggle ascending/descending by last name, first name
- **Pagination** - Browse through large datasets
- **URL State** - Shareable filter links

## Tech Stack

- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL, Drizzle ORM
- **State**: TanStack Query, nuqs

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Setup

The app works locally using docker and PostgreSQL:

```bash
# Start PostgreSQL container
docker compose up -d

# Push schema to database
pnpm drizzle-kit push

# Seed with sample data
curl -X POST http://localhost:3000/api/seed
```
