# PesoHub Blog Design

How the blog hub and blog post pages are built. Reflects the design-handoff
mockups (`PesoHub Blog.dc.html`, `PesoHub Blog High-Yield Savings.dc.html`).
Hub: `src/app/blog/page.tsx`. Post: `src/app/blog/[slug]/page.tsx`. Shared
rendering: `src/components/blog/` (`blog-card.tsx`, `blog-content.tsx`).

The post body deliberately mirrors the **calculator content cards** (see
design-calculators.md): one white card per section, not one card around
everything.

---

## Category badges

Every post has a `category` (`BlogCategory`). The category pill tone is shared by
the hub cards and the post meta row. Defined inline in `blog-card.tsx` and
`[slug]/page.tsx` (`CATEGORY_TONE` / `CATEGORY_LABELS`).

| Category | Pill bg | Pill ink |
| --- | --- | --- |
| `savings`, `budgeting` | `#DEF5F0` | `#0B7E6E` |
| `banking`, `government` | `#EAF0FF` | `#1535C7` |
| `tax` | `#FBF0DC` | `#B7791F` |
| `investing` | `#EDE8FC` | `#6D4DE0` |
| `insurance` | `#FBE6E7` | `#C2484D` |
| `general` | `#EEF1F7` | `#5A6478` |

Pill style: `rounded-[8px] px-[10px] py-[5px] text-[11px] font-bold uppercase tracking-[.06em]`.

---

## Blog hub (`/blog`)

Full-site width — matches the global footer (see design-layouts.md):

```
mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]
```

### Section order

1. **Heading** — `Blog` eyebrow (`text-[15px] font-bold uppercase tracking-[.06em] text-brand`), H1 (`font-display clamp(28px,3.4vw,40px)`), lead.
2. **Featured card** — newest post, two columns (`lg:grid-cols-2`), `rounded-[20px] border-[#E7EBF3]` shadow:
   - **Left:** the post's hero image (`object-cover`) or a `gradient-hero` fallback with a cyan glow orb; a white `FEATURED` badge pinned top-left. Image is loaded via `loadPostImage(slug)` from `data/blog/post-modules.ts`.
   - **Right:** read-time, title (`font-display`), excerpt, "Read article →".
3. **Latest articles** — `grid gap-4 sm:grid-cols-2 lg:grid-cols-3` of `BlogCard`.
4. **FAQ** — bare `FaqSection`.
5. **Explore more** — bare 4-up link-card grid (Calculators / Guides / Rates / Government).

### BlogCard (`blog-card.tsx`)

```
rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)]
hover: -translate-y-[3px], border-[#C3D0F2], lifted shadow
```

Top: category pill + `Clock` "{n} min read". Then title (`font-display text-[19px]`),
excerpt (flex-1), and a footer row: date (`toLocaleDateString`) + arrow. No thumbnail.

---

## Blog post (`/blog/[slug]`)

Narrower **920px reading column** for every block (header, hero, content). The
global footer is constrained to match on post routes — `AppShell` passes
`maxWidthClassName="max-w-[920px]"` to `Footer` when the path is `/blog/<slug>`.

```
mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8
```

### Section order

1. **Header** — breadcrumb, H1 (`font-display clamp(30px,4vw,44px)`), lead excerpt (`text-[18px] text-[#475069]`), then the **meta badge row**.
2. **Hero image** — `rounded-[18px] h-[clamp(200px,34vw,320px)] object-cover`; `gradient-hero` fallback when `post.image` is absent.
3. **Quick Answer** — its own card (see below).
4. **Content** — one card per heading (`<BlogContent>`).
5. **Disclaimer** — standalone card (amber).
6. **FAQ** — bare `FaqSection`.
7. **Related** — bare link-card grid; fills the row when < 3 (`grid-cols-1` / `sm:grid-cols-2` / `lg:grid-cols-3`).

### Meta badge row

Category, read time, and updated date are **all badges** (same 11px uppercase
pill style), placed **below** the lead paragraph:

```jsx
<div className="mt-[18px] flex flex-wrap items-center gap-2">
  <span style={categoryTone} className="…pill">{categoryLabel}</span>
  <span className="…pill bg-[#EEF1F7] text-[#5A6478]">{readTime} min read</span>
  <span className="…pill bg-[#EEF1F7] text-[#5A6478]">Updated {formatDate(updatedAt)}</span>
</div>
```

### Quick Answer card

Standalone tinted card from `post.directAnswer`:

```
flex gap-[14px] rounded-[20px] border border-[#D3DEFA] bg-[#EAF0FF] p-[clamp(20px,2.5vw,30px)]
```

Icon tile: `size-10 rounded-[12px] bg-[#D3DEFA]` holding a brand `Info`. Label
`QUICK ANSWER` (`text-[12px] font-bold uppercase text-brand`), body `#344054`.

### Content cards (`blog-content.tsx`)

`BlogContent` groups the flat `sections[]` into cards: **each level-2 heading
starts a new card**; everything up to the next H2 (intro paragraphs, H3s, lists,
tables, callouts) shares it. Sections before the first H2 form their own intro
card. Each card uses the calculator `CARD` style, separated by `gap-[14px]`:

```
rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)]
shadow-[0_1px_2px_rgba(16,24,40,.04)] [&>*:first-child]:mt-0
```

`[&>*:first-child]:mt-0` cancels the leading element's top margin so the heading
sits flush at the card top.

Body text is `#344054`; headings `#0E1525`; lead/quote `#475069`.

---

## Section blocks (`BlogSection`)

`BlogContent` renders these `type`s (`src/types/content.ts`). The blog agent emits
them (see `scripts/blog-agent/lib/claude-writer.mjs`).

| `type` | Render |
| --- | --- |
| `heading` | H2 (`clamp(20px,2.2vw,25px)`) or `level:3` H3 (`text-[20px]`), `#0E1525` |
| `paragraph` | `text-[16px] leading-[1.6] text-[#344054]` |
| `list` | dot bullets |
| `ordered-list` | circular brand number badge (`size-[30px] rounded-full bg-[#EAF0FF] text-brand`); a leading `Step N —` is stripped (the badge already numbers it) |
| `callout` | tinted panel + tinted icon tile, per `variant` (table below) |
| `quote` | left brand rule, italic `#475069` |
| `cta` | brand-tinted box with inline links |
| `table` | bank ranking or comparison grid (below) |

### Callout variants

`rounded-[16px] border p-5`, icon in a `size-10 rounded-[12px]` tinted tile:

| variant | panel bg / border | icon tile | icon |
| --- | --- | --- | --- |
| `info` | `#EAF0FF` / `#D3DEFA` | `#D3DEFA` | brand `Info` |
| `warning` | `amber-50` / `amber-300` | `amber-100` | `amber-600` `TriangleAlert` |
| `tip` | `brand/5` / `brand/30` | `brand/15` | brand `Lightbulb` |

An in-content callout whose text starts with **"Disclaimer"** is dropped — the
page already renders the standardized disclaimer card, so this avoids a duplicate.

### Tables

`{ type:"table", columns:[…], rows:[[…]] }`. Header row `bg-[#EEF2FB]`, rows split
by `border-b border-[#EEF1F7]` with odd rows tinted `#FAFBFE`. First cell is the
row label (`font-display font-semibold #0E1525`). Horizontal scroll on mobile
(`overflow-x-auto` + min-width).

- **3 columns** = bank ranking `[Bank, Rate, Conditions]`. The Rate cell renders
  as a toned pill via `ratePillClass`: ≥ 4% green (`#E3F6ED`/`#0B7E6E`), 1–3.99%
  indigo (`#E7E9FB`/`#3D49C4`), < 1% amber (`#FBF0DC`/`#9A6A12`). Conditions
  column is the widest.
- **4+ columns** = generic comparison grid (no rate pill), equal columns.

Use a table — not a long list — when comparing banks, rates, or products across
consistent attributes.

---

## Conventions

- **One card per section**, not one card around the whole article (matches the
  calculator pages).
- **FAQ and Related are never wrapped in a card** (site-wide convention).
- **Footer width follows the content width**: 920px on post pages, 1240px
  everywhere else.
- FAQ question font is `16px / 600 / #0E1525` (shared `FaqSection`).

---

## File map

| File | Role |
| --- | --- |
| `src/app/blog/page.tsx` | hub: heading, featured card, latest grid, FAQ, explore |
| `src/app/blog/[slug]/page.tsx` | post: header, meta badges, hero, Quick Answer, disclaimer, FAQ, related |
| `src/components/blog/blog-card.tsx` | hub article card |
| `src/components/blog/blog-content.tsx` | section grouping into cards + per-type renderers + table |
| `src/data/blog/index.ts` | post registry (hub listing + static params) |
| `src/data/blog/post-modules.ts` | slug → full-data loader; `loadPostImage` for the featured image |
| `src/data/blog/<slug>.ts` | one `BlogPostData` per post |
