import { FC, useState } from "react";

import "./tab-menu.css";

interface Props {
  onOpen: (filetype: "wkt" | "geojson", data: string) => void;
  onSave: () => void;
  onEdit: () => void;
  onStyle: () => void;
}

const TabMenu: FC<Props> = ({ onOpen, onSave, onEdit, onStyle }) => {
  const [fileType, setFileType] = useState("geojson" as "wkt" | "geojson");

  return (
    <ul className="menu">
      <li>
        Open
        <ul className="submenu">
          <input
            type="file"
            id="geo-data-selection"
            // set allowed file extension
            accept={fileType === "geojson" ? ".json,.geojson" : ".wkt"}
            // hidden file input that is triggered via htmlFor in label bellow
            style={{ display: "none" }}
            onChange={async (e) => {
              if (!e.target.files) return;

              const data = await e.target.files[0].text();
              onOpen(fileType, data);
            }}
          />
          <label htmlFor="geo-data-selection">
            <li onClick={() => setFileType("geojson")}>GeoJSON file</li>
            <li onClick={() => setFileType("wkt")}>WKT file</li>
          </label>
        </ul>
      </li>
      <li onClick={onSave}>
        Save
        <ul className="submenu"></ul>
      </li>
      <li onClick={onEdit}>Edit</li>
      <li onClick={onStyle}>
        Style
        <ul className="submenu"></ul>
      </li>
    </ul>
  );
};

export default TabMenu;
