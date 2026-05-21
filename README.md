# The Duncas — Wedding Gallery

A wedding photo gallery built with **React**, **React Router 7**, **Tailwind CSS**, **Prisma**, and **SQLite**.

## Stack

- [React Router 7](https://reactrouter.com) (framework mode with Vite)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://prisma.io) + SQLite
- Cookie-based sessions
- Optional image resizing via Sharp (`/assets/resize/*`)

## Quick start

```sh
npm install
cp .env.example .env
npm run setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Seed logins:**

- `admin@blurb.se` / `losenord1`
- `rachel@remix.run` / `racheliscool`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run setup` | Migrate database and seed |
| `npm run typecheck` | Generate route types and run TypeScript |

## Project structure

```
app/
  components/
    gallery/     Carousel, GalleryGrid
    home/        HomeHero
    layout/      Banner, Navbar
    ui/          Image
  lib/           Server utilities (db, session, auth, image resize)
  routes/        File-based routes
  root.tsx       Root layout and global user loader
  app.css        Tailwind entry
public/
  images/        Wedding photos and index.json
prisma/          Schema, migrations, seed
```

## Environment

```env
DATABASE_URL="file:./data.db?connection_limit=1"
SESSION_SECRET="super-duper-s3cret"
```

## Deployment

The app deploys to [Fly.io](https://fly.io) with Docker. Health check: `GET /healthcheck`.

```sh
npm run build
npm run start
```
