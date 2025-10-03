import React from "react";
import { Icon } from "@iconify/react";

type ButtonProps = {
  label: string;
  icon?: string; // Iconify icon name
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  variant?: "primary" | "secondary"; // Future: you can add more styles
};

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  type = "button",
  fullWidth = true,
  variant = "primary",
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out";
  const primary =
    "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white";
  const secondary =
    "bg-gray-700 hover:bg-gray-600 text-white";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variant === "primary" ? primary : secondary} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {icon && <Icon icon={icon} className="text-xl" />}
      {label}
    </button>
  );
};
export default Button;
