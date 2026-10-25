---
name: thiep-stack
description: Stack rules for this repo's Next 16 static export, Tailwind v4, Base UI/shadcn and motion code, plus the old-phone performance budget. Use before writing or changing anything in `src/`.
---

# ThiepCuoi stack

Your training data predates this stack. Before writing code for a task, read the bundled doc that owns it:

| Task | Read |
|---|---|
| Fonts | `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` |
| Images | `…/01-getting-started/12-images.md`, `…/03-api-reference/02-components/image.md` |
| Metadata, Open Graph | `…/01-getting-started/14-metadata-and-og-images.md` |
| What static export allows | `…/02-guides/static-exports.md` ("Unsupported Features") |
| `next/dynamic`, `import()` | `…/02-guides/lazy-loading.md` |
| Client-only values (time, `?to=`) | `…/02-guides/preventing-flash-before-hydration.md` |
| A Base UI component | `node_modules/@base-ui/react/docs/react/components/<name>.md` |

(`…` = `node_modules/next/dist/docs/01-app`.)

## Static export

`next.config.ts` sets `output: "export"`: `next build` writes plain files to `out/` and no server runs. That means anything per-guest (`?to=`, the countdown, wishes) runs on the client after hydration, images go through the project's own image component (ticket 08), and there are no Server Actions, route handlers, redirects, headers or Proxy.

## Gotchas

- Tailwind v4 is configured in CSS: tokens live in `src/app/globals.css` under `@theme inline` (`--color-cream`, `--color-gold`, `--font-serif`, `--font-script`, …). Add new tokens there; the repo has no `tailwind.config.*`.
- `next/image`: `priority` is deprecated. Use `preload` or `fetchPriority="high"`.
- `next/dynamic` with `ssr: false` belongs in a Client Component.
- Base UI: custom triggers use `render={<… />}`; with `render={<a />}` add `nativeButton={false}` (see the `shadcn` skill).
- Animations import from `motion/react` (see the `motion` skill).
- Toasts use sonner via `@/components/ui/sonner`.

## Old-phone budget

Guests open the link from Zalo/Messenger on mid-range and old Android phones over 4G. Every change holds to:

- **LCP:** the hero image is in the static HTML with `fetchPriority="high"`, never lazy.
- **Other images:** `loading="lazy"`, explicit `width`/`height`, WebP `srcset` (ticket 08).
- **Fonts:** `next/font` with `vietnamese` + `latin` subsets only.
- **Heavy code** (lightbox, Firebase, QR) loads via `import()` when the guest first taps the feature, so it stays out of the initial bundle.
- **Canvas/rAF loops** (petals): a fixed particle cap, DPR capped at 2, paused while `document.hidden`, no allocation inside the frame callback, stopped entirely under `prefers-reduced-motion`.
- **Animate** only `transform`, `opacity`, `clip-path`, `filter`.

To verify: `pnpm build`, serve `out/`, then profile in Chrome DevTools with 4× CPU throttling and "Slow 4G". For bundle questions on tickets 08, 11 and 13, run the `next-bundle-optimizer` skill in audit mode if it's installed.
