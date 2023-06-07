import { FC } from "react";

import { ColorPicker, NumberPicker } from "..";

import { GeoDataStyleSettings } from "types";

import "./style-editor.css";

interface Props {
  dataStyles: GeoDataStyleSettings;
  saveDataStyles: <K extends keyof GeoDataStyleSettings>(
    key: K,
    value: Partial<GeoDataStyleSettings[K]>
  ) => void;
}

const StyleEditor: FC<Props> = ({ dataStyles, saveDataStyles }) => {
  const { style: dataStyle, hoverStyle: dataHoverStyle, toggle } = dataStyles;

  return (
    <>
      <div id="style-editor">
        Fill Color:
        <ColorPicker
          color={dataStyle.fill}
          onPickColor={(color) => saveDataStyles("style", { fill: color })}
        />
        Border Color:
        <ColorPicker
          color={dataStyle.stroke}
          onPickColor={(color) => saveDataStyles("style", { stroke: color })}
        />
        Border Width:
        <NumberPicker
          value={dataStyle.strokeWidth}
          onPickNumber={(value) =>
            saveDataStyles("style", {
              strokeWidth: value,
            })
          }
          min={0}
          max={20}
        />
        <span />
        <span />
        <span />
        <span />
        Enable Hover Style:
        <input
          className="toggle-switch"
          type="checkbox"
          checked={toggle.useHoverStyle}
          onChange={(e) =>
            saveDataStyles("toggle", { useHoverStyle: e.target.checked })
          }
        />
        <span />
        <span />
        <span />
        <span />
        {toggle.useHoverStyle && (
          <>
            Hover Fill Color:
            <ColorPicker
              color={dataHoverStyle.fill}
              onPickColor={(color) =>
                saveDataStyles("hoverStyle", { fill: color })
              }
            />
            Hover Border Color:
            <ColorPicker
              color={dataHoverStyle.stroke}
              onPickColor={(color) =>
                saveDataStyles("hoverStyle", { stroke: color })
              }
            />
            Hover Border Width:
            <NumberPicker
              value={dataHoverStyle.strokeWidth}
              onPickNumber={(value) =>
                saveDataStyles("hoverStyle", {
                  strokeWidth: value,
                })
              }
              min={0}
              max={20}
            />
          </>
        )}
      </div>
    </>
  );
};

export default StyleEditor;
