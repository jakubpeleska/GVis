import { FC } from "react";

import "./number-picker.css";

interface Props {
  value: number;
  onPickNumber: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberPicker: FC<Props> = ({
  value,
  onPickNumber,
  min = -Infinity,
  max = Infinity,
}) => {
  return (
    <input
      className="number-picker"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => {
        const newValue = parseInt(e.target.value);
        if (isNaN(newValue)) return;

        onPickNumber(Math.min(max, Math.max(min, newValue)));
      }}
    />
  );
};

export default NumberPicker;
