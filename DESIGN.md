# Design System Document

## 1. Overview & Creative North Star
This design system moves away from the rigid, utility-first layouts of traditional pet care websites to embrace a high-end, editorial experience. We are defining our Creative North Star as **"The Organic Curated Sanctuary."**

The goal is to blend the warmth of high-quality pet care with the sophistication of a boutique resort. We achieve this by breaking the standard web grid: utilizing intentional asymmetry, overlapping image compositions, and a dramatic typographic scale. The experience should feel like flipping through a premium lifestyle magazine—spacious, authoritative, yet deeply comforting.

---

## 2. Colors
Our palette is rooted in the natural world, utilizing deep forest teals, sun-dappled greens, and rich wood tones to evoke a sense of outdoor freedom and indoor security.

### Tonal Strategy
*   **Primary (`#083642`) & Primary Container (`#254D59`):** Our foundational "Anchor" colors. Use these for high-authority elements and headers.
*   **Secondary (`#516530`):** Represents the "Lawn and Nature." Use for growth-oriented actions and secondary CTAs.
*   **Tertiary (`#492b07`):** The "Wood Tone." Used sparingly to add warmth, tactile depth, and a sense of premium craftsmanship.

### Signature Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Define boundaries through background shifts (e.g., a `surface-container-low` section against a `surface` background).
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. An inner card (`surface-container-lowest`) should sit atop a section (`surface-container-low`) to create natural, soft depth.
*   **The Glass & Gradient Rule:** For floating navigation or modal overlays, use **Glassmorphism**. Combine `surface` colors at 80% opacity with a `backdrop-blur` of 12px.
*   **Signature Textures:** For Hero sections and primary buttons, use a subtle linear gradient transitioning from `primary` to `primary_container` (135° angle) to provide a "velvet" finish.

---

## 3. Typography
We use a high-contrast serif/sans-serif pairing to establish an editorial hierarchy that feels both heritage-rich and modern.

*   **Display & Headlines (Noto Serif):** Our "Voice of Authority." These should be set with generous leading. Use `display-lg` for hero statements to create a bold, boutique hotel aesthetic.
*   **Titles & Body (Plus Jakarta Sans):** Our "Voice of Clarity." This modern sans-serif provides excellent readability. Use `body-lg` for storytelling and `label-md` for technical details.
*   **Hierarchy Intent:** Large, asymmetrical headlines paired with wide-margined body text create a sense of calm and "breathing room," reassuring the pet owner that their animal is in a peaceful environment.

---

## 4. Elevation & Depth
In this system, depth is a feeling, not a structure. We avoid harsh shadows in favor of light and layering.

*   **The Layering Principle:** Stacking `surface-container` tiers is the primary method of separation.
    *   *Example:* A `surface-container-lowest` card (#ffffff) placed on a `surface-container-low` (#f6f3f2) background provides a clean, "paper-on-table" lift.
*   **Ambient Shadows:** If a floating element is required, use a shadow with a 32px blur, 0% spread, and 6% opacity. The shadow color must be a tinted version of `primary` to maintain a natural, atmospheric look.
*   **The Ghost Border Fallback:** If accessibility requires a stroke, use `outline-variant` at 15% opacity. Never use a 100% opaque border.
*   **Glassmorphism:** Use semi-transparent `surface` containers over high-quality photography. This softens the UI and prevents the content from feeling "pasted" over the images.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `xl` roundedness, white text. No shadow.
*   **Secondary:** `surface-container-highest` fill with `primary` text. Use for less critical actions.
*   **Tertiary:** Ghost style. No background, `primary` text, with an underline that appears on hover.

### Cards & Lists
*   **The "No Divider" Rule:** Forbid 1px horizontal lines. Separate list items using `spacing-6` or subtle alternating background shifts (`surface` to `surface-container-low`).
*   **Pet Profile Cards:** Use `lg` roundedness. Image should be slightly offset or overlapping the card edge to break the container boundary.

### Inputs & Fields
*   **Styling:** Use `surface-container-low` as the field background. No border. On focus, transition to a `ghost border` (20% `primary`) and a slight "lift" using ambient shadows.
*   **Roundedness:** All inputs must follow the `md` (0.75rem) roundedness scale.

### Chips
*   **Selection:** Use `secondary-container` with `on-secondary-container` text. These should feel like soft "pillows" (`rounded-full`).

### Contextual Components (Pet Resort Specials)
*   **Availability Badges:** Small, `glassmorphic` badges placed over pet photos to show real-time "Day Kamp" status.
*   **The "Pet Journal" Timeline:** A vertical layout using `spacing-12` between updates, avoiding lines, using only tonal surface shifts to indicate time blocks.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text blocks and images overlap slightly (e.g., an image with `rounded-xl` tucked behind a headline).
*   **Do** use the full range of `surface-container` tokens to create a "nested" look.
*   **Do** prioritize high-quality photography; the UI should act as a sophisticated frame for the pets.

### Don'ts
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#1b1c1c).
*   **Don't** use 1px solid borders to separate content; it breaks the "Organic Sanctuary" feel.
*   **Don't** use "drop shadows" with high opacity or dark grey colors.
*   **Don't** crowd the layout. If in doubt, add more `spacing-16` or `spacing-20`.