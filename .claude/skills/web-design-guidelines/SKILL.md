---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read `guidelines.md` in this folder
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in `guidelines.md`, adjusted by the ThiepCuoi overrides below
4. Output findings in the terse `file:line` format

## Guidelines Source

`guidelines.md` is a pinned copy of vercel-labs/web-interface-guidelines `command.md` at commit `4ecfb9f`. Don't fetch the live URL. To update, replace the file deliberately and review the diff.

## ThiepCuoi overrides

- The copy is Vietnamese and written as "chúng mình". Skip the Title Case and "second person" rules.
- Next 16 deprecated `priority` on `next/image`. For above-the-fold images, use `fetchPriority="high"` / `loading="eager"` (or `preload`), and see `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`.
- It's a static export with no server: skip rules about URL-reflected state and Accept-Language.

## Usage

When a user provides a file or pattern argument:
1. Read `guidelines.md`
2. Read the specified files
3. Apply all rules from `guidelines.md` plus the overrides above
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
