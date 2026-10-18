/**
 * Dunkel-Varianten von RemNote auch im hellen Modus anwenden (nur für dunkle Themes).
 *
 * RemNote gestaltet viele Stellen zweimal: eine Klasse für den hellen Modus und eine
 * «dark:»-Klasse für den dunklen, z. B. beim Lernkarten-Üben
 * «rn-clr-background-inverse-primary dark:rn-clr-background-primary»
 * (hell ein dunkler Hintergrund, dunkel der normale). Die Farbskalen eines dunklen Themes
 * sind wie im Dunkelmodus aufgebaut (Stufe 0 = dunkel). Läuft RemNote im hellen Modus,
 * passen deshalb die «dark:»-Klassen besser. Diese Regeln setzen sie auch dann ein.
 *
 * Die Klassen stammen aus dem Stylesheet von RemNote 1.28 (Oktober 2026). Es sind nur
 * Farbregeln, die auf Variablen zeigen; fest eingetragene Farben sind weggelassen.
 */

// Einfache Klassen: Regel lässt sich aus dem Namen ableiten
const SIMPLE = `
rn-clr-background-primary rn-clr-background-secondary rn-clr-background-tertiary rn-clr-content-logo-color
rn-clr-background-logo-color rn-clr-background-inverse-primary rn-clr-background-inverse-secondary
rn-clr-content-primary rn-clr-content-secondary rn-clr-content-tertiary rn-clr-content-inverse-primary
rn-clr-content-inverse-secondary rn-clr-content-inverse-tertiary rn-clr-border-opaque rn-clr-border-selected
rn-clr-border-inverse-opaque rn-clr-border-inverse-selected rn-clr-border-light-accent rn-clr-background-state-disabled
rn-clr-background-overlay-dark rn-clr-background-overlay-light rn-clr-background-accent rn-clr-background-negative
rn-clr-background-warning rn-clr-background-positive rn-clr-background-light-accent rn-clr-background-light-negative
rn-clr-background-light-warning rn-clr-background-light-warning--hovered rn-clr-background-light-positive
rn-clr-background-light-positive--hovered rn-clr-background-always-dark rn-clr-background-always-light
rn-clr-content-state-disabled rn-clr-content-on-color rn-clr-content-on-color-inverse rn-clr-content-accent
rn-clr-content-negative rn-clr-content-warning rn-clr-content-positive rn-clr-border-state-disabled
rn-clr-border-accent rn-clr-border-accent-light rn-clr-border-negative rn-clr-border-warning rn-clr-border-positive
rn-clr-background-elevation-5 rn-clr-background-elevation-10 rn-clr-background-elevation-15
rn-clr-background-elevation-20 rn-clr-background-elevation-30 rn-clr-background-elevation-40
rn-clr-background-elevation-50 rn-clr-background-elevation-60 rn-clr-background-elevation-70
rn-clr-background-elevation-80 rn-clr-background-elevation-90 rn-clr-background-elevation-100
rn-clr-background--hovered rn-clr-background--pressed rn-clr-background--focused rn-clr-background-primary--hovered
rn-clr-background-accent--hovered rn-clr-background-light-accent--hovered
bg-opacity-0 bg-opacity-5 bg-opacity-10 bg-opacity-20 bg-opacity-25 bg-opacity-30 bg-opacity-40 bg-opacity-50
bg-opacity-60 bg-opacity-70 bg-opacity-75 bg-opacity-80 bg-opacity-90 bg-opacity-95 bg-opacity-100
border-gray-10 border-gray-40 border-amber-60 border-purple-40 border-gray-70 border-yellow-30 border-gray-20
border-gray-80 border-gray-30 border-cyan-60 border-purple-80 border-gray-15 border-yellow-10 border-cyan-40
border-pink-30 border-teal-40 border-citron-20 border-rose-60 border-gray-50 border-cyan-30 border-blue-70
border-cyan-20 border-purple-20 border-lime-20 border-blue-30 border-orange-100 border-citron-0 border-green-70
border-blue-40 border-red-20 border-gray-60 border-cyan-0
bg-amber-70 bg-purple-0 bg-purple-10 bg-gray-10 bg-gray-5 bg-gray-30 bg-gray-90 bg-gray-80 bg-blue-90 bg-mint-80
bg-gray-0 bg-gray-50 bg-cyan-5 bg-cyan-0 bg-gray-15 bg-gray-20 bg-blue-10 bg-gray-100 bg-purple-30 bg-purple-20
bg-red-80 bg-cyan-10 bg-blue-100 bg-pink-0 bg-lime-0 bg-green-0 bg-yellow-0 bg-red-100 bg-blue-70 bg-blue-80
bg-lime-90 bg-yellow-40 bg-orange-0 bg-orange-100 bg-gray-60 bg-blue-40 bg-blue-50 bg-blue-20 bg-yellow-70
text-gray-10 text-gray-30 text-blue-50 text-blue-30 text-yellow-30 text-mint-20 text-gray-40 text-gray-20
text-gray-50 text-gray-80 text-purple-80 text-orange-20 text-orange-80 text-gray-100 text-yellow-60 text-gray-70
text-yellow-50 text-cyan-50 text-teal-80 text-citron-50 text-gray-90 text-blue-40 text-red-80 text-green-30
text-green-100 text-yellow-100 text-yellow-40 text-red-50 text-cyan-90 text-green-40 text-purple-20 text-purple-70
text-red-30 text-lime-90 text-lime-20 text-orange-40 text-orange-100 text-orange-0 text-citron-40 text-purple-5
text-green-50 text-gray-60 text-yellow-70 text-amber-90
`
  .trim()
  .split(/\s+/);

// Übrige Regeln wörtlich (Selektor ohne das vorangestellte «.dark »)
const VERBATIM: [string, string][] = [
  ['.dark\\:divide-gray-40 > :not([hidden]) ~ :not([hidden])', '--tw-divide-opacity: 1; border-color: rgb(var(--rn-colors-gray-40-val) / var(--tw-divide-opacity));'],
  ['.dark\\:\\!border-gray-20', '--tw-border-opacity: 1 !important; border-color: rgb(var(--rn-colors-gray-20-val) / var(--tw-border-opacity)) !important;'],
  ['.dark\\:\\!border-gray-40', '--tw-border-opacity: 1 !important; border-color: rgb(var(--rn-colors-gray-40-val) / var(--tw-border-opacity)) !important;'],
  ['.dark\\:border-transparent', 'border-color: transparent;'],
  ['.dark\\:border-yellow-50\\/30', 'border-color: rgb(var(--rn-colors-yellow-50-val) / .3);'],
  ['.dark\\:border-blue-70\\/40', 'border-color: rgb(var(--rn-colors-blue-70-val) / .4);'],
  ['.dark\\:border-b-gray-10', '--tw-border-opacity: 1; border-bottom-color: rgb(var(--rn-colors-gray-10-val) / var(--tw-border-opacity));'],
  ['.dark\\:border-opacity-10', '--tw-border-opacity: .1;'],
  ['.dark\\:bg-red-0\\/30', 'background-color: rgb(var(--rn-colors-red-0-val) / .3);'],
  ['.dark\\:\\!bg-gray-0', '--tw-bg-opacity: 1 !important; background-color: rgb(var(--rn-colors-gray-0-val) / var(--tw-bg-opacity)) !important;'],
  ['.dark\\:\\!bg-gray-5', '--tw-bg-opacity: 1 !important; background-color: rgb(var(--rn-colors-gray-5-val) / var(--tw-bg-opacity)) !important;'],
  ['.dark\\:bg-transparent', 'background-color: transparent;'],
  ['.hover-active\\:dark\\:bg-gray-10:hover', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-10-val) / var(--tw-bg-opacity));'],
  ['.hover-active\\:dark\\:bg-gray-10:active', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-10-val) / var(--tw-bg-opacity));'],
  ['.dark\\:focus\\:bg-gray-10:focus', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-10-val) / var(--tw-bg-opacity));'],
  ['.dark\\:active\\:bg-gray-10:active', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-10-val) / var(--tw-bg-opacity));'],
  ['.dark\\:hover-active\\:bg-gray-5:hover', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-5-val) / var(--tw-bg-opacity));'],
  ['.dark\\:hover-active\\:bg-gray-5:active', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-5-val) / var(--tw-bg-opacity));'],
  ['.dark\\:\\!bg-transparent', 'background-color: transparent !important;'],
  ['.dark\\:bg-gray-50\\/80', 'background-color: rgb(var(--rn-colors-gray-50-val) / .8);'],
  ['.dark\\:bg-yellow-50\\/10', 'background-color: rgb(var(--rn-colors-yellow-50-val) / .1);'],
  ['.dark\\:bg-yellow-50\\/20', 'background-color: rgb(var(--rn-colors-yellow-50-val) / .2);'],
  ['.dark\\:hover-active\\:bg-gray-20:hover', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-20-val) / var(--tw-bg-opacity));'],
  ['.dark\\:hover-active\\:bg-gray-20:active', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-20-val) / var(--tw-bg-opacity));'],
  ['.dark\\:focus\\:bg-gray-20:focus', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-20-val) / var(--tw-bg-opacity));'],
  ['.dark\\:active\\:bg-gray-20:active', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-gray-20-val) / var(--tw-bg-opacity));'],
  ['.dark\\:\\!bg-gray-20', '--tw-bg-opacity: 1 !important; background-color: rgb(var(--rn-colors-gray-20-val) / var(--tw-bg-opacity)) !important;'],
  ['.dark\\:bg-black\\/10', 'background-color: rgb(var(--rn-colors-black-val) / .1);'],
  ['.dark\\:bg-blue-90\\/20', 'background-color: rgb(var(--rn-colors-blue-90-val) / .2);'],
  ['.dark\\:bg-white', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-white-val) / var(--tw-bg-opacity));'],
  ['.dark\\:bg-black', '--tw-bg-opacity: 1; background-color: rgb(var(--rn-colors-black-val) / var(--tw-bg-opacity));'],
  ['.dark\\:bg-black\\/30', 'background-color: rgb(var(--rn-colors-black-val) / .3);'],
  ['.dark\\:\\!bg-gray-90', '--tw-bg-opacity: 1 !important; background-color: rgb(var(--rn-colors-gray-90-val) / var(--tw-bg-opacity)) !important;'],
  ['.dark\\:bg-blue-0\\/20', 'background-color: rgb(var(--rn-colors-blue-0-val) / .2);'],
  ['.dark\\:bg-blue-5\\/30', 'background-color: rgb(var(--rn-colors-blue-5-val) / .3);'],
  ['.dark\\:bg-gray-90\\/40', 'background-color: rgb(var(--rn-colors-gray-90-val) / .4);'],
  ['.dark\\:bg-yellow-10\\/50', 'background-color: rgb(var(--rn-colors-yellow-10-val) / .5);'],
  ['.dark\\:bg-blue-20\\/50', 'background-color: rgb(var(--rn-colors-blue-20-val) / .5);'],
  ['.dark\\:bg-white\\/10', 'background-color: rgb(var(--rn-colors-white-val) / .1);'],
  ['.dark\\:bg-white\\/90', 'background-color: rgb(var(--rn-colors-white-val) / .9);'],
  ['.dark\\:bg-white\\/5', 'background-color: rgb(var(--rn-colors-white-val) / .05);'],
  ['.dark\\:bg-white\\/30', 'background-color: rgb(var(--rn-colors-white-val) / .3);'],
  ['.dark\\:bg-blue-90\\/30', 'background-color: rgb(var(--rn-colors-blue-90-val) / .3);'],
  ['.dark\\:from-gray-90', '--tw-gradient-from: rgb(var(--rn-colors-gray-90-val) / 1); --tw-gradient-to: rgb(var(--rn-colors-gray-90-val) / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);'],
  ['.dark\\:from-gray-80', '--tw-gradient-from: rgb(var(--rn-colors-gray-80-val) / 1); --tw-gradient-to: rgb(var(--rn-colors-gray-80-val) / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);'],
  ['.dark\\:from-black', '--tw-gradient-from: rgb(var(--rn-colors-black-val) / 1); --tw-gradient-to: rgb(var(--rn-colors-black-val) / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);'],
  ['.dark\\:fill-blue-40', 'fill: rgb(var(--rn-colors-blue-40-val) / 1);'],
  ['.dark\\:fill-gray-40', 'fill: rgb(var(--rn-colors-gray-40-val) / 1);'],
  ['.dark\\:fill-gray-50', 'fill: rgb(var(--rn-colors-gray-50-val) / 1);'],
  ['.dark\\:text-black', '--tw-text-opacity: 1; color: rgb(var(--rn-colors-black-val) / var(--tw-text-opacity));'],
  ['.dark\\:\\!text-white', '--tw-text-opacity: 1 !important; color: rgb(var(--rn-colors-white-val) / var(--tw-text-opacity)) !important;'],
  ['.dark\\:\\!text-cyan-60', '--tw-text-opacity: 1 !important; color: rgb(var(--rn-colors-cyan-60-val) / var(--tw-text-opacity)) !important;'],
  ['.dark\\:text-white', '--tw-text-opacity: 1; color: rgb(var(--rn-colors-white-val) / var(--tw-text-opacity));'],
  ['.dark\\:\\!text-gray-10', '--tw-text-opacity: 1 !important; color: rgb(var(--rn-colors-gray-10-val) / var(--tw-text-opacity)) !important;'],
  ['.dark\\:text-black\\/80', 'color: rgb(var(--rn-colors-black-val) / .8);'],
  ['.dark\\:\\!text-purple-20', '--tw-text-opacity: 1 !important; color: rgb(var(--rn-colors-purple-20-val) / var(--tw-text-opacity)) !important;'],
  ['.dark\\:text-white\\/50', 'color: rgb(var(--rn-colors-white-val) / .5);'],
  ['.dark\\:text-white\\/60', 'color: rgb(var(--rn-colors-white-val) / .6);'],
  ['.dark\\:text-white\\/70', 'color: rgb(var(--rn-colors-white-val) / .7);'],
  ['.dark\\:\\!rn-clr-background-primary', 'background: var(--rn-clr-background-primary) !important;'],
  ['.dark\\:\\!rn-clr-border-opaque', 'border-color: var(--rn-clr-border-opaque) !important;'],
];

/** Regel für eine einfache Klasse. */
export function simpleDeclarations(cls: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = cls.match(/^rn-clr-background-(.+)$/))) {
    const base = `background: var(--rn-clr-background-${m[1]});`;
    return ['primary', 'secondary', 'tertiary'].includes(m[1])
      ? `${base} --current-background-color: var(--rn-clr-background-${m[1]});`
      : base;
  }
  if ((m = cls.match(/^rn-clr-content-(.+)$/))) return `color: var(--rn-clr-content-${m[1]});`;
  if ((m = cls.match(/^rn-clr-border-(.+)$/))) return `border-color: var(--rn-clr-border-${m[1]});`;
  if ((m = cls.match(/^bg-opacity-(\d+)$/))) return `--tw-bg-opacity: ${Number(m[1]) / 100};`;
  if ((m = cls.match(/^(bg|text|border)-([a-z]+)-(\d+)$/))) {
    const prop = { bg: 'background-color', text: 'color', border: 'border-color' }[m[1]];
    const op = `--tw-${m[1]}-opacity`;
    return `${op}: 1; ${prop}: rgb(var(--rn-colors-${m[2]}-${m[3]}-val) / var(${op}));`;
  }
  return null;
}

// «html» hebt die Regel knapp über RemNotes Hell-Klassen (gleich viele Klassen),
// lässt aber Hover-Zustände (:hover zählt wie eine Klasse) weiterhin gewinnen.
const PREFIX = 'html :where(body.light) ';

let cached: string | null = null;

export function buildDarkVariantCss(): string {
  if (cached) return cached;
  const rules: string[] = [];
  for (const cls of SIMPLE) {
    const decl = simpleDeclarations(cls);
    if (decl) rules.push(`${PREFIX}.dark\\:${cls} { ${decl} }`);
  }
  for (const [sel, decl] of VERBATIM) rules.push(`${PREFIX}${sel} { ${decl} }`);
  cached = rules.join('\n');
  return cached;
}
