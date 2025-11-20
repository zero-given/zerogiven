# Code Review

## Findings (highest severity first)
- **High – (Addressed) Avoided aggressive preloading of every GLB on first paint.** Removed the `startLazyShoePreload` hook and the remaining-model preloader; only the hero model is warmed now, and others load on demand (see `components/Background3D.tsx`, `components/LoadingIndicator.tsx`). This drops the automatic ~14 MB bandwidth hit on initial view.
- **High – (Addressed) Canvas no longer remounts on model change.** The `AnimatePresence` wrapper/key was removed from the background layer so the WebGL context stays alive while swapping models (see `components/LandingPage.tsx`). This prevents jank and repeated loader churn during auto-cycle.
- **High – Client bundle size is excessive**. The production build emits a ~1.22 MB main JS chunk (`dist/assets/index-*.js`) plus 1.7–4.1 MB per GLB. Rollup also warns about chunk size. Likely causes: bundling all landing-page logic in one chunk, heavy deps (Framer Motion v12, drei/three) and no code-splitting. Split vendor chunks (manualChunks), lazy-load non-critical UI (ControlPanel/ThemeToggle), and compress models (Draco/Meshopt) to protect LCP and memory.
- **High – (Addressed) Removed client-side Gemini key exposure.** The Vite `define` for `process.env.API_KEY/GEMINI_API_KEY` was deleted so a Gemini key can’t be bundled to users. Keep any future key usage strictly server-side.
- **Medium – Theme flash and persisted preference mismatch**. HTML defaults to `class="dark"` (`index.html:2`), but `ThemeToggle` sets the theme after mount (`components/ThemeToggle.tsx:6-27`). Users who last chose light mode (or whose system prefers light) will see a dark flash until hydration. Add a tiny inline script that reads `localStorage.theme`/`matchMedia` and sets `document.documentElement.classList` before React bootstraps, and initialise component state from that value to avoid the mismatch.
- **Low – Asset inventory is out of sync**. `models.ts` only registers shoe1/3/4/5 (`models.ts:1-17`), while `shoe2.glb` and `shoe6.glb` sit in the repo unused. If the omissions are accidental, they never surface in the carousel; if intentional, the unused 3D assets are dead weight. Either add them to `shoeModels` (with labels) or remove them to keep artifacts lean.

## Questions / assumptions
- Is the email capture meant to be a no-op placeholder? Currently it just waits 1.5s then shows “Request acknowledged” with no submission.
- Are we intentionally forcing all shoes to be ready offline, or can we load-on-demand? This drives the preload decision above.

## Tests run
- `npm run build`
