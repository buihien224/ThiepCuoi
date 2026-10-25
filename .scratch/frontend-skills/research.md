# Nghiên cứu: agent skill frontend cho ThiepCuoi

Ngày: 2026-10-25. Phạm vi: các ticket frontend còn lại (04–11, 13). Firebase và backend nằm ngoài phạm vi.
Mọi skill bên dưới đã được đọc toàn bộ: SKILL.md, các file nó tham chiếu và script đi kèm. Bản đọc là HEAD lúc clone ngày 2026-10-25. Commit được ghi trong từng mục.

## Tóm tắt

| Skill | Nguồn | Mảng | Ticket | Kết luận | Lý do |
|---|---|---|---|---|---|
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | 1. Thẩm mỹ, typography | 04 05 06 07 08 11 | **Dùng** | Bên thứ nhất, chỉ có văn bản. Không có script hay lệnh gọi mạng. Skill nói rõ brief luôn thắng, nên không đụng tông kem/vàng và font Playfair của spec |
| `motion` (Motion AI Kit) | [motiondivision/ai-kit](https://github.com/motiondivision/ai-kit/tree/main/plugins/motion/skills/motion) | 2. Animation | 07 09 11 (03 đã xong) | **Dùng, có sửa** | Do chính tác giả Motion viết, có mục riêng cho Base UI. Cần bỏ các phần Motion+ trả phí. MCP là tuỳ chọn |
| `shadcn` | [shadcn-ui/ui/skills/shadcn](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) | 5. Base UI/shadcn đúng API | 04 07 09 13 | **Dùng, có sửa** | Quy tắc base-vs-radix rất đáng giá. Có ba điểm phải sửa: lệnh `npx shadcn@latest` không pin version tự chạy mỗi lần skill được nạp, `allowed-tools` cấp quyền rộng, và quy tắc toast mâu thuẫn với sonner mà spec dùng |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | 1 + 3 (lượt review) | review sau mỗi ticket UI | **Dùng, có sửa** (vendor) | Checklist tốt về a11y, animation, ảnh, touch. Nhưng mỗi lần chạy nó tải quy tắc từ xa nên phải pin. Một vài quy tắc không hợp tiếng Việt hoặc Next 16 |
| `next-bundle-optimizer` | [vercel/next.js/skills](https://github.com/vercel/next.js/tree/canary/skills/next-bundle-optimizer) | 3. Bundle | 08 13 (lazy lightbox/Firebase) | **Dùng khi cần** | Bên thứ nhất, khớp Next 16.4 (`next analyze`). Chỉ cài khi làm 08 hoặc 13 |
| `vercel-react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | 3 | — | **Bỏ** | Khoảng 70 quy tắc, đa số về server, data fetching và SWR. Site này là export tĩnh. Vài quy tắc bundle đáng giữ thì gộp vào skill nội bộ |
| `next-dev-loop` | [vercel/next.js/skills](https://github.com/vercel/next.js/tree/canary/skills/next-dev-loop) | 5 | — | **Bỏ** | Bắt cài `npm i -g agent-browser@latest`. Trùng vai trò với Playwright có sẵn |
| `core-web-vitals` / `performance` | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) | 3 | — | **Bỏ** (chỉ tham khảo) | Repo cá nhân, không phải bên thứ nhất. Snippet Next đã lỗi thời (`priority`, `getServerSideProps`) |
| `migrate-radix-to-base` | [shadcn-ui/ui/skills](https://github.com/shadcn-ui/ui/tree/main/skills/migrate-radix-to-base) | 5 | — | **Bỏ** | Repo đã dùng Base UI sẵn (`"style": "base-nova"` trong `components.json`) |
| `webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | — | — | **Bỏ** | Viết cho Playwright Python. Repo dùng `@playwright/test` TypeScript |
| Tailwind v4 | không có skill chính thức | 5 | mọi ticket | **Thiếu** → skill nội bộ | Không tìm thấy skill của tailwindlabs, và `tailwindcss.com/llms.txt` trả 404 |
| Base UI | không có skill công khai | 5 | 07 09 13 | **Thiếu** → trỏ docs có sẵn | Docs đã nằm trong `node_modules/@base-ui/react/docs/` |

---

## Những gì các package đã cài tự kèm cho agent

- **Next 16.4.3.** Docs khớp đúng version nằm ở `node_modules/next/dist/docs/` (474 file), và khối `AGENTS.md` trỏ về đó. Theo docs của Next, kiến thức framework nên lấy từ docs đi kèm chứ không phải từ skill: AGENTS.md đạt 100% trong eval, còn cách dùng skill chỉ đạt tối đa 79%. Skill chỉ dành cho các quy trình nhiều bước. (`node_modules/next/dist/docs/01-app/02-guides/ai-agents.md`, mục "Version-matched documentation" và "Skills for multi-step workflows". Bài gốc: https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals.) Cũng file đó liệt kê các Next skill chính thức cùng lệnh `npx skills add vercel/next.js --skill …`.
- **@base-ui/react 1.9.** Có `node_modules/@base-ui/react/docs/index.md` kèm `react/components/*.md` (80 file), cùng nội dung với https://base-ui.com/llms.txt (HTTP 200). Docs ghi rõ ví dụ viết cho Tailwind v4.
- **motion 14.6.** README trỏ tới skill `/motion` (MIT, cài bằng `npx motion-ai`), MCP `https://mcp.motion.dev` và https://motion.dev/llms.txt (`node_modules/motion/README.md`, mục "Using Motion with AI").
- **shadcn 4.22.1.** Package không kèm docs cho agent, nhưng CLI có lệnh `info`, `docs`, `search` và `mcp` (thấy trong `node_modules/shadcn/dist/index.js`). Skill nằm riêng trong repo GitHub.
- **tailwindcss 4.** Package chỉ có CSS, không kèm docs hay llms.txt (`node_modules/tailwindcss/`), và https://tailwindcss.com/llms.txt trả 404.

---

## Đánh giá từng skill

### 1. `frontend-design` (Anthropic). Dùng

- **Nguồn:** https://github.com/anthropics/skills/tree/main/skills/frontend-design, commit `dbd4588` (2026-10-09). Giấy phép Apache-2.0 (`LICENSE.txt` trong thư mục skill).
- **Nội dung:** Agent đóng vai design lead. Bám vào chủ đề thật của sản phẩm, chọn typeface có chủ đích, dựng type scale theo *The Elements of Typographic Style*, giữ dòng chữ dưới 80 ký tự và cho chữ serif line-height cao hơn. Làm theo hai lượt: lập kế hoạch token (4–6 màu hex, font, layout dạng ASCII wireframe), đối chiếu lại với brief, rồi mới code. Motion dùng ít, mỗi trang chỉ một khoảnh khắc được dàn dựng. Đặt chất lượng tối thiểu: responsive, focus nhìn thấy được, tôn trọng reduced motion.
- **Bảo mật:** Chỉ có văn bản, không có script, không gọi mạng.
- **Xung đột với stack và spec:** Danh sách "dấu hiệu AI" của skill có hai mục trùng đúng brief của mình: mục 1 là "nền kem gần #F4F1EA + serif tương phản cao", mục 3 là "layout kiểu broadsheet". Ngoài ra skill khuyên tránh label viết hoa toàn bộ, trong khi spec có "TRÂN TRỌNG KÍNH MỜI". Skill tự giải quyết chuyện này: *"Where the brief pins down a visual direction, follow it exactly — the brief's own words always win."* Vì vậy cần cho agent đọc brief trước, tức `spec.md` dòng 11 và 145–147 hoặc skill nội bộ `thiep-design-brief` (xem mục Thiếu). Nếu không, agent có thể "sửa" tông kem/vàng đi.
- **Ticket:** 06 (Interview kiểu tạp chí, lịch Save The Date), 04/05 (dòng Kính mời, đồng hồ), 07/08 (dialog, lưới gallery), 11 (bố cục desktop).

### 2. `motion` (Motion AI Kit). Dùng, có sửa

- **Nguồn:** https://github.com/motiondivision/ai-kit, commit `0ebeb53` (2026-10-23). Giấy phép MIT (`packages/motion-ai/package.json`, tác giả Matt Perry). Thư mục skill: `plugins/motion/skills/motion/`, gồm SKILL.md, `best-practices/{index,react,base-ui,css-or-motion,motion,vue}.md`, `codex/`, `css-spring/`, `performance-audit/` và `transition-preview/`.
- **Nội dung có ích cho repo:**
  - Import từ `motion/react` và không bao giờ từ `framer-motion` (`best-practices/react.md`).
  - Đặt `<MotionConfig reducedMotion="user">` ở gốc ứng dụng. Ticket 03 đã làm vậy trong `src/components/invitation.tsx`.
  - Chỉ animate transform, opacity, clipPath và filter. Trong callback chạy mỗi frame thì không cấp phát object, nên dùng vòng `for` (`best-practices/index.md`). Áp dụng thẳng cho canvas cánh hoa của ticket 11.
  - Bảng chọn giữa CSS và Motion: vào màn hình khi cuộn thì dùng `whileInView`, hiệu ứng lặp đơn giản thì dùng CSS `@keyframes` (`css-or-motion.md`).
  - Một câu đúng cho dự án này: *"If it's a wedding site, you can use softer curves and slightly longer durations."*
  - `base-ui.md`: gắn motion qua prop `render={<motion.div …/>}` của Base UI. Animation lúc thoát cần nâng state `open` lên, đặt `keepMounted` cho Portal và bọc `AnimatePresence`. Dùng cho dialog Quà mừng, Chia sẻ và Lời chúc.
- **Bảo mật:**
  - `npx motion-ai` chép skill vào `.claude/skills/`, chép `.claude/agents/motion-reviewer.md` và ghi cấu hình MCP qua dependency bên thứ ba `add-mcp` (`packages/motion-ai/src/install.ts`, các hàm `writeSkills`, `writeAgentExtras`, `configureMcp`).
  - MCP `https://mcp.motion.dev` là server từ xa và không cần tài khoản (`plugins/motion/mcp.json`). Nội dung server trả về là dữ liệu bên ngoài. Server do chính Motion vận hành nên rủi ro thấp, nhưng vẫn là một bề mặt có thể bị prompt injection.
  - `performance-audit/index.md` bảo agent chạy `npx motionscore <url> --agent` (không pin version) và cần Motion+.
- **Xung đột:**
  - `react.md` viết "v12 và v13 cùng API" trong khi repo dùng v14.6. Không sao: changelog bản 14.0.0 chỉ bỏ API nội bộ (https://github.com/motiondivision/motion/blob/main/CHANGELOG.md, mục `[14.0.0] 2026-10-02`).
  - Mục "Radix Integration" không dùng tới.
  - `motion-reviewer` agent và Performance Doctor yêu cầu Motion+ trả phí, không có ích nếu không có tài khoản.
- **Cần sửa:** Chỉ chép `SKILL.md`, `best-practices/` và `codex/` bằng tay. Bỏ `performance-audit/`, `transition-preview/` và agent `motion-reviewer`. MCP là tuỳ chọn: skill tự ghi rằng `best-practices/` dùng độc lập được, không cần server ("If the Motion MCP server is unavailable").
- **Ticket:** 09 (tim bay, giảm khi bật reduced-motion), 11 (hiện dần khi cuộn, tắt hiệu ứng khi reduced-motion), 07 (animation dialog).

### 3. `shadcn` (shadcn/ui). Dùng, có sửa

- **Nguồn:** https://github.com/shadcn-ui/ui/tree/main/skills/shadcn, commit `481d523` (2026-10-25). Giấy phép MIT (repo). Gồm SKILL.md, `rules/{styling,forms,composition,icons,chat,base-vs-radix}.md`, `cli.md`, `mcp.md`, `registry.md`, `customization.md`, `design-system*.md` và `scripts/showcase-coverage.mjs` (chỉ đọc file local).
- **Nội dung có ích:**
  - `base-vs-radix.md`: Base dùng `render={<Button/>}` thay cho `asChild`. Khi `render` là `<a>` thì thêm `nativeButton={false}`. Select của Base cần prop `items`. Đây đúng là loại lỗi agent mắc do dữ liệu huấn luyện cũ, vì phần lớn ví dụ shadcn trên mạng viết cho Radix.
  - Dialog bắt buộc có `DialogTitle`.
  - Form dùng `FieldGroup` và `Field`, kèm `data-invalid`/`aria-invalid` (ticket 13).
  - Dùng `gap-*` thay cho `space-y-*`, dùng token ngữ nghĩa.
- **Bảo mật:**
  - Frontmatter chứa ``!`npx shadcn@latest info --json` ``. Theo docs Claude Code, cú pháp `` !`cmd` `` *"runs shell commands before the skill content is sent to Claude"* (https://code.claude.com/docs/en/skills). Nghĩa là mỗi lần skill được nạp, nó tải và chạy `shadcn@latest` từ npm mà không pin version, một rủi ro chuỗi cung ứng.
  - `allowed-tools: Bash(npx shadcn@latest *)` cho phép chạy mọi lệnh con không cần hỏi, kể cả `add --overwrite` và `apply`. Theo cùng trang docs, field này *"Tools Claude can use without asking permission during the turn"*.
  - Skill có `user-invocable: false`, nên chỉ model tự nạp được.
- **Xung đột:**
  - Quy tắc *"Use `toast` from the `toast` component for Base UI projects. Use `toast()` from `sonner` for Radix"* (`rules/composition.md`) mâu thuẫn với spec dòng 144 và ticket 07, vốn bắt dùng sonner. Repo đã có `src/components/ui/sonner.tsx`.
  - Quy tắc "Never override component colors or typography" cần nới cho thiệp, vì thiệp cần font Playfair và Dancing Script riêng. Nên đổi qua token trong `globals.css` thay vì gắn class.
  - `rules/chat.md` và mục DESIGN.md không liên quan.
- **Cần sửa:**
  1. Thay dòng `` !`…` `` bằng `` !`pnpm exec shadcn info --json` ``. Bản 4.22.1 đã cài sẵn có lệnh `info`.
  2. Đổi `allowed-tools` thành `Bash(pnpm exec shadcn info *) Bash(pnpm exec shadcn docs *)`.
  3. Thêm đầu file: "Repo này dùng sonner (`@/components/ui/sonner`) cho toast, bỏ qua quy tắc toast của Base UI."
  4. Xoá `rules/chat.md`.
- **Ticket:** 07 (Dialog, toast "Đã sao chép"), 09 (dialog Chia sẻ), 13 (form lời chúc), 04 (input và nút copy ở `/tao-link`).

### 4. `web-design-guidelines` (Vercel). Dùng, có sửa (vendor)

- **Nguồn:** https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines, commit `063bee9`, giấy phép MIT (README repo). Quy tắc thật nằm ở https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md, giấy phép MIT, commit `4ecfb9f` (2026-10-05).
- **Nội dung:** Checklist review ghi kết quả theo dạng `file:line`. Các mục gồm a11y (aria-label cho nút chỉ có icon, focus-visible), animation (tôn trọng `prefers-reduced-motion`, chỉ animate transform/opacity, không dùng `transition: all`), ảnh (có width/height, lazy, `fetchpriority="high"`), touch (`touch-action: manipulation`, `overscroll-behavior: contain` trong modal, safe-area), typography (`…`, `text-wrap: balance`, `tabular-nums` cho đồng hồ của ticket 05), hydration (ngày giờ dễ lệch giữa server và client).
- **Bảo mật:** SKILL.md bảo agent *"Fetch fresh guidelines before each review"* bằng WebFetch. Như vậy chỉ dẫn được tải từ một URL có thể thay đổi bất cứ lúc nào, và agent sẽ làm theo nội dung không ai review. Nên chép `command.md` tại commit `4ecfb9f` vào thư mục skill và bỏ bước fetch.
- **Xung đột:**
  - "Title Case for headings/buttons" không hợp với tiếng Việt.
  - "Above-fold critical images: `priority`": ở Next 16 `priority` đã deprecated, thay bằng `preload`, và docs khuyên dùng `loading="eager"` hoặc `fetchPriority="high"` (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, mục `priority`). Ngoài ra repo không dùng `next/image` cho ảnh tối ưu (ticket 08).
  - "URL reflects state", "Accept-Language" và "Second person; avoid first person" không áp dụng. Thiệp viết ở ngôi "chúng mình".
- **Ticket:** chạy như lượt review cuối cho 04, 06, 07, 08, 09, 11, 13.

### 5. `next-bundle-optimizer` (Next.js). Dùng khi cần

- **Nguồn:** https://github.com/vercel/next.js/tree/canary/skills/next-bundle-optimizer, commit `cbf49db` (2026-10-24), giấy phép MIT. Gồm SKILL.md và `references/{fix-patterns,graph-methods}.md`.
- **Nội dung:** Mặc định chạy ở chế độ audit. Agent chụp snapshot bằng `pnpm exec next analyze --output`, export ra JSONL, đọc schema của bản Next đang cài, xếp hạng phần đóng góp vào bundle client, rồi đề xuất lazy boundary. Mỗi lần chỉ sửa một chỗ và đo trước sau. Lệnh `next analyze` có trong docs bản 16.4 (`node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md`, mục `next analyze`).
- **Bảo mật:** Không có script đi kèm. Skill gợi ý `npx skills add` thêm skill khác, nên bỏ qua gợi ý này. Lệnh build chạy trên máy local.
- **Xung đột:** Các phần Cache Components và Partial Prefetching không áp dụng vì `next.config.ts` tắt chúng do dùng `output: "export"`.
- **Ticket:** 13 (bắt buộc: Firebase không được nằm trong bundle ban đầu), 08 (lazy yet-another-react-lightbox), 11. Chỉ cài khi bắt đầu các ticket này.

### 6. Các skill bị loại

- **`vercel-react-best-practices`** (commit `063bee9`, MIT). Có 72 file quy tắc và một `AGENTS.md` 3.810 dòng. Nhóm ưu tiên cao nhất là `async-*` và `server-*`, gồm Server Actions, `React.cache`, LRU, SWR, toàn thứ không áp dụng cho site export tĩnh. Chỉ vài quy tắc đáng giữ là `bundle-dynamic-imports`, `bundle-defer-third-party`, `bundle-conditional` và `client-passive-event-listeners`, nên gộp vào skill nội bộ. Nguồn: https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md.
- **`next-dev-loop`.** Yêu cầu `npm i -g agent-browser@latest` và `next dev` (*"These are hard floors"*). Repo kiểm tra trên bản build tĩnh bằng Playwright (spec, Seam 1). Nguồn: https://github.com/vercel/next.js/blob/canary/skills/next-dev-loop/SKILL.md.
- **`addyosmani/web-quality-skills`** (`core-web-vitals`, `performance`; commit `afa8da9`, MIT, ©Addy Osmani). Repo cá nhân. Snippet Next còn `<Image priority>` và `getServerSideProps`, thuộc Pages Router (`skills/core-web-vitals/SKILL.md`, mục "Framework quick fixes"). Bảng ngân sách hiệu năng (JS nén < 300 KB, ảnh above-fold < 500 KB, font < 100 KB; `skills/performance/SKILL.md`) có thể tham khảo khi viết skill nội bộ. Script `analyze.sh` chỉ grep file local. Nguồn: https://github.com/addyosmani/web-quality-skills.
- **`migrate-radix-to-base`** và **`webapp-testing`**: lý do đã ghi trong bảng tóm tắt.

---

## Những mảng còn thiếu và đề xuất skill nội bộ

Không có skill chính thức nào cho Tailwind v4 (tìm kiếm chỉ ra skill bên thứ ba, xem https://tessl.io/registry/skills/github/joe-bell/cva/tailwind-css-v4/review và các kết quả tương tự). Base UI chỉ có một skill nội bộ để release (`skills-lock.json` của https://github.com/mui/base-ui). Không có skill nào phủ đủ ba thứ: export tĩnh Next 16, hiệu năng trên điện thoại cũ và typography tiếng Việt. Đề xuất viết hai skill nhỏ, mỗi skill dưới khoảng 120 dòng. Nên dùng skill sẵn có `writing-for-agents` khi viết.

### A. `thiep-stack` (đúng API + hiệu năng)

- **Mô tả để agent tự nạp:** "Dùng khi viết hoặc sửa bất kỳ file nào trong `src/`. Áp dụng cho Next 16 export tĩnh, Tailwind v4, Base UI và shadcn, motion, cùng hiệu năng trên điện thoại cũ."
- **Nội dung SKILL.md:**
  1. **Bảng tra docs có sẵn theo từng việc**, để agent không viết theo trí nhớ:
     - Font: `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
     - Metadata và OG (ticket 10): `14-metadata-and-og-images.md`, `03-api-reference/04-functions/generate-metadata.md`
     - Ảnh: `12-images.md`, `03-api-reference/02-components/image.md`
     - Export tĩnh: `02-guides/static-exports.md`
     - Lazy load (ticket 13): `02-guides/lazy-loading.md`
     - Chống chớp trước hydration (ticket 05): `02-guides/preventing-flash-before-hydration.md`
     - Component Base UI: `node_modules/@base-ui/react/docs/react/components/<tên>.md`
  2. **Ràng buộc của export tĩnh** (lấy từ `static-exports.md`, mục "Unsupported Features"): không có Server Actions, không có Image Optimization với loader mặc định, không có redirects, headers hay Proxy. Vì vậy ảnh đi qua component riêng của ticket 08, còn `?to=` chỉ đọc phía client (ticket 04).
  3. **Tailwind v4:** cấu hình bằng CSS trong `src/app/globals.css` (`@theme inline`, các token `--color-cream`, `--color-gold`, `--font-script`). Không tạo `tailwind.config.*`. Ghi kèm danh sách utility đổi tên giữa v3 và v4 kèm link https://tailwindcss.com/docs/upgrade-guide (người viết skill cần kiểm lại trước khi chép).
  4. **API dễ nhầm:**
     - `next/image` dùng `preload` thay cho `priority`.
     - `next/dynamic` với `ssr: false` chỉ chạy trong Client Component (`lazy-loading.md`).
     - Base UI dùng `render` thay cho `asChild`.
     - Import `motion/react`, không dùng `framer-motion`.
     - Toast dùng sonner.
  5. **Ngân sách cho điện thoại cũ:**
     - Ảnh hero là phần tử LCP: để sẵn trong HTML, `fetchPriority="high"`, không lazy.
     - Ảnh khác: `loading="lazy"`, có `width`/`height`, srcset WebP theo ticket 08.
     - Font: chỉ subset `vietnamese` và `latin`.
     - Lightbox và Firebase tải bằng `import()` khi người dùng bấm.
     - Canvas cánh hoa: giới hạn số cánh, dừng khi `document.hidden`, không cấp phát object trong vòng rAF (rút từ `best-practices/index.md` của Motion), giới hạn DPR ở mức 2.
     - Cách kiểm: `pnpm build`, phục vụ `out/`, rồi dùng Chrome DevTools với CPU throttle 4× và mạng "Slow 4G".
  6. **Khi làm ticket 08, 11 hoặc 13**, gợi ý chạy `next-bundle-optimizer` ở chế độ audit.

### B. `thiep-design-brief` (thẩm mỹ tạp chí, đi kèm `frontend-design`)

- **Mô tả để agent tự nạp:** "Dùng cùng frontend-design khi dựng hoặc chỉnh giao diện bất kỳ phần nào của thiệp."
- **Nội dung SKILL.md:**
  - **Brief chốt sẵn**, lấy từ spec dòng 11 và 144–147: kem và vàng, Playfair Display cho tiêu đề, Dancing Script cho chữ viết tay, không dùng Great Vibes, `lang="vi"`, tiêu đề trang trí bằng tiếng Anh, thiết kế ưu tiên màn hình dọc, chỉ lấy cảm hứng bố cục từ C61 "Our Love Begins" và không chép. Ghi rõ đây là "brief wins" đối với các dấu hiệu AI #1 và #3 của frontend-design.
  - **Typography tiếng Việt:** chừa line-height đủ cho dấu chồng (ví dụ Ở, Ữ), kiểm dấu ở cả hai font, dùng `text-wrap: balance` cho tiêu đề.
  - **Từ vựng bố cục tạp chí:** số trang, drop cap, cột hỏi đáp kiểu Interview, ảnh tràn lề. Chọn một khoảnh khắc nổi bật duy nhất là phong bì, những phần còn lại giữ yên tĩnh (đúng nguyên tắc "spend your boldness in one place" của frontend-design).
  - **Desktop (ticket 11):** khung nội dung có độ rộng tối đa và căn giữa.
  - **Chuyển động:** một chuyển động chính là phong bì. Hiện dần khi cuộn ở mức nhẹ. Tắt hết khi `prefers-reduced-motion`.

---

## Danh sách cuối cùng và cách cài

Danh sách giữ gọn: ba skill từ bên ngoài, một skill dùng khi cần, và hai skill nội bộ nhỏ.

1. `frontend-design`: giữ nguyên.
2. `motion`: phần best-practices và codex.
3. `shadcn`: bản đã sửa.
4. `web-design-guidelines`: bản vendor.
5. Nội bộ: `thiep-stack` và `thiep-design-brief`.

Thêm `next-bundle-optimizer` khi bắt đầu ticket 08 hoặc 13.

**Cách cài.** Nên chép thủ công tại commit đã pin thay vì chạy `npx`, để không tự chạy code từ npm và review được diff:

```bash
cd /home/bhlnk/Documents/ThiepCuoi
T=$(mktemp -d)
git clone --depth 1 https://github.com/anthropics/skills "$T/a"            # dbd4588
git clone --depth 1 https://github.com/motiondivision/ai-kit "$T/m"        # 0ebeb53
git clone --depth 1 --filter=blob:none --sparse https://github.com/shadcn-ui/ui "$T/s" && git -C "$T/s" sparse-checkout set skills   # 481d523
git clone --depth 1 https://github.com/vercel-labs/agent-skills "$T/v"     # 063bee9

cp -r "$T/a/skills/frontend-design" .claude/skills/
mkdir -p .claude/skills/motion && cp -r "$T/m/plugins/motion/skills/motion/"{SKILL.md,best-practices,codex} .claude/skills/motion/
cp -r "$T/s/skills/shadcn" .claude/skills/ && rm -r .claude/skills/shadcn/{rules/chat.md,evals,agents,assets/showcase}
cp -r "$T/v/skills/web-design-guidelines" .claude/skills/
curl -sL https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/4ecfb9fb8d/command.md \
  -o .claude/skills/web-design-guidelines/guidelines.md
```

**Sửa tay sau khi chép:**
- **`motion/SKILL.md`:** xoá các dòng trỏ tới `performance-audit` và `transition-preview`.
- **`shadcn/SKILL.md`:** đổi dòng `!` và `allowed-tools` sang `pnpm exec shadcn …`, thêm ghi chú dùng sonner.
- **`web-design-guidelines/SKILL.md`:** thay mục "Guidelines Source" bằng "Read `guidelines.md` in this folder", thêm ghi chú bỏ Title Case và đổi `priority` thành `fetchPriority`/`preload`.
- **MCP Motion (tuỳ chọn, cần người dùng đồng ý):** `claude mcp add --transport http motion https://mcp.motion.dev`.
- **Khi cần bundle optimizer:** `npx skills add vercel/next.js --skill next-bundle-optimizer -a claude-code` (lệnh lấy từ `ai-agents.md` trong docs đi kèm), hoặc chép từ `vercel/next.js/skills/next-bundle-optimizer` tại `cbf49db`.
- **Hai skill nội bộ:** viết theo đề cương ở trên, dùng skill `writing-for-agents`.
