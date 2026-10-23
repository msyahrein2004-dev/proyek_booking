# KINGZ — Product Requirements Document (PRD)

**Version:** 1.0.0  
**Status:** Approved baseline for initial implementation  
**Product:** KINGZ — Barber Shop Booking System  
**Platform:** Responsive website  
**Frontend:** React + Vite  
**Primary language:** Bahasa Indonesia

## 1. Product Summary

KINGZ is a web-based barber shop booking information system. Customers can browse services, choose a barber, select an available date/time, create bookings, track booking history, and submit reviews. Admins manage day-to-day operations. Barbers view assigned bookings and update service progress.

The visual direction is **modern futuristic SaaS** with a premium barber identity and a controlled combination of purple, black, gold, red, and gray.

## 2. Goals

1. Enable customers to book without having to contact the shop first.
2. Present services, prices, duration, barber profiles, and availability clearly.
3. Reduce schedule conflicts through availability validation.
4. Give admins a centralized view of bookings, staff, services, payments, and reports.
5. Give barbers a clear work schedule and simple status controls.
6. Provide a consistent responsive experience across mobile, tablet, and desktop.

## 3. User Roles

### 3.1 Customer
- Register, log in, log out, and manage profile details.
- Browse services, prices, durations, and barber profiles.
- Select service, barber, date, and available time slot.
- Create a booking and receive a booking code.
- View upcoming and previous bookings.
- Cancel a booking according to the cancellation policy.
- Choose an MVP payment method.
- Review a completed service.

### 3.2 Admin
- View dashboard totals for bookings, customers, revenue, and today's schedule.
- Create, read, update, and delete services.
- Manage barber profiles and specialties.
- Manage working hours, availability, and holidays.
- View, confirm, update, or cancel bookings.
- View customer records.
- Record and verify payment status.
- Filter and print booking/revenue reports.

### 3.3 Barber
- Log in to a barber account.
- View assigned schedule and bookings.
- View booking details: customer, service, date, and time.
- Change service status to “Sedang Dilayani” and “Selesai”.
- View work hours and availability.

## 4. MVP Scope

### Included
1. Authentication UI and role-aware navigation.
2. Customer profile basics.
3. Service catalog with descriptions, prices, and duration.
4. Barber list and specialty details.
5. Booking flow: service → barber → date → time → confirmation.
6. Availability checks and conflict prevention.
7. Booking statuses: `Menunggu Konfirmasi`, `Dikonfirmasi`, `Sedang Dilayani`, `Selesai`, `Dibatalkan`.
8. Admin dashboard and booking management.
9. CRUD interfaces for services, barbers, and schedules.
10. Customer list and customer booking history.
11. Manual payment recording: cash at shop or transfer with admin verification.
12. Reports filtered by date range.
13. Basic search and filters.
14. Rating/review after a completed booking.
15. Responsive UI for mobile, tablet, and desktop.

### Excluded from MVP
- Automated online payment gateway.
- Automated WhatsApp notifications.
- Loyalty points, membership, vouchers, or subscriptions.
- Native iOS/Android application.
- Multi-branch management.
- External calendar integrations.
- Predictive analytics.

Excluded features must not be implemented unless the project owner approves a scope change.

## 5. Core User Flows

### Customer booking
1. Open KINGZ website.
2. Register/log in if required.
3. Browse and select a service.
4. Select barber.
5. Select date and available time.
6. Review service, barber, time, price, and payment method.
7. Submit booking.
8. See booking code and current status.
9. Track updates in booking history.
10. After service completion, submit rating/review.

### Admin operations
1. Log in as admin.
2. Review dashboard and today's schedule.
3. Manage service/barber/schedule data as needed.
4. Review incoming booking.
5. Confirm or cancel booking.
6. Record/verify payment.
7. Review and print reports.

### Barber service
1. Log in as barber.
2. Review assigned bookings.
3. Open booking detail.
4. Mark “Sedang Dilayani” when service starts.
5. Mark “Selesai” when service is finished.

## 6. Functional Requirements

| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-01 | Authentication | User can access login/register UI and sign out; navigation is role-aware. |
| FR-02 | Role access | Admin and barber screens/actions are not exposed as customer actions. Frontend-only role checks are prototypes, not production security. |
| FR-03 | Service catalog | Service name, description, price, and duration are visible. Admin can manage service records. |
| FR-04 | Barber directory | Barber name, specialties, and availability can be displayed and managed. |
| FR-05 | Booking | Customer can choose service, barber, date, and a time slot. |
| FR-06 | Availability | Unavailable or overlapping slots cannot be selected; availability is revalidated on submit in a real backend. |
| FR-07 | Booking status | Current status is visible in booking details and history. |
| FR-08 | Schedule management | Admin can edit working hours, days off, and barber availability. |
| FR-09 | History | Customer can see upcoming and past bookings. |
| FR-10 | Payment tracking | Payment method and status are visible; admin can record manual verification. |
| FR-11 | Admin dashboard | Dashboard presents booking count, customer count, revenue summary, and today's schedule. |
| FR-12 | Reports | Admin can filter reports by period and print them. |
| FR-13 | Reviews | A customer can review a completed booking; one review per booking. |
| FR-14 | Responsive layout | Core workflows remain usable at mobile, tablet, and desktop widths. |
| FR-15 | Search/filter | Booking lists can be filtered by date, customer, barber, and status. |
| FR-16 | UI states | Forms and data lists include relevant loading, empty, success, and error states. |

## 7. Business Rules

1. A booking references one customer, one service, one barber, a date/time range, a price snapshot, a booking status, and a payment status.
2. A slot is available only if the barber is working and no active booking overlaps the requested service duration.
3. Availability must be checked when displaying slots and rechecked on submission by the eventual backend.
4. Bookings cannot be made outside shop opening hours, on holidays, or during barber time off.
5. Store the service price at booking time so future price changes do not alter historical bookings.
6. Customers can cancel only eligible bookings; exact cancellation cutoff is configurable and must be confirmed before production.
7. Reviews are allowed only after status `Selesai`, and only by the booking's customer.
8. Barbers can view/update only their assigned bookings, except where admin privileges apply.
9. Revenue reports count verified/received payments, not all booking totals.
10. Booking status and payment status are separate state machines.

### Booking statuses
- `Menunggu Konfirmasi`
- `Dikonfirmasi`
- `Sedang Dilayani`
- `Selesai`
- `Dibatalkan`

### Payment statuses
- `Belum Dibayar`
- `Menunggu Verifikasi`
- `Lunas`
- `Ditolak`
- `Dikembalikan` (only if refunds are supported)

## 8. Nonfunctional Requirements

- **Usability:** concise flows, clear labels, actionable validation messages.
- **Responsive design:** usable on phone, tablet, and desktop.
- **Accessibility:** visible keyboard focus, labeled inputs, readable contrast, and status labels that do not rely on color alone.
- **Security:** real authentication and authorization must be implemented server-side before production; never store plaintext passwords.
- **Consistency:** consistent date, currency, status, spacing, and component patterns.
- **Reliability:** show meaningful error messages when an operation fails.
- **Maintainability:** organize frontend into routes/pages, reusable components, feature modules, and data/services.
- **Performance:** avoid unnecessary large assets and provide feedback for long operations.

## 9. Product Areas / Pages

### Public and customer
- Home/landing page.
- Services list and service details.
- Barber list/details.
- Login and registration.
- Booking flow and confirmation.
- Booking history/details.
- Customer profile.
- Review/rating form.

### Admin
- Dashboard.
- Booking management.
- Services management.
- Barber management.
- Schedule management.
- Customer management.
- Payment management.
- Reports.

### Barber
- Barber dashboard/schedule.
- Assigned booking list.
- Booking detail.
- Service status update.

## 10. Technology and Implementation Boundaries

- Frontend: React + Vite.
- Backend: not specified yet.
- Database: not specified yet.
- Styling: implement design tokens and reusable CSS/component patterns consistent with `UI-GUIDELINE.md`.
- Testing: black-box scenarios for primary flows, plus responsive and accessibility checks.

Until backend and database are selected, use clearly labeled mock data and a local demo service layer. Do not represent mock authentication, payments, notifications, or persistence as production functionality.

## 11. Open Decisions / Assumptions

| ID | Decision | Default for prototype |
|---|---|---|
| D-01 | Backend and database | Pending owner decision; frontend mock service only |
| D-02 | Cancellation cutoff | Show configurable placeholder; do not invent a binding policy |
| D-03 | Slot length/buffer | Derive from service duration; use mock schedule data |
| D-04 | Opening hours/holidays | Use clearly labeled demo data |
| D-05 | MVP payment methods | Cash at shop and transfer with manual verification |
| D-06 | Public landing page | Included in frontend prototype |
| D-07 | Service/barber demo data | Fictional sample data, visibly treated as demo content |

## 12. Definition of Done

The initial frontend prototype is complete when:
- The agreed role areas and main screens are reachable.
- The customer booking journey is demonstrable using mock data.
- Availability validation is represented in the UI and demo logic.
- Admin can demonstrate service, barber, schedule, booking, payment, and report screens using mock data.
- Barber can view assigned bookings and change demo status.
- Responsive layouts and relevant UI states are present.
- No feature outside this document is added without approval.
- Documentation clearly states what is mock-only and what requires backend integration.
