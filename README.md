# Rice Themes

Unixporn-style color themes for RemNote, based on the palettes of the [Omarchy](https://omarchy.org) themes as used by [Omalauncher](https://github.com/SimonSchubert/omalauncher).

| Theme | Mode |
|---|---|
| Tokyo Night (default) | dark |
| Solitude | dark |
| Retro 82 | dark |
| Nord | dark |
| Miasma | dark |
| Lupine | light |
| Hackerman | dark |
| Everforest | dark |
| Ethereal | dark |
| Catppuccin | dark |
| Catppuccin Latte | light |
| Flexoki Light | light |
| Gruvbox | dark |
| Kanagawa | dark |
| Last Horizon | dark |
| Lumon | dark |
| Matte Black | dark |
| Osaka Jade | dark |
| Ristretto | dark |
| Rosé Pine | light |
| Vantablack | dark |
| White | light |

Settings → Plugins → Rice Themes:

- **Theme**: pick one of the 22 themes, or "Off" for RemNote's default look
- **Monospace font** (terminal look, default: on). Uses JetBrains Mono / Cascadia Mono / Fira Code if installed, otherwise the system monospace font. Math formulas keep their own font.
- **Square corners** instead of rounded ones (default: on)

Changes apply within a few seconds, without a reload. The theme looks the same whether RemNote itself is set to light or dark mode.

## How it works

RemNote builds its whole interface from CSS color scales (`--rn-colors-<color>-0…100`) and semantic variables (`--rn-clr-…`). For the selected palette the plugin recomputes every scale, from the theme's background (step 0) to its foreground (step 100), and registers the result with the official `app.registerCSS` API.

Some parts of RemNote don't use these variables:

- Newer screens (flashcards home, plans, AI credits, invites, AI learning tools, onboarding cards) write colors straight into the HTML from two palettes built into the app. `src/lib/inline.ts` lists those colors and gradients and maps them onto the theme.
- Many screens are styled twice, once for light mode and once with `dark:` classes. Dark themes use RemNote's dark styling even when RemNote is set to light mode (`src/lib/dark-variants.ts`), so for example the flashcard practice background stays dark.

Both lists were taken from RemNote 1.28. If a later RemNote version adds new hard-coded colors, they may show up light until the lists are updated.

Some colors are content, not interface, and keep RemNote's own values: color swatches and pickers (highlighter, pen, text, shapes), highlight colors in the PDF and text selection menus, and anything drawn on a canvas or PDF page. In dark themes, highlighted text in your notes uses RemNote's dark-mode highlight colors so light text stays readable on it.

The plugin runs sandboxed and only uses official plugin APIs.

## Privacy

No data leaves RemNote. No network requests, no third-party services.

## Adding themes

Palettes live in `src/lib/palettes.json` and use the field names of Omarchy's `colors.toml` (`background`, `foreground`, `accent`, `red`, `green`, …), as found in Omalauncher under `app/src/main/assets/themes/`. All 22 themes Omalauncher ships are included.

A few adjustments keep RemNote readable with every palette:

- The sidebar color stays within a moderate distance of the background (White would otherwise get a silver-grey sidebar).
- Dimmed text keeps at least 2:1 contrast against the sidebar.
- Text on accent-colored buttons (for example "Upload plugin" or "Develop") uses the background or the brightest foreground color, whichever stands out more from the accent. In most dark palettes the accent is about as light as the normal text; in Kanagawa they are the same color.

To check a palette, `accentReport()` in `src/lib/theme.ts` returns the contrast between accent and normal text, and the contrast of the text the theme actually puts on accent buttons. With the 22 included palettes the latter is at least 3:1 (lowest: Rosé Pine, 3.1:1).

## Credits

- Color values: Omalauncher by Simon Schubert and contributors (MIT), and the Omarchy theme authors.
- Theme designs: Tokyo Night, Nord, Everforest, Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Flexoki and others belong to their respective authors.

## Development

- `npm install`, then `npm run dev` serves the plugin on `http://localhost:8082` (Windows: `plugin-starten.bat`). In RemNote: Settings → Plugins → Build → Develop from localhost → `http://localhost:8082`.
- `npm run build` validates the manifest and creates `PluginZip.zip` for upload.

Tested with RemNote 1.28 (October 2026).

## Deutsch

**Rice Themes** bringt 22 Farbthemes im Unixporn-Stil nach RemNote: Tokyo Night, Solitude, Retro 82, Nord, Miasma, Lupine (hell), Hackerman, Everforest, Ethereal, Catppuccin, Catppuccin Latte (hell), Flexoki Light (hell), Gruvbox, Kanagawa, Last Horizon, Lumon, Matte Black, Osaka Jade, Ristretto, Rosé Pine (hell), Vantablack und White (hell). Die Farbwerte stammen aus Omalauncher. Dazu gibt es eine optionale Terminal-Schrift (Monospace) und eckige Kanten. Auswahl unter Einstellungen → Plugins → Rice Themes. Es werden keine Daten aus RemNote hinausgeschickt.

Markierfarben, Farbwähler und alles, was auf einer Zeichenfläche oder PDF-Seite liegt, behalten die Farben von RemNote. Bei dunklen Themes erhalten markierte Stellen im Text die Markierfarben aus RemNotes Dunkelmodus, damit die helle Schrift darauf lesbar bleibt. Schrift auf Knöpfen in der Akzentfarbe nimmt immer die Farbe, die sich stärker vom Akzent abhebt.
