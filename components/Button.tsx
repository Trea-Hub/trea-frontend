import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "subtle"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#ff5451] text-white shadow-[0_0_20px_-4px_rgba(239,68,68,0.4)] hover:bg-[#e64a47]",
  secondary: "bg-[#2a2a2a] text-[#f3f0ee] hover:bg-[#353534]",
  subtle: "bg-[#171717] text-[#d7d2cf] hover:bg-[#242424] hover:text-[#f3f0ee]",
  ghost:
    "bg-transparent text-[#d7d2cf] hover:bg-[#242424] hover:text-[#f3f0ee]",
  danger: "bg-[#171717] text-[#ffb4ab] hover:bg-[#93000a]/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2.5 py-2 text-[11px]",
  md: "px-3 py-2.5 text-[13px]",
  lg: "px-4 py-3 text-[16px]",
  icon: "h-9 w-9 p-0 text-[18px]",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonStyleOptions = {}) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}
