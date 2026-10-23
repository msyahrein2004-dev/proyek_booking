# AGENTS.md — KINGZ Project Contract

This file is the execution contract for any coding agent or contributor working on KINGZ.

## 1. Source of Truth

Read and follow these documents in order:
1. `docs/PRD.md` — product scope, roles, rules, and acceptance criteria.
2. `docs/UI-GUIDELINE.md` — visual system, responsive behavior, and component states.
3. `docs/IMPLEMENTATION_PLAN.md` — architecture, milestones, and QA expectations.

If documents conflict, stop and report the conflict instead of silently choosing. The project owner’s explicit, latest decision overrides the documents; update the relevant SOT document only after approval.

## 2. Scope Contract

- Implement only features listed in the approved PRD.
- Do not invent additional modules, integrations, dashboards, or design directions.
- Payment gateway, WhatsApp automation, loyalty program, native mobile app, and multi-branch features are out of scope unless explicitly approved.
- Backend and database are undecided. Until approved, use mock data and a mock service layer.
- Clearly label prototype behavior. Never claim mock login, persistence, notification, or payment as production-ready.

## 3. Technical Contract

- Frontend is React + Vite.
- Reuse the repository's current language and conventions. If starting fresh, prefer a consistent TypeScript or JavaScript setup; do not mix unnecessarily.
- Use reusable components and CSS tokens from `UI-GUIDELINE.md`.
- Avoid adding dependencies unless needed to meet approved requirements. Explain any material dependency before adding it.
- Keep business rules out of presentational components where practical.
- Keep mock data and mock operations separate from UI.
- Never store real passwords, payment credentials, secrets, or private keys in client code or local storage.
- Production authorization must be enforced by a backend; frontend role checks are demo navigation only.

## 4. Change Discipline

Before edits:
1. Inspect the existing project and package scripts.
2. Identify relevant files and avoid overwriting unrelated work.
3. State the intended milestone and the smallest coherent change set.
4. Preserve existing conventions unless they conflict with the SOT.

During edits:
- Make incremental changes.
- Avoid unrelated refactors.
- Do not leave dead buttons, fake success states, or unexplained placeholders.
- Every visible interactive control must work or be clearly marked as unavailable/demo-only.
- Add empty, loading, success, and error states where relevant.

After edits:
1. Run available lint, build, and test commands.
2. Fix errors introduced by the changes.
3. Summarize changed files and behavior.
4. Report tests actually run and their results; never claim a test passed if it was not run.
5. List remaining mock-only behavior and blockers.

## 5. UI Contract

- Follow brand palette: purple, black, gold, red, and gray.
- Preserve contrast, readable type, visible keyboard focus, and touch targets.
- Do not use color alone to communicate status.
- Test responsive behavior at 360, 390, 768, 1024, and 1440 px widths.
- Avoid excessive neon, animation, gradients, or glassmorphism.
- Keep Indonesian UI copy consistent with the PRD.
- Do not add visual assets or third-party UI frameworks without need and approval.

## 6. Booking Integrity

- Keep booking status and payment status separate.
- Use the service duration to calculate the requested time range.
- Reject overlapping slots in the prototype.
- Recheck availability on submit in the mock service layer.
- Treat mock validation as demonstration only; production booking concurrency must be handled server-side.
- Preserve price snapshots on bookings.

## 7. Approval Gates

The owner has authorized preparation of the initial SOT package. This is not blanket approval for future scope expansion.

Request approval before:
- Choosing or integrating a backend/database.
- Adding payment gateways, WhatsApp, or other external services.
- Adding major dependencies or changing the application architecture.
- Introducing features outside the PRD.
- Making destructive changes to existing project data.

## 8. Definition of Done

A task is done only when:
- It matches the approved SOT.
- Primary interaction paths work.
- Relevant responsive and error states exist.
- Available checks are run and reported accurately.
- Mock-only limitations are documented.
- No unrelated scope has been added.
