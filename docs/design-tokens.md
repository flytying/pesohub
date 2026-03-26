# PesoHub Design Tokens

Colors, typography, shadows, and Tailwind utilities.

---

## Colors

### Brand

| Token              | Hex       | Usage                        |
| ------------------ | --------- | ---------------------------- |
| `brand`            | `#093CB5` | Primary brand, links, active |
| `accent-cyan`      | `#00D2D8` | CTAs, icon circles, badges   |
| `accent-orange`    | `#E57300` | Warnings, coming soon pills  |
| `brand-dark`       | `#03277D` | Button hover states          |
| `brand-light`      | `#2B55C0` | Sky blue accents             |

### Surface Backgrounds

| Token                | Hex       | Usage                                            |
| -------------------- | --------- | ------------------------------------------------ |
| `surface-primary`    | `#FFFFFF` | Default page background, card fills              |
| `surface-secondary`  | `#EDEEFF` | Start Here section, alternating section          |
| `surface-tertiary`   | `#F5F6FF` | Popular Tools, Why PesoHub, footer, Salary section |
| `surface-quaternary` | `#FCFDFF` | Subtle off-white sections                        |

### Pill Backgrounds

| Token         | Hex       | Usage                            |
| ------------- | --------- | -------------------------------- |
| `pill-blue`   | `#DFF6F7` | Update badges, info pills        |
| `pill-orange` | `#FFF1E4` | Coming soon pills, warning pills |

### Gray Scale

| Token      | Hex       | Usage                          |
| ---------- | --------- | ------------------------------ |
| `gray-500` | `#28314B` | Headings, primary text         |
| `gray-400` | `#474F66` | Body text, descriptions, icons |
| `gray-300` | `#6C748B` | Secondary text, disclaimers    |
| `gray-200` | `#CFD5E4` | Borders, dividers              |
| `gray-100` | `#E3E8F5` | Light borders, card outlines   |
| `gray-50`  | `#EDF1FB` | Icon backgrounds, subtle fills |

---

## Typography

**Font Family:** Public Sans

| Style      | Weight   | Size  | Line Height | Tailwind Classes                                   |
| ---------- | -------- | ----- | ----------- | -------------------------------------------------- |
| H1         | Medium   | 48px  | 48px        | `text-[48px] font-medium leading-[48px]`           |
| H2         | Medium   | 32px  | 48px        | `text-[32px] font-medium leading-[48px]`           |
| H3         | Semibold | 24px  | 30px        | `text-[24px] font-semibold leading-[30px]`         |
| H4         | Semibold | 20px  | 26px        | `text-[20px] font-semibold leading-[26px]`         |
| Body       | Regular  | 16px  | 22px        | `text-[16px] leading-[22px]`                       |
| Body Bold  | Semibold | 16px  | 22px        | `text-[16px] font-semibold leading-[22px]`         |
| Small Text | Regular  | 14px  | auto        | `text-[14px]`                                      |
| Small Bold | Semibold | 14px  | auto        | `text-[14px] font-semibold` or `font-bold`         |
| Large Text | Regular  | 20px  | 26px        | `text-[20px] leading-[26px]`                       |

### Heading Colors

- **H1, H2, H3, H4:** `text-gray-500`
- **Body text:** `text-gray-400`
- **Secondary/muted text:** `text-gray-300`
- **Headings on dark backgrounds (hero):** `text-white`
- **Body on dark backgrounds:** `text-surface-secondary` (`#EDEEFF`)

---

## Shadows

### Card Hover

```
hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]
```

- X: 0, Y: 4, Blur: 12, Color: `#000000` at 4% opacity
- Applied with `transition-shadow duration-200`

---

## Tailwind Custom Colors (globals.css)

All design tokens are registered in `src/app/globals.css` under `@theme inline`:

```
bg-brand, text-brand, hover:bg-brand-dark
bg-accent-cyan, text-accent-cyan
bg-accent-orange, text-accent-orange
bg-surface-secondary, bg-surface-tertiary, bg-surface-quaternary
bg-pill-blue, bg-pill-orange
text-gray-500, text-gray-400, text-gray-300
bg-gray-200, bg-gray-200/20, bg-gray-100, bg-gray-50
```
