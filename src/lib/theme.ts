/**
 * Erzeugt aus einer Omarchy-Palette das CSS für RemNote.
 *
 * RemNote baut sein Design aus Farbskalen auf (--rn-colors-<farbe>-<stufe>-val: "R G B",
 * Stufen 0–100) und aus Bedeutungs-Variablen (--rn-clr-…), die auf diese Skalen zeigen.
 * Im dunklen Modus sind die Skalen umgedreht (Stufe 0 = dunkel), sogar «white» ist dort
 * schwarz. Wir setzen alle Skalen neu, ausgehend von Hintergrund (Stufe 0) zu Vordergrund
 * (Stufe 100). Damit sieht das Theme im hellen und im dunklen Modus gleich aus.
 */
import palettesJson from './palettes.json';
import { buildInlineCss } from './inline';
import { buildDarkVariantCss } from './dark-variants';

export interface Palette {
  id: string;
  name: string;
  mode: 'dark' | 'light';
  accent: string;
  selection: string;
  muted: string;
  background: string;
  lighter_background: string;
  foreground: string;
  dark_foreground: string;
  light_foreground: string;
  bright_foreground: string;
  red: string;
  yellow: string;
  orange?: string;
  green: string;
  cyan: string;
  blue: string;
  magenta: string;
  brown?: string;
}

export const PALETTES: Palette[] = palettesJson as Palette[];

export interface ThemeOptions {
  monoFont: boolean;
  squareCorners: boolean;
}

/* ---------------------------------------------------------------- */
/* Farb-Hilfen                                                       */
/* ---------------------------------------------------------------- */

type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const h = hex.trim().replace(/^#/, '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Mischt a und b: t = 0 → a, t = 1 → b. */
export function mix(a: RGB, b: RGB, t: number): RGB {
  const k = Math.max(0, Math.min(1, t));
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * k)) as RGB;
}

const val = (c: RGB) => `${c[0]} ${c[1]} ${c[2]}`;
const hex = (c: RGB) => '#' + c.map((x) => x.toString(16).padStart(2, '0')).join('');

function distance(a: RGB, b: RGB): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function luminance(c: RGB): number {
  const lin = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
}

export function contrast(a: RGB, b: RGB): number {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Rückt c auf der Linie von base nach c so nahe an base, dass der Abstand höchstens max ist. */
function limitDistance(base: RGB, c: RGB, max: number): RGB {
  const d = distance(base, c);
  return d > max ? mix(base, c, max / d) : c;
}

/* ---------------------------------------------------------------- */
/* Skalen                                                            */
/* ---------------------------------------------------------------- */

const COLOR_STEPS = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const GRAY_STEPS = [0, 5, 10, 11, 12, 13, 15, 20, 25, 26, 30, 40, 50, 60, 70, 80, 90, 100];

/** Farbskala: Stufe 0 ≈ Hintergrund, 50 = Farbe, 100 ≈ Vordergrund. */
export function colorScale(color: RGB, bg: RGB, fg: RGB): Record<number, RGB> {
  const out: Record<number, RGB> = {};
  for (const s of COLOR_STEPS) {
    out[s] = s <= 50 ? mix(bg, color, s / 50) : mix(color, fg, ((s - 50) / 50) * 0.85);
  }
  return out;
}

/**
 * Gedämpfte Schrift (Hinweise, Ordnernamen in der Seitenleiste). Einige Themes setzen sie fast
 * gleich hell wie die Seitenleiste (White: Grau auf Grau); dann wird sie so weit Richtung
 * Vordergrund gerückt, dass sie auf der Seitenleiste noch lesbar ist (Kontrast mindestens 2:1).
 */
export function dimText(p: Palette, sidebar?: RGB): RGB {
  const fg = hexToRgb(p.foreground);
  const dim = hexToRgb(p.dark_foreground);
  const surface = sidebar ?? sidebarColor(p);
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const c = mix(dim, fg, t);
    if (contrast(c, surface) >= 2) return c;
  }
  return fg;
}

/** Fläche der Seitenleiste (Stufe 5 der Grauskala). */
export function sidebarColor(p: Palette): RGB {
  const bg = hexToRgb(p.background);
  let lighter = hexToRgb(p.lighter_background);
  if (distance(lighter, bg) < 6) lighter = mix(bg, hexToRgb(p.bright_foreground), 0.05);
  return limitDistance(bg, lighter, 45);
}

/** Grauskala über die Stufen der Palette (Hintergrund → Auswahl → gedämpft → Text). */
export function grayScale(p: Palette): Record<number, RGB> {
  const bg = hexToRgb(p.background);
  const fgBright = hexToRgb(p.bright_foreground);
  // Manche Themes (z. B. Solitude) haben keinen abgesetzten Hintergrund, andere setzen ihn sehr
  // stark ab (White: Silbergrau auf Weiss). Seitenleiste und Karten sind in RemNote grosse Flächen,
  // darum höchstens so weit vom Hintergrund wie bei den übrigen Themes.
  const lighter = sidebarColor(p);
  const selection = limitDistance(bg, hexToRgb(p.selection), 80);
  const anchors: [number, RGB][] = [
    [0, bg],
    [5, lighter],
    [10, selection],
    [20, hexToRgb(p.muted)],
    [40, dimText(p, lighter)],
    [70, hexToRgb(p.light_foreground)],
    [90, hexToRgb(p.foreground)],
    [100, fgBright],
  ];
  const out: Record<number, RGB> = {};
  for (const s of GRAY_STEPS) {
    let i = 0;
    while (i < anchors.length - 2 && s > anchors[i + 1][0]) i++;
    const [s0, c0] = anchors[i];
    const [s1, c1] = anchors[i + 1];
    out[s] = mix(c0, c1, s1 === s0 ? 0 : (s - s0) / (s1 - s0));
  }
  return out;
}

/** Welche Palettenfarbe für welche RemNote-Skala. */
function hueSources(p: Palette): Record<string, RGB> {
  const red = hexToRgb(p.red);
  const yellow = hexToRgb(p.yellow);
  const orange = p.orange ? hexToRgb(p.orange) : mix(red, yellow, 0.5);
  const brown = p.brown ? hexToRgb(p.brown) : mix(orange, hexToRgb(p.background), 0.45);
  const accent = hexToRgb(p.accent);
  const blue = hexToRgb(p.blue);
  const magenta = hexToRgb(p.magenta);
  const green = hexToRgb(p.green);
  const cyan = hexToRgb(p.cyan);
  return {
    primary: accent,
    blue: accent,
    indigo: blue,
    purple: magenta,
    pink: magenta,
    rose: red,
    red: red,
    sunset: red,
    orange: orange,
    amber: yellow,
    yellow: yellow,
    citron: yellow,
    lime: green,
    green: green,
    mint: green,
    teal: cyan,
    cyan: cyan,
    brown: brown,
  };
}

/* ---------------------------------------------------------------- */
/* CSS                                                               */
/* ---------------------------------------------------------------- */

/**
 * Schriftfarbe auf Akzentflächen: Grundfläche oder hellste Schrift, je nachdem, was sich
 * stärker vom Akzent abhebt.
 */
export function onAccentColor(p: Palette): string {
  const accent = hexToRgb(p.accent);
  return contrast(accent, hexToRgb(p.background)) >= contrast(accent, hexToRgb(p.bright_foreground))
    ? p.background
    : p.bright_foreground;
}

/**
 * Prüft, wo Schrift und Akzent zu ähnlich sind. Genau dann wäre normale Schrift auf einem
 * Akzentknopf schlecht lesbar (unter 3:1). Liefert Kontrast Schrift/Akzent und den Kontrast
 * der Schrift, die das Theme auf Akzentflächen tatsächlich verwendet.
 */
export function accentReport(p: Palette): { textOnAccent: number; onColor: number; risky: boolean } {
  const accent = hexToRgb(p.accent);
  const textOnAccent = contrast(accent, hexToRgb(p.foreground));
  const onColor = contrast(accent, hexToRgb(onAccentColor(p)));
  return { textOnAccent, onColor, risky: textOnAccent < 3 };
}

/**
 * RemNotes eigene Farbstufen für die Markier-Tupfer (Stylesheet 1.28).
 * Ein Tupfer ist «bg-…-5 dark:bg-…-80», gewählt mit Ring «ring-…-70 dark:ring-…-80»
 * und Punkt «bg-…-60 dark:bg-…-40». Pro Farbe: [Fläche, Ring, Punkt].
 * Hell = Stufen 5/70/60 aus «:root», dunkel = Stufen 80/80/40 aus «.dark».
 */
const SWATCHES: Record<string, { light: [string, string, string]; dark: [string, string, string] }> = {
  red: { light: ['255 229 233', '184 7 44', '230 25 63'], dark: ['250 186 192', '250 186 192', '216 70 91'] },
  orange: { light: ['255 232 221', '168 46 0', '208 61 0'], dark: ['250 193 171', '250 193 171', '213 82 37'] },
  yellow: { light: ['255 248 217', '239 172 0', '255 192 2'], dark: ['251 233 156', '251 233 156', '222 178 34'] },
  green: { light: ['209 255 226', '0 110 11', '0 131 22'], dark: ['144 215 168', '144 215 168', '67 134 83'] },
  blue: { light: ['232 236 255', '33 64 219', '54 88 255'], dark: ['181 193 255', '181 193 255', '75 105 254'] },
  purple: { light: ['246 235 255', '123 32 249', '139 55 255'], dark: ['223 195 254', '223 195 254', '152 87 242'] },
  brown: { light: ['254 237 230', '183 60 0', '212 78 10'], dark: ['250 211 182', '250 211 182', '195 136 107'] },
  pink: { light: ['255 225 242', '189 0 160', '222 0 166'], dark: ['250 178 223', '250 178 223', '213 66 175'] },
  gray: { light: ['244 244 250', '81 81 103', '99 99 123'], dark: ['190 190 198', '190 190 198', '108 108 119'] },
};

/**
 * Markier-Tupfer (Textauswahl im Dokument, PDF-Werkzeugleiste): Farben wie in RemNote selbst,
 * bei dunklen Themes wie in RemNotes Dunkelmodus. Pastell auf dunkler Leiste wirkt sonst blass.
 */
function highlightSwatchCss(dark: boolean): string[] {
  const base = 'html body :is(.selected-text-menu__button--color, [data-test="PDF Highlight Color Button"] > span)';
  const rules = Object.entries(SWATCHES).map(([c, v]) => {
    const [bg, ring, dot] = dark ? v.dark : v.light;
    return (
      `${base}.bg-${c}-5 { background-color: rgb(${bg}) !important; ` +
      `--rn-colors-${c}-70-val: ${ring}; --rn-colors-${c}-80-val: ${ring}; ` +
      `--rn-colors-${c}-60-val: ${dot}; --rn-colors-${c}-40-val: ${dot}; }`
    );
  });
  // Ohne gewählte Farbe zeigt der Knopf ein gelbes Karomuster
  const yellow = dark ? SWATCHES.yellow.dark[0] : SWATCHES.yellow.light[0];
  rules.push(`${base} { --rn-colors-yellow-5: rgb(${yellow}); --rn-colors-yellow-80: rgb(${yellow}); }`);
  return rules;
}

// Auch auf :root setzen: RemNote rechnet zusammengesetzte Variablen (z. B. --rn-colors-blue-5)
// dort bereits aus; nur auf body gesetzt, kämen die Standardwerte durch.
const ROOT = ':root, :root body, :root body.light, :root body.dark';

export function buildThemeCss(p: Palette, opts: ThemeOptions): string {
  const bg = hexToRgb(p.background);
  const fgBright = hexToRgb(p.bright_foreground);
  const fg = hexToRgb(p.foreground);
  const accent = hexToRgb(p.accent);
  const dark = p.mode !== 'light';

  const vars: string[] = [];
  const set = (name: string, value: string) => vars.push(`  ${name}: ${value} !important;`);

  // Skalen
  const gray = grayScale(p);
  for (const s of GRAY_STEPS) set(`--rn-colors-gray-${s}-val`, val(gray[s]));
  for (const [hue, color] of Object.entries(hueSources(p))) {
    const scale = colorScale(color, bg, fgBright);
    for (const s of COLOR_STEPS) set(`--rn-colors-${hue}-${s}-val`, val(scale[s]));
  }
  // «Weiss» = Grundfläche, «Schwarz» = Kontrast (wie RemNotes eigene Umkehrung im Dunkelmodus)
  set('--rn-colors-white-val', val(bg));
  set('--rn-colors-black-val', val(fgBright));

  // Bedeutungs-Variablen
  set('--rn-clr-background-primary', p.background);
  set('--rn-clr-background-secondary', 'var(--rn-colors-gray-5)');
  set('--rn-clr-background-tertiary', 'var(--rn-colors-gray-10)');
  set('--rn-clr-background--hovered', 'var(--rn-colors-gray-10)');
  set('--rn-clr-background-primary--hovered', 'var(--rn-colors-gray-5)');
  set('--rn-clr-background-inverse-primary', p.bright_foreground);
  set('--rn-clr-content-primary', p.foreground);
  const dim = dimText(p);
  set('--rn-clr-content-secondary', hex(mix(fg, dim, 0.35)));
  set('--rn-clr-content-tertiary', hex(dim));
  set('--rn-clr-content-inverse-primary', p.background);
  set('--rn-clr-content-on-color', onAccentColor(p));
  set('--rn-clr-content-on-color-inverse', p.bright_foreground);
  set('--rn-clr-content-accent', p.accent);
  set('--rn-clr-background-accent', p.accent);
  set('--rn-clr-border-opaque', p.muted);
  set('--rn-clr-border-accent', p.accent);
  set('--rn-clr-border-selected', p.accent);
  set('--rn-clr-background-always-dark', '#000');
  set('--rn-clr-background-always-light', '#fff');
  set('--rn-clr-background-logo-color', p.accent);
  set('--rn-clr-content-logo-color', p.accent);
  set('--rn-clr-overlay-hsl', dark ? 'var(--rn-clr-white-hsl)' : 'var(--rn-clr-black-hsl)');
  // Diese zwei Hover-Farben sind bei RemNote fest hell eingetragen
  set('--rn-clr-background-light-warning--hovered', 'rgb(var(--rn-colors-yellow-10-val))');
  set('--rn-clr-background-light-positive--hovered', 'rgb(var(--rn-colors-green-10-val))');
  // Erhöhte Flächen (Menüs, Karten, Popups)
  for (const e of [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
    const alpha = { 5: 0.05, 10: 0.07, 15: 0.09, 20: 0.11, 30: 0.15, 40: 0.2, 50: 0.25, 60: 0.4, 70: 0.5, 80: 0.6, 90: 0.7, 100: 1 }[e] ?? 0.05;
    set(
      `--rn-clr-background-elevation-${e}`,
      dark
        ? `linear-gradient(hsla(var(--rn-clr-white-hsl), ${alpha}), hsla(var(--rn-clr-white-hsl), ${alpha})), linear-gradient(var(--rn-clr-background-primary), var(--rn-clr-background-primary))`
        : 'var(--rn-clr-background-primary)',
    );
  }

  const parts: string[] = [];
  parts.push(`/* Rice Themes: ${p.name} */`);
  parts.push(`${ROOT} {\n${vars.join('\n')}\n}`);
  parts.push(`body { background-color: ${p.background}; color: ${p.foreground}; caret-color: ${p.accent}; }`);
  parts.push(`::selection { background: ${p.selection}; color: ${p.bright_foreground}; }`);
  parts.push(`a, .rn-link { color: ${p.accent}; }`);
  // Tab-Leiste, Seitenleiste, AI Tutor u. a. haben ihre Hintergrundfarbe fest im HTML
  // (style="background-color: …"): #FCFCFC hell / #181818 dunkel, auf dem Tablet #FCFCFF / #18181B.
  parts.push(
    [
      '#tab-bar-container',
      '.document-sidebar__container',
      '.rn-ai-chat-container',
      '[style*="background-color: rgb(252, 252, 252)"]',
      '[style*="background-color: rgb(24, 24, 24)"]',
      '[style*="background-color: rgb(252, 252, 255)"]',
      '[style*="background-color: rgb(24, 24, 27)"]',
    ].join(',\n') + ` { background-color: var(--rn-clr-background-secondary) !important; }`,
  );
  // Weitere fest eingebaute Flächen, Rahmen und Verläufe (Lernkarten-Startseite, Pläne, AI-Guthaben …)
  parts.push(buildInlineCss());
  // Hinweis-Blasen mit fest eingebautem Farbverlauf
  parts.push(
    `.rn-tooltip-gradient, .rn-tooltip-purple { background: var(--rn-clr-background-secondary) !important; border-color: ${p.accent} !important; --rn-tooltip-background: var(--rn-clr-background-secondary) !important; --rn-tooltip-border: ${p.accent} !important; }`,
  );
  // Dunkle Themes: RemNotes «dark:»-Gestaltung auch im hellen Modus verwenden
  // (z. B. Hintergrund beim Lernkarten-Üben, Schliessen-Knopf, Hinweisfelder)
  if (dark) parts.push(buildDarkVariantCss());
  // Schrift auf Akzentflächen (Hauptknöpfe wie «Upload plugin», «Develop»): RemNote nimmt im
  // Dunkelmodus die normale Schriftfarbe («dark:rn-clr-content-primary»). Ist der Akzent so hell
  // wie die Schrift (z. B. Kanagawa), verschwindet sie. Darum gilt hier die Schrift für farbige Flächen.
  parts.push(
    `html body .rn-clr-background-accent :is(.rn-clr-content-primary, .dark\\:rn-clr-content-primary) { color: var(--rn-clr-content-on-color) !important; }`,
  );
  // Farbtupfer zum Markieren (Textauswahl im Dokument, PDF-Werkzeugleiste) in RemNotes eigenen Farben
  parts.push(...highlightSwatchCss(dark));
  // Rechteck beim Aufziehen einer Auswahl
  parts.push(`#selection-rectangle { background-color: rgba(${accent.join(', ')}, 0.2) !important; }`);

  if (opts.monoFont) {
    parts.push(
      // Formeln (KaTeX) behalten ihre eigenen Schriften
      `body, body *:not(.katex):not(.katex *) { font-family: "JetBrainsMono Nerd Font", "JetBrains Mono", "CaskaydiaMono Nerd Font", "Cascadia Mono", "Fira Code", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace !important; }`,
    );
  }
  if (opts.squareCorners) {
    parts.push(`body *, body *::before, body *::after { border-radius: 0 !important; }`);
  }
  return parts.join('\n') + '\n';
}
