# PesoHub Calculator Design

How calculator tools and their pages are built. Reflects the design-handoff
mockups (`.design-handoff/`). All calculator UI lives in
`src/components/calculators/`; pages live under `src/app/calculators/`.

---

## Anatomy

Every calculator detail page follows the same shape:

1. **Inline page header** — breadcrumb + H1 + intro + "Updated …" line (no dark `PageHero`).
2. **Calculator block** — two columns on desktop: a white **input card** (left) and a coloured **result hero** (right), followed by an optional full-width **compare row**.
3. **Content cards** — explainer/how-it-works/example/tips sections, each a white `CARD`.
4. **FAQ** — bare `FaqSection`, no card wrapper.
5. **Related** — bare link-card grid, no card wrapper.

---

## Accent by category

The result hero colour is keyed to the calculator **category**. Sliders and the
breakdown "total" row follow the same key.

| Category | Calculators | Hero accent | Sliders | Total row |
| --- | --- | --- | --- | --- |
| **Loans** | car, home, personal | **blue** (`accent="blue"`, default) | blue `#1535C7` | `tone="total"` (brand blue) |
| **Salary / SSS / deductions** | take-home, withholding, SSS contribution, SSS pension, SSS loan, 13th month | **green** `#0B8270` (`accent="green"`) | green `#0B8270` | `tone="total-green"` |
| **Saving / planning** | time deposit, emergency fund, savings goal | **purple** `#6D4DE0→#3C2496` (`accent="purple"`) | **blue** `#1535C7` + cyan progress | `tone="total"` (brand blue) |

Gradient tokens (in `src/app/globals.css`):

```
--ph-grad-panel:        linear-gradient(150deg,#1A3AD6,#1430BE,#0E2496)  /* blue */
--ph-grad-panel-green:  linear-gradient(150deg,#0FA88F,#0B8270,#075C50)
--ph-grad-panel-purple: linear-gradient(150deg,#6D4DE0,#5836CC,#3C2496)
--ph-glow-cyan:  radial-gradient(circle,rgba(43,229,223,.45),transparent 70%)  /* blue panel */
--ph-glow-green: radial-gradient(circle,rgba(43,229,223,.28),transparent 68%)  /* green + purple panels */
```

---

## Result components (`gradient-result.tsx`)

### GradientResult

The coloured result panel: glow orb, optional header (label + actions), big
centred figure, then children.

```jsx
<GradientResult
  accent="green"            // "blue" (default) | "green" | "purple"
  label="Take-home pay"
  actions={<ResultActions calculatorType="…" resultsSummary={summary} />}
  eyebrow="NET TAKE-HOME"
  figure={formatPeso(net)}
  sub={`from ₱${formatNumber(gross)} gross per month`}
>
  {/* MixBar / SplitBar, then BreakdownCard */}
</GradientResult>
```

Each accent maps to: panel gradient, glow, drop shadow, and label/eyebrow/sub text colours.

### MixBar + ProgressLine

`MixBar` — multi-segment "where your money goes" bar with a wrapping legend.
Segments with value ≤ 0 are dropped; each flexes by value. `ProgressLine` is the
mint/cyan progress bar usually passed as the MixBar `footer`. Both take `accent`
(matches the hero) which sets the title/legend/value/bar colours.

```jsx
<MixBar
  accent="green"
  title="Where your peso goes"
  segments={[{ label: "SSS", value: sss, color: "#FFB38A" }, …]}
  footer={<ProgressLine accent="green" label="You keep" valueLabel="86% of gross" pct={86} />}
/>
```

`SplitBar` is the older two-segment principal/interest bar (loan calculators, blue only).

### BreakdownCard + BreakdownRow

White card nested inside the hero. `BreakdownRow` tones:

| tone | colour | use |
| --- | --- | --- |
| `default` | ink | plain line |
| `negative` | `#C0392B` | a deduction (`−₱…`) |
| `positive` | `#0E9F6E` | an addition (`+₱…`) |
| `total` | brand blue | final total on blue/purple calculators |
| `total-green` | `#0B8270` | final total on green calculators |

Use `strong` on the final total row.

---

## Field components (`green-fields.tsx`)

Accent-aware inputs. `accent` is `"green"` (default) or `"blue"`; pass the colour
that matches the calculator's slider key (green for salary/SSS, blue for loans &
saving/planning). All three accept an **optional** `tip` — when present it renders
an `InfoTip` (ℹ) beside the label instead of helper text below the field.

- **`MoneyField`** — ₱ number input + slider (amounts).
- **`SelectField`** — styled native `<select>` (membership type, pay frequency, etc).
- **`GreenSlider`** — label + value readout above a slider (rate, term, expense rows).

```jsx
<MoneyField accent="blue" label="Deposit amount" tip="…" value={amt} onChange={setAmt} min={1000} max={5_000_000} step={10_000} />
<GreenSlider accent="green" label="Average monthly salary credit" tip="…" value={amsc} display={`₱${formatNumber(amsc)}`} min={5000} max={35000} step={500} onChange={setAmsc} />
```

### InfoTip (`info-tip.tsx`)

Supporting/helper text lives in a tooltip beside the field label, **not** below the
input. `CalculatorInput` folds its `helpText`/`tooltip` into the same pattern.
This keeps every calculator form compact and consistent.

### ResultActions (`result-actions.tsx`)

Save + print (email) buttons shown in the hero header. Pass `calculatorType` and a
`resultsSummary` string.

---

## Page treatment

### Container (matches the global footer — see design-layouts.md)

```
mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]
```

### Shared per-page constants

```js
const CARD = "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2   = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";
```

### Section order

1. Inline header (breadcrumb + `h1` + intro + `Clock` "Updated …").
2. `<div id="calculator" className="scroll-mt-20">` → the calculator component.
3. `<div className="mt-9 space-y-[14px]">` wrapping the content `CARD` sections + a yellow disclaimer.
4. **FAQ** — `<section className="pt-7"><FaqSection …/></section>`.
5. **Related** — `<section className="pt-7">` with the bare link-card grid.

### FAQ + Related spacing

FAQ and Related are **never** wrapped in a card. Inside the tight
`space-y-[14px]` card stack they need extra breathing room: add **`pt-7`** to
both `<section>` wrappers (`space-y` has high specificity, so padding — not
margin — is used). Pages that separate sections with `mt-16` are already roomy
and need no `pt-7`. See design-components.md → Related Page Links / FAQ Accordion.

### Content datatables

Worked-example tables: bordered `rounded-[14px]` wrapper, rows split by
`border-b border-[#EEF1F7]`, the total/subtotal row tinted (`bg-[#EAF5F1]` green,
`bg-[#F1ECFB]` purple, `bg-[#F4F7FE]` blue) with the value in the accent colour.

---

## File map

| File | Role |
| --- | --- |
| `gradient-result.tsx` | `GradientResult`, `MixBar`, `ProgressLine`, `SplitBar`, `BreakdownCard`, `BreakdownRow` |
| `green-fields.tsx` | `MoneyField`, `SelectField`, `GreenSlider` (accent-aware) |
| `info-tip.tsx` | `InfoTip` label tooltip |
| `calculator-input.tsx` | legacy combined input (number + slider + tooltip) |
| `result-actions.tsx` | save / print actions |
| `<name>-calculator.tsx` | one client component per calculator |
| pure calc libs | `src/lib/calculators/*` (no UI, no side effects) |
