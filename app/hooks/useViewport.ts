"use client";

import { useState, useEffect } from "react";
import {
  breakpoints,
  type WidthBreakpoint,
  type HeightBreakpoint,
} from "@/app/lib/breakpoints";

export type ViewportState = {
  width: number;
  height: number;
  widthBreakpoint: WidthBreakpoint;
  heightBreakpoint: HeightBreakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isShortViewport: boolean;
};

function getWidthBreakpoint(width: number): WidthBreakpoint {
  if (width >= breakpoints.width["2xl"]) return "2xl";
  if (width >= breakpoints.width.xl) return "xl";
  if (width >= breakpoints.width.lg) return "lg";
  if (width >= breakpoints.width.md) return "md";
  if (width >= breakpoints.width.sm) return "sm";
  return "xs";
}

function getHeightBreakpoint(height: number): HeightBreakpoint {
  if (height >= breakpoints.height.tall) return "tall";
  if (height >= breakpoints.height.medium) return "medium";
  return "short";
}

export function useViewport(): ViewportState {
  const [state, setState] = useState<ViewportState>(() => {
    if (typeof window === "undefined") {
      return {
        width: 1024,
        height: 768,
        widthBreakpoint: "lg",
        heightBreakpoint: "tall",
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isShortViewport: false,
      };
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    const wbp = getWidthBreakpoint(w);
    const hbp = getHeightBreakpoint(h);
    return {
      width: w,
      height: h,
      widthBreakpoint: wbp,
      heightBreakpoint: hbp,
      isMobile: wbp === "xs" || wbp === "sm",
      isTablet: wbp === "md",
      isDesktop: wbp === "lg" || wbp === "xl" || wbp === "2xl",
      isShortViewport: hbp === "short",
    };
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const wbp = getWidthBreakpoint(w);
      const hbp = getHeightBreakpoint(h);
      setState({
        width: w,
        height: h,
        widthBreakpoint: wbp,
        heightBreakpoint: hbp,
        isMobile: wbp === "xs" || wbp === "sm",
        isTablet: wbp === "md",
        isDesktop: wbp === "lg" || wbp === "xl" || wbp === "2xl",
        isShortViewport: hbp === "short",
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return state;
}
