import { FC } from "react";

import "./button.css";

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: FC<Props> = ({ text, onClick, disabled, className }) => {
  return (
    <div
      className={`button ${disabled ? "disabled" : ""} ${className || ""}`}
      onClick={() => !disabled && onClick}
    >
      {text}
    </div>
  );
};

export default Button;
