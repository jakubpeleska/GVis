import "./visualization.css";

import { FC, useRef, useState } from "react";
import { GeoJSON } from "geojson";

import { GeoJson, Map, Point, ZoomControl } from "pigeon-maps";
import { stamenTerrain } from "pigeon-maps/providers";

import { GeoDataStyleSettings } from "types";

interface Props {
  data: GeoJSON;
  onOpen: (filetype: "wkt" | "geojson", data: string) => void;
  dataStyles: GeoDataStyleSettings;
}

const GeoJSONVisualization: FC<Props> = ({ data, onOpen, dataStyles }) => {
  const dropZone = useRef<HTMLDivElement>(null);
  const [dragActive, updateDrag] = useState(false);

  const [center, setCenter] = useState([50.076689, 14.417775] as Point);
  const [zoom, setZoom] = useState(13);

  return (
    // wrapper around map that is used as drop zone for files
    <div
      id="wrapper"
      ref={!dragActive ? dropZone : null}
      onDrop={async (e) => {
        e.preventDefault();

        // disable drag overlay
        updateDrag(false);

        const file = e.dataTransfer.files.item(0);

        if (!file) return;

        // get file extension
        const extension = file.name.split(".").at(-1);

        // load data if extension is valid
        if (extension === "wkt") {
          onOpen("wkt", await file.text());
        } else if (extension === "geojson" || extension === "json") {
          onOpen("geojson", await file.text());
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== dropZone.current) {
          updateDrag(true);
        }
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target === dropZone.current) {
          updateDrag(false);
        }
      }}
    >
      {dragActive && (
        <div id="drag-overlay" ref={dragActive ? dropZone : null}>
          Drop .geojson or .wkt file
        </div>
      )}
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        provider={stamenTerrain}
        minZoom={3}
        metaWheelZoom={true}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        <ZoomControl style={{ top: "90%", zIndex: 1 }} />
        <GeoJson
          data={data}
          // apply user selected style
          styleCallback={(_: unknown, hover: boolean) => {
            if (dataStyles.toggle.useHoverStyle) {
              return hover ? dataStyles.hoverStyle : dataStyles.style;
            }
            return dataStyles.style;
          }}
        />
      </Map>
    </div>
  );
};

export default GeoJSONVisualization;
