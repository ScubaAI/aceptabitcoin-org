🕶️ Design System: "Cypherpunk Bank / Oracle System" (v3.0)

Proyecto: Acepta Bitcoin México (aceptabitcoin-org)
Estética: Cypherpunk Bank × Tron × The Matrix — Sovereign Infrastructure, Terminal UI, High Contrast.
Versión: 3.0 — primera reescritura mayor desde v2.0 ("Bitcoin Matrix")
Última actualización: Session 4 — Oracle System consolidation

📑 Tabla de Contenidos
1. What's New in v3.0
2. Philosophy
3. Color Tokens
4. Typography & Real-World Pairings
5. Effects Library
6. Animation Grammar
7. Tier / Emphasis System
8. Component Inventory
9. Pattern Library
10. Oracle Voice (BOB + Wisdom Logs + System Messages)
11. lib/ Conventions
12. Content vs. Code (the data/ rule)
13. Accessibility Patterns
14. Module Inventory
15. Implementation Rules for AI
16. Tech Stack
17. References (canonical files)
18. What's NOT in this document

0. What's New in v3.0
v2.0 ("Bitcoin Matrix")	v3.0 ("Cypherpunk Bank / Oracle System")
Two colors (matrix, bitcoin)	Full palette incl. orange-300/400/500, accent (Tron cyan), tinted borders
No tier system	low | medium | high tier system, backed by boxShadow tokens
Patterns: just "glass + glow"	Named pattern library: Timechain Card, Oracle System Modal, Connector Line, Wisdom Log, etc.
BOB was a feature	Oracle Voice — a unified persona philosophy spanning BOB, Wisdom Logs, timechain blocks, system errors
Bilingual code comments	Documented bilingual style as a rule (Spanish narrative + English tech)
Implicit naming	Explicit naming rules: PascalCase = custom, kebab-case = shadcn primitive, data/ = content
Implicit lib/ structure	Documented lib/ conventions: Adapter/Service, Persona-as-Module, Constants-as-Design-Tokens
No module skeleton	Hackathon's layout/hero/display/content/forms/interactive/ anatomy proposed as the canonical feature-module skeleton
Tron cyan was forbidden	Relaxed to a secondary accent with explicit "use matrix first, accent second" rule
Tailwind config under-documented	tailwind.config.ts tokens (colors, shadows, keyframes) are now first-class

1. Philosophy
The project is a sovereign infrastructure narrative, not a marketing site. Every visual decision should reinforce one of three pillars:

1. Sovereignty — the user owns their money, their data, their keys. No third-party dependencies the user can't audit or replace. Visual analogue: flat, exposed, no skeuomorphism. If you can tell it's a button, it's not pretending to be a physical thing.
2. Terminal UI — the system speaks to operators, not consumers. The user is a node operator, a developer, a cypherpunk. Visual analogue: mono fonts for everything technical, system-prompt aesthetic for chrome, no hand-holding language.
3. High Contrast — information is the design. No decorative gradients that don't carry meaning. Color is a signal, not a vibe. Visual analogue: black background, two main hues (matrix green + bitcoin orange), one accent (Tron cyan).
When in doubt: Would this make sense on a 1985 mainframe? If yes, ship it. If it would look at home in a SaaS landing page, reconsider.

Anti-Aesthetic Checklist (DO NOT do these)
❌ No skeuomorphic depth (fake 3D buttons, leather textures, glossy surfaces). See §4 Effects for the one approved use of depth: neon glow.
❌ No drop shadows on white surfaces (use colored glows on black instead).
❌ No gray-on-gray color schemes. Either pure black or pure tinted.
❌ No opacity to fake visual hierarchy among peer elements. See §6 Tier System — opacity is allowed for de-emphasizing inactive state in a context where the active is established.
❌ No generic tech-bro gradients (purple-to-blue, etc.). The palette is locked.
❌ No emoji as decoration in chrome (titles, buttons). Emoji are semantic content — they belong in aria-labeld status displays, not in CTAs.

2. Color Tokens
All colors live in two places: app/globals.css (CSS variables) and tailwind.config.ts (Tailwind references). Always reference the token, never the hex.

2.1 Core Tokens
Token	Hex	CSS Variable	Tailwind Class	Function
bg	#000000	--background	bg-black	App background, OLED depth
fg	#FAFAFA	--foreground	text-[#FAFAFA]	Primary text (default)
matrix	#00FF41	--matrix	text-matrix, bg-matrix, border-matrix	System status, data, technical info, BOB, the "code"
bitcoin	#F7931A	--bitcoin	text-bitcoin, bg-bitcoin, border-bitcoin	CTAs, money, value, primary actions
accent	#06B6D4	--accent (HSL)	text-accent, bg-accent	Secondary highlight — Tron cyan. Use sparingly.
orange-500	#F97316	--orange-500	text-orange-500, bg-orange-500	Section headers, financial accents (a third tier of orange)	orange-400	(lighter)	--orange-400	text-orange-400	Lighter variant
orange-300	(lightest)	--orange-300	text-orange-300	Lightest variant

2.2 Semantic Tokens (use these names, not raw colors)
Online / Success: text-matrix + animate-pulse dot
Caution / Elevated: text-red-500 (DCA ≥ 80, etc.) — not bitcoin orange, red is reserved for warning
Neutral / Loading: text-gray-400 (a deliberately desaturated gray for system messages, not for hierarchy)
Disabled: text-gray-500 / bg-gray-800 for disabled: states

2.3 Tinted Borders (the third color pattern)
This is the rule v2.0 didn't have: borders are rarely full-saturation. Three patterns:

Pattern	Example	Use
Solid full-alpha	border-matrix	Active state, selected chip, the one element in focus
Tinted (10–40% alpha)	border-matrix/30, border-bitcoin/40	Inactive cards, system pills, section dividers
Tinted bg + solid border	bg-bitcoin/10 border-2 border-bitcoin/40	"Highlighted but not screaming" containers (CTA in popovers)
Rule: if a border doesn't carry a state (active/selected/CTA), it should be tinted. Full-alpha borders are loud by design — use them sparingly.

2.4 Glow Tokens (boxShadow)
Already defined in tailwind.config.ts. Use these names, not inline shadow-[...]:

Class	Effect	When
shadow-bitcoin	Orange 20%-alpha, 20px	Default on bitcoin CTAs
shadow-bitcoin-hover	Orange 60%-alpha, 35px	Hover on bitcoin CTAs
shadow-matrix	Green 20%-alpha, 15px	Default on matrix pills
shadow-matrix-hover	Green 40%-alpha, 25px	Hover on matrix elements
shadow-matrix-strong	Green 60%-alpha, 40px	"Always on" emphasis (e.g., the highest CTA tier)
shadow-orange / shadow-orange-hover	Orange 30%/50% alpha	Section header accents
shadow-terminal	Green 15%-alpha, 12px	Subtle inline glow
If you need a glow that isn't in this list, add a new token to tailwind.config.ts first, then use it. Don't sprinkle inline shadow-[0_0_25px_rgba(...)] across the codebase.

3. Typography & Real-World Pairings
Three families, each with a job. The mapping in tailwind.config.ts:

font-serif → IBM Plex Serif (titles, institutional)
font-mono → Fira Code (technical, body, system)
font-vt323 → VT323 (arcade, system status, terminal)

3.1 The Pairing Rules (from real shipped code)
These are the actual pairings used in the codebase. Stick to these until you have a reason to break them:

Context	Family	Size Class	Color	Reference
Page H1 (Nuestra Historia)	font-serif	text-6xl md:text-7xl	text-[#FAFAFA]	app/nuestra-historia/page.tsx
Section title (e.g., "CON TU APOYO CRECEMOS LA RED")	font-serif	text-5xl sm:text-6xl	text-white	TipJarSection
Component H3 (e.g., "Mejora tu Costo Promedio")	font-serif	text-lg font-bold	text-white	MarketMoodWidget
Block height in timechain (#001, #002)	font-vt323	text-4xl	text-white	NuestraHistoriaPage
Section badges / system labels	font-vt323	text-xs sm:text-sm	text-matrix or text-bitcoin	MarketMoodWidget, TipJar header pill
Modal header (GUÍA DCA • ORACLE.EDU)	font-vt323	text-2xl	text-matrix tracking-wider	MarketMoodInfoPopover
BOB chat subtitle (BITCOIN OPERATED BRAIN)	font-vt323	text-xs	text-matrix	BobChatWidget
BOB chat user bubble	font-serif	text-sm	text-[#FAFAFA]	ChatBubble (extracted)
BOB chat assistant bubble	font-mono	text-sm	text-[#FAFAFA]	ChatBubble (extracted)
Body / descriptions	font-mono	text-xs sm:text-sm	text-gray-300 or text-gray-400	everywhere
Form labels (uppercase metadata)	font-mono	text-[10px] tracking-wider uppercase	text-gray-500	MarketMoodWidget, forms
Data values (price, hash, timestamp)	font-mono	varies, often tabular-nums	text-white or text-matrix	MarketMoodWidget, NuestraHistoriaPage
CTA buttons (default)	font-mono	text-lg md:text-xl	text-black on bg-bitcoin	ArcadeButton

3.2 What NOT to do
❌ Don't use font-vt323 for long body text. It's a display face.
❌ Don't use font-serif for code or data. Serif is for authority, not data.
❌ Don't combine font-mono + font-vt323 in the same line. Pick one "system" voice.
❌ Don't use font-sans unless you're rendering shadcn primitives unmodified.

4. Effects Library
The five core effects. Use them by name; treat them as tokens.

4.1 Glassmorphism "Bunker"
Cards, modals, navbar, panels:

tsx

Copy
className="bg-black/80 backdrop-blur-md border border-white/10"
bg-black/80 minimum — never lower (the system should never feel hazy)
backdrop-blur-md for cards, backdrop-blur-xl for modals
Border always border-white/10 or border-white/20 — never border-white

4.2 Scanlines
Two flavors:

Full-card scanline (subtle, background texture):

tsx

Copy
className="bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] animate-scanline"
Used on the TipJarSection main card.
Top-edge sweep (live status, branded color):

tsx

Copy
<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
Used on MarketMoodWidget, the popover modal, BOB chat header. Always pairs with via-{color}/60 and ends in transparent.

4.3 Neon Glow
See §2.4 — use the tokens. Inline shadow-[0_0_25px_rgba(...)] is allowed only inside component definitions that own a particular glow (e.g., ArcadeButton tier="high" uses shadow-bitcoin-hover).

4.4 Grid Backgrounds
Two sizes, two colors. In tailwind.config.ts as utilities:

bg-matrix-grid + bg-grid-50 — 50px matrix-green grid (used on NuestraHistoriaPage main bg, MarketMoodWidget overlay)
bg-bitcoin-grid + bg-grid-50 — same but orange (used on financial sections)
bg-matrix-grid + bg-grid-40 — denser, 40px (used on BOB chat, popover)
The grid is always overlaid at 30–40% opacity. It's a texture, not a feature.

4.5 Tron Corner Brackets
The signature decoration. Three scales:

Large (8×8): page-level chrome (BobChatWidget hero, popover modal corners)
Medium (6×6): card-level accents (NuestraHistoriaPage blocks, TimechainBlock)
Small (5×5): pill-level (MarketMoodInfoPopover dialog, tight components)
Pattern: position the bracket at a corner with border-{side}-2 border-{corner}-2. Always border-current/30 or border-{color}/30 to inherit the parent's color, never solid.

tsx

Copy
<div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-matrix/30 opacity-50 pointer-events-none" />

<div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-matrix/30 opacity-50 pointer-events-none" />
The diagonal pair (top-right + bottom-left) is the canonical Oracle System signature. The other two corners are usually empty.

5. Animation Grammar
The system uses two animation libraries with a clear separation of concerns:

Library	Use For	Examples
Framer Motion	Component-internal mount/exit, micro-interactions, AnimatePresence, layout transitions	Modal open/close, message bubbles, tab switching, button press
GSAP + ScrollTrigger	Scroll-synced choreography, 3D camera effects, complex timelines, infinite loops	Timechain block cascade, background grid drift, hero entrance, particles

5.1 Framer Motion Patterns
Tab content in TipJarSection: initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} inside <AnimatePresence mode="wait">
Chat bubbles in BobChatWidget: initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
Modal panels (popover, BOB floating): scale 0.98 → 1.0 + y 20 → 0, duration 0.15
FAB button: whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}

5.2 GSAP Patterns
The useGSAP hook from @gsap/react is the standard. Always scope to a ref.

5.2.1 Scroll Cascade (3D)
Used in NuestraHistoriaPage block entrance. The pattern:

tsx

Copy
gsap.from(block, {

  opacity: 0,

  y: 100,

  rotationX: 15,

  scale: 0.9,

  duration: 1,

  delay: 0.1 * index,

  ease: "power3.out",

  scrollTrigger: {

    trigger: block,

    start: "top bottom-=100",

    toggleActions: "play none none reverse",

  },

  transformPerspective: 800,

});
Key elements: rotationX: 15 for 3D entrance, transformPerspective: 800, staggered delay: 0.1 * index, and toggleActions: "play none none reverse" (play on enter, reverse on leave — never reset).

5.2.2 Connector Line Sync
Connector lines between elements should animate with the elements they connect:

tsx

Copy
gsap.from(line, {

  scaleY: 0,

  transformOrigin: 'top',

  duration: 1.5,

  ease: 'power2.out',

  scrollTrigger: {

    trigger: line,

    start: 'top center',

    toggleActions: 'play none none reverse',

  }

});
scaleY: 0 with transformOrigin: 'top' means the line "grows downward" as you scroll into it.

5.2.3 Infinite Background Drift
The grid background should drift forever, but with a modulo clamp to avoid drift-discontinuity:

```tsx
gsap.to(".bg-grid", { y: "20%", duration: 30, repeat: -1, ease: "linear", modifiers: {

text

Copy
y: (y: string) => {

  const value = parseFloat(y);

  return (value % 50) + "px";  // ← clamp to grid size

}
} });

text

Copy

#### 5.2.4 Cleanup


Every `useGSAP` block that uses `ScrollTrigger` should clean up:


```tsx

return () => {

  ScrollTrigger.getAll().forEach(st => st.kill());

};
This is non-negotiable. Without it, dev-mode hot reload leaks triggers.

5.3 State Pulses (CSS-only, not GSAP)
For "this thing is alive right now" indicators:

Generic pulse: animate-pulse on a 2×2 dot — used for BOB online indicator, mining status
Mining pulse (more dramatic): animate-mining-pulse — defined in tailwind.config.ts, used in NuestraHistoriaPage "minando" box
Loading spinner: w-12 h-12 border-2 border-matrix/30 border-t-matrix rounded-full animate-spin (manual class composition, not a token)
Typing cursor: inline-block w-2 h-4 bg-matrix animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(0,255,65,0.8)]

6. Tier / Emphasis System
A first-class v3.0 addition. When you have multiple peer elements (three tip amounts, three pricing tiers, three status pills) and need to create visual hierarchy without breaking the design system, use the tier prop.

6.1 The Three Tiers
Tier	Glow	Use For
low	shadow-none	Least important, "this exists but isn't the focus"
medium (default)	shadow-bitcoin or shadow-matrix	The default for peer elements
high	shadow-bitcoin-hover or shadow-matrix-strong	The one element you want to push. Should be rare — at most one per page.

6.2 The Anti-Pattern This Solves
❌ DON'T do this:

tsx

Copy
<Button>APOYO BÁSICO (21k SATS)</Button>

<Button className="opacity-80">APOYO ESTRATÉGICO (210k SATS)</Button>

<Button className="opacity-60">SOCIO SOBERANO (2.1M SATS)</Button>
The opacity-80 / opacity-60 dim the entire component — its shadow, its gradient, its internal layered effects. The button doesn't look "less important," it looks broken.

✅ DO this instead:

tsx

Copy
<ArcadeButton tier="low" variant="bitcoin">APOYO BÁSICO (21k SATS)</ArcadeButton>

<ArcadeButton tier="medium" variant="bitcoin">APOYO ESTRATÉGICO (210k SATS)</ArcadeButton>

<ArcadeButton tier="high" variant="bitcoin">SOCIO SOBERANO (2.1M SATS)</ArcadeButton>
The high tier has a constant glow — it always looks important. The other two are quiet until hover. Visual hierarchy is earned through tokens, not stolen from layout.

6.3 When opacity IS correct
Inside a context where one state is already established as active (e.g., the current DCA status in a list of three possible statuses), use opacity to dim the inactive states. The rule:

Opacity is for "this thing exists but isn't the focus right now" — not for "this thing is less important than its peers."

Example: MarketMoodInfoPopover shows three DCA states. The user's current state is solid + glowing; the other two are opacity-60. This is correct because the active state has been established by data, not by ranking.

7. Component Inventory
7.1 Naming Convention (the rule that prevents chaos)
The codebase has ArcadeButton.tsx (custom) coexisting with any shadcn/ui primitive wrappers. Future-proof the codebase by following this rule:

Pattern	Convention	Examples
Custom, business-specific component	PascalCase.tsx	ArcadeButton.tsx, MatrixRain.tsx, Logo.tsx, MatrixArcadeWhatsApp.tsx, BobChatWidget.tsx
shadcn/ui primitive or generic UI	kebab-case.tsx	button.tsx, card.tsx, dialog.tsx, input.tsx, arcade-button.tsx (if it were a shadcn wrapper)
Hook	use{Name}.ts	useMarketMood.ts, useMarketData.ts, useBobChat.ts
Static icon	PascalCaseIcon.tsx	MatrixPhoneIcon.tsx, FundamentosIcon.tsx
If a component is in its own file, that's the canonical version. Inline duplicates are a smell — see §17 Known Issues for the ChatBubble duplication.

7.2 Component Catalog
Global / Layout (components/layout/)
Navbar.tsx — bg-transparent at top, bg-black/80 backdrop-blur-md on scroll (isScrolled flag). Logo via components/ui/Logo.tsx. Links: font-mono text-gray-300, hover text-matrix with animated underline.
Hero.tsx — Serif H1, blinking cursor (animate-blink) on the terminal accent, primary + secondary CTA.
Footer.tsx — Node status simulation, terminal-style nav links, AGPL-3.0 license notice.
Sections (components/sections/)
PriceConverter.tsx — Real-time BTC↔MXN/USD. Live Binance feed. Numbers in font-mono tabular-nums.
TipJarSection.tsx — Three Lightning amounts + free-amount, BTCPay POS, on-chain QR, fiat via Mercado Pago. See §8.2 Oracle System Modal for its modal sibling.
Widgets (components/widgets/)
MarketMoodWidget.tsx — DCA quality indicator. See §8.3 DCA / Financial Signal Widget.
MarketMoodInfoPopover.tsx — Educational modal. See §8.2.
MarketTicker.tsx — Live price ticker.
AhorraSectionHeader.tsx / AceptaBitcoinSectionHeader.tsx — Section headers w/ IntersectionObserver animations, financial chips, realtime badges.
bob-chat/ — BOB the Bitcoin Agent. See §9 Oracle Voice.
Hackathon (components/hackathon/) — see §8.4 Module Skeleton.
Ahorro (components/ahorro/) — WIP, see §13 Module Inventory.
UI Primitives (components/ui/)
MatrixRain.tsx — Animated <canvas> background, client-only with isMounted guard.
ArcadeButton.tsx — Custom CTA. See §6 Tier System.
Logo.tsx / OriginalLogo.tsx — Brand logos.
MatrixArcadeWhatsApp.tsx — WhatsApp CTA with Matrix arcade style. Has Storybook stories.
PartnerCard.tsx / PartnersCarousel.tsx — Partner / sponsor display.
PricingCard.tsx / PricingTicker.tsx — Pricing display.
UnderConstruction.tsx — Placeholder for WIP pages.
shadcn primitives: avatar, badge, button, card, dialog, dropdown-menu, input, label, navigation-menu, separator, sheet, textarea — use as-is, follow shadcn docs.
Badges / Cards / Filters / Common (components/badges/, cards/, filters/, common/)
badges/StatusBadge.tsx + TierBadge.tsx — Reusable status / tier indicators.
cards/GameCard.tsx + ProjectCard.tsx + ProviderCard.tsx (each with a *Skeleton.tsx loading variant).
filters/CategoryFilter.tsx + TypeFilter.tsx — Filter UI primitives.
common/Button.tsx + Card.tsx + QRCode.tsx — Shared primitives.

8. Pattern Library
The named, reusable patterns extracted from real shipped code. When you need a new one, see if it fits an existing pattern first.

8.1 Timechain Card
Source: app/nuestra-historia/page.tsx (TimechainBlock)

A card that visualizes a block in a chain. Has height, hash, prev-hash, confirmations, timestamp, and category. The data shape (Bitcoin block semantics) drives the visual shape.

tsx

Copy
<Card className="relative border-2 bg-black/90 backdrop-blur-md rounded-2xl overflow-hidden">

  {/* Header: height + category */}

  <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between">

    <div className="font-vt323 text-4xl text-white">#{block.height.toString().padStart(3, '0')}</div>

    <div className="px-3 py-1 text-[10px] font-mono uppercase border">{block.category.toUpperCase()}</div>

  </div>

  {/* Body: title + desc + meta */}

  <div className="p-8 space-y-6">

    <h3 className="font-serif text-3xl font-bold text-white">{block.title}</h3>

    <p className="font-mono text-gray-300 leading-relaxed">{block.desc}</p>

    <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">

      <div>Prev: <span title={block.prevHash}>{block.prevHash.slice(0, 12)}...</span></div>

      <div>Hash: <span title={block.hash}>{block.hash.slice(0, 12)}...</span></div>

    </div>

  </div>

</Card>
Variants by category: genesis (matrix solid), infrastructure (bitcoin solid), adoption (matrix tinted), community (bitcoin tinted). Categories are a finite set — keep them semantic.

Sub-pattern: Truncated Hash Display. Long hashes always show the first 12 chars + ..., with the full hash in title and cursor-help. font-mono is mandatory.

8.2 Oracle System Modal
Source: MarketMoodInfoPopover.tsx

The canonical modal. Five layered surfaces:

Layer	What	Reference
1. Backdrop	fixed inset-0 z-[70] bg-black/80 backdrop-blur-md p-4	Click-to-close
2. Panel	bg-black/95 backdrop-blur-xl border border-matrix/40 rounded-xl shadow-[0_0_60px_rgba(0,255,65,0.2)]	Above the blur
3. Top edge sweep	absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-matrix to-transparent animate-scanline	Live status indicator
4. Corner brackets	absolute top-3 left-3 w-5 h-5 border-t border-l border-matrix/40 × 4	Tron signature
5. Content	overflow-y-auto custom-scrollbar	Inner scroll
Plus accessibility: role="dialog", aria-modal="true", aria-labelledby, tabIndex={-1} + .focus() on open, ESC key handler, body scroll lock.

Container Header Bar (used in the modal header, in BOB chat, in the TipJar tabs):

tsx

Copy
<div className="p-5 border-b border-{color}/20 flex items-center justify-between bg-black/60 shrink-0">

  <div className="flex items-center gap-3">

    <Icon className="text-{color}" />

    <span className="font-vt323 text-2xl text-{color} tracking-wider">TITLE • SUBTITLE</span>

  </div>

  <button aria-label="Cerrar"><X size={22} /></button>

</div>
font-vt323 + uppercase + tracking-wider is the visual signature. The close button always lives top-right, always has an aria-label.

8.3 DCA / Financial Signal Widget
Source: MarketMoodWidget.tsx

The pattern for any signal widget (DCA quality, fear & greed, RSI, etc.):

1. Status pill at top with an icon in a tinted container (h-8 w-8 rounded-md bg-matrix/10 border border-matrix/30)
2. Refresh button in the top-right with a tooltip, disabled-while-loading
3. Hero value in font-serif (e.g., "Excelente momento!"), color-coded by status
4. Big number in font-mono tabular-nums tracking-tighter with a /100 suffix in a quieter color
5. Progress bar — 2px tall, full-width, with the same bg-{color} as the status (explicit class, not arbitrary, to avoid Tailwind purging)
6. Message in font-mono text-xs text-gray-300 explaining the signal
7. Impact pill — inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border with animate-pulse dot
8. Wisdom Log at the bottom (see §8.5)
9. Disclaimer in text-[9px] text-gray-600 font-mono uppercase tracking-wider at the very bottom
Sub-pattern: Threshold-as-Token. The DCA thresholds (25 and 75) live in code, but they should be exported as constants so they can be reused, tested, and shown to the user (e.g., in the educational popover). Currently getDCAConfig(value) and getDcaStatusType(value) both encode the same thresholds — extract them:

ts

Copy
export const DCA_THRESHOLDS = {

  favorable: 25,

  caution: 75,

} as const;
The Ahorro module already has the same pattern in lib/ahorro/constants.ts ("yield rates, tiers, etc."). Both are instances of business rules as design tokens.

8.4 Module Skeleton (Hackathon as canonical)
Source: components/hackathon/

The Hackathon module's folder structure is the canonical anatomy of a feature module. New feature modules should follow this skeleton.

text

Copy
components/{module}/

├── layout/         # Chrome: nav, footer, container

├── hero/           # Entry visual: hero, hero variants

├── display/        # Passive show-only: timeline, stats, prizes, leaderboard

├── content/        # Static content sections: FAQ, rules, about

├── forms/          # Input: registration, contact

└── interactive/    # Active affordances: CTA buttons, cheatsheet, support
layout/ — what wraps the page (navbar, footer, max-width container)
hero/ — the first thing above the fold
display/ — read-only data presentation. No state, no forms. Pure render.
content/ — long-form static content (FAQ, rules, about). Could be Markdown-backed eventually.
forms/ — anything that takes user input. One file per form, exported via index.ts.
interactive/ — components that do something (cheatsheet toggles, CTA buttons, repo clone).
Each subdirectory has its own index.ts barrel export. Consumers import from @/components/{module}/{category}/{Component}.

8.5 Wisdom Log / Oracle Whisper
Source: MarketMoodWidget.tsx (the rotating "System Log" footer), Bob the Bitcoin Agent (the persona itself).

A small surface that displays a rotating or one-shot system message. Three properties:

1. It's in voice — first-person, infrastructure-flavored, opinionated
2. It's terminal-styled — Terminal icon, font-mono, text-matrix, > prompt
3. It's labeled as a log line — System Log • Wisdom Module or similar in text-[10px] font-mono text-gray-500 uppercase tracking-wider
Pattern:

tsx

Copy
<div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-matrix/30 transition-colors group">

  <Terminal className="h-4 w-4 text-matrix mt-0.5 shrink-0" />

  <div className="space-y-1">

    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">System Log • Wisdom Module</p>

    <p className="text-xs font-mono text-gray-300 leading-relaxed transition-opacity duration-500">

      &gt; {message}

    </p>

  </div>

</div>
Rotating variant (in MarketMoodWidget): cycle through WISDOM_LOGS every 6 seconds with a useState + setInterval. Each line should be ≤ 80 chars.

8.6 Live Status Pill
Source: BOB chat header, MarketMoodWidget mining box, TipJarSection BTCPay online indicator.

A pill that says "this thing is alive right now." Always three elements:

1. A pulsing 2×2 dot in the brand color
2. A short uppercase label in font-vt323 text-xs text-{color} tracking-wider
3. A subtitle in the same voice
tsx

Copy
<div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-matrix/30 rounded-full">

  <div className="h-2 w-2 rounded-full bg-matrix animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.6)]" />

  <span className="font-mono text-xs text-matrix tracking-wider">BTCPAY SERVER</span>

  <span className="font-mono text-xs text-gray-500">•</span>

  <span className="font-mono text-xs text-matrix tracking-wider">ONLINE</span>

</div>

### 8.7 Connector Line

**Source:** `NuestraHistoriaPage` — the gradient line between consecutive blocks.

A vertical 1px line that visually links sibling elements. Always:

-   `absolute` positioned, top-anchored
-   w-px (1px) or w-[2px] (2px for emphasis)
-   Gradient from-{color}/50 to-transparent (fades as it descends)
-   hidden md:block (mobile doesn't need connectors — they add noise)
-   Animated with gsap.from(line, { scaleY: 0, transformOrigin: 'top', scrollTrigger: ... })

tsx

Copy
<div className="connector-line absolute left-8 md:left-12 top-24 bottom-0 w-px bg-gradient-to-b from-matrix/50 to-transparent hidden md:block" />
8.8 Threshold-Active Cards (correct opacity use)
Source: MarketMoodInfoPopover — the three DCA status cards in the educational modal.

When one state is already established as active (by data, not by ranking), opacity can be used to dim the inactive states:

tsx

Copy
const isActive = currentStatus === type;

isActive

  ? "bg-matrix/10 border-2 border-matrix shadow-[0_0_15px_rgba(0,255,65,0.2)]"  // solid + glow

  : "bg-matrix/5 border border-matrix/20 opacity-60"  // tinted + dimmed
The rule from §6.3 applies: opacity is for "this isn't the focus right now", not for peer-against-peer hierarchy.

8.9 Typewriter Persona (BOB's streaming fallback)
Source: BobChatWidget.tsx — simulateTyping function.

When the LLM doesn't stream, simulate it client-side for a consistent UX. Key parameters:

22ms per character — fast enough to feel like typing, slow enough to feel human
Pre-allocate the message slot — add an empty Message with visible: false immediately
Filter empty messages in the render: messages.filter(msg => msg.content !== '').map(...)
The cursor disappears when visible: true (typing done)
Always clear the interval on context switch, unmount, or new send
ts

Copy
typingRef.current = setInterval(() => {

  setMessages(prev => prev.map(msg => {

    if (msg.id !== assistantMsgId) return msg;

    if (i < fullText.length) {

      i++;

      return { ...msg, content: fullText.slice(0, i + 1), visible: i >= fullText.length };

    } else {

      clearTypingInterval();

      return { ...msg, visible: true };

    }

  }));

}, 22);
8.10 Hydration-Friendly Skeleton
Source: BobChatWidget.tsx — if (!isMounted) block.

When a component must wait for client-side mount (because it uses window, localStorage, canvas, etc.), return a shaped skeleton, not null. The skeleton matches the eventual size and shape of the component, so layout doesn't shift when the real component mounts.

tsx

Copy
if (!isMounted) {

  return mode === 'floating' ? (

    <div className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-black border-2 border-matrix/30 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,255,65,0.3)]" />

  ) : (

    <div className="w-full max-w-4xl mx-auto h-[520px] bg-black border-2 border-matrix/30 rounded-3xl animate-pulse shadow-[0_0_30px_rgba(0,255,65,0.2)]" />

  );

}
The skeleton's animate-pulse glow tells the user "this is loading, not broken." The shape (circle for FAB, rectangle for hero) tells them what's about to appear.

8.11 In-Character Empty State
Source: BobChatWidget.tsx — empty messages state.

Empty states are an opportunity to be in voice. They should:

Show an icon in a tinted container
Ask a question, not just display a label
Micro-prompt the next action (e.g., "Selecciona un contexto arriba")

tsx

Copy
<div className="h-full flex flex-col items-center justify-center text-center">

  <div className="p-4 rounded-2xl bg-matrix/5 border border-matrix/20 mb-4 shadow-[0_0_20px_rgba(0,255,65,0.1)]">

    <Terminal className="w-12 h-12 text-matrix/60" />

  </div>

  <p className="text-matrix font-mono text-sm uppercase tracking-wider">¿Qué quieres aprender hoy?</p>

  <p className="text-gray-500 font-mono text-xs mt-2">Selecciona un contexto arriba</p>

</div>
8.12 Twin-Mode Component
Source: BobChatWidget.tsx — mode: 'hero' | 'floating'.

A component that ships in two presentations with the same brain. Common splits:

Mode	Anchor	Use
'hero'	Inline in page	Page-level emphasis (BOB chat on homepage)
'floating'	fixed bottom-6 right-6	Global access (BOB on every page)
The brain (state, message handling, contexts) is shared. The chrome (header, dimensions, scroll behavior) differs. The hydration skeleton is also mode-aware (see §8.10).

When you find yourself wanting to fork a component for two presentations, use the mode prop pattern instead.

9. Oracle Voice
The system speaks. It has a name, opinions, and a consistent personality. This section unifies the disparate voices across the codebase.

9.1 The Persona Stack
Surface	Role	Voice
B.O.B. (Bitcoin Operated Brain)	Primary persona in BobChatWidget	Cypherpunk tutor, infrastructure metaphors, in Spanish
Wisdom Logs (rotating lines in MarketMoodWidget footer)	Ambient voice	Short, philosophical, Spanish wisdom
Timechain blocks (NuestraHistoriaPage)	Historical narrator	"Primera reunión cypherpunk en Mérida..." — past tense, factual
System messages (errors, loading, online indicators)	Operational voice	"Error de conexión en el nodo B.O.B." — always in character
Educational disclaimers	Regulatory voice	"Herramienta educativa • No es consejo financiero" — the only moment the system formally steps out of voice
All five share the same vocabulary: nodo, minar, bloque, cadena, señal, transacción, sats, soberano, cypherpunk. They never use corporate-bot phrases ("Disculpa las molestias", "¿En qué puedo ayudarte?", "Lo siento mucho").

9.2 BOB's Architecture (the persona-as-module pattern)
Source: app/api/chat/route.ts + lib/prompts/bob-agent.ts

BOB is not a string literal in a route handler. His persona lives in lib/prompts/bob-agent.ts, a dedicated module. This is intentional: the persona is part of the system, not a string.

Rules:

1. The persona is in code, not in a database or env var. Changes to BOB's voice require a code deploy.
2. The persona is partitioned by context. Bob has a finite set of contexts (fundamentos, mining, custodia, impuestos, verificacion). Each context has its own RAG filter, surfaced as a chip in the UI.
3. The default context is fundamentos. It's safe by default — the system prompt for fundamentos is canonical, other contexts are specializations layered on top, not different personas.
4. RAG only fires if useRAG === true (opt-in). The frontend always passes true, but the API respects the flag.
5. RAG has a 2-second timeout. Never let BOB hang. If the vector search times out, the response falls back to system-prompt-only.
6. RAG context is injected as a user instruction with the word "preferencialmente", never as a system assertion. This gives the model permission to ignore RAG when it's not relevant.
7. Errors are in character. "Error de conexión en el nodo B.O.B. Intenta de nuevo en unos momentos." not "Internal Server Error".
8. Rate-limited per IP, in-memory, 100 req/min. The in-memory map is why this route runs on Node.js, not Edge — the runtime decision is documented in the file header.

9.3 The Context-Clearing Rule
When the user switches contexts in BOB's UI:

ts

Copy
const handleContextSwitch = (key: string) => {

  if (key === context) return;

  clearTypingInterval();

  setContext(key);

  setMessages([]);     // ← conversation is per-context

  setError(null);

};
Conversation history is per-context, not global. Old messages wouldn't be coherent in a new context (the system prompt changed). The persona stays; the conversation resets. This is intentional, not a bug.

9.4 The Subtitle-Acronym Pattern
Source: BOB chat header.

tsx

Copy
<p className="font-vt323 text-xs text-matrix tracking-wider flex items-center gap-2 mt-0.5">

  <span className="inline-block w-1.5 h-1.5 bg-matrix rounded-full animate-pulse shadow-[0_0_6px_rgba(0,255,65,0.8)]" />

  BITCOIN OPERATED BRAIN

</p>
The subtitle both expands the acronym and shows a live "online" indicator. Two birds, one stone. Subtitles are vocabulary — they teach the user the project's dialect just by being there. Every persona in the system should have one.

9.5 Code Comments in Bilingual Style
Source: app/api/chat/route.ts

ts

Copy
// ⚠️ SIN runtime = 'edge' → Corre en Node.js por defecto

// El Map en memoria funciona correctamente en este runtime
Spanish narrative + English tech. This is a documented style for the project. Code comments can be Spanish. Don't translate them to English to "be professional" — the comment is for the team, and the team speaks Spanish.

10. lib/ Conventions
The lib/ directory is for code that has no UI. Three patterns are established and should be followed.

10.1 Adapter / Service Pattern (vendor abstraction)
Source: lib/market/

text

Copy
lib/market/

├── binance.ts          # Concrete client (Binance API)

├── binance.test.ts     # Tests for the concrete client

└── service.ts          # Abstraction layer (swap Binance for any source)
When you integrate a third-party API (Binance, Blink, BTCPay, Cal.com, etc.), the pattern is:

1. One file per concrete integration (binance.ts, blink.ts, btcpay.ts)
2. A service.ts that defines the interface the rest of the app uses
3. Tests live next to the concrete client, not the abstraction
This way, swapping Binance for Kraken, or BTCPay for Blink, is a one-file change. The rest of the app never imports the concrete client directly.

10.2 Persona-as-Module
Source: lib/prompts/bob-agent.ts

The BOB persona lives at lib/prompts/bob-agent.ts. This file exports:

getSystemPrompt(context, lang) — the canonical system prompt
getRAGFilter(context) — the context-specific RAG filter
isValidContext(context) — the context validator
Rule: never inline a system prompt or persona definition outside lib/prompts/. If you find yourself writing "You are B.O.B., the Bitcoin..." in a route handler, stop and import from lib/prompts/bob-agent.ts.

This applies to any future persona. If you add a "Satoshi" tutorial agent or a "Hal" market-watcher, they each get their own file in lib/prompts/.

10.3 Constants-as-Design-Tokens
Source: lib/ahorro/constants.ts (yield rates, tiers, etc.), implicit in DCA thresholds

Business rules that affect both logic and presentation should live as exported constants:

ts

Copy
// lib/ahorro/constants.ts

export const AHORRO_TIERS = {

  basic: { minDeposit: 100_000, yieldRate: 0.02 },

  strategic: { minDeposit: 1_000_000, yieldRate: 0.025 },

  sovereign: { minDeposit: 10_000_000, yieldRate: 0.03 },

} as const;
These constants are then imported by:

The backend (yield calculation)
The UI (display "Tasa de rendimiento: 2.5%")
The tests (verify tier boundaries)
The docs (declare the business rules)
Rule: if a number affects what the user sees and what the backend does, it's a design token. Extract it.

10.4 TypeScript Types per Module
Source: lib/ahorro/types.ts, lib/hackathon/editions/types.ts

Each lib/{module}/ has a types.ts that exports all module-specific types. The UI components import these types. This keeps types close to logic, not scattered across components.

11. Content vs. Code (the data/ rule)
The data/ directory at the project root is for content that is updated by non-developers (or by developers acting as content editors):

text

Copy
data/

├── juegos.json          # Arcade games

├── proveedores.json     # Provider directory

├── proyectos.json       # Community projects

├── partners.ts          # Partners / sponsors

└── pricing.ts           # Pricing plans
Rule:

Marketing-driven content (pricing, partners, projects, providers, games) lives in data/
Components consume the data, they don't own it
JSON is preferred for content-only data (no logic). TS is fine when the data has logic helpers or constant exports
No JSX in data/ files. If a data file needs to render something, it should export a config object that a component consumes
When you find yourself hardcoding an array of { title, description, image } in a component, move it to data/.

12. Accessibility Patterns
Accessibility is built into the patterns above, not bolted on. The rules below codify what's already in shipped code.

12.1 Focus Management in Modals
tsx

Copy
useEffect(() => {

  if (!isOpen) return;

  const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };

  window.addEventListener("keydown", handleEsc);

  dialogRef.current?.focus();

  document.body.style.overflow = "hidden";

  return () => {

    window.removeEventListener("keydown", handleEsc);

    document.body.style.overflow = "unset";

  };

}, [isOpen]);
Mandatory checklist for any modal:

 role="dialog" and aria-modal="true" on the panel
 aria-labelledby pointing to a heading id
 tabIndex={-1} + .focus() on the panel on open
 ESC key handler
 Body scroll lock while open, restored on close
 aria-label on the close button (not just an icon)

12.2 Live Regions for Time-Sensitive UI
tsx

Copy
<div

  className="font-vt323 text-8xl md:text-9xl text-matrix tracking-widest tabular-nums"

  aria-live="polite"

  aria-atomic="true"

  aria-label={`Tiempo restante para el próximo bloque: ${timeUntilNext} minutos`}

>

  {isMounted ? timeUntilNext : "10:00"}

</div>
For any countdown, ticker, or value that updates without user input:

aria-live="polite" (announce, don't interrupt)
aria-atomic="true" (read the whole thing, not just the diff)
aria-label with a full sentence (not just the number — screen readers will read "08:23" but the user needs context)

12.3 Emoji as Semantic Content
Emoji in this system are content, not decoration. They have meaning. So:

✅ <span role="img" aria-label="Estado del mercado: Zona alta - Cautela">⚠️</span>
❌ <span>⚠️</span> (screen reader announces "warning sign" with no context)
❌ <span aria-hidden="true">⚠️</span> (don't hide it — it has meaning)
The role="img" aria-label="..." pattern is the only correct way to use emoji in this system.

12.4 Ephemeral Preferences (sessionStorage)
For "don't show again this session" toggles (e.g., the DCA educational popover):

ts

Copy
try {

  const stored = sessionStorage.getItem("ab-mx:dca-info-seen");

  if (stored === "true") setHasSeen(true);

} catch (e) {

  console.warn("Storage access denied", e);

  setHasSeen(true);  // ← fallback

}
Namespaced keys — ab-mx:{feature}:{preference}. Never bare seen or flag.

12.5 Hydration Safety
Any component that uses window, localStorage, Math.random, Date.now, canvas, etc., needs an isMounted guard:

tsx

Copy
const [isMounted, setIsMounted] = useState(false);

useEffect(() => { setIsMounted(true); }, []);


if (!isMounted) return <HydrationFriendlySkeleton />;  // see [§8.10](#810-hydration-friendly-skeleton)
Don't return null — it causes layout shift. Return a shaped skeleton instead.

13. Module Inventory
Module	Routes	Status	Files
Oracle Homepage	/	✅ Live v2.0	app/(site)/page.tsx + components/sections/* + components/widgets/bob-chat/*
Proveedores (Sovereign Directory)	/proveedores	✅ Functional	app/proveedores/page.tsx + ProveedoresClient.tsx + components/cards/ProviderCard.tsx
Bitcoin Arcade	/arcade	✅ Live	app/(site)/arcade/page.tsx + lib/juegos.ts + data/juegos.json
Tianguis (Marketplace)	/tianguis	✅ Functional	app/(site)/tianguis/page.tsx
Proyectos (Community)	/proyectos	✅ Functional	app/(site)/proyectos/page.tsx + ProyectosClient.tsx
Crea tu Tienda	/crea-tu-tienda	✅ Functional	app/(site)/crea-tu-tienda/page.tsx + app/actions/submit-onboarding.tsx
Planes (Pricing)	/planes	✅ Live	app/(site)/planes/page.tsx + data/pricing.ts + data/partners.ts
Agenda (Cal.com)	/agenda	✅ Integrated	app/agenda/page.tsx
Nuestra Historia	/nuestra-historia	✅ Functional	app/nuestra-historia/page.tsx
Ahorro	/ahorro/*	🚧 WIP	app/ahorro/{layout,page,access/page,dashboard/*} + components/ahorro/** + lib/ahorro/** + app/api/ahorro/**
Hackathon	/hackathon/*	✅ Live	app/hackathon/{layout,page,[edition]/**} + components/hackathon/** + lib/hackathon/** + app/api/hackathon/**
BOB (AI Agent)	(embedded in /)	✅ Live	components/widgets/bob-chat/* + app/api/chat/route.ts + lib/prompts/bob-agent.ts + lib/vector/search.ts
TipJar API	/api/tipjar	✅ Live	app/api/tipjar/route.ts + lib/blink.ts
Webhooks	/api/ahorro/webhook/blink, /api/webhook/lnbits	🚧 WIP / 🔧 Legacy	—
Hackathon Editions (sub-module of Hackathon)
Edition ID	Slug	Status	File
2026-1	2026-1	✅ completed	lib/hackathon/editions/2026-1.ts
2026-2	custody-ui-2026	🚀 upcoming	lib/hackathon/editions/2026-2.ts
2026-3	tianguis-2026	📋 defined	lib/hackathon/editions/2026-3.ts

14. Implementation Rules for AI
These are the rules a future AI agent (or new developer) must follow when working in this codebase. They are the guardrails.

14.1 Naming Conventions
See §7.1. Quick reference:

PascalCase.tsx = custom, business-specific
kebab-case.tsx = shadcn primitive or generic UI
use{Name}.ts = hook
PascalCaseIcon.tsx = static icon

14.2 Color Usage
If you need a "cyan" or "blue" technical color: use accent (Tron cyan) sparingly, or matrix (green) by default. Don't add new blues.
If you need to highlight an action: use bitcoin (orange).
If you need technical data or system status: use matrix (green).
If you need to warn the user: use red-500. Red is reserved for warnings.
Never hardcode hex values in components. Use tokens.

14.3 Opacity
❌ Don't use opacity to create hierarchy among peer elements. Use the tier prop pattern instead.
✅ Use opacity to dim inactive states when one state is already established as active (see §6.3).

14.4 Borders
❌ Don't use solid border-white or solid border-{brand} by default.
✅ Use border-white/10 or border-white/20 for default, border-{brand}/30 for inactive, border-{brand} only for active/CTA.

14.5 Prompts
❌ Don't inline system prompts or persona definitions in route handlers.
✅ Put them in lib/prompts/{persona}.ts and import.

14.6 Constants
❌ Don't hardcode business rules in components.
✅ Extract them to lib/{module}/constants.ts and import.

14.7 Vendor Integrations
❌ Don't import third-party clients (binance.ts, blink.ts) directly in components or pages.
✅ Go through the service.ts abstraction layer.

14.8 Content
❌ Don't hardcode marketing content (pricing, partners, projects, providers) in components.
✅ Put it in data/ and consume it.

14.9 Hydration
❌ Don't use window, localStorage, Math.random, Date.now, canvas in render without an isMounted guard.
✅ Always return a shaped skeleton (see §8.10) instead of null.

14.10 Animations
Framer Motion for component-internal mount/exit and micro-interactions.
GSAP + ScrollTrigger for scroll-synced choreography, 3D, and infinite loops.
Always clean up ScrollTrigger in useGSAP return functions (or you'll leak triggers in dev).
Always use refs for GSAP scopes — never query the DOM globally inside a hook.

14.11 Accessibility
Every interactive element has an aria-label or visible text.
Every modal follows the checklist in §12.1.
Every time-sensitive UI uses aria-live (§12.2).
Emoji-as-content gets role="img" aria-label="..." (§12.3).
Ephemeral prefs use sessionStorage with denial fallback (§12.4).

14.12 Module Skeleton
New feature modules should follow the §8.4 Module Skeleton anatomy: layout/, hero/, display/, content/, forms/, interactive/.

15. Tech Stack
Layer	Technology	Version/Notes
Framework	Next.js	14.2.3 — App Router
Language	TypeScript	Strict mode
Styling	Tailwind CSS	Custom animations: scanline, blink, tilt, mining-pulse, ping-soft, fade-in, scan, marquee
UI Kit	shadcn/ui	+ custom ArcadeButton, MatrixRain, Logo
Icons	Lucide React	v1.8.0
Animation	Framer Motion	^11.18.2 — component-internal
3D / WebGL	Three.js + @react-three/fiber	^0.184.0 / ^8.18.0
Scroll Choreography	GSAP + @gsap/react + ScrollTrigger	^3.15.0 / ^2.1.2
Forms	React Hook Form + @hookform/resolvers	^7.75.0
QR Codes	qrcode.react	Client-only (ssr: false)
Payments	Blink.sv	GraphQL API — Lightning + On-chain (migrated from LNbits)
Market Data	Binance API	BTC/USD via lib/market/binance
AI / LLM	Groq SDK	Llama 3.3 70B Versatile — Bob AI agent
Vector DB	Upstash Vector	Semantic search for Bob's RAG
Booking	Cal.com	Embedded in /agenda
Validation	Zod	v4 — Hackathon registration + ahorro schemas
Toast / Alerts	Sonner	^2.0.7
Testing	Vitest	route.test.ts, proveedores.test.ts, binance.test.ts
Monitoring	Sentry	Client + server configs (separate error surfaces)
Email	Resend	Transactional email
PWA	next-pwa	^5.6.0 (disabled in dev)
Pending Decisions
turbo.json: included in the project map with the note (if used). Confirm whether Turborepo is in active use or a leftover. If not used, delete it.

16. References (canonical files)
These files are the ground truth for the patterns in this document. When in doubt, read the source.

Pattern	Canonical File
Timechain Card + Scroll Cascade	app/nuestra-historia/page.tsx
Connector Line (between blocks)	app/nuestra-historia/page.tsx
Live Status Pill	app/nuestra-historia/page.tsx, BobChatWidget.tsx
Oracle System Modal (full)	components/widgets/MarketMoodInfoPopover.tsx
Container Header Bar	MarketMoodInfoPopover.tsx, BobChatWidget.tsx
DCA / Financial Signal Widget	components/widgets/MarketMoodWidget.tsx
Wisdom Log / Oracle Whisper	MarketMoodWidget.tsx (rotating footer)
Threshold-Active Cards (correct opacity)	MarketMoodInfoPopover.tsx (3 DCA status cards)
Typewriter Persona	components/widgets/bob-chat/BobChatWidget.tsx (simulateTyping)
Hydration-Friendly Skeleton	BobChatWidget.tsx (if (!isMounted) block)
In-Character Empty State	BobChatWidget.tsx (empty messages state)
Twin-Mode Component	BobChatWidget.tsx (mode: 'hero' | 'floating')
Visible Knowledge Domains	BobChatWidget.tsx (CONTEXTS array)
Subtitle-Acronym Pattern	BobChatWidget.tsx (BOB header)
BOB's Persona + RAG	app/api/chat/route.ts + lib/prompts/bob-agent.ts
Tier System on Buttons	components/ui/ArcadeButton.tsx (refactored to use tier prop)
Module Skeleton	components/hackathon/ (folder structure)
Adapter / Service Pattern	lib/market/{binance,service}.ts
Persona-as-Module	lib/prompts/bob-agent.ts
Constants-as-Design-Tokens	lib/ahorro/constants.ts (and DCA thresholds)

17. What's NOT in this document
These live in separate files because they serve different audiences:

Concern	File	Why Separate
Maintenance log, dev notes, fix history	MANTENIMIENTO.md	Time-bound, not a system spec
Deployment guide	docs/DEPLOYMENT.md	Operational, not visual
Project structure / file map	MAP.md (or README.md)	Architecture, not design
Codebase changelog	MANTENIMIENTO.md	History, not rules
Known Issues (worth tracking in MANTENIMIENTO.md)
ChatBubble duplication: BobChatWidget.tsx has an inline <ChatBubble /> definition and a separate components/widgets/bob-chat/ChatBubble.tsx. The two are not identical (different rounded-*, border-*, font-* values). Pick one as canonical, delete the other, or document the deliberate difference.
ArcadeButton duplication: components/ui/arcade-button.tsx was removed in favor of the canonical custom component at components/ui/ArcadeButton.tsx.
turbo.json status: confirmed-unused-or-in-use, then delete or document.
DCA threshold duplication: getDCAConfig and getDcaStatusType both encode the 25/75 thresholds. Extract to DCA_THRESHOLDS constant and derive both.
Fin del documento. Para preguntas o sugerencias: agregar issue en el repo o consultar a Mavis. ⚡
