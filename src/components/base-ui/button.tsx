import * as React from "react";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "green"
  | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses: Record<Variant, string> = {
  default:
    "bg-gradient-to-r from-navSecondary to-navSecondaryHover bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-300 text-white shadow-sm",
  destructive:
    "bg-red-600 text-white shadow-sm shadow-navSecondary hover:bg-red-500 focus:ring-2 focus:ring-offset-2",
  outline:
    "border border-gray-500 shadow-sm shadow-navSecondary backdrop-blur-sm text-gray-800 hover:bg-gray-100",
  secondary:
    "bg-gray-100 text-gray-800 shadow-sm shadow-navSecondary hover:bg-gray-200",
  ghost:
    "bg-transparent text-gray-700 shadow-sm shadow-navSecondary hover:bg-gray-100",
  green:
    "bg-[#185941] bg-left hover:bg-[#3c7a62] text-white shadow-sm border-2 border-[#0C3D30]",
  link: "text-navSecondary underline hover:text-navSecondaryHover",
};

const sizeClasses: Record<Size, string> = {
  default: "h-9 px-4 py-2 text-sm sm:h-10 sm:px-6 sm:text-base",
  sm: "h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm",
  lg: "h-10 px-6 text-base sm:h-12 sm:px-8 sm:text-lg",
  icon: "h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        size !== "icon" && "max-sm:w-full",
        "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-navSecondary",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
