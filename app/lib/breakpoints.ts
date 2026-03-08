/**
 * Breakpoints compartidos entre TS y CSS.
 * Usar los mismos valores en media queries y en useViewport.
 */
export const breakpoints = {
  width: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  height: {
    short: 0,      // < 500px altura
    medium: 500,   // 500–700px
    tall: 700,     // > 700px
  },
} as const;

export type WidthBreakpoint = keyof typeof breakpoints.width;
export type HeightBreakpoint = keyof typeof breakpoints.height;

/** Valores en px para usar en CSS custom properties */
export const breakpointValues = {
  "width-sm": `${breakpoints.width.sm}px`,
  "width-md": `${breakpoints.width.md}px`,
  "width-lg": `${breakpoints.width.lg}px`,
  "width-xl": `${breakpoints.width.xl}px`,
  "width-2xl": `${breakpoints.width["2xl"]}px`,
  "height-short": `${breakpoints.height.medium}px`,
  "height-tall": `${breakpoints.height.tall}px`,
} as const;
