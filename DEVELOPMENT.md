# Rice Themes: technical notes

## How it works

RemNote builds its whole interface from CSS color scales (`--rn-colors-<color>-0…100`) and semantic variables (`--rn-clr-…`). For the selected palette the plugin recomputes every scale, from the theme's background (step 0) to its foreground (step 100), and registers the result with the official `app.registerCSS` API.

Some parts of RemNote don't use these variables:

- Newer screens (flashcards home, plans, AI credits, invites, AI learning tools, onboarding cards) write colors straight into the HTML from two palettes built into the app. `src/lib/inline.ts` lists those colors and gradients and maps them onto the theme.
- Many screens are styled twice, once for light mode and once with `dark:` classes. Dark themes use RemNote's dark styling even when RemNote is set to light mode (`src/lib/dark-variants.ts`), so for example the flashcard practice background stays dark.

Both lists were taken from RemNote 1.28. If a later RemNote version adds new hard-coded colors, they may show up light until the lists are updated.

Some colors are content, not interface, and keep RemNote's own values: color swatches and pickers (highlighter, pen, text, shapes) and anything drawn on a canvas or PDF page. The highlight swatches in the PDF toolbar and the text selection menu use RemNote's own colors too; in dark themes they look like in RemNote's dark mode, because pastel swatches look washed out on a dark toolbar. In dark themes, highlighted text in your notes uses RemNote's dark-mode highlight colors so light text stays readable on it.

## Adding themes

Palettes live in `src/lib/palettes.json` and use the field names of Omarchy's `colors.toml` (`background`, `foreground`, `accent`, `red`, `green`, …), as found in Omalauncher under `app/src/main/assets/themes/`. All 22 themes Omalauncher ships are included.

A few adjustments keep RemNote readable with every palette:

- The sidebar color stays within a moderate distance of the background (White would otherwise get a silver-grey sidebar).
- Dimmed text keeps at least 2:1 contrast against the sidebar.
- Text on accent-colored buttons (for example "Upload plugin" or "Develop") uses the background or the brightest foreground color, whichever stands out more from the accent. In most dark palettes the accent is about as light as the normal text; in Kanagawa they are the same color.

To check a palette, `accentReport()` in `src/lib/theme.ts` returns the contrast between accent and normal text, and the contrast of the text the theme actually puts on accent buttons. With the 22 included palettes the latter is at least 3:1 (lowest: Rosé Pine, 3.1:1).

## Development

- `npm install`, then `npm run dev` serves the plugin on `http://localhost:8082` (Windows: `plugin-starten.bat`). In RemNote: Settings → Plugins → Build → Develop from localhost → `http://localhost:8082`.
- `npm run build` validates the manifest and creates `PluginZip.zip` for upload.
- `public/logo.png` (512 × 512) is the marketplace icon; `public/logo.svg` is its source.
- `docs/rice-themes.gif` is the preview in the README: one screenshot per theme, one second each.

Tested with RemNote 1.28 (October 2026).
