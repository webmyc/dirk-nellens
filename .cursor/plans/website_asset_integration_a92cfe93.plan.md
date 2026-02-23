---
name: Website Asset Integration
overview: Copy assets from filesfromdesigner/ into the Next.js public/ folder, switch to local fonts, build out the multi-page site with verbatim copy and real images, matching the layout exports exactly.
todos:
  - id: copy-assets
    content: Copy and rename fonts, images, and logos from filesfromdesigner/ into public/fonts/, public/images/, public/logo/
    status: completed
  - id: fonts
    content: Switch layout.tsx from Google Fonts to next/font/local using DM Serif Display and Figtree
    status: completed
  - id: shared-components
    content: Create components/Navigation.tsx (accordion mobile menu, real logo), components/Footer.tsx, components/Newsletter.tsx
    status: completed
  - id: home-page
    content: "Rewrite app/page.tsx: correct carousel order (Sessions → Book → Substack), quote block, bio, courses teaser, sessions cards, testimonial (Sophie), book teaser, discover more"
    status: completed
  - id: about-page
    content: Create app/about/page.tsx with verbatim content from mobile-about.txt
    status: completed
  - id: book-page
    content: Create app/book/page.tsx with verbatim content from mobile-book.txt
    status: completed
  - id: courses-page
    content: Create app/courses/page.tsx with verbatim content from mobile-courses.txt
    status: completed
  - id: sessions-page
    content: Create app/sessions/page.tsx with verbatim content from mobile-sessions.txt (all 6 session types)
    status: completed
  - id: next-config
    content: Remove picsum.photos from next.config.ts remotePatterns; add filesfromdesigner/ to .gitignore
    status: completed
  - id: cleanup-commit
    content: Commit and push all changes to GitHub
    status: completed
isProject: false
---

# Website Asset Integration Plan

## Context

The `filesfromdesigner/` folder is present in the workspace root and contains all assets physically on disk. It mirrors what was in `human-design-website/assets/` before the last git pull deleted them. The layout export images have been inspected and reveal several corrections to the original plan.

---

## Key corrections from layout inspection

- **Hero carousel order** (from `430x932px_home-carrousel-v2.jpg`):
  - Slide 1: Sessions — collage image + `"Dirk's unique Human Design Sessions integrate therapeutic and meditative processes"` + `Book a session`
  - Slide 2: Book — book cover + `"'Understanding our Energetic Architecture' is now available on Amazon"` + `Shop the book`
  - Slide 3: Substack — Substack icon + `"Articles by Dirk on Human Design available on Substack"` + `Read the articles`
- **Testimonial attribution is "Sophie"**, not "Ana" (from `430x932px_home-testimonials-carrousel-v2.jpg`)
- **Testimonial carousel** has 3 slides, each with a different collage image alongside the quote
- **Mobile menu** is an **accordion** (not a full overlay) — items collapse/expand with chevrons; social icons (Instagram, YouTube, Facebook, Substack) appear at the bottom (from `430x932px_home-menu-v2.jpg`)
- **Footer social icons**: Instagram, YouTube, Facebook, Substack — not Twitter
- **Desktop nav** (from `1920x1080px_home-v1.jpg.png`): logo symbol + `Dirk Nellens / Human Design`, then nav items: `Online Courses ▼`, `Human Design & Therapy Sessions ▼`, `Book`, `Media`, `About`, `Articles on Substack` (with orange Substack icon pill)

---

## 1. Copy & Organize Assets

Source: `filesfromdesigner/human-design-website/assets/`

```
public/
  fonts/
    DMSerifDisplay-Regular.ttf
    DMSerifDisplay-Italic.ttf
    Figtree-Regular.ttf
    Figtree-Light.ttf
    Figtree-Medium.ttf
    Figtree-LightItalic.ttf
  images/
    dirk-1.jpg              ← dirk-nellens-1.jpg
    dirk-2.jpg              ← dirk-nellens-2.jpg
    dirk-3.jpg              ← dirk-nellens-3.jpg
    book-cover.jpg          ← dirk-nellens-book-...-cover.jpg
    book-1.jpg              ← dirk-nellens-book-...-1.jpg
    book-2.png              ← dirk-nellens-book-...-2.png
    book-3.jpg              ← dirk-nellens-book-...-3.jpg
    book-transparent.png    ← dirk-nellens-book-...-transparent.png
    bg-black.jpg            ← background-texture-black.jpg
    bg-orange.jpg           ← background-texture-orange.jpg
    talk-1.png              ← dirk-nellens-human-design-talk-1.png
    talk-2.png              ← dirk-nellens-human-design-talk-2.png
    collage-ajna.png        ← dirk-nellens-human-design-collage-ajna-center.png
    collage-ajna-composition.png
    collage-g-center.png
    collage-g-center-composition.png
    collage-head.png
    collage-head-composition.png
    collage-heart.png       ← used in Session hero slide 1
    collage-heart-composition.png
    collage-root.png
    collage-root-composition.png
    collage-sacral.png
    collage-sacral-composition.png
    collage-solar-plexus.png
    collage-solar-plexus-composition.png
    collage-spleen.png
    collage-spleen-composition.png
    collage-throat.png
    collage-throat-composition.png
    collage-centering-circuit.png
    collage-defense-circuit.png
    collage-ego-circuit.png
    collage-integration-channels.png
    collage-knowing-circuit.png
    collage-sensing-circuit.png
    collage-understanding-circuit.png
    substack.png
    substack-orange.png
    social-icons-black.png
    social-icons-white.png
  logo/
    logo-black.png          ← dirk-nellens-logo-black.png
    logo-white.png
    logo-symbol-black.png   ← dirk-nellens-logo-symbol-black.png
    logo-symbol-white.png
```

Add `filesfromdesigner/` to `.gitignore` (designer staging folder, not for commit).

---

## 2. Switch to Local Fonts

Update `[app/layout.tsx](app/layout.tsx)` — replace Google Fonts (`Inter` + `Playfair_Display`) with `next/font/local`:

```tsx
import localFont from 'next/font/local';

const serif = localFont({
  src: [
    { path: '../public/fonts/DMSerifDisplay-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/DMSerifDisplay-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
});

const sans = localFont({
  src: [
    { path: '../public/fonts/Figtree-Regular.ttf', weight: '400' },
    { path: '../public/fonts/Figtree-Light.ttf', weight: '300' },
    { path: '../public/fonts/Figtree-Medium.ttf', weight: '500' },
  ],
  variable: '--font-sans',
});
```

---

## 3. Create Shared Components

### `components/Navigation.tsx`

- Desktop: `logo-symbol-black.png` + `Dirk Nellens / Human Design` wordmark; nav links; `Articles on Substack` pill with `substack-orange.png` icon
- Mobile: hamburger → accordion menu (each top-level item toggles with chevron); sessions sub-items list all 6 sessions; social icons row (Instagram, YouTube, Facebook, Substack) at bottom of overlay
- Sticky on scroll with bg fade-in (matches existing behavior)

### `components/Footer.tsx`

Verbatim columns from `mobile-home.txt`:

- Courses: Human Design Analysis, Connection Chart Analysis, Human Design & Personal Guidance, View All Courses
- Human Design & Therapy Sessions: all 6 session types + View All Sessions
- Media: Podcasts, Videos
- About: Dirk, Speaking, Contact
- Writings: Books, Articles on Substack
- Social links: Instagram, YouTube, Facebook, Substack icons

### `components/Newsletter.tsx`

`"Deepen your life journey with Dirk's Reflector Reflections, including Human Design insights and Neutrino reports"` + email input + Sign up — reused on all pages.

---

## 4. Build the 5 Pages

### `app/page.tsx` — Home

- **Hero carousel — 3 slides (orange `#D96C40` bg with dot overlay)**:
  1. `collage-heart.png` + `"Dirk's unique Human Design Sessions integrate therapeutic and meditative processes"` + `Book a session` button
  2. `book-transparent.png` + `"'Understanding our Energetic Architecture' is now available on Amazon"` + `Shop the book` button
  3. `substack.png` icon + `"Articles by Dirk on Human Design available on Substack"` + `Read the articles` button
- **Quote block**: `"Human Design is not about what you know—it's about how you live, and about letting the process of awareness transform you from within."`
- **About teaser** (white bg): `dirk-1.jpg` + 4-paragraph bio (verbatim from `mobile-home.txt`) + `Learn more →` `/about`
- **Courses teaser**: Dirk's `"Now What?"` quote + `Find out more →` `/courses`
- **Sessions teaser** (4 cards from home page — Personal, Connection, Personal Guidance, Opening to Change) + `Find out more` per card
- **Testimonial carousel**: 3 slides each with collage image + quote `"Dirk introduced me to my Bodygraph..."` — **Sophie** (not Ana)
- **Book section**: `book-cover.jpg` + excerpt from `mobile-home.txt` book teaser + `Buy the book →` `/book`
- **Discover More**: collage composition image + `Articles on Substack` + `Podcasts` buttons
- **Newsletter** component → **Footer** component

### `app/about/page.tsx` — About

Verbatim from `mobile-about.txt`:

- Hero quote: `"Evolution is clearly inviting us to go inwards. — Dirk Nellens"` on dark/`bg-black.jpg` texture
- Full bio (5 paragraphs including MSc/LSE/Law background)
- **Speaking** section with `talk-1.png` and `talk-2.png`
- Contact email `dirknellens@nellens.com`
- Closing quote: `"It is a joy and an honour to be a part of your journey..."`
- Newsletter → Footer

### `app/book/page.tsx` — Book

Verbatim from `mobile-book.txt`:

- Opening: `"What if your deepest struggles..."`; book description; 5-bullet + 3-bullet lists
- CTA: `"Shop the book"` + `"Read an excerpt"` with `book-cover.jpg` / `book-transparent.png`
- Pull quote: `"If you feel called to understand yourself..."`
- Full book description text (who it's for: parents, therapists, spiritual seekers, anthropologists)
- Author bio teaser
- Newsletter → Footer

### `app/courses/page.tsx` — Online Courses

Verbatim from `mobile-courses.txt`:

- Heading: `Courses taught by Dirk`
- Intro paragraph + Dirk's `"Now What?"` quote
- Note: individual course detail copy not yet provided by client — display the intro and Dirk's quote; course cards show TBA title/description
- Author bio teaser
- Newsletter → Footer

### `app/sessions/page.tsx` — Sessions

Opening quote: `"Our journey is one of peeling away what is not truly us. Human Design and psychotherapy can work in powerful synergy towards this."`

6 session cards (verbatim from `mobile-sessions.txt`), each with full description, bullets where present, `"Every session is recorded..."` note, `"Sessions take place via Zoom"`, and `Book a session` CTA:

1. Human Design Personal Chart Analysis (4-bullet list)
2. Human Design Connection Chart Analysis
3. Human Design & Personal Guidance
4. 'Opening to Change' Session (3-bullet list)
5. Codependency & Inner Child Healing Session
6. Couples Therapy Session

Newsletter → Footer

---

## 5. Config Updates

- `[next.config.ts](next.config.ts)`: remove `picsum.photos` from `remotePatterns`
- `[.gitignore](.gitignore)`: add `filesfromdesigner/` line

---

## 6. Commit & Push

```bash
git add .
git commit -m "feat: integrate real assets, local fonts, verbatim copy, multi-page structure"
git push origin main
```

