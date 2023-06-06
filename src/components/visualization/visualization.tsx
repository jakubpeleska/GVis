import "./visualization.css";

import { FC, useRef, useState } from "react";
import { GeoJSON } from "geojson";

import { GeoJson, Map, Point, ZoomControl } from "pigeon-maps";
import { stamenTerrain } from "pigeon-maps/providers";

interface Props {
  data: GeoJSON;
  onOpen: (filetype: "wkt" | "geojson", data: string) => void;
  visualization: {
    style: { fill: string; stroke: string; strokeWidth: number };
    hoverStyle: { fill: string; stroke: string; strokeWidth: number };
    useHoverStyle: boolean;
  };
}

const GeoJSONVisualization: FC<Props> = ({ data, onOpen, visualization }) => {
  const dropZone = useRef<HTMLDivElement>(null);
  const [dragActive, updateDrag] = useState(false);

  const [center, setCenter] = useState([50.076689, 14.417775] as Point);
  const [zoom, setZoom] = useState(13);

  return (
    <div
      id="wrapper"
      ref={!dragActive ? dropZone : null}
      onDrop={async (e) => {
        e.preventDefault();

        updateDrag(false);

        const file = e.dataTransfer.files.item(0);

        if (!file) return;

        const extension = file.name.split(".").at(-1);

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
          styleCallback={(_: unknown, hover: boolean) => {
            if (visualization.useHoverStyle) {
              return hover ? visualization.hoverStyle : visualization.style;
            }
            return visualization.style;
          }}
        />
      </Map>
    </div>
  );
};

export default GeoJSONVisualization;
