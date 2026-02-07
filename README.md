# Products — Infinite Scroll

A React app that lists products from [DummyJSON](https://dummyjson.com) with infinite scrolling and inline editable titles.

## Tech stack

- **React** (hooks only)
- **Vite**
- No external state or UI libraries

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command       | Description        |
|---------------|--------------------|
| `npm run dev` | Start dev server   |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Deployed URL

https://vi-intern-proj.vercel.app/<!-- Add your deployed URL here (e.g. Vercel, Netlify) -->

## Features

- Fetch products in pages of 10 via DummyJSON API
- Semantic HTML table: Title (editable), Brand, Category, Price, Rating
- Infinite scroll using Intersection Observer
- Edit product title inline (click → edit, Enter/blur to save, Escape to cancel)
- Loading, error, and empty states
