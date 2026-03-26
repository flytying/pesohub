# PesoHub UI Components

Reusable component patterns and their Tailwind classes.

---

## Icons

### Inside Cards (Homepage — Start Here)

- **Size:** 64px (`size-16`)
- **Background:** Accent cyan circle with white icon
- **Classes:** `flex size-16 items-center justify-center rounded-full bg-accent-cyan text-white`
- **Icon size within circle:** `size-7` (28px)

### Category Icons (Browse by Category)

- **Size:** 64px (`size-16`)
- **Color:** `text-gray-400` (`#474F66`)
- **Stroke width:** `strokeWidth={1.2}`
- **No background circle**

### Calculator Card Icons

- **Size:** 64px (`size-16`)
- **Color:** `text-gray-400`
- **Stroke width:** `strokeWidth={1.25}`
- **No background, no border** — bare icon aligned with description text

### Feature Card Icons (Detail Pages)

- **Size:** 56px circle (`size-14`)
- **Background:** `rounded-full bg-gray-50 text-brand`
- **Icon size:** `size-6`

### Related Page Link Icons

- **Size:** 36px circle (`size-9`)
- **Background:** `rounded-full bg-gray-50 text-brand`
- **Icon size:** `size-4`

### Why Use PesoHub Icons

- **Size:** 64px (`size-16`)
- **Background:** gray-50 circle, brand text
- **Classes:** `flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand`

### Arrow Icons (Popular Tools cards)

- **Size:** 40px circle (`size-10`)
- **Background:** accent-cyan, white arrow
- **Classes:** `flex size-10 items-center justify-center rounded-full bg-accent-cyan text-white`

---

## Cards

### Rule: No Borders on Colored Backgrounds

Cards on sections with a background color (surface-secondary, surface-tertiary) should have **no border**. Cards on white backgrounds should have `border border-gray-200`.

### Standard Card (on colored background)

```
rounded-xl bg-white p-6 shadow-none
transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]
```

### Bordered Card (on white background)

```
rounded-xl border border-gray-200 bg-white p-6
transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]
```

### Card Content

- **Title:** H4 (`text-[20px] font-semibold leading-[26px]`)
  - Brand color for calculator cards: `text-brand`
  - Gray for other cards: `text-gray-500`
- **Description:** Body (`text-[16px] leading-[22px] text-gray-400`)
- **Padding:** 24px (`p-6`)

### Feature/Factor Cards (Detail Pages)

Bordered cards with icon + title + description:

```jsx
<div className="rounded-xl border border-gray-200 bg-white p-6">
  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-brand">
    <Icon className="size-6" />
  </div>
  <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">{title}</h3>
  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">{description}</p>
</div>
```

Grid: `grid gap-5 sm:grid-cols-2`

---

## Badges / Pills

### Update Badge

```html
<span class="inline-flex items-center gap-1.5 rounded-full bg-pill-blue px-4 py-2 text-[14px] leading-none text-gray-400">
  <Clock class="size-3.5" /> Updated March 19, 2026
</span>
```

### Tool Count Badge

```
rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white
```

### Coming Soon Badge

```
rounded-full bg-pill-orange px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-accent-orange
```

---

## Buttons

### Primary Action Button

Brand blue pill — used for "USE CALCULATOR", "X TOOLS":

```
inline-flex items-center rounded-full bg-brand px-5 py-2.5
text-[14px] font-bold uppercase tracking-wide text-white
transition-colors hover:bg-brand-dark
```

### Primary CTA (Hero)

White pill with accent-cyan arrow circle:

```
inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2
text-sm font-semibold uppercase leading-none tracking-wide text-gray-500
```

### Text Link CTA

```
inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan
```

---

## Lists

### Arrow Lists (replacing bullet points)

```jsx
<ul className="mt-4 space-y-3">
  {items.map((item) => (
    <li className="flex items-center gap-3 text-[16px] leading-[22px] text-gray-400">
      <ArrowRight className="size-4 shrink-0 text-gray-300" />
      {item}
    </li>
  ))}
</ul>
```

### Question Lists (with HelpCircle)

```jsx
<ul className="mt-6 space-y-4">
  {questions.map((q, i) => (
    <li className="flex gap-3 text-[16px] leading-[22px] text-gray-400">
      <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />
      {q}
    </li>
  ))}
</ul>
```

---

## Tables

### Table Header

- **Background:** `bg-gray-50`
- **Text:** `text-[14px] font-semibold text-gray-500`
- **Padding:** `first:pl-6 last:pr-6` to align with card padding

### Table Rows

- **Border:** `border-b border-gray-100`
- **Text:** `text-gray-400`
- **Hover:** `hover:bg-gray-50/50`

---

## Callout / Info Box

```jsx
<div className="flex gap-3 rounded-lg border border-gray-200 bg-gray-200/20 p-6">
  <Info className="mt-0.5 size-5 shrink-0 text-gray-300" />
  <p className="text-[16px] leading-[22px] text-gray-400">Callout text.</p>
</div>
```

Replaces all amber/warning styled boxes.

---

## Related Page Links

Horizontal card links with icon + title + arrow:

```jsx
<Link className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4
  transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
    <Icon className="size-4" />
  </div>
  <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">{title}</span>
  <ArrowRight className="size-4 shrink-0 text-gray-300" />
</Link>
```

Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`

---

## FAQ Accordion

- **Container:** `space-y-3`
- **Item:** `overflow-hidden rounded-lg border border-gray-200 bg-white`
- **Trigger:** `px-5 py-4 text-[20px] font-semibold leading-[26px] text-gray-500`
- **Content:** `px-5 text-[16px] leading-[22px] text-gray-400`
- **Icons:** Plus (+) closed, X (x) open — `size-5 text-gray-400`
