# TASK DECOMPOSITION
## HW 1 — Production Studio Drum Kit

### 1. Project Overview

Build an accessible, production-style Drum Kit application using React 19, Vite, and ES2024.

The application modernizes Legacy Slide 26 by supporting physical keyboard shortcuts, interactive drum pads, visual hit feedback, and accessibility features compliant with WCAG 2.2 AA.

### 2. Technical Constraints

- React 19 + Vite + ES2024.
- Functional components and modern React Hooks.
- Use `e.code` instead of deprecated `keyCode`.
- Prevent keyboard auto-repeat using `e.repeat`.
- Ignore keyboard shortcuts when typing in form controls.
- Use immutable state updates.
- No `window.alert()` or legacy React APIs.
- Every event listener and timer must have proper cleanup.
- Semantic HTML with zero unnecessary `<div>` elements.
- Accessible keyboard navigation, focus indicators, and ARIA attributes.

### 3. Work Breakdown Structure (WBS)

| WBS | Task | Deliverables / Acceptance Criteria |
|---|---|---|
| 1.0 | Project Initialization | Vite + React 19 + ES2024 setup |
| 1.1 | Project Documentation | TASK_DECOMPOSITION.md and AI_AUDIT.md |
| 1.2 | Project Architecture | Define components, hooks, and data structure |
| 2.0 | Drum Pad Data Model | Seven pads mapped to W, A, S, D, J, K, L |
| 2.1 | Drum Pad UI | Semantic and reusable drum pad components |
| 2.2 | Keyboard Interaction | Implement reusable `useDrumKeyboard` hook |
| 2.3 | Keyboard Safety | Anti-repeat guard and input focus isolation |
| 2.4 | Pointer Interaction | Support mouse and touch pad activation |
| 3.0 | Audio Engine | Implement drum sound playback |
| 3.1 | Active Pad Feedback | Implement `aria-pressed` and visual active states |
| 3.2 | Hit History | Accessible hit log using `output` and `aria-live="polite"` |
| 3.3 | Decibel Visualization | Visual audio-level meter with accessible labeling |
| 4.0 | Accessibility Engineering | Keyboard navigation, visible focus, semantic HTML, WCAG 2.2 AA |
| 4.1 | Responsive Design | Support desktop, tablet, and mobile layouts |
| 5.0 | AI Audit | Complete AI_AUDIT.md and review implementation |
| 5.1 | Quality Assurance | Verify build, lint, keyboard behavior, and cleanup |
| 5.2 | Lighthouse Audit | Target 100/100 Accessibility score |
| 5.3 | Final Verification | Review requirements, Git history, and final project |

### 4. Accessibility Requirements

- All drum pads must be operable using keyboard and pointer.
- Each pad must use a semantic `<button>`.
- Each pad must expose its active state through `aria-pressed`.
- Keyboard focus must be clearly visible.
- Hit history must use `aria-live="polite"`.
- Visual decibel feedback must have an accessible text alternative.
- Meet WCAG 2.2 AA requirements.

### 5. Git Commit Strategy

Maintain more than 10 meaningful commits throughout development.

Suggested commit checkpoints:

1. `docs(hw1): add task decomposition and project rules`
2. `chore(hw1): initialize React 19 and Vite project`
3. `feat(hw1): define drum pad data model`
4. `feat(hw1): implement semantic drum pad components`
5. `feat(hw1): implement keyboard interaction hook`
6. `fix(hw1): prevent keyboard repeat and input conflicts`
7. `feat(hw1): implement pointer and touch interaction`
8. `feat(hw1): implement drum audio engine`
9. `feat(hw1): add active pad visual feedback`
10. `feat(hw1): implement accessible hit history`
11. `feat(hw1): add visual decibel meter`
12. `style(hw1): implement responsive studio interface`
13. `a11y(hw1): improve WCAG 2.2 AA compliance`
14. `docs(hw1): complete AI audit`
15. `test(hw1): verify functionality and accessibility`

### 6. Definition of Done

- [ ] React 19 + Vite + ES2024 project builds successfully.
- [ ] Seven drum pads work correctly.
- [ ] Physical keyboard shortcuts use `e.code`.
- [ ] Auto-repeat and input focus conflicts are prevented.
- [ ] Mouse and touch interactions work.
- [ ] Drum sounds play correctly.
- [ ] Active pad states are accessible.
- [ ] Hit history is announced by screen readers.
- [ ] Visual decibel meter works correctly.
- [ ] WCAG 2.2 AA requirements are addressed.
- [ ] Lighthouse Accessibility target: 100/100.
- [ ] No prohibited legacy APIs or unnecessary div-soup.
- [ ] All effects have appropriate cleanup.
- [ ] AI_AUDIT.md is completed.
- [ ] More than 10 meaningful Git commits exist.