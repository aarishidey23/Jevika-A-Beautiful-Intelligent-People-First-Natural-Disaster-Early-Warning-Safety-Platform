---
name: Jeevika Humanitarian Safety Platform
colors:
  surface: '#f7f9ff'
  surface-dim: '#cadcef'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e2efff'
  surface-container-high: '#d8eafe'
  surface-container-highest: '#d2e4f8'
  on-surface: '#0b1d2b'
  on-surface-variant: '#3e4948'
  inverse-surface: '#213241'
  inverse-on-surface: '#e7f2ff'
  outline: '#6e7978'
  outline-variant: '#bdc9c7'
  surface-tint: '#006a66'
  primary: '#00635e'
  on-primary: '#ffffff'
  primary-container: '#167d78'
  on-primary-container: '#cdfffa'
  inverse-primary: '#7dd5cf'
  secondary: '#066c45'
  on-secondary: '#ffffff'
  secondary-container: '#9ef5c2'
  on-secondary-container: '#13734b'
  tertiary: '#495a65'
  on-tertiary: '#ffffff'
  tertiary-container: '#61737e'
  on-tertiary-container: '#edf7ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9af2eb'
  primary-fixed-dim: '#7dd5cf'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#00504c'
  secondary-fixed: '#9ef5c2'
  secondary-fixed-dim: '#82d8a8'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005233'
  tertiary-fixed: '#d2e5f2'
  tertiary-fixed-dim: '#b6c9d6'
  on-tertiary-fixed: '#0b1e27'
  on-tertiary-fixed-variant: '#384953'
  background: '#f7f9ff'
  on-background: '#0b1d2b'
  surface-variant: '#d2e4f8'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a human-centered, calming visual language built specifically for high-stress scenarios and natural disaster risk reduction. The design system rejects alarmist, panic-inducing patterns in favor of calm authority, extreme legibility, and psychological reassurance. 

Target users range from everyday citizens with varying degrees of digital literacy to community responders and elderly populations navigating urgent conditions. The interface feels dependable, protective, and unmistakably distinct from bureaucratic institutional dashboards or hyper-technical GIS consoles.

### Visual Aesthetic & Philosophy
The aesthetic fuses **Modern Organic Minimalism** with **Tactile Clarity**:
- **Zero Panic Clutter:** White space, deliberate negative zones, and structured micro-content eliminate decision paralysis.
- **Calm, High-Contrast Structuring:** Solid tonal blocks, soft ambient pill shapes, and natural earthy hues balance institutional urgency with human warmth.
- **Cognitive Ease:** Critical actions require no ambiguity—large touch targets, dual-signal indicators (color paired with unambiguous iconography and plain-language copy), and distinct content card tiers ensure rapid comprehension during emergencies.

## Colors

The palette establishes an emotional gradient ranging from safety and reassurance to urgent community protection.

### Primary & Functional Roles
- **Primary Teal (`#167D78`):** The anchor of trust, resilience, and institutional stability. Used for primary navigation, critical interactive targets, and primary brand indicators.
- **Mint Reassurance (`#DDF4E9`):** A soft, calming surface tone applied to success states, active safe-status banners, and supportive callouts.
- **Canvas Ivory (`#FAFBF7`):** The non-glare, warm background surface that replaces harsh cold whites, reducing eye strain in direct sunlight or nighttime conditions.
- **Slate Text (`#263746`):** The foundational neutral for all typography, borders, and structured hierarchy, maintaining strict WCAG AAA contrast against ivory and mint.
- **Atmospheric Sky (`#DCEFFC`):** Designated strictly for informational elements, water alerts, meteorology modules, and ambient context cards.

### Emergency Tiers (Hazard Hierarchy)
Color signals are strictly reserved to prevent alert fatigue:
1. **Verified Safe / Success (`#3D9368` - Leaf Green):** Family check-ins confirmed, route safe, checklist resolved.
2. **Caution / Watch (`#F3B94F` - Warm Amber):** Preparation notices, weather deterioration within 48 hours.
3. **Important Warning (`#E88745` - Alert Orange):** Evacuation preparation, structural warnings, immediate route closures.
4. **Urgent Hazard / SOS (`#C94242` - Emergency Red):** Immediate life threat, flash flood alerts, official order to seek shelter. Never used for non-critical notifications.

## Typography

The design system utilizes **Plus Jakarta Sans** across all roles. Its geometric foundation provides crisp, contemporary readability, while its humanist apertures and wide counters maximize legibility on low-resolution mobile devices and under degraded visibility (e.g., heavy rain, glare, or motion).

### Implementation Rules
- **No Light Weights:** 300-weight styles are strictly forbidden. Baseline body typography starts at 400 with high stroke clarity.
- **Reading Comfort:** Body copy leverages relaxed line heights (1.5x to 1.6x) to avoid cognitive fatigue during stressful moments.
- **Label Scannability:** All status labels, priority tags, and tactical guidance instructions utilize semi-bold or bold weights with gentle letter-spacing for instantaneous identification.

## Layout & Spacing

A responsive 12-column grid anchors the platform on desktop screens (max-width `1280px`), adapting down to a 6-column grid on tablet (`768px - 1023px`) and a 4-column single-stream stack on mobile (`< 768px`).

### Ergonomics & Spacing Philosophy
- **Thumb-Zone Safety:** On mobile viewport sizes, key action buttons and status toggles (such as "I Am Safe" or "Request Aid") are sticky-pinned to the bottom ergonomic action zone.
- **Rhythm Multiples:** All internal spacing operates on a solid 8pt base grid (`space-xs: 4px`, `space-sm: 8px`, `space-md: 16px`, `space-lg: 24px`, `space-xl: 40px`).
- **Breathing Density:** Emergency broadcast banners and priority instruction cards enforce `space-lg` internal padding, creating an unhurried, reassuring presence that reduces cognitive overload.

## Elevation & Depth

This system avoids aggressive, harsh drop shadows and skeuomorphic complexity. Depth is generated through **Tonal Layering** accompanied by low-opacity, warm ambient shadows that emulate soft daylight.

### Elevation Scales
1. **Level 0 (Base Canvas):** Solid Soft Ivory (`#FAFBF7`). Flat baseline.
2. **Level 1 (Content Surfaces & Structural Cards):** Pure white (`#FFFFFF`) or tinted mint/sky containers framed with a delicate, low-contrast border: `1px solid rgba(38, 55, 70, 0.08)`. Shadow: `0 2px 8px -2px rgba(38, 55, 70, 0.04)`.
3. **Level 2 (Interactive Modules & Accordions):** Elevated cards, safety checklist drawers, and interactive status modules. Shadow: `0 8px 24px -4px rgba(38, 55, 70, 0.08), 0 2px 6px -1px rgba(38, 55, 70, 0.04)`.
4. **Level 3 (Urgent Broadcasts, Modals, & Bottom Sheets):** Emergency alerts and critical action overlays. Shadow: `0 16px 40px -6px rgba(38, 55, 70, 0.14), 0 4px 12px -2px rgba(38, 55, 70, 0.06)`.

Emergency alert panels utilize a dual-border treatment: an outer structural card resting on Level 3 depth with a prominent 6px solid accent border along the leading inline edge (Amber, Orange, or Emergency Red).

## Shapes

The design system employs a **Rounded** shape language (baseline `0.5rem` / `8px` up to `1rem` / `16px` for cards).

### Geometry Guidelines
- **Controls & Buttons:** Configured with `0.75rem` (12px) rounding, striking an optimal balance between friendly accessibility and institutional seriousness.
- **Status Pills & Micro-Badges:** Fully curved capsules (`9999px`) to immediately convey scannable metadata, such as alert status, timing, and active personnel count.
- **Card Containers:** Shaped with `1rem` (16px) corners to preserve a welcoming, non-clinical aesthetic that avoids aggressive sharp edges.

## Components

### Buttons & Interactive Controls
- **Primary Action (Immediate Assistance / Safe Confirmation):** Background `#167D78`, text `#FFFFFF`. Minimum height of `52px` on mobile screens to ensure reliable touch capture. Focused state features a crisp `3px` offset halo.
- **Reassurance / Verified Button:** Background `#DDF4E9`, text `#167D78`, hover background `#C7EEDC`.
- **Destructive / SOS Action:** Solid `#C94242` background with `#FFFFFF` text. Accompanied by a mandatory icon and touch-hold confirmation mechanic to prevent accidental triggers.

### Alert Banners & Severity Cards
- Built using a structured 3-part anatomy:
  1. **Severity Indicator:** Leading pill badge featuring an unmistakable glyph and text label (e.g., `[!] WARNING`).
  2. **Core Message:** Bold, plain-language instruction (e.g., "Boil Water Notice Active", "High Tide Warning: Stay Indoors").
  3. **Prescribed Action:** Single clear button or deep-link step (e.g., "View Safe Route").
- Avoid flashing animations. Ambient pulsing is limited to SOS live connections using subtle opacity shifts on decorative outer rings.

### Status Chips & Badges
- Pill-shaped (`rounded-full`), padded with `6px 14px`.
- Composed with high-contrast text and a solid 8px status dot indicator on the left side to assist color-blind individuals.

### Form Inputs & Checkboxes
- **Inputs:** Crisp white background framed by a `1.5px` border of `rgba(38, 55, 70, 0.2)`. Active focus transitions to `#167D78` border with a `3px` tint ring.
- **Checkboxes & Radios:** Scaled up to a prominent `24x24px` footprint for rapid, error-free tapping by trembling or elderly hands.

### Community Check-In Card (Specialty Component)
- Distinct modular card built with a soft ivory-to-mint gradient header.
- Displays family or neighborhood status through large, scannable avatar indicators paired with green verified badges (`#3D9368`) or amber pending rings (`#F3B94F`).
- Features a single prominent tap target: "Mark Myself Safe".