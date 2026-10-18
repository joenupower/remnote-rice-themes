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

Settings → Plugins → Rice Themes:

- **Theme**: pick one of the ten themes, or "Off" for RemNote's default look
- **Monospace font** (terminal look, default: on). Uses JetBrains Mono / Cascadia Mono / Fira Code if installed, otherwise the system monospace font. Math formulas keep their own font.
- **Square corners** instead of rounded ones (default: on)

Changes apply within a few seconds, without a reload. The theme looks the same whether RemNote itself is set to light or dark mode.

## How it works

RemNote builds its whole interface from CSS color scales (`--rn-colors-<color>-0…100`) and semantic variables (`--rn-clr-…`). For the selected palette the plugin recomputes every scale, from the theme's background (step 0) to its foreground (step 100), and registers the result with the official `app.registerCSS` API. A few places where RemNote sets colors inline (tab bar, sidebar, selection rectangle, onboarding hints) get their own rules.

The plugin runs sandboxed and only uses official plugin APIs.

## Privacy

No data leaves RemNote. No network requests, no third-party services.

## Adding themes

Palettes live in `src/lib/palettes.json` and use the field names of Omarchy's `colors.toml` (`background`, `foreground`, `accent`, `red`, `green`, …). Omalauncher ships more of them under `app/src/main/assets/themes/`.

## Credits

- Color values: Omalauncher by Simon Schubert and contributors (MIT), and the Omarchy theme authors.
- Theme designs: Tokyo Night, Nord, Everforest, Catppuccin and others belong to their respective authors.

## Development

- `npm install`, then `npm run dev` serves the plugin on `http://localhost:8082` (Windows: `plugin-starten.bat`). In RemNote: Settings → Plugins → Build → Develop from localhost → `http://localhost:8082`.
- `npm run build` validates the manifest and creates `PluginZip.zip` for upload.

Tested with RemNote 1.28 (October 2026).

## Deutsch

**Rice Themes** bringt zehn Farbthemes im Unixporn-Stil nach RemNote: Tokyo Night, Solitude, Retro 82, Nord, Miasma, Lupine (hell), Hackerman, Everforest, Ethereal und Catppuccin. Die Farbwerte stammen aus Omalauncher. Dazu gibt es eine optionale Terminal-Schrift (Monospace) und eckige Kanten. Auswahl unter Einstellungen → Plugins → Rice Themes. Es werden keine Daten aus RemNote hinausgeschickt.
