# Themes and sources

## Omarchy themes (22)

Tokyo Night, Solitude, Retro 82, Nord, Miasma, Lupine, Hackerman, Everforest, Ethereal, Catppuccin, Catppuccin Latte, Flexoki Light, Gruvbox, Kanagawa, Last Horizon, Lumon, Matte Black, Osaka Jade, Ristretto, Rosé Pine, Vantablack, White.

Color values from [Omalauncher](https://github.com/SimonSchubert/omalauncher) (`app/src/main/assets/themes/`), MIT, based on the themes that ship with [Omarchy](https://omarchy.org).

## Community themes (25)

A selection from [omarchy.org/themes](https://omarchy.org/themes/). Colors come from each theme's `colors.toml` in the repository below. Theme designs belong to their authors.

| Theme | Repository | Notes |
|---|---|---|
| Dracula | [catlee/omarchy-dracula-theme](https://github.com/catlee/omarchy-dracula-theme) |  |
| One Dark | [joaopinto15/omarchy-one-dark-theme](https://github.com/joaopinto15/omarchy-one-dark-theme) |  |
| Gruvbox Material | [curbol/omarchy-gruvbox-material](https://github.com/curbol/omarchy-gruvbox-material) |  |
| Rosé Pine Moon | [Memnoc/omarchy-rose-pine-moon-theme](https://github.com/Memnoc/omarchy-rose-pine-moon-theme) |  |
| Flexoki Dark | [euandeas/omarchy-flexoki-dark-theme](https://github.com/euandeas/omarchy-flexoki-dark-theme) | older format (terminal colors 0–15) |
| Tokyo Night OLED | [Justin-De-Sio/omarchy-tokyoled-theme](https://github.com/Justin-De-Sio/omarchy-tokyoled-theme) | older format; selection was the accent color, now a darker blend of background and accent |
| Modus Vivendi | [codingquark/omarchy-modus-vivendi-theme](https://github.com/codingquark/omarchy-modus-vivendi-theme) |  |
| Cobalt2 | [hoblin/omarchy-cobalt2-theme](https://github.com/hoblin/omarchy-cobalt2-theme) |  |
| Neon Dusk | [daniel-felipe/omarchy-neon-dusk-theme](https://github.com/daniel-felipe/omarchy-neon-dusk-theme) |  |
| Solarized Dark | [Gazler/omarchy-solarized-theme](https://github.com/Gazler/omarchy-solarized-theme) | values from the original Solarized palette |
| Synthwave '84 | [omacom-io/omarchy-synthwave84-theme](https://github.com/omacom-io/omarchy-synthwave84-theme) | values from the original Synthwave '84 palette |
| Rosé Pine Dark | [guilhermetk/omarchy-rose-pine-dark](https://github.com/guilhermetk/omarchy-rose-pine-dark) |  |
| Van Gogh | [Nirmal314/omarchy-van-gogh-theme](https://github.com/Nirmal314/omarchy-van-gogh-theme) |  |
| Fireside | [bjarneo/omarchy-fireside-theme](https://github.com/bjarneo/omarchy-fireside-theme) | selection slightly stronger |
| Frost | [bjarneo/omarchy-frost-theme](https://github.com/bjarneo/omarchy-frost-theme) | selection slightly stronger |
| Sakura | [bjarneo/omarchy-sakura-theme](https://github.com/bjarneo/omarchy-sakura-theme) | selection slightly stronger |
| Coffee | [megabyte0x/omarchy-coffee-theme](https://github.com/megabyte0x/omarchy-coffee-theme) |  |
| Eldritch | [eldritch-theme/omarchy](https://github.com/eldritch-theme/omarchy) | values from the original Eldritch palette |
| Vesper | [thmoee/omarchy-vesper-theme](https://github.com/thmoee/omarchy-vesper-theme) | values from the original Vesper palette |
| Modus Operandi | [codingquark/omarchy-modus-operandi-theme](https://github.com/codingquark/omarchy-modus-operandi-theme) |  |
| Solarized Light | [dfrico/omarchy-solarized-light-theme](https://github.com/dfrico/omarchy-solarized-light-theme) | values from the original Solarized palette |
| Coffee Latte | [megabyte0x/omarchy-coffee-latte-theme](https://github.com/megabyte0x/omarchy-coffee-latte-theme) |  |
| Ristretto Light | [brokkoli71/omarchy-ristretto-light-theme](https://github.com/brokkoli71/omarchy-ristretto-light-theme) | older format; accent slightly darker for 3:1 contrast |
| Quattrocento Light | [r-bart/omarchy-quattrocento-light-theme](https://github.com/r-bart/omarchy-quattrocento-light-theme) | selection slightly stronger |
| Living Ink | [leaflessbranch/omarchy-living-ink-theme](https://github.com/leaflessbranch/omarchy-living-ink-theme) |  |

How the files were converted:

- Newer `colors.toml` (with `background`, `accent`, `red`, `muted`, …): taken as is. Missing fields are filled in: `lighter_background` as a 6 % blend of background and foreground, `orange` as a blend of red and yellow.
- Older `colors.toml` (only `accent`, `selection_background` and terminal colors `color0`–`color15`): red, green, yellow, blue, magenta and cyan from colors 1–6, dimmed text from color 8.
- Repositories with only an Alacritty or terminal config: the values of the original palette, entered by hand.
- Selection colors that were almost invisible on the background are made slightly stronger (at least 1.3:1), and an accent with less than 3:1 contrast against the background is moved toward the text color until it reaches 3:1.

Left out on purpose: themes that use nearly the same colors as a theme already included (for example Aura and Dracula, Snow and White), and themes whose "red" or "green" is a completely different color (Oxo Carbon), because RemNote uses those for warnings and confirmations.
