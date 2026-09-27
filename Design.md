# Navratri — Design Skill & UI Specification

Version 1.0 · 27 September 2026 · Intended reader: Stitch or an equivalent design agent

## 0. Operating contract

Design a mobile-first Navratri discovery, ticketing and arrival companion for Gujarat. The visitor's central question is **“Aaje kya ramva javu che?” — “Where should I play Garba tonight?”** Help them choose an event, understand admission, and reach the appropriate parking entrance or event gate within a clear, continuous journey.

This is a self-contained design-agent instruction file, not an installed software skill or an implementation architecture. Treat all exact values, component anatomy, state rules and prohibited patterns below as requirements. Use the working product name **Navratri** until an approved brand is supplied. Do not invent a different brand, palette or navigation system between screens.

**Decision order:** truthful event and booking information → accessibility and task completion → shared tokens and component consistency → cultural expression → decorative polish. Never trade the first three for the last two. When a requirement conflicts, follow that order and annotate the conflict in the handoff.

**Scope:** the complete attendee experience: discovery, search, filters, event sessions, artists, recent popularity, facilities, parking, map exploration, route preview, tickets, checkout, saved events and account. Organizer, admin and gate-scanner applications are separate future surfaces; do not put their controls into attendee navigation.

**Quality bar:** premium through typography, rhythm, image selection and small useful feedback; Gujarati through language and restrained textile-inspired geometry. The result must feel like a considered local festival companion, not a party poster, generic SaaS dashboard or food-delivery clone.

**Generation procedure:**

1. Read this file in full. Establish the tokens and reusable components before composing screens.
2. Use the fictional fixtures in §23 for every generated screen. Keep selected city, night, event, artist, price and gate consistent across the journey.
3. Generate the reference mobile flow at 390 × 844 first. Generate 1440 × 1024 desktop adaptations after mobile components are stable.
4. Create every required state listed in §24. If generation limits require batches, follow the specified batch order and reuse the same component names and values.
5. Link the critical paths. If the tool cannot implement an interaction, annotate trigger, transition, state and destination; never present an inert button as completed functionality.
6. Review against §25. Fix failures before calling the design ready for implementation. Do not substitute a mood board or one attractive home screen for the required product flow.

### Navigation within this specification

- Foundations: §1–5, visual direction, tokens, typography, layout and assets.
- Interaction system: §6–8, controls, motion and application shell.
- Discovery: §9–14, home, filters, cards, details, artists and popularity.
- Arrival: §15–17, facilities, parking, maps and route preview.
- Transactions: §18–20, booking, payment and tickets.
- Resilience and delivery: §21–25, states, accessibility, fixtures, generation and acceptance.

## 1. Visual direction and cultural restraint

Use a warm ivory canvas, white content surfaces, dark ink, deep maroon actions and indigo wayfinding. Reserve saffron for a small decorative or highlighted detail. Status colors have semantic jobs; they are not additional brand accents.

Excluding photographs and map imagery, aim for roughly 88% neutral surface, 8% ink and structural detail, and 4% chromatic accent in a typical discovery viewport. This is a composition target, not a reason to weaken contrast. Route views may contain more indigo for legibility.

Use one original geometric motif: a simple eight-dot ring with a small open center, inspired by circular Garba movement and textile dot rhythms. Render it as a decorative vector, never as a purported reproduction of a specific historic textile. Use a single-color version at 6% opacity in a 64–96 px box. Allowed placements: one home introduction corner, one ticket header detail, or one empty-state illustration. Maximum one motif per viewport. Never place it behind body copy, map labels, controls or a QR code.

Optional borders inspired by textile stitching must use a single 1 px dashed separator, limited to ticket stubs. Do not combine the ring, an arch, a mandala, mirror work and Bandhani dots in one composition. Do not use religious figures, aarti imagery or sacred symbols as loading indicators, currency marks or rewards.

Use documentary-style photographs of actual Garba environments when approved assets exist: circular dance, fabrics, human connection and warm evening lighting. Preserve natural skin tones and plausible crowds. Do not fabricate an artist endorsement or use a performer's photo to imply an unconfirmed appearance. Generated or stock imagery is illustrative and must not masquerade as evidence of a real event.

The distinctive touches are: the Gujarati invitation, the restrained circular motif, a night selector, a parking-to-gate journey, a composed ticket stub and calm maroon interaction feedback. These are sufficient; do not add ornamental elements to fill whitespace.

## 2. Design tokens — use exactly

All dimensions are CSS pixels at the default scale. Implement text sizes in rem and allow user scaling. Use semantic token names rather than scattered color literals. Use light mode for version 1; do not invent an incomplete dark theme.

```css
:root {
  /* Surfaces and text */
  --color-canvas: #FBF7F0;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F2ECE2;
  --color-ink: #251F21;
  --color-muted: #665D60;
  --color-on-solid: #FFFFFF;
  --color-border: #DED5CC;
  --color-control-border: #8D8080;

  /* Action: maroon; wayfinding: indigo */
  --color-primary: #7A2337;
  --color-primary-hover: #651A2C;
  --color-primary-pressed: #521322;
  --color-primary-tint: #F7E9ED;
  --color-route: #293A63;
  --color-route-tint: #EDF0F7;
  --color-focus: #293A63;

  /* Accent is decorative, never a small-text color */
  --color-accent: #B66C18;
  --color-accent-tint: #FFF0D5;

  /* Status foreground/background pairs */
  --color-success: #226046;
  --color-success-tint: #EAF4ED;
  --color-warning: #80520C;
  --color-warning-tint: #FFF2D9;
  --color-error: #A52C36;
  --color-error-tint: #FCECEF;
  --color-disabled-ink: #756B6D;
  --color-disabled-surface: #EDE7DF;
  --color-scrim: rgb(37 31 33 / 40%);

  /* Spacing: no invented intermediate spacing values */
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  --radius-control: 12px;
  --radius-card: 16px;
  --radius-sheet: 24px;
  --radius-badge: 6px;
  --radius-pill: 999px;
  --stroke-default: 1px;
  --stroke-selected: 2px;

  --shadow-card: 0 2px 8px rgb(37 31 33 / 5%);
  --shadow-hover: 0 6px 18px rgb(37 31 33 / 10%);
  --shadow-floating: 0 8px 28px rgb(37 31 33 / 12%);
  --shadow-sheet: 0 -8px 32px rgb(37 31 33 / 12%);

  --duration-press: 80ms;
  --duration-fast: 120ms;
  --duration-state: 160ms;
  --duration-content: 220ms;
  --duration-sheet: 280ms;
  --duration-route: 400ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);

  --z-content: 0;
  --z-sticky-header: 20;
  --z-map-controls: 25;
  --z-persistent-sheet: 30;
  --z-bottom-navigation: 40;
  --z-transaction-bar: 45;
  --z-modal-scrim: 60;
  --z-modal: 70;
  --z-toast: 80;
}
```

**Color assignments:**

- Primary buttons: white on maroon. Links: maroon, with underline on hover/focus and in running prose. An active control uses both color and an explicit check, label or selection border.
- Body: ink on canvas or white. Secondary information: muted on canvas, white or subtle surface. Never reduce text opacity to achieve hierarchy.
- Thin decorative dividers use `border`. Inputs, unchecked checkboxes and boundaries needed to identify a control use `control-border`.
- Positive status: success foreground on success tint; warning and error follow their named pairs. Write a status label alongside the icon. “Free” describes price and does not imply availability, verification or safety.
- Indigo is reserved for maps, route legs, focus and wayfinding support. Saffron is never a CTA background with white text.
- Disabled controls use disabled tokens and an adjacent explanation when the cause is not obvious. Do not dim an entire event card because one date is unavailable.

Calculated contrast examples for these solid token pairs: ink/canvas 15.17:1; muted/canvas 5.96:1; muted/subtle 5.42:1; white/primary 9.89:1; primary/primary-tint 8.40:1; route/route-tint 9.79:1; success/success-tint 6.60:1; warning/warning-tint 6.06:1; error/error-tint 6.10:1. Control-border/white is 3.80:1. These calculations do not validate overlays, imagery or the final rendered application; recheck actual combinations.

## 3. Typography, language and content rhythm

**Font system:** use `"Noto Sans", system-ui, sans-serif` for Latin UI and `"Noto Sans Gujarati", "Noto Sans", sans-serif` for Gujarati runs. Load only weights 400, 500, 600 and 700. Use weight 600 for buttons, section headings and selected controls; 400 for body copy; 500 for metadata emphasis; 700 only for the main invitation and transaction total. Do not add a display serif or decorative font.

**Exact type styles, expressed as font-size / line-height:**

- Home invitation: 32/40, weight 700, tracking −0.02em; desktop 40/48. At 390 px, break after “ramva” only if the natural text fit requires two lines. Do not force an awkward three-line heading.
- Page title: 28/36, weight 600, tracking −0.015em; desktop 32/40.
- Section heading: 22/28, weight 600, tracking −0.01em.
- Event-card title: 18/24, weight 600, tracking 0.
- Body and form input: 16/24, weight 400, tracking 0.
- Button and field label: 16/24, weight 600 and 500 respectively.
- Metadata and help text: 14/20, weight 400. Critical restrictions and payment details never below this size.
- Caption and navigation label: 12/16, weight 500; use only for noncritical supporting text.
- Price and checkout total: 20/28 and 24/32, weight 600 and 700. Use tabular numerals for prices, times, timers and quantities.

For Gujarati, retain the same font-size and use line-height at least 1.6 for text up to 22 px and 1.4 for larger headings. Set tracking to 0; never uppercase, italicize or compress Gujarati characters. Containers grow vertically for script metrics. Do not shrink translated text to fit Latin dimensions.

Default UI language is English with the single transliterated invitation above. Provide a discoverable `English / ગુજરાતી` language choice in Account and the city/language sheet. A Gujarati selection translates navigation, actions, date labels and help text consistently. Preserve official event and artist names; allow approved translated names as secondary text. Mark language changes in markup and route text through a localization system.

Use sentence case. Prefer “Choose tickets,” “Free entry,” “Parking details not confirmed,” and “18 min drive · estimate.” Avoid “Experience the ultimate celebration,” “Hurry!!!,” all-caps marketing, flame emoji, fake urgency and verbose descriptions.

Format money in INR using the selected locale, without fabricated decimals: `₹499`, `₹1,045.20`. Never use `₹₹` to conceal a known price. Show `From ₹499` only when ₹499 is an available entry option for the selected night. A free pass with mandatory charges is not “Free.”

Use the venue's `Asia/Kolkata` time zone to resolve nights. Display explicit calendar dates in tickets, checkout and route plans. A session starting 16 October and ending after midnight appears as `16 Oct, 8:00 PM – 17 Oct, 1:00 AM`. Its festival-night identity remains 16 October. “Tonight” may include the currently running overnight session, but the ticket's start date must remain visible. Refresh relative labels when the app resumes or the date context changes.

## 4. Layout and responsive behavior

**Viewports:** compact 320–599; medium 600–1023; wide 1024 and above. Reference frames are 390 × 844 and 1440 × 1024; verify 320 × 568, 768 × 1024 and 1280 × 800. At 200% text size or 400% browser zoom, allow the layout to fall back to a single column.

- Compact: 16 px side gutters, 4-column conceptual grid, 12 px gutters. Primary vertical stacks use 16 px gaps; sections use 32 px. Standard content cards fill the available width.
- Medium: 24 px side gutters, 8-column grid, 16 px gutters. Discovery cards use two columns when each card can retain at least 280 px width; otherwise one column.
- Wide: centered content, max-width 1200 px, minimum 32 px outside margin, 12-column grid with 24 px gutters. Discovery uses three columns. Do not stretch to four tiny cards or giant full-width desktop cards.
- Reading text: max-width 680 px. Dialog: 480 px wide by default, 640 px for filter content; 32 px viewport margins and content-driven height.
- Standard card padding: 16 px compact, 20 px wide. Section gap: 32 px compact, 48 px wide. Use 8 px between a label and its value, 4 px between closely related metadata lines.

**Sticky elements:** compact discovery header is 56 px; bottom navigation is 64 px plus bottom safe area. Detail and checkout replace bottom navigation with a 80 px transaction bar plus bottom safe area. Wide header is 72 px. Do not render bottom navigation and the transaction bar on top of each other.

Measure actual sticky heights after text wrapping. Reserve matching bottom padding plus 16 px in scroll content. Use `env(safe-area-inset-bottom)` and dynamic viewport height; never position critical controls under browser chrome or the keyboard. Focused fields scroll clear of overlays. Anchor targets have scroll offset for the measured header.

On desktop, event detail uses an approximately 2:1 content/booking-summary split with a 24 px gap; checkout uses the same split. The summary stays below the 72 px header with a 24 px offset, but becomes nonsticky if taller than the available viewport. Maps use the separate split layout in §16.

Never use desktop sidebars on compact screens, horizontal page scrolling, fixed-height paragraphs, or absolute positioning for ordinary document flow. Horizontal scrolling is allowed only for explicit date/category strips; provide visible continuation and keyboard access.

## 5. Iconography, imagery and surface treatment

Use one outline icon family with a 24 × 24 view box, 1.75 px stroke, rounded joins and consistent optical weight. Icons are 20 px beside text and 24 px in navigation or stand-alone controls. A 16 px icon is allowed only beside 14 px metadata. Do not mix emoji, filled clip art, thin line icons and multiple icon libraries.

Required semantics: magnifier for search, pin for place, route arrow for directions, `P` for parking, microphone for artist, calendar for date, ticket for admission, bookmark for saved, sliders for filters, accessibility symbol for relevant access details, information circle for provenance. Icon-only actions require an accessible name; important controls also have visible text.

Selection may fill the bookmark or navigation icon, but retain its family and geometry. The selected navigation destination also uses a text label and 2 px indicator. Do not draw tiny bespoke dandiya sticks in place of a familiar functional icon.

Card imagery uses a 16:9 crop with a specified focal point. On the compact home page, use the compact row variant in §11 to keep decision details visible early. Event-detail hero is 16:9, max-height 400 px on desktop. Artist portraits are square crops rendered in a circle. Preserve the approved subject; never stretch images.

Do not burn event title, price or time into images. Existing busy posters belong in an optional “View poster” gallery, not as the only readable event detail. On photographic controls, use an opaque white circular surface; do not rely on a variable image scrim for contrast. Missing images use subtle surface, a simple ring motif and accessible context, not unrelated stock photos.

Default cards use a 1 px decorative border and `shadow-card`. Lists can use dividers without a separate shadow for every row. Inputs and ticket-option cards have identifiable control borders. Use no glassmorphism, blur dependency, gradient blobs, glowing edges, heavy paper textures or ornamental box shadows.

## 6. Shared controls and state contract

Use these component names consistently: `Button`, `IconButton`, `SearchField`, `FilterChip`, `ChoiceChip`, `NightSelector`, `EventCard`, `ArtistRow`, `StatusBadge`, `FacilityRow`, `ParkingCard`, `MapMarker`, `MapSheet`, `RouteLeg`, `TicketOption`, `QuantityStepper`, `PriceSummary`, `AdmissionTicket`, `InlineNotice`, `Toast` and `StatePanel`.

**Button:** min-height 48 px, horizontal padding 20 px, radius 12 px, gap 8 px. Primary uses maroon, secondary white with control-border and ink, tertiary transparent with maroon text. On transaction bars the primary occupies at least 50% of the row; on checkout it spans full width. One filled primary per action group. Directions is secondary beside a paid booking action and primary for free walk-in admission.

**IconButton:** 44 × 44 minimum, 24 px icon, radius 12 px or circular only over photography. Tooltip on pointer hover/focus supplements the accessible name; it is never the sole explanation of an essential control.

**Inputs:** min-height 52 px, 16 px input text, 12 px radius, 12 px internal padding, 8 px gap below the external visible label. Placeholder provides an example, not the label. Error uses error border, icon and a specific message below. Preserve entered values after validation or network failure. Password/OTP fields permit paste and supported autofill.

**Chips:** visual body min-height 36 px within a hit region at least 44 px high; 12 px horizontal padding. Never overlap adjacent hit regions. Unselected: white, control-border, ink. Selected: primary-tint, 2 px primary border and a checkmark or explicit selected state. Reserve border space so selection does not move siblings. Removable filter chips have an accessible “Remove [filter]” action.

**StatusBadge:** 12/16 type, 4 px vertical and 8 px horizontal padding, radius 6 px. Maximum two on an event card. A badge is not a button unless explicitly interactive; status meaning is written in text.

**State priority:** disabled → busy → pressed → selected → hover → default; a keyboard focus indicator can coexist with any operable state. Focus is a 3 px indigo outer ring separated from the control by a 2 px white gap; it cannot be clipped. On a dark/map background retain the white separation.

- Hover, only for hover-capable pointers: change color in 120 ms; actionable cards may rise 2 px and use hover shadow. Do not animate all nested children.
- Press: primary buttons darken and scale to 0.98 for 80 ms. Text fields, links, checkboxes, map controls and QR codes never scale. Click activates once on release within the target.
- Busy: preserve width; show a 16 px spinner and an explicit label such as “Checking availability…” or “Confirming payment…”. Block duplicate activation while keeping progress understandable to assistive technology.
- Disabled: use disabled tokens, remove hover/press behavior and show a nearby cause such as “Choose a night first.” Do not silently disable the only path forward.
- Error: show beside its subject and optionally in a page summary. A toast alone cannot carry a blocking error.

**Save/follow:** allow browsing without an account. On a guest save/follow action, show the sign-in sheet, preserve the requested action, and apply it once after authentication. Cancelling returns to the previous state. On an authenticated save, update immediately, announce “Event saved,” then roll back with an inline/toast retry if persistence fails. Never optimistically confirm booking, payment, live parking or admission validity.

## 7. Motion and restrained microinteractions

Animate to explain state or spatial continuity. No entrance animation on every card as the user scrolls. No autoplay music, particle effects, parallax, pulsing scarcity badges, endlessly rotating festival graphics or spring bounce.

**Exact recipes:**

- Button hover/focus color: 120 ms standard. Press in: 80 ms standard; release: 120 ms standard.
- Chip selection, bookmark fill and checkbox check: 160 ms standard, color/opacity only. Bookmark confirmation may use a single 1.0 → 1.08 → 1.0 icon scale over 160 ms; no hearts flying across the screen.
- Accordion: 220 ms standard for content reveal; chevron rotates 180° over 160 ms. Keep the heading in place.
- Dialog/sheet entry: opacity 0 → 1 and translateY 16 px → 0 over 280 ms enter. Exit: 220 ms exit. Persistent sheet snapping uses 280 ms standard.
- Selecting a map pin: z-order changes immediately, label fills indigo in 120 ms; the matching card receives a 2 px indigo border. Recenter only if the selected pin is obscured, over 400 ms standard.
- Route preview after explicit “Preview route”: reveal both route legs together; optionally draw the route once over 400 ms. Never replay when unrelated details refresh.
- Booking confirmation: a single 220 ms checkmark reveal after server confirmation. No confetti, sound or forced delay before the ticket action becomes available.
- Toast: enter 160 ms, exit 120 ms; informational toast remains 5 seconds. Pause timeout on hover/focus. An actionable or unresolved error notice persists until dismissed or resolved.
- Loading: reserve final layout immediately; reveal a static skeleton after 150 ms if data is still pending, avoiding flashes for immediate responses. After 8 seconds show a slow-connection explanation and a relevant recovery action. Use a small spinner only for a specific in-progress action, not the whole page.

**Reduced motion:** remove transforms, route drawing, automatic map panning and animated height transitions when reduced motion is requested. Snap directly to final geometry; allow at most a 100 ms opacity change. Replace spinner motion with a static progress indicator and text. Never hide progress or delay functionality when motion is disabled. This product choice follows the intent of W3C's [Animation from Interactions guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html); that criterion is AAA, while the broader accessibility target here is WCAG 2.2 AA.

Optional haptics are off by default. Where a native wrapper explicitly supports them and the user opts in, use one light tick on a discrete confirmed selection. Never require vibration or sound to convey meaning.

## 8. App shell, navigation and persistent context

Compact primary navigation has exactly four destinations: **Discover · Map · Tickets · Saved**. Use icon plus label. Account, language and help are reached from the profile control in the header. Artists and Trending are discoverable routes, not additional bottom-navigation tabs.

Wide header contains wordmark, city selector, Discover, Map, Tickets, Saved, a search entry and profile. At widths where this cannot fit, use the compact shell instead of truncating navigation labels.

Persistent browsing context contains selected city, origin if explicitly set, selected night, filters, sort and map viewport. Keep list and map consistent. Browser Back returns to the previous scroll position and selection. Changing city clears locality and distance constraints that no longer apply, explains what changed, and preserves compatible price/style filters. Do not use location permission as an onboarding gate.

For the reference prototype choose Ahmedabad and show that choice visibly. In production, restore the user's last chosen city. A first visit with no choice opens a city picker with Ahmedabad, Vadodara, Surat, Rajkot and Gandhinagar plus city search. Show only cities actually supported by the service; do not promise coverage for every event in a city.

Location prompt is triggered only by “Use my location” or a route action that needs an origin. First explain its immediate benefit. On denial, offer manual city/locality/origin entry; never loop the browser prompt. A distance filter requires a known origin and states which origin it uses.

## 9. Discover home — exact content hierarchy

The default home is an event-decision screen, not a landing page with a giant marketing hero.

Order on compact:

1. 56 px header: wordmark, city choice and account control.
2. Invitation, with one supporting line: `Find your Garba for tonight.` Use only the small motif allowed in §1.
3. 52 px search field: label `Search events, artists or areas`; example `Try “Mandli” or “Satellite”`.
4. One 44 px quick-filter strip: Tonight, Free entry, Mandli, Traditional, Artists, Filters. “Artists” navigates to the artist directory; other chips visibly apply their corresponding filter or open its chooser. Do not pretend this mixed strip is a tablist.
5. `Tonight in Ahmedabad` with event count and an understated `View map` action; use `Near your location` only with a known origin. Show three compact event rows.
6. `Trending over the last 3 nights` with three ranked rows and `How this is ranked`.
7. `Free to join` with two cards and `See all free events`.
8. `Artists this night` with three artist rows and `See all artists`.
9. `Explore by style` with four quiet text/icon choices and `All styles`.
10. `All events` entry leading to full results; include Traditional & Mandli, Under ₹500, Family-friendly and Parking available as filter shortcuts inside the results experience, not as eight additional competing home carousels.

At 390 × 844, an event name, selected-night time, admission price/model and parking summary must appear before the bottom navigation without scrolling. Use compact row cards and tight but token-compliant introductory spacing to achieve this. Do not shrink text or hide price to satisfy a screenshot.

Home uses curated modules with visible “See all” routes. Full results are a vertical list/grid with `Load more` and retained position; no endless carousel inside another scroll region. If no events occur tonight, replace “Tonight” with the next available date and explain `No events listed tonight. Here are upcoming nights.` Do not manufacture results.

## 10. Search, filters and taxonomy

Search opens a dedicated screen on compact and an anchored panel on wide. Search field stays focused; recent searches and suggestions are separated by headings. Debounce suggestions by 250 ms; Enter submits immediately. Provide a clear-text control with 44 px target. Cancel returns to the previous context.

Results group query matches into Events, Artists and Areas. Show event results first unless an artist was explicitly chosen. A query interpreted into structured filters must expose the resulting removable chips; do not claim support for natural-language interpretation unless implemented.

**Filter sheet order:** night/date → admission and price → Garba styles → distance/locality → artist → parking → facilities/accessibility → timing and venue → availability. Each group has a heading and visible selected state. Use native-feeling checkboxes for multiple choices and radio options for one choice. Do not present ten dropdowns stacked in a narrow sheet.

**Defaults and logic:**

- Night: tonight in the venue time zone; show a calendar chooser for other nights. Filter results always show the active date.
- Admission: All / Free entry / Paid. Free includes walk-in and free registration, distinguished on every result. Budget presets: Any / Up to ₹500 / Up to ₹1,000 / Custom. Custom supports min/max numeric inputs; a slider can supplement them. State `Per person, before any separately shown fees` until an all-in price service is available.
- Distance: Any / 2 km / 5 km / 10 km / 20 km from the explicit origin. If origin is absent, offer `Set starting point`; do not invent a distance.
- Parking fee is a radio group: Any / Free parking / Paid parking. Separate optional requirements are Listed parking and Confirmed accessible parking. Vehicle is a single choice: Any / Car / Two-wheeler. A fee filter concerns the parking fee, not event admission. “Listed parking” means a known facility, not live vacant spaces; label the filter help accordingly. Fee, access and vehicle requirements must all match the same parking facility.
- Timing: currently running / starts after 10 PM / ends after midnight. Only evaluate supplied session times; do not equate late-night with loud music or a different cultural format.
- Facilities: independently selectable structured features. Unknown does not satisfy an affirmative filter.
- Availability: Any / Admission available. Free walk-in capacity must not be represented as a reservable ticket count.

Use OR within alternative style or artist selections; use AND across filter groups and across every selected required facility/accessibility feature. Selecting both accessible entrance and accessible toilet requires both to be confirmed. An event tagged Mandli and Traditional can match either selected style without duplicating its card. Counts update in the footer. Filters are draft changes until `Show 24 events` is tapped; close/back discards uncommitted changes. `Reset` resets draft values to city/date defaults. With zero matches, the footer reads `Show 0 events` and remains usable so the user can inspect and revise the empty result state.

Sort choices: Recommended (default), Nearest (requires origin), Price: low to high, Trending over last 3 nights. State the active sort. A sponsor label never changes the meaning of an organic rank.

**Taxonomy is multi-dimensional, not one exclusive “type”:**

- Dance/music: Traditional Garba, Mandli, Raas/Dandiya, Folk, Devotional/Aarti, Live orchestra, Artist-led, DJ/Fusion.
- Setting/community: Sheri/Neighbourhood, Society/Community, Temple, Heritage, Village-style, College, Corporate, Club, Party plot, Arena/Festival ground.
- Format/audience: Family-friendly, Kids activities, Late night, All-night, Sunrise, Themed, Premium experience.

These are controlled discovery tags, not a claim to an exhaustive or authoritative cultural classification. Organizers may propose additions for review. Normalize common search aliases such as “mandla” to the approved “Mandli” tag without changing an organizer's proper event name. Keep tag definitions available to editors. Do not infer family suitability, access eligibility or exclusivity from images or price.

## 11. Event cards

**Standard card:** image 16:9 → content padding → title → selected night/time → artist → locality/distance → up to two style tags → price/admission and parking summary. Use 8 px gaps between major rows and 4 px within metadata. Title is at most two lines on cards; full title is available on detail. Do not truncate price, date or admission conditions.

**Compact row:** 88 × 88 image at left, 12 px gap, flexible text at right. Title, time, artist and price appear in that order; a full-width bottom row carries parking and optional verified popularity status. At 320 px or enlarged text, stack the image above the content if the text column becomes narrower than 180 px. Use this variant for home, ranked lists and map results.

Required visible decision data:

- Name, selected night and start time. Overnight continuation has a `Next day` label where abbreviated.
- Artist scheduled for that session; otherwise `Lineup to be announced` or omit the row when the event has no artist program.
- Locality; distance only if origin and method are known. Straight-line distance is labeled `away`; routing estimates explicitly say drive or walk.
- Exactly one admission string when admission is available and confirmed: `Free entry`, `Free · registration required`, or `From ₹499`. Operational overrides replace the price string with `Sold out for [date]`, `Cancelled`, or `Postponed`. Missing information uses `Price not confirmed` or `Admission details not confirmed`, with no checkout action until resolved.
- Parking summary: `Free car parking · 8 min walk`, `Paid parking from ₹100`, or `Parking details not confirmed`. Display only supported information.

Maximum two overlay badges: one operational status if needed (Cancelled, Sold out, Postponed), then one evidenced distinction. Status takes precedence over Trending. Saved action sits top-right on a white control. Price lives in content, not on the image.

The title/image are a single semantic link to detail. Save is a separate sibling button; never nest buttons inside an all-card button or link. Whole-card pointer affordance may route through the title link without creating duplicate tab stops. Do not put Book, Share, Directions, Follow and Save all inside a small card.

Sold out applies to the selected session and opens a detail page with `Choose another night`. Cancelled/postponed events retain readable names, dates and relevant customer actions. Do not decorate these with active popularity badges.

## 12. Event detail and night selection

Compact reading order: hero → name and organizer → status notices → selected night → time and artist → style and short value statement → admission summary → venue and directions → parking → facilities → schedule/ticket options → rules and policies → reviews → related events. A sticky booking bar provides the primary action throughout normal scrolling.

Give the first content viewport a visible date, admission model and action. Hero must not consume a full screen. `About this Garba` is at most three short lines before `Read more`. Do not hide cancellation, entry conditions or critical access restrictions in that expansion.

**NightSelector:** horizontally scrollable dated buttons, min-width 64 px and min-height 64 px; show day/date and availability label. Selected button uses tint plus 2 px border and an accessible selected state. Show festival-night numbering only if an organizer-defined sequence exists. Calendar alternative is available without swiping.

Changing the night updates time, artists, ticket options, price, admission status, relevant parking hours and notices as one coherent state. Reserve layout during loading. Never leave the previous artist next to the new date. If selected ticket options do not exist on the new night, clear them with `Ticket selection reset for 17 Oct` and require a new choice before payment.

The booking bar contains price/admission at left and an action at right:

- Free walk-in: `Free entry` + `Get directions`; supporting copy says no ticket required and any verified gate/capacity condition.
- Free registration: `₹0 · Registration required` + `Reserve free entry`.
- Paid: `From ₹499` + `Choose tickets`.
- Selected night sold out: `Sold out for 16 Oct` + `Choose another night` if any are available; otherwise a secondary `View event details`, with no fake waitlist.
- Cancelled: persistent notice plus the appropriate `View booking` or support route for a purchaser. Disable new reservations.

On desktop move this summary to the right column; do not repeat a second sticky bottom bar. Reviews show count, source and a real rating only when data exists. `Verified attendee` means an actual verified visit signal, not merely a registered account.

## 13. Artists

Artist directory has a search field, date/city context and rows: 56 px portrait, name, short genre descriptor, and next confirmed performance in the selected city. Tap opens artist detail. A follow button is secondary and never blocks browsing.

Artist detail shows portrait, name, concise bio and performances grouped by explicit date. Each performance links to the corresponding event session, carrying that date into ticket selection. Distinguish Confirmed, Schedule changed and Awaiting confirmation. Do not show a guessed start time.

Use actual permissioned images and approved biographies in production. If the artist changes after booking, show an event-change notice tied to the affected session and available policy/help actions. Do not silently replace the artist's name on an existing ticket without indicating the change.

## 14. Trending and recent popularity

Use the default heading `Trending over the last 3 nights` and expose the exact three completed event-night dates, city and last update in `How this is ranked`. A separate “Tonight” context can select an upcoming session of an event with historical activity; historical popularity is never tonight's live crowd count.

Show ranked rows with one meaningful evidence line, such as `High recent booking activity` or `Popular with verified attendees`, only when the ranking service supports that statement. Detail can distinguish platform bookings, platform check-ins, organizer reports and estimates. Label the source and time window; do not turn bookings into visitor totals.

The backend owns ranking methodology, normalization and eligibility; the design must not invent percentages or compute an arbitrary score. If an approved explanation exists, expose its main inputs in plain language. A percentage change requires comparable periods, an adequate baseline and a supplied value; otherwise omit it.

Use a small upward-trend icon in ink/maroon, no flames or flashing numbers. Sponsored placements are separately labeled `Sponsored` and excluded from numbered organic rank. With insufficient data, show `Trends will appear after more nights of activity` on the Trending screen and omit the empty module from home. Never manufacture a “Popular” fallback.

## 15. Facilities, rules and parking

**Facilities:** use two columns on compact where labels fit, one column at enlarged text, and up to three on wide. Each row contains an icon, name and an immediately visible Available / Not available / Not confirmed label. Expansion reveals source, confirmation time and detailed access information. Show the six most useful supplied features first, then `View all facilities`.

Suggested initial order: drinking water, toilets, accessible entrance, first aid, food, seating. Additional features can include accessible toilets, security, CCTV, kids area, baby-care space, lockers, charging, lost and found, shuttle and public transport. Do not collapse all accessibility into a generic wheelchair check: separate entrance route, surfaces, toilets, viewing/seating and accessible parking. Unknown is not a negative fact and never receives a positive checkmark.

Rules use short labeled rows: age/child policy, attire, accepted ID, permitted items, re-entry, arrival cutoff, cancellation/refund and weather policy. Present relevant restrictions before booking; do not imply a legal guarantee or “100% safe” based on facilities.

**ParkingCard anatomy:**

1. Name and relationship: Organizer lot / Public facility / Other verified facility.
2. Fee with basis: `Free for cars and two-wheelers` or `₹100 per car · per entry`; unknown fee reads `Price not confirmed`.
3. Eligible vehicles, opening/closing hours and any entry conditions.
4. Walk to a named event gate: `650 m · about 8 min walk to Gate 2`.
5. Surface/access details when verified; lighting/security are individual facts.
6. Occupancy: `Availability unknown` unless a real timestamped source exists.
7. Provenance: `Details confirmed by organizer · [date/time]` or its actual equivalent.
8. `Preview route` action, with `Choose parking` state in the arrival flow.

Fee, existence, permission to park and live vacancy are separate facts. Do not infer legal street parking from empty-looking roads, a satellite image or a nearby open plot. Do not call unverified parking free. A vacant-space count is shown only with a timestamped occupancy source. Product default: after 5 minutes without an occupancy update, replace it with `Availability unknown`; retain the last update in details. Static fees and opening hours use their own confirmation date, not that live-data timer.

Parking lists default to eligible verified facilities ordered by walking duration to the selected gate, with unknown durations last. `Lowest fee` is an explicit alternate sort. Use `Suggested parking` only when the service supplies an explanation, e.g. `Free for cars · shortest verified walk to Gate 2`. Do not promise “Best parking” without known preferences and valid data.

Show a clear condition when a lot closes before the event ends. A full, closed or incompatible lot cannot be the default driving destination. Provide alternatives; if none exist, show direct gate/drop-off directions only where that access is valid, with `Parking not confirmed`.

## 16. Explore map and bottom sheets

Take inspiration from delivery-app continuity: place selection → route context → arrival details. Do not copy Swiggy branding or show a fictional moving rider. The map is a practical part of event discovery, not a decorative background.

Map style: desaturated warm roads and land, readable locality labels, restrained water color and clear major roads. Keep provider attribution and controls visible and unaltered. Do not remove legal/provider attribution to match the aesthetic.

**Markers:** event marker is a white price pill with indigo outline (`₹499` or `Free`), min-height 32 px within a 44 px hit region. Selected marker fills indigo with white text and a clear pointer. Parking uses a square `P`; a gate uses an outlined entrance symbol. Shapes and text, not color alone, distinguish types. Cluster overlapping events into a numbered circle; tapping zooms or opens a count-labeled list. Do not stack unreadable individual pins with overlapping touch regions.

**Reciprocal selection:** selecting a pin highlights its result card and moves the sheet to the middle state. Selecting a result highlights its marker. A dedicated `View event` link opens detail; the selected card itself stays usable for map comparison. Preserve selection, filters and scroll position when switching list/map.

Panning does not silently replace results. After a meaningful viewport change show `Search this area`; results refresh only after activation. Keep existing results visible while fetching. Cluster counts and result count reflect the same active filters. No GPS permission is needed to pan or search a chosen city.

**Compact persistent map sheet:** map occupies the available area below the 56 px header and above the 64 px navigation plus safe area. Let this measured map area height be `H`.

- Peek: 96 px high, showing handle, result count and selected-result summary.
- Middle: 48% of `H`, clamped to 220–360 px; shows selected card plus `View event` and `Preview route` actions.
- Expanded: `H − 120 px`; shows the scrollable result list, its count and list controls. Retain a 120 px map strip above it for attribution, a visible selected marker and essential map controls. Radius 24 px top corners, white surface and sheet shadow. If those elements cannot fit without overlap, use the full-height list/map toggle fallback below.
- Initial map state: Middle with result list summary and no arbitrary selected event; selection opens that event's middle card.
- Use a 32 × 4 px visual drag handle in a 44 px interaction header, plus accessible Expand/Collapse buttons. Dragging from the handle snaps to the closest state. A vertical release velocity above 0.6 px/ms advances one state in that direction; otherwise nearest height wins.
- Internal list scrolling is enabled only in Expanded. Dragging ordinary content never unexpectedly changes the sheet; the handle owns sheet dragging. Back first closes a modal, then changes Expanded → Middle → Peek, then returns to the preceding route.
- The persistent sheet is nonmodal: no backdrop, no focus trap, map/list controls remain available. Put equivalent navigation in its list so keyboard users never need to operate the visual map.
- Recompute map padding for each sheet height so the selected marker and attribution are not covered. Reposition recenter/zoom controls above the sheet with a 16 px gap.
- If `H < 420 px` or text enlargement prevents the middle summary from fitting, replace snapping with a full-height list and a `Show map` toggle. Do not compress text into an unusable sheet.

**Modal sheets:** filters, city, ticket options and parking detail use a scrim and a top-right close action. Height is content-driven with a maximum of 90% of dynamic viewport height; allow internal scrolling and a sticky footer. They trap focus, return focus to the opener and close via Escape/back. Opening a modal over a persistent map sheet freezes the underlying state; it does not create a second draggable sheet. On short screens use a full-screen dialog.

**Wide map:** full remaining viewport below the header; 400 px results panel at left and map at right. No floating mobile bottom sheet. At 1024–1199 px the panel is 360 px. Selected event summary occupies the panel; filters open as a modal. Medium uses the compact map behavior until the wide breakpoint.

## 17. Directions and the parking-to-gate journey

Maintain separate entities and coordinates for venue area, pedestrian gate, vehicle/drop-off gate and each parking entrance. Route to the correct entrance coordinate, never automatically to a large venue's centroid.

**Flow:** Event detail → Get directions → choose transport and origin → choose compatible parking or direct gate → route preview → open supported navigation → retain the arrival summary in the app.

Transport choices are Car, Two-wheeler, Walk and Public transport. Present only routing capabilities actually supported; for an unavailable mode provide written arrival information and a supported external map action rather than a fabricated route.

For a parked arrival, display two numbered legs:

1. `Drive to North Lot entrance` — origin, destination, estimated duration, distance and known fee.
2. `Walk to Gate 2` — selected parking exit/footpath, named entrance, estimated duration and any verified access notes.

Draw drive leg as a 4 px solid indigo line and walking leg as a 3 px dashed indigo line, each with a white casing for visibility. Labels and the leg list carry equivalent meaning. Show origin, parking and gate markers. A production route must come from routing data; do not draw a straight line and present it as a navigable walking path. If a safe/verified connecting path is unavailable, say `Walking route not confirmed` and show the gate address and available information.

The route summary displays `18 min drive + about 8 min walk`, chosen parking fee, gate name and arrival target. Estimates include a fetched timestamp in expanded detail. Without traffic data, label `Estimate without live traffic`. Never show live congestion, a moving position or arrival ETA without a real data source.

The primary action is `Open driving directions`; the next leg action is `Open walking directions`. On a direct walking arrival use `Open walking directions to Gate 2`. Use `Start navigation` only if actual turn-by-turn guidance is implemented and available. The external map receives the exact selected entrance and supported travel mode; omit origin if the user prefers that provider to locate them. Do not assume every provider supports multi-stop or two-wheeler routing identically. Google Maps integration should follow its [official Maps URLs documentation](https://developers.google.com/maps/documentation/urls/get-started).

On return from an external map, retain selected parking, gate and the two-leg summary. Offer `I'm at parking — show gate route` as an explicit action; do not claim arrival based solely on switching back to the app. External-map failure has `Copy address`, `Copy coordinates` and retry alternatives.

Route changes to parking/gate must be explicit. A closure creates an inline alert with a proposed alternative; never silently reroute someone after a booking. Manual origin, denied location, inaccurate position, no route, offline map and missing gate data all have distinct recovery states.

## 18. Ticket selection and checkout

Use this sequence: select night → choose ticket/pass → quantity → contact/sign-in → review total and policies → payment → confirmation → admission ticket. Free registration skips payment and still confirms inventory before issuing admission. Free walk-in never fabricates a ticket or forces checkout.

**TicketOption:** white card, 16 px padding, 12 px radius, 1 px control-border. Selected: primary-tint with 2 px primary border and checked radio/checkbox. Display category, unit price, entitlement, relevant restrictions, selected night(s), availability and quantity control. A category description is at most two lines before an optional expansion; essential restrictions remain visible.

Support single-night, selected multi-night and full-event passes, plus organizer-defined VIP, family, group or student options. Entitlements come from data. Explicitly say how many people a family/group pass admits, which dates a season pass covers, whether ID/age conditions apply, and which zones/gates are included. Never assume a “VIP” pass includes parking, seating or re-entry.

`QuantityStepper`: 44 px minus and plus buttons, centered quantity with tabular numerals, visible maximum where relevant. A family-pass quantity counts passes, not people; show the calculated admitted headcount separately. Enforce organizer limits without guessing. On inventory change preserve valid selections, explain unavailable items and recalculate the total before the user recommits.

Checkout shows a compact immutable event/night summary, selected pass details, editable quantity, necessary attendee/contact fields and itemized total. Collect only fields required to deliver and validate this ticket; optional fields say optional. Authentication happens at the transaction boundary, preserving the choice. No full-screen sign-up detour that loses the cart.

The price summary shows ticket subtotal, discounts actually applied, each mandatory fee/tax supplied by checkout, and the final payable amount. Do not invent tax rates or treat the example fee values as a pricing policy. No preselected donation, insurance, marketing consent or hidden mandatory fee. Promotion entry is a collapsed secondary row; it must not overshadow payment.

Show cancellation/refund terms and entry requirements before the final action. A necessary terms checkbox is unchecked by default and links to the applicable text. The final payment button reads `Pay ₹1,045.20`; free registration reads `Confirm free registration`. An external payment handoff is clearly identified. Use real provider payment controls in implementation, never imitate collecting credentials in a decorative mock screen.

If the service creates an inventory hold, show its real expiry and reserved selection. Do not start an invented countdown on first page load. Display a calm minute/second timer without flashing or repeated screen-reader announcements. Warn once near expiry. If extension is supported, expose it; otherwise explain the expiry and preserve entered contact data. Reservation timing needs an accessibility review; do not claim compliance merely because a countdown is visible.

## 19. Booking, payment and exception states

Keep order status, payment status and admission status distinct. The UI must reconcile with server-confirmed state after provider return, refresh, app resume or uncertain connectivity.

- **Selecting:** no payment started; totals update from current choices.
- **Checking/held:** availability is being checked or a real temporary reservation exists. Show selected quantity and the real expiry, if supplied.
- **Submitting:** one payment action is in progress. Freeze duplicate submission and explain what is happening. Do not clear the cart.
- **Pending/uncertain:** `We're confirming your payment`. Show order reference, last checked time, `Check status` and a route to Tickets/help. Do not show a green success ticket, a failure message or another Pay button while the outcome is unknown.
- **Confirmed:** show confirmation only when the server confirms booking. If payment is confirmed but ticket generation is pending, say `Payment confirmed · preparing your ticket`, keep the reference and offer status refresh; do not render a fake QR.
- **Failed:** show the supplied failure meaning in plain language, retain selections if still valid, and allow `Try payment again` only after the previous attempt is resolved. If money may have been debited, explain the actual pending/reversal state rather than promising an instant refund.
- **Hold expired, with no unresolved payment:** `Your reservation expired. Check availability to continue.` Keep useful form data, revalidate inventory and show changed totals before payment.
- **Price changed:** show old/new total and require explicit confirmation of the new total. Never charge a silent increase.
- **Cancelled/postponed session:** block new checkout and show the authoritative event-change notice and purchaser actions.
- **Refund requested/processing/refunded/partially refunded:** each has a separate label, amount, reference and supplied timeline; never infer refund completion from a cancellation.

Pending/uncertain payment takes precedence over hold expiry. If a hold expires during an unresolved payment, keep the existing order in confirmation/reconciliation state and do not offer rebooking or payment retry until the outcome is resolved.

Refreshing or reopening the page retrieves the existing order. Retrying a status lookup is distinct from creating a new purchase. Leave/close confirmation is used only when an actual hold or user-entered checkout progress will be lost; it must not trap the user. Payment reconciliation continues after returning to Tickets.

## 20. Confirmation, admission ticket and ticket wallet

Confirmation hierarchy: restrained success icon → `You're going to [event]` → explicit night and pass → `View ticket` primary → `Plan your arrival` secondary. Keep the booking reference and delivery status visible. Sharing and calendar actions are tertiary and must never automatically share a QR or expose personal details.

**AdmissionTicket:** white surface, 16 px radius, thin border, 20 px padding. Header contains event title, status and the small optional motif. Body contains date/time, venue, entry gate, category, people admitted and ticket holder detail where required. A single dashed divider separates the admission code area. Do not use cutouts that clip content or weaken the QR quiet zone.

QR area is black modules on plain white, no logo, gradient, motif, rounded modules or overlaid text. Reserve a nominal 240 × 240 px region including the quiet zone on the reference mobile screen; retain at least four QR modules of clear quiet zone on every side and integer module sizing for the actual payload. Never scale a dense code below reliable scanning size to fit a narrow card; offer a full-width code view. Keep booking/ticket reference in readable text below.

Only issued admission credentials receive a usable code. Prototype codes must be clearly labeled `DEMO — not valid for entry` and must not encode real credentials. Distinguish booking reference, payment reference and admission ticket ID.

Ticket states: Upcoming, Entry used, Partly used multi-entry pass, Expired, Cancelled, Refund processing and Refunded. Display remaining valid dates or entries only when supplied. `Entry used` is not an automatic global revocation of a multi-night pass. For invalid/cancelled tickets replace the scannable code with a status panel and help/reference details rather than leaving an apparently active code.

Tickets screen has Upcoming and Past segments, explicit empty states, and a separate pending-orders section when needed. Opening a ticket works without repeating authentication while the user's valid session and authorized cache allow it. Protect access to another person's booking.

Offer `Save for offline` only if a readable ticket and its required static credentials can actually be stored. Mark cached status `Last updated [time]`; do not label it currently valid without confirmation. Offline access does not guarantee gate validation. If rotating credentials require connectivity, say so and provide the supported booking-reference/help fallback. Download, wallet and sharing actions appear only when implemented.

## 21. Loading, empty, error and degraded states

Every state uses the same page skeleton and tokens. Preserve filters, scroll position and entered values wherever possible. Avoid blank white screens and generic “Something went wrong” copy when a concrete explanation is known.

**Loading:** skeletons match final image and text geometry; use three visible event placeholders on a list and one detail skeleton on a detail page. Keep header, search and selected context readable. Incremental list fetches use a footer indicator; they do not erase existing results. A changing result count is announced once after completion.

**No search matches:** `No events match these filters` → show current date/area → `Clear filters` primary and `Change night` secondary. Keep the query editable; never silently broaden it.

**City without listings:** `No events listed in [city] yet` → `Choose another city`. If event suggestions are implemented, offer them as a secondary action. Do not invent listings to fill cards.

**No saved events:** `Keep a few nights in mind` → short explanation → `Discover events`. **No tickets:** `Your booked nights will appear here` → `Explore events`. Do not show a zero-value analytics dashboard.

**No parking data:** `Parking details not confirmed` → named venue/gate information and contact/help if available. Do not imply that roadside parking is permitted. **No artist schedule:** `Lineup to be announced`, not a placeholder celebrity.

**Location denied/unavailable:** `Choose a starting point to see distances` → manual entry. Discovery remains functional. **Map unavailable:** keep address, selected result, parking list and supported external directions; replace map with a state panel rather than blocking the whole page.

**Route unavailable:** preserve origin/destination, state the failed mode, offer another supported mode or copyable destination. Never invent a route estimate as fallback.

**Network failure:** retain cached results with `Showing saved information · updated [time]`; show retry next to stale content. For inventory/payment, require a current check before committing. Offline bookings are never silently queued as confirmed purchases.

**Image failure:** retain aspect ratio and title; use the subdued image fallback. **Partial data failure:** display valid sections and an inline retry for the failed section. Do not block the entire event because reviews failed.

**Event removed/expired deep link:** show `This event is no longer available`, any authorized existing booking route, and `Find other events`. Distinguish ended, removed and temporarily unavailable when known.

**Permission/security-sensitive failures:** use a clear neutral explanation, preserve non-sensitive context, and provide sign-in/help as applicable. Do not reveal another person's booking details in an error message.

## 22. Accessibility, usability and honest information

Target WCAG 2.2 AA in the implemented product and test it; a visual specification alone does not establish conformance. Normal text must meet at least 4.5:1 contrast and large text 3:1. Meaningful control boundaries, icons and focus cues must remain discernible. Use the token pairs in §2 and verify rendered states; see W3C's [contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [WCAG 2.2 reference](https://www.w3.org/WAI/WCAG22/quickref/).

Use at least 44 × 44 px interactive hit regions throughout this product, with visible separation; this is a product choice stricter than the basic 24 CSS px size in WCAG 2.2's AA [target-size criterion](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Use 48 px minimum height for primary controls. Small visual icons may sit within larger targets.

Maintain logical headings, landmarks and keyboard order. Use actual links for navigation and buttons for actions. Enter/Space operates controls appropriately; Escape closes dismissible overlays. Never trap focus in the persistent map sheet. Modal dialogs make underlying content inert, retain focus inside while open, and restore focus on close; follow W3C's [modal-dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

Provide a complete list/text alternative to map results and routes. Support expandable sheets without dragging, carousels without swiping and information without hover. Every form field has a visible label. Connect errors/help to their field, focus the first invalid field after submission, and show a concise error summary for multiple issues.

Use polite live announcements for result counts, save state and meaningful booking transitions. Reserve assertive alerts for time-sensitive blocking events. Never announce every countdown second or every map movement. Describe photos only when they add information; decorative motifs have empty alternative text or are hidden from assistive technology.

Support 200% text enlargement, narrow reflow, Gujarati wrapping, text-spacing overrides and visible focus above sticky bars. Respect reduced motion as defined in §7. Provide predictable authentication without disabling paste or relying on memory puzzles.

Verification is scoped: `Organizer identity verified` does not mean parking, artist schedule, accessibility or safety is verified. Labels must identify what was checked and, where relevant, when. Show unknown data honestly. Do not infer crowd density, personal safety, affordability or user eligibility from an image, neighborhood or demographic assumption.

## 23. Shared fictional prototype fixtures

All records in this section are fictional design data. They do not assert a real event, performer, festival calendar, available space, price or route. Put a quiet `Prototype · sample events` label in preview builds and mark all demo tickets invalid. Replace fixtures with authorized live data for production; never mix them into real discovery results.

**Reference context:** Ahmedabad; English UI; preview clock 16 October 2026, 6:00 PM IST; selected session begins 16 October. The dates are sample UI dates, not a verified Navratri calendar. No location permission on first render. Explicit demo origin for the arrival flow: `Demo starting point`.

**Prototype route exception:** for the fictional fixtures below, render a clearly labeled `Illustrative route · not navigable` schematic using the supplied sample durations. It must not resemble a verified street route or launch external navigation. Annotate the intended production handoff action; production polylines require routing data. The schematic is an intentional demonstration, not a geographic claim.

**E-101 — Aangan Mandli:** fictional paid event at `Demo Heritage Ground, Ahmedabad`; Mandli + Traditional; artist `Kesar Folk Ensemble` (fictional); session 16 Oct 8:00 PM → 17 Oct 1:00 AM; General pass ₹499 per person; selected quantity 2; available; pedestrian Gate 2. No rating or live crowd count. Sample parking `North Lot`: organizer lot, cars/two-wheelers, fee ₹0, hours 6:00 PM–2:00 AM, 650 m/about 8 min walk to Gate 2, occupancy unknown. Preview drive leg: 18 min/6.2 km, explicitly illustrative. No real navigable coordinates are supplied; do not manufacture them.

**E-102 — Sheri Garba Circle:** fictional community event; free walk-in, no registration; Traditional + Community; session 16 Oct 8:30 PM → 17 Oct 12:30 AM; community musicians; parking details not confirmed. CTA `Get directions`.

**E-103 — Raas Courtyard:** fictional event; free registration required; Folk + Family-friendly; session 16 Oct 7:30 PM–11:30 PM; sample artist `Sur Mandal` (fictional); limited registered admission; paid car parking ₹100 per entry, occupancy unknown. CTA `Reserve free entry`.

**E-104 — Indigo Folk Night:** fictional artist-led event; selected 16 Oct session sold out; a separate 17 Oct session is available at ₹699 with a different fictional lineup. Use it to demonstrate `Choose another night` and the complete update of price/artist/session information.

**Checkout example for E-101:** tickets `2 × ₹499 = ₹998`; illustrative booking fee ₹40; illustrative tax on fee ₹7.20; total `₹1,045.20`. These amounts test the UI arithmetic only and are not a prescribed fee/tax policy. The same total must appear on review, payment, confirmation and receipt. Ticket entitlement is two people on the 16 October starting session; distinguish each issued admission credential according to the actual product model.

**Trending fixture:** three completed sample nights, 13–15 October; sample update time 16 October, 5:30 PM IST. Aangan Mandli has `High recent booking activity — sample data`. Do not display invented attendance totals, precise growth percentages or a real-world popularity claim.

**Facilities fixture:** drinking water and toilets are organizer-confirmed sample values; accessible route and accessible toilet are Not confirmed. Do not generate positive accessibility badges from the visual style of the venue.

**Exception fixtures:** E-101 hold expired; payment pending; payment confirmed/ticket pending; failed payment resolved for retry; E-104 sold-out night; parking occupancy update stale; GPS denied; route unavailable; zero search results; offline cached admission ticket; cancelled session with refund processing. Use deterministic labels from the preceding sections.

## 24. Required Stitch output and handoff

Generate one coherent product, not unrelated concept alternatives. Maintain a component sheet with token names and variants, a screen set, a state set and linked critical flows. Use realistic copy from §23, never lorem ipsum.

**Batch A — foundations and discovery:**

1. Token/type/component board with default, selected, hover, focus, pressed, disabled, loading and error states where applicable.
2. Discover home at 390 × 844 and 1440 × 1024.
3. City selection and location-denied fallback.
4. Search/results with a mixed query, active filters and zero results.
5. Full filter sheet with draft changes, count and reset.
6. Artist directory/detail and recent-popularity explanation.

**Batch B — event and arrival:**

7. Paid event detail with selected night; corresponding free walk-in, free-registration and sold-out variants.
8. Parking list and expanded parking detail showing fee, gate walk and unknown occupancy.
9. Mobile map at Peek, Middle and Expanded states, plus desktop split layout.
10. Selected map marker/card, `Search this area`, and modal filters over preserved map state.
11. Origin/transport selection and two-leg route preview, with handoff actions.
12. Missing parking, no route, denied location and unavailable map variants.

**Batch C — booking and resilience:**

13. Ticket/pass selection, quantity and night-change reset.
14. Checkout at mobile and desktop with full totals, policies and active real-hold example annotation.
15. Submitting, pending, failed, expired hold, changed price and payment-confirmed/ticket-pending states.
16. Confirmed booking, admission ticket, offline ticket and invalid/cancelled ticket.
17. Tickets wallet with upcoming, past and pending orders; Saved with content and empty state.
18. Loading, partial failure and offline browsing examples using the shared state system.

**Link these four critical paths:** paid discovery → correct night → checkout → pending → confirmed ticket → parking → gate route; free walk-in discovery → directions; free registration → confirmation → ticket; map filter → marker selection → event → Back with preserved context.

**Annotate each nontrivial component:** anatomy, token references, data prerequisites, action destination, focus behavior, motion recipe, empty/error behavior, and compact/wide adaptation. In handoff, distinguish what the generated prototype actually implements from what is specified for engineering. Do not claim operational payments, live GPS, real inventory, actual venue verification or accessibility conformance from visual screens alone.

## 25. Acceptance checklist, dos, don'ts and anti-patterns

The design is ready for implementation only when each relevant item below is satisfied or a concrete unresolved limitation is recorded. Do not hide missing states behind “polish later.”

### Product and information checks

- [ ] In one compact home viewport, a visitor can identify an event, night/time, admission model and parking summary.
- [ ] City, night, filters and map/list context persist predictably through navigation and Back.
- [ ] Artist, ticket price, entitlement and availability always refer to the same selected session.
- [ ] Free walk-in, free registration and paid booking have distinct actions and complete flows.
- [ ] Parking fee, permission/existence, vehicle eligibility, occupancy and walking route remain separate facts.
- [ ] Directions use the correct parking/gate entrance; missing route data is not visually fabricated.
- [ ] Historical popularity has a city, time window and supported basis; it never implies live crowd or ticket scarcity.
- [ ] Unknown facilities/accessibility are visible as unknown, not checked as available.
- [ ] Full payable total and relevant restrictions appear before payment; all sample totals reconcile.
- [ ] Pending payment is distinct from failure and confirmation, with no duplicate-purchase encouragement.
- [ ] Confirmed payment with ticket generation pending cannot produce a fake admission QR.
- [ ] Cancellation, sold-out dates, pass entitlements, refund states and offline limitations have explicit treatments.

### Visual and interaction checks

- [ ] All screens reuse the exact palette, font families, scale, radii, spacing and named components.
- [ ] The page has a clear reading order and one dominant action per local decision group.
- [ ] Only one cultural motif appears in a viewport; no decoration competes with functional data.
- [ ] Event/artist images remain natural, correctly cropped and independent of essential text.
- [ ] Buttons, chips, cards and forms show the specified focus, press, selected, busy and disabled behavior.
- [ ] Motion timings and reduced-motion alternatives are specified; nothing loops decoratively.
- [ ] Mobile sticky bars, map attribution and keyboards do not cover content or controls.
- [ ] Long event names, Gujarati strings, large text and narrow screens grow/reflow without clipping.
- [ ] List/map selection, sheet snapping, modal focus and Back behavior are consistent.
- [ ] Empty, error, loading, slow and offline states retain meaningful context and recovery actions.

### Accessibility and handoff checks

- [ ] Text contrast and control boundaries pass on actual rendered backgrounds, including focus and error states.
- [ ] Every action is usable with keyboard and without drag, hover or swipe; focus is never hidden.
- [ ] Modals trap and restore focus correctly; persistent map sheets do not.
- [ ] Hit regions meet the product's 44 px minimum; primary controls meet 48 px height.
- [ ] A screen reader can understand filters, prices, quantity, routes, status changes and ticket entitlement.
- [ ] Text enlargement, reflow, reduced motion and language switching have been checked on reference states.
- [ ] QR designs preserve a white quiet zone and actual scan verification is required before production release.
- [ ] Prototype fixtures are unmistakably fictional and cannot be mistaken for valid admission credentials.
- [ ] Engineering receives components, states, interaction annotations and known limitations, not just screenshots.

### Explicit dos

Do make the interface feel local through language and a few well-placed forms. Do make the selected night the connective tissue of the experience. Do prioritize parking and the actual gate. Do use clear labels and meaningful whitespace. Do make unavailable and uncertain information understandable. Do make the ticket readable in a queue on a small phone. Do repeat familiar component behavior across screens.

### Explicit don'ts and rejected patterns

- No neon festival rainbow, full-page red/orange/yellow gradients, generic purple AI glow or black nightclub aesthetic.
- No giant hero carousel, autoplay video, constant confetti, bouncing CTAs, decorative cursor effects or background music.
- No copy-pasted food cards, delivery ratings, restaurant timing labels or fictional rider tracking.
- No 12-chip badge clouds, emoji-led feature grids, ornamental borders on every card or competing primary buttons.
- No tiny gray text, unlabeled icons, pale-on-pale inputs, hover-only actions, drag-only sheets or hidden keyboard focus.
- No forced login for browsing, forced GPS permission, misleading notification prompts or prechecked marketing consent.
- No invented events, artists, fee-free claims, visitor counts, scarce-ticket warnings, real-time parking or “verified safe” badges.
- No single unchanging artist/price for an entire multi-night festival when session data differs.
- No “Free” label that hides mandatory charges, unexpected pass restrictions or registration requirements.
- No direct navigation to a venue centroid when the actual entrance is known; no decorative line pretending to be a route.
- No stacking a bottom navigation, map sheet, floating CTA and checkout bar over the same content.
- No success screen based solely on a payment redirect, fake QR placeholder presented as usable, or retry action that encourages duplicate payment.
- No pretending the prototype is production-ready because it looks polished. Readiness requires truthful data connections, working states and tested behavior.

**Final instruction to the design agent:** preserve the exact system, complete the four critical paths and prove the exception states. Aim for a calm interface with a distinctly Gujarati invitation and unusually thoughtful night, parking and ticket details. Remove any decorative element that makes a choice harder.
