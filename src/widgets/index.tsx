import { AppEvents, declareIndexPlugin, type ReactRNPlugin } from '@remnote/plugin-sdk';
import { PALETTES, buildThemeCss } from '../lib/theme';

/*
 * Rice Themes
 * --------------
 * Farbpaletten der Omarchy-Themes (Werte aus Omalauncher) für RemNote, dazu optional
 * Monospace-Schrift und eckige Kanten im Unixporn-Stil. Reines CSS über registerCSS.
 */

const CSS_ID = 'rice-themes';
const RECHECK_MS = 3000;

const SETTING_THEME = 'theme';
const SETTING_MONO = 'mono-font';
const SETTING_SQUARE = 'square-corners';
const OFF = 'off';
const DEFAULT_THEME = 'tokyo-night';

const LANG: 'de' | 'en' =
  (typeof navigator !== 'undefined' ? navigator.language : '').toLowerCase().startsWith('de') ? 'de' : 'en';

const T = {
  theme: { de: 'Theme', en: 'Theme' },
  off: { de: 'Aus (RemNote-Standard)', en: 'Off (RemNote default)' },
  light: { de: 'hell', en: 'light' },
  mono: { de: 'Monospace-Schrift (Terminal-Look)', en: 'Monospace font (terminal look)' },
  square: { de: 'Eckige Kanten statt Rundungen', en: 'Square corners instead of rounded ones' },
};
const t = (k: keyof typeof T) => T[k][LANG];

let currentCss: string | null = null;
let timer: number | undefined;
let activePlugin: ReactRNPlugin | null = null;

async function get<V>(plugin: ReactRNPlugin, id: string, fallback: V): Promise<V> {
  try {
    const v = await plugin.settings.getSetting<V>(id);
    return v === undefined || v === null || (v as unknown) === '' ? fallback : v;
  } catch {
    return fallback;
  }
}

async function applyTheme(plugin: ReactRNPlugin) {
  const themeId = await get(plugin, SETTING_THEME, DEFAULT_THEME);
  const palette = PALETTES.find((p) => p.id === themeId);
  const css =
    themeId === OFF || !palette
      ? ''
      : buildThemeCss(palette, {
          monoFont: await get(plugin, SETTING_MONO, true),
          squareCorners: await get(plugin, SETTING_SQUARE, true),
        });
  if (css === currentCss) return;
  try {
    await plugin.app.registerCSS(CSS_ID, css);
    currentCss = css;
  } catch (e) {
    console.warn('[Rice Themes] could not register CSS', e);
  }
}

const onSettingChanged = () => {
  if (activePlugin) void applyTheme(activePlugin);
};

async function onActivate(plugin: ReactRNPlugin) {
  activePlugin = plugin;

  await plugin.settings.registerDropdownSetting({
    id: SETTING_THEME,
    title: t('theme'),
    defaultValue: DEFAULT_THEME,
    options: [
      { key: OFF, value: OFF, label: t('off') },
      ...PALETTES.map((p) => ({
        key: p.id,
        value: p.id,
        label: p.mode === 'light' ? `${p.name} (${t('light')})` : p.name,
      })),
    ],
  });
  await plugin.settings.registerBooleanSetting({ id: SETTING_MONO, title: t('mono'), defaultValue: true });
  await plugin.settings.registerBooleanSetting({ id: SETTING_SQUARE, title: t('square'), defaultValue: true });

  await applyTheme(plugin);
  plugin.event.addListener(AppEvents.SettingChanged, undefined, onSettingChanged);
  timer = window.setInterval(() => void applyTheme(plugin), RECHECK_MS);
}

async function onDeactivate(plugin: ReactRNPlugin) {
  plugin.event.removeListener(AppEvents.SettingChanged, undefined, onSettingChanged);
  window.clearInterval(timer);
  activePlugin = null;
  currentCss = null;
  try {
    await plugin.app.registerCSS(CSS_ID, '');
  } catch {
    // egal
  }
}

declareIndexPlugin(onActivate, onDeactivate);
