---
name: thiep-design-brief
description: The locked visual brief for the wedding invitation (cream/gold magazine layout, Vietnamese typography, one hero motion). Use alongside `frontend-design` whenever you build or restyle any part of the invitation's UI.
---

# ThiepCuoi design brief

This is the brief `frontend-design` defers to ("the brief's own words always win"). The brief deliberately picks a cream background, a high-contrast serif and a broadsheet-style layout. Keep them, even though `frontend-design` lists them as AI tells. The source of truth for content and section order is `.scratch/thiep-cuoi/spec.md` ("Nền tảng" and the user stories); read the ticket you are working on as well.

## Locked choices

- **Palette:** the `cream`, `cream-deep`, `gold`, `gold-soft` and `ink` tokens in `src/app/globals.css`. New colours become tokens there.
- **Type:** Playfair Display (`font-serif`/`font-heading`) for headings, Dancing Script (`font-script`) for handwritten accents. Body copy is Vietnamese; decorative titles ("Our Love Begins", "Save The Date", "Interview") stay in English. Uppercase lines from the spec, such as "TRÂN TRỌNG KÍNH MỜI", stay uppercase.
- **Layout:** a magazine, inspired by the C61 "Our Love Begins" template and never copied from it. Use magazine vocabulary: cover, page numbers, drop caps, Q&A columns for the Interview, full-bleed photos. Design for a portrait phone screen first. On desktop (ticket 11), the content becomes a centred column with a max width.
- **Motion:** the envelope/card opening is the one staged moment. Everything else is quiet: gentle reveals on scroll, soft curves, slightly longer durations. With `prefers-reduced-motion`, show content without movement.

## Vietnamese typography

- Leave enough line-height for stacked diacritics (Ở, Ữ, Ẫ), especially in Playfair headings and Dancing Script.
- Check every new string in both fonts with real Vietnamese text, including a guest name from `?to=`.
- Use `text-wrap: balance` on headings, and keep body lines under about 80 characters.
