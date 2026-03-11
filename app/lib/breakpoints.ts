
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
    short: 0,      
    medium: 500,   
    tall: 700,     
  },
} as const;

export type WidthBreakpoint = keyof typeof breakpoints.width;
export type HeightBreakpoint = keyof typeof breakpoints.height;

export const breakpointValues = {
  "width-sm": `${breakpoints.width.sm}px`,
  "width-md": `${breakpoints.width.md}px`,
  "width-lg": `${breakpoints.width.lg}px`,
  "width-xl": `${breakpoints.width.xl}px`,
  "width-2xl": `${breakpoints.width["2xl"]}px`,
  "height-short": `${breakpoints.height.medium}px`,
  "height-tall": `${breakpoints.height.tall}px`,
} as const;
