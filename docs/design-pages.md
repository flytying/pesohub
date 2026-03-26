# PesoHub Page Patterns

Templates for building specific page types.

---

## Calculator Detail Pages

### Container

```
mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14
```

### Content Section Pattern

```jsx
<section className="mt-16">
  <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
    Section Title
  </h2>
  <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
    Body paragraph text.
  </p>
</section>
```

- Spacing between sections: `mt-16`

### Section Order

1. Page Hero (`bg-brand`)
2. Calculator component
3. Content sections (tips, factors, comparisons, questions)
4. FAQ accordion (wrapped in `<div className="mt-16">`)
5. Related links section

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
