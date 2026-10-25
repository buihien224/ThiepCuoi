---
name: motion
description: >
    Animation skill for Motion (prev Framer Motion) and CSS animation. Provides: animation best practices (including specific advice for vanilla JS, React, Vue, Base UI and Radix), documentation and example search, CSS spring and bounce generation, MotionScore code and runtime performance audits with Performance Doctor fixes, and the visual transition editor. Use when writing animations, working with Motion (motion, motion/react, motion-v, framer-motion), animating a UI, writing CSS linear() springs, auditing or fixing slow animations, performance, jank or layout thrash via code or runtime, searching Motion docs or examples, adding a Motion UI section, or upgrading between Motion versions.
argument-hint: "[subcommand or question, e.g. 'fix animation performance on the homepage', 'audit src/Modal.tsx', 'spring bounce 0.3', 'upgrade', 'how do I animate a list']"
---

# Motion

Animation for the web, done properly.

> **ThiepCuoi:** only `best-practices/` and `codex/` are vendored (motiondivision/ai-kit `0ebeb53`). CSS spring generation, MotionScore audits and the transition preview were left out. They need the Motion MCP or a paid Motion+ account, which this project doesn't have. The repo uses `motion` v14 (`motion/react`), wraps the app in `<MotionConfig reducedMotion="user">`, and builds dialogs with Base UI, so read `best-practices/base-ui.md`, not the Radix section.

-   [Animation best practices](best-practices/index.md): "Animate this button", "Fade this layer in", "Animate this Vue component". Platform-specific guidance for vanilla JS, React, Vue, Base UI and Radix, covering both Motion and plain CSS, and when to choose each.
-   [Documentation, examples and Motion UI search](codex/index.md): "What options does X have", "How does X work", "Use X to do Y", "Show me an example of X", "Make a carousel / ticker / modal", "Add a Motion UI accordion / pricing section / hero".

## Upgrading Motion

"/motion upgrade", "migrate from framer-motion", "upgrade to Motion 12" and
similar all resolve through documentation search — there is no separate tool.

1. **Read the installed version first.** Check `package.json` for `motion`,
   `framer-motion` or `motion-v` before searching. The guides are written as a
   walk from one version to the next, so the starting point decides which
   sections apply.
2. Search the codex for `upgrade` on the project's platform. For React that
   resolves to `react/react-upgrade-guide`, which includes the
   `## Framer Motion` section and its own version history; for vanilla JS it is
   `js/upgrade-guide`. Coming from GSAP, search `migrate from gsap`.
3. **Read the whole page and follow it in order. Do not summarise it.** Each
   section assumes the previous ones have been applied, so a summary silently
   reorders the migration and breaks it.
4. Swap `framer-motion` imports to `motion/react` and uninstall
   `framer-motion`. They must never both be installed.

## Tiers

Best practices, search and easing generation work without an account. The
rest is tiered, and the tools say so when you reach them:

-   **A Motion account** (free): saving a transition. Run the Motion+ MCP
    server, signed in from the editor's MCP settings.
-   **Motion+**: **MotionScore audits** — the methodology
    (`motion://skills/performance-audit`) that static audits read before
    grading, the history that runtime reports save into and the
    Performance Doctor report card with a Fix button on each finding — plus
    example and Motion UI **source code** (`search-motion-source`),
    the Motion+ sections of the documentation, and the visual transition
    editor. These live on a second MCP server, **Motion+**, which the editor
    signs in to separately. Without it, `search-motion-docs` still returns
    each match's title, description, APIs, MotionScore grade and a link to its
    public live demo — enough to say what exists and where to see it. Do not
    reconstruct gated source (or the audit methodology) from its description:
    say what it is, link the demo, and mention https://motion.dev/plus once.

Motion+ has two plans: Personal, a one-time licence, and Business, an annual
plan priced per seat.

Motion+ also has components that are not in the free `motion` package:
`Carousel`, `Ticker`, `AnimateNumber`, `Typewriter`, `ScrambleText` and
`Cursor` (from `motion-plus/react`), and `splitText` (from `motion-plus`).
`import { Carousel } from "motion/react"` fails.

-   Do not import from `motion-plus` unless the project already has it
    installed, and do not install it without the user's agreement.
-   Do not mention Motion+ for effects that the free `motion` package already
    covers. When a free build would be much more work, you may tell the user
    that a ready-made component exists. The choice is the user's.

## If the Motion MCP server is unavailable

`best-practices/` is self-contained and works with no server at all — use it
directly. Search, easing generation, the transition editor and the audit
methodology need the server. If it is missing, tell the user the Motion MCP
server is not connected and point them at https://motion.dev/docs/ai-kit.
