# PesoHub Page Patterns

Templates for building specific page types.

---

## Calculator Detail Pages

> Full calculator styling — result heroes, accent-by-category, field
> components, and the section recipe — lives in
> [design-calculators.md](design-calculators.md). Summary below.

### Container

Matches the global footer width so edges align (see design-layouts.md):

```
mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]
```

### Per-page constants

```js
const CARD = "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2   = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";
```

### Section Order

1. **Inline header** — breadcrumb + `h1` + intro + `Clock` "Updated …" (no dark hero).
2. **Calculator** — `<div id="calculator" className="scroll-mt-20">`. Input card + result hero (accent by category) + optional compare row.
3. **Content** — `<div className="mt-9 space-y-[14px]">` of `CARD` sections + a yellow disclaimer.
4. **FAQ** — bare `FaqSection`, no card, in `<section className="pt-7">`.
5. **Related** — bare link-card grid, no card, in `<section className="pt-7">`.

The result hero accent (blue / green / purple) is keyed to the calculator
category — see [design-calculators.md](design-calculators.md).

### FAQ + Related

Never wrapped in a card. In the tight `space-y-[14px]` stack add `pt-7` to both
wrappers for breathing room (padding, not margin — `space-y` outranks `mt-*`).

### Complete Example (Related Links)

```jsx
<section className="mt-16">
  <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
    Related calculators and guides
  </h2>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {relatedContent.map((item) => {
      const Icon = item.icon;
      return (
        <Link
          href={item.href}
          className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
            <Icon className="size-4" />
          </div>
          <span className="flex-1 text-[16px] font-semibold text-gray-500 group-hover:text-brand">
            {item.title}
          </span>
          <ArrowRight className="size-4 shrink-0 text-gray-300" />
        </Link>
      );
    })}
  </div>
</section>
```

---

## Hub Pages (Calculators, Rates, Guides, Government)

### Section Label + Heading

```jsx
<p className="text-[14px] font-bold uppercase tracking-[0.2em] text-brand">
  SECTION LABEL
</p>
<h2 className="mt-4 text-[24px] font-semibold leading-[30px] text-gray-500">
  Subtitle describing the section
</h2>
```

### Category Group (Two-Column)

```
grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16
```

- **Left:** H2 heading + Large Text description
- **Right:** Card grid (`grid gap-5 sm:grid-cols-2` or `sm:grid-cols-3`)

### Hub Calculator Cards

```
rounded-xl border border-gray-200 bg-white p-6 flex flex-col h-full
```

- **Title:** `text-[20px] font-semibold leading-[26px] text-brand`
- **Description + Icon:** flex row, description left (flex-1), 64px icon right
- **Button:** `mt-auto pt-5` with brand pill button or coming-soon pill
- **On colored backgrounds:** Remove border
