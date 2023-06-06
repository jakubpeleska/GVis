import { FC, useState } from "react";

import { GeoJSON } from "geojson";

import { CloseButton, ColorPicker, TextEditor } from "..";

import "./sidepanel.css";
import { RGBColor } from "react-color";

interface Props {
  option: "none" | "edit" | "style";
  geoData: GeoJSON;
  saveEditedData: (data: string) => void;
  onClose: () => void;
}

const Sidepanel: FC<Props> = ({ option, geoData, onClose, saveEditedData }) => {
  const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0 });

  const isOpen = option !== "none";
  const isEdit = option === "edit";
  const isStyle = option === "style";

  return (
    <aside id="sidepanel-wrapper" className={isOpen ? "open" : "close"}>
      <div id="sidepanel-content">
        <CloseButton width={20} height={20} onClose={onClose} />
        {isEdit && (
          <TextEditor geoData={geoData} saveEditedData={saveEditedData} />
        )}
        {isStyle && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                padding: 20,
                rowGap: 20,
              }}
            >
              Color:
              <ColorPicker color={color} onPickColor={setColor} />
              Color:
              <ColorPicker color={color} onPickColor={setColor} />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidepanel;
