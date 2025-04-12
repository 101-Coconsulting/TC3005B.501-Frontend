/**
 * Author: Eduardo Porto Morales
 * 
 * Fallback configuration utilities
 * 
 * Description:
 * Defines valid fallback types, sizes, default classes, messages and styles.
 * Used for consistent and scalable fallback rendering across the application.
 **/

export const FALLBACK_TYPES = ["Loading", "Error", "Timeout"] as const;
export type FallbackType = (typeof FALLBACK_TYPES)[number];

export const FALLBACK_SIZES = ["small", "medium", "large"] as const;
export type FallbackSize = (typeof FALLBACK_SIZES)[number];

export interface FallbackProps {
  type: FallbackType;
  size?: FallbackSize;
  className?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

// Size-specific class definitions for wrapper, icon, and text
export const fallbackClasses = ["small", "medium", "large"].reduce(
  (acc, size, index) => ({
    ...acc,
    [size]: {
      sizeClass: ["w-52 h-12", "w-67 h-16", "w-96 h-24"][index],
      textClass: ["text-sm", "text-xl", "text-3xl"][index],
      iconClass: ["w-6 h-6", "w-10 h-10", "w-14 h-14"][index],
    },
  }),
  {} as Record<FallbackSize, {
    sizeClass: string;
    textClass: string;
    iconClass: string;
  }>
);

//Default background, border and text colors for each fallback type
export const fallbackNames: Record<FallbackType, {
  bg: string;
  text: string;
  gap: string;
}> = {
  Error: {
    bg: "bg-red-500",
    text: "text-white",
    gap: "gap-2",
  },
  Loading: {
    bg: "bg-gray-200",
    text: "text-black",
    gap: "gap-4",
  },
  Timeout: {
    bg: "bg-blue-500",
    text: "text-white",
    gap: "gap-2",
  },
};

// Default message per fallback type
export const fallbackMessages: Record<FallbackType, string> = {
  Error: "Ha ocurrido un error",
  Loading: "Cargando...",
  Timeout: "Tiempo de espera agotado",
};