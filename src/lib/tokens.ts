export const colors = {
  bg: '#0a0e14',
  surface: '#10161f',
  surface2: '#161d28',
  surface3: '#1d2530',

  border: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.16)',
  borderStrong: 'rgba(255, 255, 255, 0.22)',

  text: '#f0eee9',
  textMuted: '#c2cbd4',
  textDim: '#9aa6b2',
  textFaint: '#6b7a88',

  kelpDeep: '#1f6b5e',
  kelp: '#2d8572',
  kelpSoft: '#7fb8aa',
  kelpGlow: 'rgba(127, 184, 170, 0.08)',
  kelpBorder: 'rgba(127, 184, 170, 0.30)',

  coral: '#c96442',
  coralSoft: '#e08a6b',
  coralGlow: 'rgba(201, 100, 66, 0.08)',
  coralBorder: 'rgba(201, 100, 66, 0.30)',

  warm: '#e0a963',
  green: '#7fb8aa',
  red: '#e07373',
  purple: '#9988c9',

  liveDot: '#4ade80',
} as const;

export const fonts = {
  display: "'Fraunces Variable', Georgia, serif",
  italic: "'Instrument Serif', Georgia, serif",
  body: "'Inter Variable', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono Variable', ui-monospace, Menlo, monospace",
} as const;

export const radii = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.3)',
  md: '0 8px 24px rgba(0,0,0,0.35)',
  lg: '0 24px 48px rgba(0,0,0,0.5)',
} as const;

export const layout = {
  containerMax: '1240px',
  pagePadX: '32px',
} as const;
