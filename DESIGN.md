---
name: Kush Goel Portfolio
description: A dark mission-control system that proves engineering depth through glass panels, glowing status signals, and precise motion.
colors:
  primary: "#2563eb"
  primary-hover: "#3b82f6"
  accent-cyan: "#22d3ee"
  accent-emerald: "#10b981"
  neutral-bg-deep: "#020617"
  neutral-bg: "#0f172a"
  neutral-surface: "#1e293b"
  neutral-border: "#FFFFFF1A"
  text-primary: "#ffffff"
  text-secondary: "#d1d5db"
  text-muted: "#9ca3af"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  nav-pill:
    backgroundColor: "{colors.neutral-border}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  chip-suggestion:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "{colors.accent-cyan}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  panel-glass:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
---

# Design System: Kush Goel Portfolio

## 1. Overview

**Creative North Star: "Deep Space Dashboard"**

The site reads as instrumentation floating in near-black space: gradients fall from slate to pure black, glass panels hover above that void with backdrop blur, and small glowing signals (an emerald "online" pulse, a cyan highlight) report that the system is live rather than decorative. The personality is confident and technical — restraint carries the weight, not ornament. Every glow, pill, and pulse is functional: it tells the visitor something (this is clickable, this is live, this is currently focused), never purely decorative.

This system explicitly rejects the generic templated-portfolio look: no stock hero-plus-card-grid, no flat white cards, nothing that reads like a resume PDF turned into a webpage. Depth comes from the void-to-glass relationship, not from card borders or drop shadows.

**Key Characteristics:**
- Near-black gradient depth (slate-900 → black) as the base plane, glass panels floating above it
- Three narrow, purposeful accent roles — Signal Blue, Console Cyan, Online Emerald — never blended into a rainbow
- Colored glow in place of hard black shadows
- Full-round shapes for anything interactive (pills, avatars, the chat launcher); generous but not maximal rounding for panels
- Motion that signals liveness (pulse, hover-scale) rather than choreography for its own sake

## 2. Colors

A near-monochrome dark base with three disciplined accent roles, each doing one job.

### Primary
- **Signal Blue** (#2563eb): The action color. Primary buttons (Download Resume), key links, and the anchor stop of every gradient. Hover state lightens to `#3b82f6`.

### Secondary
- **Console Cyan** (#22d3ee): The highlight/live-data color. Suggestion chips, inline emphasis links, gradient midpoints, and the typed-text underline in the intro. Reads as "the system is showing you something current."

### Tertiary
- **Online Emerald** (#10b981): The status signal. Used narrowly and deliberately — the chatbot's "online" dot and its glow ring. Never used for general UI; its rarity is what makes it legible as a status signal.

### Neutral
- **Void Black** (#020617): The deepest point of every background gradient — the "space" the dashboard floats in.
- **Deep Slate** (#0f172a): Primary surface for floating panels (chat window, focused-section overlay).
- **Console Slate** (#1e293b): The app shell background and mid-gradient stop; matches the browser theme-color already set in `index.html`.
- **Instrument Gray** (#d1d5db / #9ca3af): Secondary and muted text — body copy and captions sit at `#d1d5db`, timestamps and eyebrow labels drop to `#9ca3af`.
- **Glass Border** (rgba(255,255,255,0.1)): The hairline on every glass panel and pill — never a solid gray border.

### Named Rules
**The Three-Signal Rule.** Only three accent colors exist: Signal Blue (action), Console Cyan (highlight), Online Emerald (status). A fourth accent hue is never introduced without retiring one of these.

**The Glass-Border Rule.** Panel borders are translucent white (`rgba(255,255,255,0.1)`), never a solid neutral gray — the border should read as light catching an edge, not a drawn line.

## 3. Typography

**Display/Body Font:** ui-sans-serif system stack (system-ui, -apple-system, Segoe UI, Roboto) — no custom webfont is loaded; the system stack keeps load fast and stays legible at every size the dashboard uses.

**Character:** A single technical sans carries every role. Hierarchy comes from weight and size, not from a second family — consistent with a confident, unshowy engineering voice.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3rem)`, 1.1): The intro's "Hi, there" / name line — the one moment the site allows itself full weight.
- **Headline** (600, `clamp(1.875rem, 4vw, 2.25rem)`, 1.2): Section intros ("I'm Kush Goel"), case study titles.
- **Title** (500, 1.25rem, 1.4): Sub-headlines, the typed rotating-text line.
- **Body** (400, 1rem, 1.6): Case study prose, chatbot replies. Cap prose at 65–75ch.
- **Label** (600, 0.75rem, 0.05em tracking, uppercase): Eyebrow text ("Dynamic Website Built Using React.js"), chip text, status captions.

### Named Rules
**The One-Family Rule.** Every text role uses the same system sans stack. A second family is never introduced for "flavor" — hierarchy is weight and size only.

## 4. Elevation

The system conveys depth with layered glass and colored glow, not hard black drop shadows. Panels sit on `backdrop-blur` over the gradient background; their separation from the surface behind them comes from blur and a translucent border, not a dark shadow. Glow shadows are colored to match the element's own accent — a blue/cyan glow under the chat launcher, an emerald glow around the online dot — so the shadow reads as light the element emits, not weight it casts.

### Shadow Vocabulary
- **Ambient panel** (`box-shadow: 0 30px 80px rgba(0,0,0,0.45)`): Under large floating panels (chat window, section overlay) — soft and neutral, just enough to lift it off the background.
- **Accent glow** (`box-shadow: 0 0 20px rgba(16,185,129,0.4)`, brightening to `0 0 25px rgba(16,185,129,0.8)` on hover): Under the chat launcher and status dot — a colored glow, not a gray shadow.
- **Popover** (`box-shadow: 0 4px 6px rgba(0,0,0,0.3)` / `shadow-md`–`shadow-xl` range): Small floating controls (close buttons, dismiss chips).

### Named Rules
**The Colored-Glow Rule.** When an element is meant to feel "live" (the chat launcher, the online status dot), its shadow is a tinted glow in the element's own accent color, never a neutral black shadow.

## 5. Components

Interactive elements are precise and alive: tight, deliberate shapes, with hover and pulse motion that signals the system is running, not decorating.

### Buttons
- **Shape:** 6px radius (`rounded-md`) for solid CTAs; fully round (`rounded-full`) for icon-only and toggle buttons.
- **Primary:** Signal Blue (#2563eb) background, white text, `12px 24px` padding, `font-semibold`, `tracking-wide`.
- **Hover / Focus:** Background lightens to `#3b82f6` over a 300ms transition; icon-only buttons additionally scale up slightly (`hover:scale-110`).
- **Ghost / Icon:** Translucent white background (`bg-white/10`) with a glass border, used for the mode toggle and panel-dismiss controls.

### Chips
- **Style:** Console Cyan at 10% opacity background, Console Cyan text, translucent cyan border, fully round.
- **State:** Hover raises the background to ~20% opacity — no border or text-color change, keeping the chip calm until touched.

### Cards / Panels
- **Corner Style:** 16–24px radius (`rounded-2xl`–`rounded-3xl`) scaling up with panel size — the chat window (largest surface) gets the most generous rounding.
- **Background:** Deep Slate or Console Slate, always with `backdrop-blur-xl`.
- **Shadow Strategy:** Ambient panel shadow (see Elevation); accent glow only on panels that represent something "live" (chat launcher).
- **Border:** 1px translucent white (`border-white/10`) — never a solid gray border.
- **Internal Padding:** 16–20px (`p-4`–`p-5`).

### Navigation
- **Style:** A single glass pill (`bg-white/10 backdrop-blur-md`, `rounded-lg`) centered at the top of the viewport, fixed position.
- **Typography:** Label-weight text, no uppercase.
- **States:** Default → hover darkens toward `bg-gray-600` with rounded corners on the item itself; no active/current-section indicator beyond hover.
- **Mobile:** Collapses to a hamburger icon; the flyout menu reuses the same glass treatment as the main pill.

### Status Signal (signature component)
The small emerald dot with a soft pulse glow (`bg-emerald-500`, `shadow-[0_0_10px_rgba(16,185,129,0.8)]`) that marks the chatbot as "online." This is the system's one deliberate use of animation-as-meaning: the pulse is not decoration, it asserts availability. Never reuse Online Emerald for anything that isn't a live/available status.

## 6. Do's and Don'ts

### Do:
- **Do** keep accent color to the three named roles (Signal Blue, Console Cyan, Online Emerald) — each with one job.
- **Do** use colored glow instead of black drop shadows on anything meant to feel live or interactive.
- **Do** use full-round shapes for every interactive, tappable element (buttons, avatars, chips, the chat launcher).
- **Do** keep borders translucent white (`rgba(255,255,255,0.1)`), never solid gray.
- **Do** let the system sans stack carry the whole hierarchy through weight and size alone.

### Don't:
- **Don't** ship a generic templated-portfolio layout — no stock hero-plus-card-grid-of-projects that reads as bootcamp-issue.
- **Don't** make it feel overly corporate or stiff — nothing that reads like a resume PDF reformatted as a webpage.
- **Don't** introduce a fourth accent hue without retiring one of the existing three.
- **Don't** use a second font family "for flavor" — one system sans stack, weight and size only.
- **Don't** use Online Emerald for anything other than a live/available status signal — its rarity is what makes it legible.
- **Don't** add hard black drop shadows to glass panels — depth comes from blur + translucent border + colored glow, not from `shadow-black`.
