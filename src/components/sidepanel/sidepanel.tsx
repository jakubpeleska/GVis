import { FC } from "react";

import { GeoJSON } from "geojson";

import { CloseButton, StyleEditor, TextEditor } from "..";

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

  return (
    <aside id="sidepanel-wrapper" className={isOpen ? "open" : "close"}>
      <div id="sidepanel-content">
        <CloseButton width={20} height={20} onClose={onClose} />
        {isEdit && <TextEditor data={data} saveEditedData={saveEditedData} />}
        {isStyle && (
          <StyleEditor
            dataStyles={dataStyles}
            saveDataStyles={saveDataStyles}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidepanel;
