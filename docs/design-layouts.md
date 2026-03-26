# PesoHub Page Layouts

Section layouts, backgrounds, header, footer, and responsive patterns.

---

## Header / Navigation

- **Background:** Solid `bg-brand`
- **Logo:** Image (`pesohub-logo.png`), white version
- **Nav links:** `text-white`, hover with `bg-white/20` rounded
- **Search icon:** `text-white`, hover background `bg-white/20`

---

## Inner Page Header (Page Hero)

All inner pages use a brand-blue hero section:

```
bg-brand py-10 text-white sm:py-12
```

### Breadcrumbs

- **Links:** `text-accent-cyan` with `hover:text-white`
- **Current page:** `text-surface-secondary`
- **Separator:** ChevronRight icon, `text-surface-secondary`
- **Font:** `text-[14px]`

### Heading

```
text-[32px] font-medium leading-[48px] sm:text-[48px] sm:leading-[48px]
```

### Description

```
text-[16px] leading-[22px] text-surface-secondary sm:text-[20px] sm:leading-[26px]
```

---

## Section Labels

Uppercase label above a section heading (e.g., "BROWSE BY CATEGORY"):

```
text-[14px] font-bold uppercase tracking-[0.2em] text-brand
```

---

## Section Layouts

### Two-Column (Title Left + Content Right)

Used for: Start Here, Recently Updated, Salary and Deductions

```
grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16
```

- **Left:** H2 heading + Large Text description
- **Right:** 2x2 card grid (`grid gap-5 sm:grid-cols-2`)

### Centered Header + Grid Below

Used for: Browse by Category, Popular Tools

```
text-center  (header)
mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4  (cards)
```

### Three-Column with Dividers

Used for: Why Use PesoHub

```
grid divide-x divide-gray-200 sm:grid-cols-3
```

Each column: `px-8 text-center`

### Standard Grid Section

```
py-16 lg:py-20  (section padding)
mx-auto max-w-6xl px-4 sm:px-6 lg:px-8  (container)
grid gap-5 sm:grid-cols-2 lg:grid-cols-3  (cards)
```

---

## Section Backgrounds

Sections alternate backgrounds for visual rhythm.

### Homepage

1. Hero: `bg-brand`
2. Start Here: `bg-surface-secondary`
3. Browse by Category: `bg-white`
4. Popular Tools: `bg-surface-tertiary`
5. Recently Updated: `bg-white`
6. Why Use PesoHub: `bg-surface-tertiary`
7. Footer: `bg-surface-tertiary`

### Calculator Hub Page

1. Page Hero: `bg-brand`
2. Borrowing Money: `bg-white`
3. Salary and Deductions: `bg-surface-tertiary`
4. Saving and Planning: `bg-white`
5. Disclaimer + FAQ + Related: `bg-white`

---

## Footer

### Layout

12-column grid: `lg:grid-cols-12 lg:gap-x-6`

- Logo + description: `col-span-5`
- Tools: `col-span-2 col-start-7`
- Calculators: `col-span-2`
- PesoHub: `col-span-2`

### Column Heading

```
text-[14px] font-bold uppercase tracking-[0.1em] text-gray-500
```

### Links

```
text-[16px] leading-[22px] text-gray-400 hover:text-gray-500
```

### Bottom Bar

```
bg-gray-500 py-4 text-center text-[14px] text-white
```

---

## Responsive Notes

- **Max width:** `max-w-6xl` for all sections
- All grids collapse to single column on mobile
- Cards stack vertically on small screens
- Footer collapses to 2-column grid on mobile (`grid-cols-2`)
- H1 scales: `text-[32px]` mobile -> `text-[48px]` desktop
