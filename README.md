# Cherry's Routine Page (mockup)

A one-page routine and affiliate site for @cherrryyyii. Built with Next.js, Tailwind CSS v4 and Motion. Deploys to Vercel with no extra config.

```bash
npm install
npm run dev
```

- `app/data.ts`: routines, links and quotes, all taken from her real posts
- `app/cherry.tsx`: the page and its animations
- `app/admin/`: admin mockup at `/admin` (categories, products, links, reviews). Saves to localStorage only, with no login yet. Add auth before going live.
- `app/store.ts`: shared data hook used by the site and admin
- `docs/brand-guidelines.md`: voice, colour, type and motion
- `ABOUT.md`, `RESEARCH.md`: the brief and the research behind it
- `legacy/`: the earlier static HTML mockup and its admin panel

Before going live, see the checklist in RESEARCH.md §4.
