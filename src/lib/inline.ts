/**
 * Farben, die RemNote direkt ins HTML schreibt (style="…") statt über CSS-Variablen.
 *
 * Neuere Teile von RemNote (Lernkarten-Startseite, Pläne, AI-Guthaben, Einladungen u. a.)
 * nehmen ihre Farben aus zwei fest eingebauten Paletten im App-Code, eine helle und eine
 * dunkle. Diese Farben erreicht das Theme nur über CSS-Selektoren auf das style-Attribut.
 * Hier stehen die Werte, die als Flächen, Rahmen oder Verläufe vorkommen; daraus entsteht
 * CSS, das nur auf die Variablen des Themes zeigt und darum für alle Paletten gleich ist.
 *
 * Erhoben aus dem App-Code von RemNote 1.28 (Oktober 2026).
 */

type RGB = [number, number, number];

const toRgb = (hex: string): RGB => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgbText = (c: RGB) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

/* ---------------------------------------------------------------- */
/* RemNotes eingebaute Paletten                                      */
/* ---------------------------------------------------------------- */

// Stufen 0, 5, 10, 20, 30 – bei Grau 0, 5, 10, 15, 20, 30
const STEPS = [0, 5, 10, 20, 30];
const GRAY_STEPS = [0, 5, 10, 15, 20, 30];

const RN_LIGHT: Record<string, string> = {
  red: '#FFFAFB #FFE5E9 #FFCFD5 #FFA0AC #FF7689',
  sunset: '#FFFBFA #FFE4DD #FFCCBF #FF9E87 #FF7B5C',
  orange: '#FFF6F2 #FFE8DD #FFD9C7 #FFB38F #FF915D',
  amber: '#FFFDFA #FFF6E7 #FFF0D4 #FFE0A9 #FFD082',
  yellow: '#FFFEFA #FFF8D9 #FFF3B8 #FFE77B #FFDD4C',
  citron: '#FFFFF2 #FFFFD2 #FEFFB2 #FBFF6F #F1FB3B',
  lime: '#FDFFFA #EDFED0 #D6F3A0 #A4DC48 #75C404',
  green: '#FAFFFC #D1FFE2 #A8FFC4 #4BE77A #04CD3D',
  mint: '#FAFFFD #D1FFEE #A6FBDE #4AE3AE #04CA83',
  teal: '#FAFFFE #D1FFF7 #A8FFF4 #4CEAE4 #04CED2',
  cyan: '#FAFDFF #E7F6FF #D4F0FF #A9E1FF #82D2FF',
  blue: '#FAFBFF #E8ECFF #D5DCFF #ACBBFF #869DFF',
  logoBlue: '#F9FAFF #E7EBFF #D2D9FD #9CACFE #7D92FC',
  indigo: '#FAFAFF #EBEBFF #DCDCFF #BABAFF #9C9BFF',
  purple: '#FDFAFF #F6EBFF #ECDCFF #D7B8FF #C294FF',
  pink: '#FFFAFD #FFE1F2 #FFC7E4 #FF8FCC #FF5DBB',
  rose: '#FFF2F5 #FFE1E9 #FFCFDC #FFA0BA #FF769E',
  gray: '#FCFCFF #F4F4FA #E7E7EF #D8D8E4 #CACAD9 #ACACC0',
  brown: '#FFF5F0 #FEEDE6 #FCD5BD #F8B894 #F49B6D',
};

// Bernstein, Gelb und Zitrone sind in der dunklen Palette kräftige Farben, keine Flächen: weggelassen
const RN_DARK: Record<string, string> = {
  red: '#571020 #6B1427 #7F182E #A4233B #C2324A',
  sunset: '#4A1108 #60170B #761D0E #9D2C17 #BD3E26',
  orange: '#4D1300 #621900 #781F01 #9E2D07 #BE3E13',
  lime: '#0F3607 #144009 #1A4A0B #285E0E #387212',
  green: '#1A361A #1F4020 #244A27 #2E5E34 #387243',
  mint: '#153625 #1A402D #1E4A35 #265E45 #2F7256',
  teal: '#163634 #1B403E #1F4A48 #285E5D #317272',
  cyan: '#042A4F #05325C #073C6A #0D5187 #1769A4',
  blue: '#102B61 #15377D #1B4498 #285BC6 #3870E8',
  indigo: '#2C2166 #382A81 #45349B #5B47C8 #6F5AE9',
  purple: '#4A1E87 #522197 #5C26A8 #7535CF #8945E8',
  pink: '#4A0D4A #60125D #76176F #9D238C #BD31A1',
  rose: '#450C2A #5C1037 #721443 #9A2058 #BB2F6B',
  gray: '#232329 #2B2B33 #34343C #3D3D46 #464650 #595964',
  brown: '#4D3427 #5F3E32 #71503E #8D624D #A8755C',
};

/** Weitere fest eingebaute Flächenfarben → Stufe der Theme-Skala. */
const EXTRA_SURFACES: [string, string][] = [
  ['#FFFFFF', 'gray-5'],
  ['#FCFCFC', 'gray-5'],
  ['#F8F9FA', 'gray-5'],
  ['#F6F6F6', 'gray-5'],
  ['#F6F7F9', 'gray-5'],
  ['#F4F4F7', 'gray-5'],
  ['#F8FAFC', 'gray-5'],
  ['#EEF2F5', 'gray-5'],
  ['#E5E7EB', 'gray-10'],
  ['#F1FDF6', 'green-0'],
  ['#F0FDF4', 'green-0'],
  ['#F0FFF4', 'green-0'],
  ['#F5F9FF', 'blue-0'],
  ['#F5F7FF', 'blue-0'],
  ['#FBF5FF', 'indigo-0'],
  ['#FEFCF3', 'citron-0'],
  ['#FFE0A9', 'amber-10'],
  ['#EFF6FF', 'cyan-5'],
  ['#ECF7FF', 'cyan-5'],
  ['#F0F4FF', 'cyan-5'],
  ['#FFFBEB', 'amber-5'],
  ['#FFF7ED', 'brown-0'],
  ['#FCF4EC', 'brown-0'],
  ['#FEF2F2', 'rose-0'],
  ['#FFF5F5', 'rose-0'],
  ['#DDE5F7', 'indigo-10'],
  ['#EEF1FD', 'indigo-5'],
  // Gegenstücke im Dunkelmodus
  ['#181818', 'gray-5'],
  ['#171717', 'gray-5'],
  ['#1A1A1A', 'blue-0'],
  ['#0F172A', 'gray-5'],
  ['#0F2A40', 'cyan-5'],
];

/** Weitere fest eingebaute Rahmenfarben → Stufe der Theme-Skala. */
const EXTRA_BORDERS: [string, string][] = [
  ['#FFFFFF', 'gray-10'],
  ['#E2CEFF', 'indigo-10'],
  ['#C7CFF7', 'blue-10'],
  ['#C5CFF7', 'blue-10'],
  ['#DDE5F7', 'indigo-10'],
  ['#EEF1FD', 'indigo-5'],
  ['#B7B1BF', 'indigo-20'],
  // Gegenstücke im Dunkelmodus
  ['#2A2A2A', 'indigo-10'],
  ['#3F3D42', 'indigo-20'],
  ['#304A31', 'indigo-20'],
  ['#0F172A', 'gray-10'],
];

const hueName = (h: string) => (h === 'logoBlue' ? 'blue' : h);

function paletteMap(
  palette: Record<string, string>,
  pick: (hue: string, step: number) => string | null,
  out: Map<string, string>,
) {
  for (const [hue, row] of Object.entries(palette)) {
    const steps = hue === 'gray' ? GRAY_STEPS : STEPS;
    row.split(' ').forEach((hex, i) => {
      const token = pick(hue, steps[i]);
      const key = rgbText(toRgb(hex));
      if (token && !out.has(key)) out.set(key, token);
    });
  }
}

/** rgb(…)-Text → Stufe der Theme-Skala für Hintergründe. */
export function surfaceColors(): Map<string, string> {
  const out = new Map<string, string>();
  // Flächen kommen nur in den hellsten Stufen vor (Farben bis 10, Grau bis 20)
  const isSurface = (hue: string, s: number) => s <= (hue === 'gray' ? 20 : 10);
  // Hell: Grau 0 ist RemNotes Seitenleisten-Weiss → wie die Seitenleiste im Theme (Stufe 5)
  paletteMap(RN_LIGHT, (hue, s) => (!isSurface(hue, s) ? null : hue === 'gray' && s === 0 ? 'gray-5' : `${hueName(hue)}-${s}`), out);
  paletteMap(RN_DARK, (hue, s) => (!isSurface(hue, s) ? null : `${hueName(hue)}-${s}`), out);
  for (const [hex, token] of EXTRA_SURFACES) {
    const key = rgbText(toRgb(hex));
    if (!out.has(key)) out.set(key, token);
  }
  return out;
}

/** rgb(…)-Text → Stufe der Theme-Skala für Rahmen. */
export function borderColors(): Map<string, string> {
  const out = new Map<string, string>();
  // Als Rahmen kommen aus den Paletten nur die Grautöne vor; farbige Rahmen stehen in EXTRA_BORDERS
  const pick = (hue: string, s: number) => (hue !== 'gray' || s === 0 ? null : `gray-${s}`);
  paletteMap(RN_LIGHT, pick, out);
  paletteMap(RN_DARK, pick, out);
  for (const [hex, token] of EXTRA_BORDERS) {
    const key = rgbText(toRgb(hex));
    if (!out.has(key)) out.set(key, token);
  }
  return out;
}

/* ---------------------------------------------------------------- */
/* Verläufe                                                          */
/* ---------------------------------------------------------------- */

/**
 * Fest eingebaute Verläufe, so wie der Browser sie im style-Attribut schreibt
 * (Hex-Farben als rgb(…), «to bottom» weggelassen). Hell- und Dunkelvariante.
 */
export const GRADIENTS: string[] = [
  // Karten «Monatliche AI-Guthaben» und Einladungs-Guthaben
  'linear-gradient(182deg, rgb(255, 255, 255) 37.57%, rgb(246, 239, 254) 109.87%)',
  'linear-gradient(182deg, rgb(255, 255, 255) 37.57%, rgb(239, 246, 254) 109.87%)',
  'linear-gradient(182deg, rgb(41, 41, 54) 37.57%, rgb(58, 57, 76) 109.87%)',
  'linear-gradient(182deg, rgba(41, 41, 54, 0.8) 0%, rgba(57, 56, 74, 0.5) 100%)',
  // Untere Leiste im Plan-Fenster
  'linear-gradient(90deg, rgb(250, 253, 255) 34%, rgb(249, 244, 255) 56.13%)',
  'linear-gradient(90deg, rgb(26, 26, 26) 34%, rgb(26, 26, 26) 56.13%)',
  // Übrige Karten, Banner und Fenster
  'linear-gradient(to right bottom, rgb(255, 255, 255), rgb(230, 255, 230))',
  'linear-gradient(to right bottom, rgb(255, 255, 255), rgb(255, 245, 230))',
  'linear-gradient(to right bottom, rgb(255, 255, 255), rgb(230, 242, 255))',
  'linear-gradient(to right bottom, rgb(255, 255, 255), rgb(255, 245, 245))',
  'linear-gradient(to right bottom, rgb(17, 17, 17), rgb(51, 17, 17))',
  'linear-gradient(90deg, rgb(249, 244, 255) 0%, rgb(236, 220, 255) 24.81%)',
  'linear-gradient(90deg, rgb(73, 0, 161) 0%, rgb(92, 0, 202) 24.81%)',
  'linear-gradient(90deg, rgb(236, 220, 255) 60.68%, rgb(249, 244, 255) 100%)',
  'linear-gradient(323.62deg, rgb(249, 241, 255) 18.37%, rgb(255, 255, 255) 33.84%',
  'linear-gradient(135deg, rgb(245, 249, 255) 0%, rgb(251, 245, 255) 100%)',
  'linear-gradient(135deg, rgb(255, 251, 235) 0%, rgb(254, 243, 199) 100%)',
  'linear-gradient(135deg, rgb(42, 37, 32) 0%, rgb(42, 40, 48) 100%)',
  'linear-gradient(9deg, rgb(247, 248, 253) -43.92%, rgb(255, 255, 255) 90.17%)',
  'linear-gradient(9deg, rgb(46, 47, 56) -43.92%, rgb(58, 59, 69) 90.17%)',
  'linear-gradient(rgb(237, 254, 208) 2.78%, rgb(253, 255, 250) 50%, rgb(255, 255, 255) 100%)',
  'linear-gradient(rgb(78, 89, 60) 2.78%, rgb(29, 31, 25) 50%, rgba(0, 0, 0, 0) 100%)',
  'linear-gradient(148deg, rgb(255, 249, 238) 25.95%, rgb(222, 245, 255) 88.67%)',
  'linear-gradient(148deg, rgb(16, 43, 97) 6.12%, rgb(7, 60, 106) 52.41%, rgb(44, 33, 102) 100%)',
  'linear-gradient(126.64deg, rgb(243, 251, 255) 25.95%, rgb(222, 245, 255) 88.67%)',
  'linear-gradient(126.64deg, rgb(16, 43, 97) 18.02%, rgb(4, 42, 79) 64.37%, rgb(44, 33, 102) 100%)',
  'linear-gradient(rgb(255, 255, 255) 19%, rgb(235, 238, 241) 100%)',
  'linear-gradient(rgb(28, 30, 32) 19%, rgb(14, 15, 17) 100%)',
  'linear-gradient(172.57deg, rgb(237, 254, 208) 2.78%, rgb(253, 255, 250) 25.42%, rgb(255, 255, 255) 37.85%)',
  'linear-gradient(rgb(78, 89, 60) 2.78%, rgb(29, 31, 25) 25.42%, rgb(0, 0, 0) 37.85%)',
  'linear-gradient(89.62deg, rgb(243, 246, 249) 0.56%, rgb(235, 239, 244) 29%, rgb(249, 250, 251) 101.51%)',
  'linear-gradient(339deg, rgb(230, 241, 254) -35.54%, rgb(255, 255, 255) 69.75%)',
  'linear-gradient(135deg, rgb(251, 245, 255) 0%, rgb(245, 249, 255) 100%)',
  'linear-gradient(rgb(207, 248, 255) 14.06%, rgb(227, 229, 255) 47.83%)',
  'linear-gradient(283deg, rgb(0, 103, 122) 48.4%, rgb(6, 22, 70) 93.12%)',
  'linear-gradient(rgb(255, 241, 229) 0%, rgb(255, 184, 184) 100%)',
  'linear-gradient(300deg, rgb(152, 73, 0) 45.23%, rgb(68, 0, 0) 94.46%)',
  'linear-gradient(0deg, rgb(249, 249, 249), rgb(255, 255, 255) 33%)',
  'linear-gradient(white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))',
  'linear-gradient(163deg, rgb(255, 252, 239) -4.15%, rgb(254, 254, 255) 16.83%',
  'radial-gradient(140.02% 195.07% at 71.74% 131.43%, rgb(62, 53, 45) 0%',
  'linear-gradient(340deg, rgb(249, 241, 255) 2.01%, rgb(255, 255, 255) 22.43%',
  'linear-gradient(329deg, rgb(18, 0, 31) -31.99%, rgb(30, 0, 49) -4.56%',
  'radial-gradient(481.53% 133.75% at 100.13% 131.99%, rgb(235, 203, 141) 0%',
  'radial-gradient(535.25% 149.01% at 102.02% 130.34%, rgb(59, 45, 17) 0.11%',
  'linear-gradient(90deg, rgb(248, 241, 255) 0%, rgb(248, 243, 255) 43.27%, rgb(240, 227, 255) 100%)',
  'linear-gradient(153deg, rgb(255, 255, 255) 8.59%, rgb(233, 248, 255) 112.49%)',
  'linear-gradient(153deg, rgb(0, 54, 78) 8.59%, rgb(0, 81, 116) 112.49%)',
  'linear-gradient(153deg, rgb(255, 255, 255) 8.59%, rgb(247, 255, 233) 112.49%)',
  'linear-gradient(183deg, rgb(29, 41, 9) -22.4%, rgb(64, 98, 6) 161.12%)',
  'linear-gradient(90deg, rgb(255, 229, 233) 75.53%, rgb(255, 255, 255) 121.63%)',
  'linear-gradient(90deg, rgb(136, 0, 0) 75.53%, rgb(28, 0, 0) 121.63%)',
  'linear-gradient(90deg, rgb(251, 245, 255) 0%, rgb(255, 247, 237) 100%)',
  'linear-gradient(135deg, rgb(251, 245, 255) 0%, rgb(255, 247, 237) 100%)',
  'linear-gradient(336deg, rgb(249, 241, 255) 1.9%, rgb(255, 255, 255) 21.8%',
  'linear-gradient(102deg, rgb(255, 255, 255) 61.87%, rgb(255, 248, 245) 97.72%)',
  'radial-gradient(62.57% 100.11% at 49.1% 5.22%, rgb(255, 255, 255) 0%, rgb(240, 244, 255) 100%)',
  'linear-gradient(36deg, rgb(250, 244, 255) 10.11%, rgb(255, 255, 255) 50.24%, rgb(255, 249, 237) 88.85%)',
  'linear-gradient(36deg, rgb(25, 26, 36) 10.11%, rgb(30, 32, 44) 50.24%, rgb(36, 37, 27) 88.85%)',
  'linear-gradient(rgb(255, 255, 255), rgb(245, 252, 255))',
  'linear-gradient(91deg, rgb(2, 50, 96) 14.19%, rgb(4, 41, 77) 50.21%, rgb(13, 23, 34) 99.09%)',
  'linear-gradient(102deg, rgb(250, 250, 255) 61.87%, rgb(250, 250, 255) 97.72%)',
  'linear-gradient(95deg, rgb(53, 40, 124) 2.67%, rgb(36, 23, 107) 21.25%, rgb(2, 2, 5) 110.34%)',
  'linear-gradient(rgb(255, 255, 255), rgb(255, 248, 245))',
  'radial-gradient(222.55% 232.17% at 87.37% 166.11%, rgb(62, 53, 45) 0%',
  'linear-gradient(102deg, rgb(255, 255, 255) 61.87%, rgb(243, 255, 238) 97.72%)',
  'radial-gradient(440.48% 203.41% at -1.31% -19.44%, rgb(44, 61, 34) 0%',
  'linear-gradient(rgb(255, 255, 255), rgb(243, 255, 238))',
  // Auffangregeln für weitere weisse Karten
  'gradient(rgb(255, 255, 255)',
  'deg, rgb(255, 255, 255) ',
];

/**
 * Weiche Übergänge (Text blendet aus, Lichtschein): hier bleibt der Verlauf erhalten,
 * nur die Farbe wird zur Grundfläche des Themes. Gleiche Deckkraft wie im Original.
 */
export const FADES: string[] = [
  'linear-gradient(to left, rgba(255, 255, 255, 0), rgb(255, 255, 255))',
  'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255))',
  'linear-gradient(to top, rgba(255, 255, 255, 0), rgb(255, 255, 255))',
  'linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))',
  'linear-gradient(to left, rgba(35, 35, 41, 0), rgb(35, 35, 41))',
  'linear-gradient(to right, rgba(35, 35, 41, 0), rgb(35, 35, 41))',
  'linear-gradient(to top, rgba(35, 35, 41, 0), rgb(35, 35, 41))',
  'linear-gradient(rgba(35, 35, 41, 0), rgb(35, 35, 41))',
  'linear-gradient(rgba(255, 255, 255, 0) 4%, rgba(255, 255, 255, 0.65) 4%, rgb(255, 255, 255) 100%)',
  'linear-gradient(transparent, white 80%)',
  'linear-gradient(to top, white, transparent)',
  'linear-gradient(to right, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0))',
  'linear-gradient(360deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.15) 70%, rgba(255, 255, 255, 0))',
  'linear-gradient(360deg, rgba(35, 35, 41, 0.9), rgba(35, 35, 41, 0.15) 70%, rgba(35, 35, 41, 0))',
  'linear-gradient(157deg, rgb(255, 253, 245) 14.8%, rgba(255, 254, 250, 0) 89.99%)',
  'linear-gradient(157deg, rgba(255, 208, 130, 0.05) 14.8%, rgba(255, 208, 130, 0) 89.99%)',
  'linear-gradient(157.2deg, rgb(255, 250, 231) 14.8%, rgba(255, 254, 250, 0.016) 89.98%, rgba(255, 254, 250, 0) 89.99%)',
];

/**
 * Ganz entfernen: Farbschleier und Hintergrundbild oben auf der Lernkarten-Startseite
 * (hell ein Pastell-Verlauf, dunkel ein Bild mit violettem Schleier).
 */
export const REMOVE: string[] = [
  'linear-gradient(226.435deg, rgba(255, 233, 233, 0.365)',
  'flashcards-home-top-banner-bg',
];

/** Tailwind-Klassen mit fest eingebautem Verlauf (stehen im class-Attribut). */
const CLASS_FADES: [string, string][] = [
  ['linear-gradient(to_left,#fff0,#ffffff)', 'to left'],
  ['linear-gradient(to_right,#fff0,#ffffff)', 'to right'],
  ['linear-gradient(to_left,rgb(35_35_41_/_0%),rgb(35_35_41))', 'to left'],
  ['linear-gradient(to_right,rgb(35_35_41_/_0%),rgb(35_35_41))', 'to right'],
];
const CLASS_SURFACES = ['linear-gradient(135deg,#eaf4ff', 'linear-gradient(135deg,#f6fbff'];

/** Ersetzt jede Farbe eines Verlaufs durch die Grundfläche des Themes, Deckkraft bleibt. */
export function fadeToTheme(gradient: string): string {
  return gradient.replace(
    /rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)|\bwhite\b/g,
    (_m, _r, _g, _b, a) => `rgb(var(--rn-colors-gray-0-val) / ${a === undefined ? 1 : a})`,
  );
}

/* ---------------------------------------------------------------- */
/* CSS                                                               */
/* ---------------------------------------------------------------- */

const attr = (name: string, text: string) => `[${name}*="${text.replace(/"/g, '\\"')}"]`;

function groupByToken(map: Map<string, string>): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const [color, token] of map) {
    if (!groups.has(token)) groups.set(token, []);
    groups.get(token)!.push(color);
  }
  return groups;
}

let cached: string | null = null;

/** CSS für alle fest eingebauten Farben. Zeigt nur auf Theme-Variablen, gilt für jede Palette. */
export function buildInlineCss(): string {
  if (cached) return cached;
  const parts: string[] = [];

  // Flächen
  for (const [token, colors] of groupByToken(surfaceColors())) {
    const sel = colors.flatMap((c) => [attr('style', `background-color: ${c}`), attr('style', `background: ${c}`)]);
    parts.push(`[style*="background"]:is(${sel.join(', ')}) { background-color: rgb(var(--rn-colors-${token}-val)) !important; }`);
  }

  // Rahmen
  for (const [token, colors] of groupByToken(borderColors())) {
    const sel = colors.flatMap((c) => [attr('style', `border-color: ${c}`), attr('style', `solid ${c}`)]);
    parts.push(`[style*="border"]:is(${sel.join(', ')}) { border-color: rgb(var(--rn-colors-${token}-val)) !important; }`);
  }

  // Helle Verlaufs-Flächen → ruhige, flache Fläche
  const surfaceSel = [...GRADIENTS.map((g) => attr('style', g)), ...CLASS_SURFACES.map((g) => attr('class', g))];
  parts.push(
    `[style*="gradient"]:is(${surfaceSel.filter((s) => s.startsWith('[style')).join(', ')}), ${surfaceSel
      .filter((s) => s.startsWith('[class'))
      .join(', ')} { background-image: none !important; background-color: var(--rn-clr-background-secondary) !important; }`,
  );

  // Weiche Übergänge
  for (const g of FADES) {
    parts.push(`${attr('style', g)} { background-image: ${fadeToTheme(g)} !important; }`);
  }
  for (const [cls, dir] of CLASS_FADES) {
    parts.push(
      `${attr('class', cls)} { background-image: linear-gradient(${dir}, rgb(var(--rn-colors-gray-0-val) / 0), rgb(var(--rn-colors-gray-0-val))) !important; }`,
    );
  }

  parts.push(`${REMOVE.map((s) => attr('style', s)).join(', ')} { background-image: none !important; }`);

  // Menü mit Regenbogen-Rahmen (weisse Fläche + farbiger Rand)
  parts.push(
    `${attr('style', 'linear-gradient(white, white), linear-gradient(')} { background-image: linear-gradient(var(--rn-clr-background-secondary), var(--rn-clr-background-secondary)), linear-gradient(to right, rgb(var(--rn-colors-purple-50-val)), rgb(var(--rn-colors-primary-50-val)), rgb(var(--rn-colors-cyan-50-val))) !important; }`,
  );

  // Ausblend-Verläufe der Startseiten (Tailwind «from-transparent» + Zielfarbe im style-Attribut)
  parts.push(`.from-transparent[style*="--tw-gradient-to"] { --tw-gradient-to: var(--rn-clr-background-primary) !important; }`);

  cached = parts.join('\n');
  return cached;
}
