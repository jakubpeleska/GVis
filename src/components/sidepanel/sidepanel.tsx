import { FC } from "react";

import { GeoJSON } from "geojson";

import { CloseButton, ColorPicker, NumberPicker, TextEditor } from "..";

import { GeoDataStyleSettings } from "types";

import "./sidepanel.css";

interface Props {
  option: "none" | "edit" | "style";
  data: GeoJSON;
  dataStyles: GeoDataStyleSettings;
  saveEditedData: (data: string) => void;
  saveDataStyles: <K extends keyof GeoDataStyleSettings>(
    key: K,
    value: Partial<GeoDataStyleSettings[K]>
  ) => void;
  onClose: () => void;
}

const Sidepanel: FC<Props> = ({
  option,
  data,
  dataStyles,
  onClose,
  saveEditedData,
  saveDataStyles,
}) => {
  const isOpen = option !== "none";
  const isEdit = option === "edit";
  const isStyle = option === "style";

  const { style: dataStyle, hoverStyle: dataHoverStyle, toggle } = dataStyles;

  return (
    <aside id="sidepanel-wrapper" className={isOpen ? "open" : "close"}>
      <div id="sidepanel-content">
        <CloseButton width={20} height={20} onClose={onClose} />
        {isEdit && <TextEditor data={data} saveEditedData={saveEditedData} />}
        {isStyle && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                gap: 20,
              }}
            >
              Fill Color:
              <ColorPicker
                color={dataStyle.fill}
                onPickColor={(color) =>
                  saveDataStyles("style", { fill: color })
                }
              />
              Border Color:
              <ColorPicker
                color={dataStyle.stroke}
                onPickColor={(color) =>
                  saveDataStyles("style", { stroke: color })
                }
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
        )}
      </div>
    </aside>
  );
};

export default Sidepanel;
