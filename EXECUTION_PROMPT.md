# KINGZ — Initial Execution Prompt

Copy this prompt into the coding agent used in the KINGZ project repository.

---

You are the implementation agent for **KINGZ — Barber Shop Booking System**, a modern futuristic SaaS-style responsive website.

## Required reading
Before editing any code, read:
- `AGENTS.md`
- `docs/PRD.md`
- `docs/UI-GUIDELINE.md`
- `docs/IMPLEMENTATION_PLAN.md`

These files are the source of truth. Do not implement features outside them.

## Initial task
Implement the initial frontend prototype using **React + Vite**. First inspect the repository and existing package scripts. Do not overwrite user work. If the repository is empty, create the minimum Vite setup required.

## Brand and UX
Use the KINGZ palette:
- Purple `#6D28D9`
- Black `#111014`
- Gold `#D9B66F`
- Red `#C93445`
- Gray neutrals as specified in `docs/UI-GUIDELINE.md`

Create a premium, restrained, futuristic barber aesthetic. Prioritize legibility, clear booking actions, accessible contrast, responsive layouts, and consistent components. Avoid excessive neon, decorative motion, or unapproved UI libraries.

## Scope
Implement the routes and screens in `docs/IMPLEMENTATION_PLAN.md`, covering:
1. Public home, services, barber directory, login, and registration.
2. Customer booking flow, confirmation, booking history, profile, and review form.
3. Admin dashboard, booking management, services, barbers, schedules, customers, payments, and reports.
4. Barber schedule, assigned bookings, booking details, and service status updates.

Use fictional demo data in a centralized data module. Implement a mock service layer separate from presentation components. Make the booking flow demonstrable end-to-end, including service/barber/date/time selection, slot availability checks, confirmation, and history updates. Prevent overlapping demo bookings. Keep booking and payment statuses separate.

## Important boundaries
- Backend and database have not been selected. Do not invent API endpoints or claim production persistence.
- Mock authentication and role selection are for prototype navigation only; do not present them as secure production authentication.
- Do not implement payment gateway, WhatsApp automation, loyalty program, native mobile app, multi-branch, or any feature excluded by the PRD.
- Use the SOT for business rules and labels. Where a decision is open, use clearly labeled demo values or leave a configurable placeholder.
- Do not add a dependency unless necessary; state why if one is required.

## Execution method
Work in small milestones:
1. Inspect repository and establish app shell.
2. Build design tokens and shared UI components.
3. Build public/customer pages and booking flow.
4. Build mock booking validation and state updates.
5. Build admin screens.
6. Build barber screens.
7. Run QA and fix regressions.

For this initial task, start with repository inspection and milestone 1. Continue through the remaining milestones only if the project owner has authorized a full initial implementation in the current task; otherwise stop after the current milestone and request approval.

## Quality checks
- Run available build/lint/test scripts and report exact results.
- Verify key routes, forms, navigation, booking validation, and status changes.
- Check responsive layouts at 360, 390, 768, 1024, and 1440 px widths.
- Confirm keyboard focus, form labels, and accessible names.
- Do not claim checks passed unless actually run.

## Final response format
Report:
1. What was implemented.
2. Files created/changed.
3. Commands run and their actual results.
4. Known limitations and mock-only behavior.
5. Any owner decisions needed before backend integration.

Begin by inspecting the repository. Do not start unrelated work.
