import { FC, useState } from "react";
import { ChromePicker, RGBColor } from "react-color";

import "./color-picker.css";

interface Props {
  color: RGBColor;
  onPickColor: (color: RGBColor) => void;
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
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        />
        {colorPickerOpen ? (
          <div className="color-picker-wrapper">
            <div
              className="color-picker-closer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setColorPicker(false);
              }}
            />
            <ChromePicker
              color={color}
              onChange={(color) => onPickColor(color.rgb)}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ColorPicker;
