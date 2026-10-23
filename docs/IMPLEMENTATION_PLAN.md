# KINGZ — Implementation Plan

**Version:** 1.0.0  
**Status:** Approved baseline for initial frontend execution  
**Frontend:** React + Vite  
**Backend/database:** Pending owner decision  
**Mode until backend selection:** Frontend prototype with explicit mock data

## 1. Implementation Rules

1. Treat `PRD.md` as the source of truth for product scope.
2. Treat `UI-GUIDELINE.md` as the source of truth for visual design and component behavior.
3. Do not invent new features or expand scope without approval.
4. Build a functional responsive frontend, not static screenshots only.
5. Keep mock data and mock service behavior clearly separated from UI components.
6. Do not describe mock login, payments, notifications, or persistence as production-ready.
7. Keep implementation changes small and test each milestone before proceeding.
8. Ask for approval before starting a new major phase if the owner has not authorized all phases in advance.

## 2. Suggested Frontend Stack

- React
- Vite
- JavaScript or TypeScript (prefer TypeScript if project setup permits; otherwise JavaScript consistently)
- React Router for routing
- CSS custom properties and modular CSS
- Lucide React for icons, if dependency is available/approved
- A small chart library only if report/dashboard charts materially help
- Browser local storage only for non-sensitive demo persistence, never for real secrets or production auth tokens without a security design

Do not add Tailwind, Bootstrap, component libraries, state libraries, or other dependencies unless needed and approved. Prefer the simplest maintainable stack.

## 3. Proposed Folder Structure

```text
KINGZ/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── routes.jsx
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── ui/
│   │   └── feedback/
│   ├── features/
│   │   ├── auth/
│   │   ├── customer/
│   │   ├── booking/
│   │   ├── services/
│   │   ├── barbers/
│   │   ├── admin/
│   │   ├── barber/
│   │   ├── payments/
│   │   └── reports/
│   ├── data/
│   │   └── demoData.js
│   ├── services/
│   │   └── mockApi.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── utilities.css
│   └── main.jsx
├── docs/
│   ├── PRD.md
│   ├── UI-GUIDELINE.md
│   └── IMPLEMENTATION_PLAN.md
├── AGENTS.md
├── EXECUTION_PROMPT.md
├── package.json
└── README.md
```

This is a recommended structure, not permission to add unapproved product features. Adjust naming to match the repository if a project already exists.

## 4. Routes and Screen Map

### Public
- `/` — Home/landing
- `/services` — Service catalog
- `/barbers` — Barber directory
- `/login` — Login
- `/register` — Registration

### Customer
- `/booking` — Booking flow
- `/booking/confirmation/:id` — Demo booking confirmation
- `/my-bookings` — Booking history
- `/profile` — Customer profile

### Admin
- `/admin` — Dashboard
- `/admin/bookings` — Booking management
- `/admin/services` — Service CRUD
- `/admin/barbers` — Barber management
- `/admin/schedules` — Schedule management
- `/admin/customers` — Customer list
- `/admin/payments` — Payment tracking
- `/admin/reports` — Reports

### Barber
- `/barber` — Barber schedule/dashboard
- `/barber/bookings/:id` — Booking details

Routes are a planning map; combine screens if that improves usability without removing required functionality.

## 5. Data Model for Mock Prototype

Use consistent sample objects. Suggested shapes:

```js
// service
{
  id: "svc-001",
  name: "Classic Haircut",
  description: "Potongan klasik yang rapi.",
  price: 75000,
  durationMinutes: 45,
  active: true
}

// barber
{
  id: "bar-001",
  name: "Raka Pratama",
  specialties: ["Classic", "Taper"],
  workingDays: [1, 2, 3, 4, 5, 6],
  active: true
}

// booking
{
  id: "bkg-001",
  code: "KZ-26001",
  customerId: "cus-001",
  serviceId: "svc-001",
  barberId: "bar-001",
  date: "2026-10-12",
  startTime: "14:00",
  endTime: "14:45",
  priceSnapshot: 75000,
  status: "Menunggu Konfirmasi",
  paymentMethod: "Tunai di tempat",
  paymentStatus: "Belum Dibayar"
}
```

All names/prices/times above are fictional demo values, not official KINGZ business data. Keep all demo data in one location so it can be replaced easily.

## 6. Milestones

### M0 — Repository inspection and setup
- Inspect current files and package scripts before changing anything.
- Confirm whether this is a new or existing Vite project.
- Install only necessary dependencies.
- Ensure the development server starts.
- Do not overwrite existing user work without checking.

**Exit criteria:** project starts and the base app renders.

### M1 — Design system and application shell
- Add CSS tokens and global styles.
- Create buttons, inputs, cards, badges, dialogs, toast/feedback, and loading/empty states.
- Create public layout, customer layout, admin shell, and barber shell.
- Ensure responsive navigation.

**Exit criteria:** all shells render at target widths and match `UI-GUIDELINE.md`.

### M2 — Public and customer screens
- Landing page and service catalog.
- Barber directory.
- Login/register demo screens.
- Booking stepper and confirmation.
- Customer booking history and profile.
- Review form for completed demo bookings.

**Exit criteria:** the customer flow can be demonstrated end-to-end with mock data.

### M3 — Booking rules and mock service layer
- Centralize demo data and mock operations.
- Implement slot generation and overlap checks.
- Recheck slot availability on submit.
- Keep booking/payment statuses separate.
- Provide success and error feedback.

**Exit criteria:** duplicate/overlapping demo bookings are rejected; valid bookings create a confirmation record.

### M4 — Admin area
- Dashboard summary.
- Booking list, filters, and status actions.
- Service CRUD.
- Barber and schedule management.
- Customer list.
- Payment tracking.
- Period-filtered report and print stylesheet.

**Exit criteria:** admin flows are demonstrable using mock data and clearly labeled as prototype behavior.

### M5 — Barber area
- Today's schedule and assigned bookings.
- Booking detail.
- Status transitions to “Sedang Dilayani” and “Selesai”.

**Exit criteria:** barber can update demo booking status and the change appears consistently in the prototype state.

### M6 — QA and handoff
- Check route navigation and forms.
- Check mobile/tablet/desktop breakpoints.
- Check keyboard focus, labels, contrast, and semantic controls.
- Test empty/loading/error/success states.
- Remove console errors and unused assets.
- Document mock-only boundaries and backend integration requirements.

**Exit criteria:** all primary flows pass the agreed manual test checklist.

## 7. QA Checklist

- [ ] App starts with the documented command.
- [ ] No missing route for an agreed screen.
- [ ] Navigation is role-aware in the demo.
- [ ] Service selection updates booking summary.
- [ ] Barber/date/time selections are retained through the flow.
- [ ] Unavailable slot cannot be submitted.
- [ ] Overlapping booking is rejected by mock validation.
- [ ] Booking confirmation shows code, service, barber, date/time, price, and status.
- [ ] Customer history reflects demo booking changes.
- [ ] Admin can create/edit/delete demo service records.
- [ ] Admin can update demo booking status and payment status.
- [ ] Barber sees assigned bookings only in the demo.
- [ ] Reports filter by date range and print sensibly.
- [ ] Forms show validation and error feedback.
- [ ] No horizontal overflow at 360 px, 390 px, 768 px, 1024 px, and 1440 px.
- [ ] Keyboard focus is visible and icon-only controls have accessible names.
- [ ] No feature is presented as backend-connected when it is mock-only.

## 8. Backend Integration Gate

Before production integration, the owner must decide:
- Backend framework/runtime.
- Database engine and schema/migrations.
- Authentication/session strategy.
- API contract and error format.
- Server-side role authorization.
- Booking concurrency/transaction strategy.
- Payment verification and audit requirements.
- Deployment target and environment configuration.

Do not add fake endpoints or claim secure production behavior while these are undecided.

## 9. Handoff Deliverables

- Working React + Vite frontend prototype.
- Responsive design system and page layouts.
- Mock service layer with clear separation from UI.
- Documentation for run commands and prototype limitations.
- Manual QA checklist and known limitations.
- No unapproved features.
