import { FC, useEffect, useState } from "react";
import { GeoJSON } from "geojson";

import { Button } from "..";

import "./text-editor.css";

interface Props {
  geoData: GeoJSON;
  saveEditedData: (data: string) => void;
}

const TextEditor: FC<Props> = ({ geoData, saveEditedData }) => {
  const [editData, setEditedData] = useState<string>();
  const [editError, setEditError] = useState<string>();

  useEffect(() => {
    setEditedData(geoData ? JSON.stringify(geoData, null, 2) : undefined);
    setEditError("");
  }, [geoData]);

  const editedDataValid = !editError && !!editData;

  return (
    <>
      {editError && (
        <label id="edit-text-error" htmlFor="edit-text">
          {editError}
        </label>
      )}
      <textarea
        id="edit-text"
        value={editData}
        autoFocus
        onChange={(e) => {
          const newText = e.target.value;
          try {
            JSON.parse(newText);
            setEditError("");
          } catch (err) {
            setEditError((err as Error).message.replace("JSON.parse: ", ""));
          }
          setEditedData(newText);
        }}
      />
      <Button
        className="save-button"
        onClick={() => saveEditedData(editData || "")}
        disabled={!editedDataValid}
        text="Save"
      />
    </>
  );
};

export default TextEditor;
