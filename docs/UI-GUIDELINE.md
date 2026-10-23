# KINGZ — UI Guideline

**Version:** 1.0.0  
**Status:** Baseline for implementation  
**Product style:** Modern futuristic SaaS / premium barber  
**Brand palette:** Purple · Black · Gold · Red · Gray

## 1. Design Principles

1. **Premium, not noisy:** use dark surfaces and gold as a restrained accent.
2. **Clear hierarchy:** the next action, booking status, price, date, and time should be immediately scannable.
3. **Functional futurism:** subtle glow, thin borders, restrained gradients, and crisp typography; avoid excessive neon or decorative animation.
4. **Role clarity:** customer, admin, and barber experiences have consistent foundations but role-specific navigation.
5. **Responsive by default:** mobile booking must not depend on hover or wide tables.
6. **Accessible states:** status uses text and icon/shape in addition to color.

## 2. Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `brand-purple` | `#6D28D9` | Primary brand, main actions, selected navigation |
| `brand-purple-light` | `#8B5CF6` | Hover/focus accent and highlights |
| `brand-black` | `#111014` | Main dark background |
| `surface-dark` | `#19171F` | Cards and panels on dark pages |
| `surface-raised` | `#23202B` | Elevated panels, menus, dialogs |
| `brand-gold` | `#D9B66F` | Premium accent, key highlights, selected details |
| `brand-red` | `#C93445` | Destructive action, error, urgent status |
| `gray-950` | `#111116` | Deepest neutral |
| `gray-800` | `#34313B` | Borders and strong neutral surfaces |
| `gray-600` | `#77737F` | Secondary text on light surfaces |
| `gray-400` | `#A7A3AE` | Secondary text on dark surfaces |
| `gray-200` | `#E7E4EB` | Light borders and backgrounds |
| `gray-50` | `#F8F7FA` | Optional light content canvas |
| `white` | `#FFFFFF` | Primary text on dark surfaces |

### Color usage rules
- Default application shell: dark background with raised charcoal surfaces.
- Purple is the primary action color. Gold is a highlight, not a replacement for every button.
- Red is reserved for destructive actions, errors, or attention-required states.
- Do not use gold small text on white/light backgrounds.
- Use semantic CSS variables so the palette can be adjusted centrally.
- Check text/background contrast before finalizing each component.

## 3. Typography

- Preferred font: `Inter`, with system sans-serif fallback.
- Brand display/hero: 32–48 px desktop, 28–36 px mobile; weight 700–800.
- Page title: 24–32 px desktop, 22–26 px mobile; weight 700.
- Section title: 18–22 px; weight 600–700.
- Body: 14–16 px; line height 1.45–1.65.
- Labels and metadata: 12–13 px; never use low contrast for important information.
- Numeric values (prices, totals, metrics) should use tabular numerals when available.

## 4. Layout and Spacing

Use a 4 px base spacing scale:
- `space-1`: 4 px
- `space-2`: 8 px
- `space-3`: 12 px
- `space-4`: 16 px
- `space-5`: 20 px
- `space-6`: 24 px
- `space-8`: 32 px
- `space-10`: 40 px
- `space-12`: 48 px
- `space-16`: 64 px

- Desktop content max width: approximately 1440 px.
- Main content padding: 32 px desktop, 24 px tablet, 16 px mobile.
- Card radius: 12–16 px.
- Button/input radius: 10–12 px.
- Use consistent 1 px borders; reserve glow/shadow for focused or highlighted elements.
- Dashboard grid should collapse cleanly from 4 columns to 2 to 1 based on available width.

## 5. Brand Feel and Visual Language

- Use dark surfaces, subtle purple gradient accents, and gold micro-details.
- Optional hero artwork: barber tools, close-up haircut photography, or abstract line art; imagery must support content and not obstruct actions.
- Prefer simple Lucide-style icons with consistent stroke weight.
- Motion should be short and purposeful (roughly 150–220 ms); respect reduced-motion preferences.
- Avoid excessive glassmorphism, animated backgrounds, huge gradients, or small low-contrast text.

## 6. Core Components

### Buttons
- **Primary:** purple fill, white text, clear action label.
- **Secondary:** dark/transparent surface, neutral border.
- **Gold accent:** for premium/featured action only; verify contrast.
- **Danger:** red for destructive actions and cancellation confirmation.
- Minimum interactive height: 44 px on touch screens.
- Include default, hover, focus-visible, disabled, and loading states.

### Inputs and forms
- Persistent visible label; placeholder is an example, not the only label.
- Display inline validation near the related field.
- Required fields are identified consistently.
- Date/time controls must show timezone/local context if relevant.
- Avoid clearing valid form entries after a recoverable error.

### Cards
- Use a consistent padding scale and border treatment.
- Service cards show name, short description, price, duration, and a clear action.
- Barber cards show name, specialty, availability/working state, and selection action.
- Booking cards prioritize date/time, service, barber, booking code, and status.

### Status badges
- Always pair color with readable status text.
- `Menunggu Konfirmasi`: amber/gold-tinted neutral.
- `Dikonfirmasi`: purple.
- `Sedang Dilayani`: blue/purple-toned.
- `Selesai`: green/neutral success tone.
- `Dibatalkan` or error: red.
- Payment status must be visually distinct from booking status.

### Tables and lists
- Desktop: readable tables with stable column alignment and row actions.
- Mobile: convert to stacked cards or horizontally scroll only when justified.
- Include empty, loading, and error states.
- Filters should be close to the list they control.

### Navigation
- Public site: top navigation with brand, services, barber information, and sign-in/booking CTA.
- Admin: desktop sidebar plus top bar; collapse to drawer on mobile.
- Barber: simplified navigation focused on schedule and assigned bookings.
- Customer: straightforward navigation to booking, history, and profile.

### Dialogs and toasts
- Confirmation dialog for destructive actions.
- Toasts for short success/error feedback; important form errors remain inline.
- Dialog has clear title, description, cancel action, and explicit confirm action.

## 7. Page Composition Guidance

### Public home
- Header with KINGZ wordmark and primary booking CTA.
- Hero headline, concise value proposition, booking CTA, and supporting barber imagery.
- Featured services with price and duration.
- Barber highlights and shop information.
- Clear footer with contact/opening-hours placeholders.

### Customer booking
- Use a clear stepper: `Layanan` → `Barber` → `Tanggal & Jam` → `Konfirmasi`.
- Keep chosen service, duration, and price visible in a summary.
- Disable unavailable time slots and explain why.
- On submit, prevent double submission and show confirmation state.

### Customer history
- Tabs or filters for upcoming and past bookings.
- Each booking entry displays date/time, service, barber, price, status, and available actions.
- Cancellation action only appears when permitted by current demo/business rules.

### Admin dashboard
- Summary cards for bookings, customers, received revenue, and today's schedule.
- Today's bookings list and status overview.
- Use charts only when they clarify a decision; avoid decorative charts.
- Quick actions for managing bookings, services, barbers, and schedules.

### Management screens
- Keep page title, primary action, filters, list/table, and empty state consistent.
- Create/edit forms may use a modal or dedicated page depending on complexity.
- Destructive delete actions require confirmation.

### Barber dashboard
- Focus on today's schedule and next booking.
- Show customer, service, time, and current status.
- Make “Mulai layanan” and “Selesaikan layanan” clear and difficult to trigger accidentally.

## 8. Responsive Breakpoints

Use CSS media queries with these initial breakpoints (adjust only if content requires):
- Mobile: `< 640px`
- Tablet: `640px–1023px`
- Desktop: `>= 1024px`

Rules:
- Avoid fixed widths that cause horizontal overflow.
- Use full-width primary CTA on narrow booking forms.
- Keep tap targets at least 44 × 44 px.
- Convert sidebar to a drawer on mobile.
- Preserve important table data when converting to cards.
- Test at 360 px, 390 px, 768 px, 1024 px, and 1440 px widths.

## 9. Accessibility and Interaction

- Keyboard focus must be visible.
- Every input has a programmatic label.
- Icon-only controls need accessible names.
- Do not communicate status by color alone.
- Maintain logical heading order and keyboard navigation.
- Provide `prefers-reduced-motion` support.
- Use semantic buttons/links and correct disabled states.
- Avoid hover-only interactions.

## 10. Content and Formatting

- Currency: Indonesian Rupiah, e.g. `Rp150.000`.
- Date/time: Indonesian locale, e.g. `Jumat, 9 Oktober 2026 · 14.30`.
- Use concise, friendly Indonesian microcopy.
- Use consistent terms: `Booking`, `Barber`, `Layanan`, `Jadwal`, `Pembayaran`, `Riwayat`.
- Mark fictional sample content as demo data where appropriate.
- Never claim a payment or booking was processed by a real service when using mock data.

## 11. Design Tokens Implementation

Implement tokens as CSS custom properties in one central file, for example `src/styles/tokens.css`. Component styles should reference tokens rather than repeat raw brand hex values. Avoid adding a UI framework unless approved; use React + Vite and maintainable CSS as the baseline.

## 12. UI Definition of Done

- Visual hierarchy and brand palette are consistent.
- Components have hover, focus, disabled, and relevant loading/error states.
- Customer booking is usable at mobile and desktop sizes.
- Dashboard navigation is usable by keyboard and touch.
- Contrast and status labels are reviewed.
- No page or feature outside `PRD.md` is added without approval.
