import { ReactNode } from "react";

export interface IButtonProps {
  children: string;
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export interface IButtonGroupProps {
  children: ReactNode | ReactNode[],
  className?: string
}