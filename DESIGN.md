# NH3D Visual Identity System (NH3D-VIS)

## 1. Atmosphere & Vibe
- **Theme Paradigm:** Deep Dark OLED / Tech-Noir.
- **Tone:** Professional, precise, mechanical but accessible.
- **Design Read:** High-end 3D manufacturing for both makers and consumers.
- **Dials:**
  - `DESIGN_VARIANCE: 8` (Asymmetric, intentional overlaps)
  - `MOTION_INTENSITY: 7` (Cinematic reveals, smooth spring physics)
  - `VISUAL_DENSITY: 4` (Breathable, content-focused)

## 2. Color Calibration
- **Background (Surface):** `#050505` (OLED Black)
- **Secondary Surface:** `#0a0a0a` (Zinc-950 equivalent)
- **Primary Accent:** `#22d3ee` (Cyan-400 / Electric Cyan)
- **Secondary Accent:** `#164e63` (Teal-900 / Deep Lagoon)
- **Text Primary:** `#f8fafc` (Slate-50 / Near White)
- **Text Secondary:** `#94a3b8` (Slate-400 / Muted Blue-Gray)
- **Banned:** Pure white backgrounds, generic purple/blue gradients, `#000000` (lack of depth).

## 3. Typographic Architecture
- **Font Stack:** 
  - **Sans:** Geist Sans (Precision, modern)
  - **Mono:** Geist Mono (Technical metadata, numbers)
- **Headlines:** `tracking-tighter leading-[0.95] font-black`. 
- **Rule:** Never exceed 3 lines in Hero. Wide containers (`max-w-6xl`).
- **Numbers:** Always Monospaced.

## 4. Component Behavior
- **Architecture:** "Double-Bezel" / Nested Hardware.
  - Cards must have a `ring-1 ring-white/10` and a `bg-white/5` backdrop-blur.
- **Buttons:** 
  - Primary: Full pill-shaped, Electric Cyan background, dark text.
  - Secondary: Ghost with Cyan border, spring hover physics.
- **Radius:** System-wide `12px` (inner) / `18px` (outer).

## 5. Motion Philosophy (GSAP + Motion)
- **Scroll:** Scroll-driven opacity reveals for text.
- **Stagger:** Grid items reveal with `0.05s` delay.
- **Springs:** `stiffness: 100, damping: 20` for all tactile feedback.
- **Hero:** Title reveal using `y: 40` to `y: 0` with `clip-path`.

## 6. Anti-Slop Check (Banned Patterns)
- No `Inter` font.
- No `em-dash (—)`.
- No centered hero sections (Asymmetric 60/40 only).
- No generic 3-column cards (Asymmetric Bento or Masonry only).
