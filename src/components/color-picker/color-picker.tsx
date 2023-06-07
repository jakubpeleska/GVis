import { FC, useState } from "react";
import { ChromePicker, RGBColor } from "react-color";

import "./color-picker.css";

interface Props {
  color: string;
  onPickColor: (color: string) => void;
}

function num2hex(n: number): string {
  // convert number to hexadecimal string with length 2
  return n.toString(16).padStart(2, "0");
}

function rgba2hex(color: RGBColor): string {
  const { r, g, b, a = 1 } = color;
  return `#${num2hex(r)}${num2hex(g)}${num2hex(b)}${num2hex(
    Math.floor(a * 255)
  )}`;
}

const ColorPicker: FC<Props> = ({ color, onPickColor }) => {
  const [colorPickerOpen, setColorPicker] = useState(false);

  return (
    <>
      <div
        className="color-display-wrapper"
        onClick={() => setColorPicker(true)}
      >
        <div
          className="color-display"
          style={{
            background: color,
          }}
        />
        {colorPickerOpen ? (
          <div className="color-picker-wrapper">
            <div
              // hidden wrapper overlay to close color picker
              className="color-picker-closer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setColorPicker(false);
              }}
            />
            <ChromePicker
              // actual color picker from react-color library
              color={color}
              // use custom rgba color to hex color as the library doesn't provide hex color with opacity
              onChange={(color) => onPickColor(rgba2hex(color.rgb))}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ColorPicker;
