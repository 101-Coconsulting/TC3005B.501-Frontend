/**
 * Description:
 * Button component for the application.
*/

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'border' | 'empty';
  size?: 'small' | 'medium' | 'big' | 'custom';
  color?: 'primary' | 'secondary' | 'success' | 'warning';
  customSizeClass?: string;
}


const getClasses = ({
  variant,
  size,
  color,
  customSizeClass = "",
}: Required<Pick<ButtonProps, 'variant' | 'size' | 'color' | 'customSizeClass'>>) => {
  const base = "rounded font-medium";
  const sizeMap = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    big: "px-6 py-3 text-lg",
    custom: customSizeClass,
  };
  const colorMap = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-red-500 hover:bg-red-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  };
  return `${base} ${sizeMap[size]} ${colorMap[color]}`;
};


export default function Button({
  children,
  customSizeClass = "",
  variant = "filled",
  size = "medium",
  color = "primary",
  ...props
}: ButtonProps) {
  const className = getClasses({ variant, size, color, customSizeClass });

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
