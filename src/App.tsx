import { useState } from "react";

import { parse as parseWKT } from "wkt";
import { GeoJSON, Geometry } from "geojson";

import {
  Header,
  Footer,
  GeoJSONVisualization,
  TabMenu,
  Sidepanel,
} from "./components";

import "./App.css";
import { GeoDataStyleSettings } from "types";

function App() {
  const [geoData, setGeoData] = useState<GeoJSON>({
    type: "FeatureCollection",
    features: [],
  });
  const [dataStyles, setDataStyles] = useState<GeoDataStyleSettings>({
    style: { fill: "#93c0d099", strokeWidth: 2, stroke: "white" },
    hoverStyle: { fill: "#d4e6ec99", strokeWidth: 1, stroke: "white" },
    toggle: { useHoverStyle: true },
  });

  const [sidepanelOption, setSidepanelOption] = useState(
    "none" as "none" | "edit" | "style"
  );

  const updateGeoData = (type: "wkt" | "geojson", data: string) => {
    let parsedData: GeoJSON;
    if (type === "wkt") {
      parsedData = parseWKT(data);
      if (parsedData.type === "GeometryCollection") {
        parsedData = {
          type: "FeatureCollection",
          features: parsedData.geometries.map((g) => ({
            type: "Feature",
            geometry: g,
            properties: {},
          })),
        };
      } else if (parsedData.type !== "FeatureCollection") {
        parsedData = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: parsedData as Geometry,
              properties: {},
            },
          ],
        };
      }
    } else {
      parsedData = JSON.parse(data);
    }
    if (!parsedData) return;

    setGeoData(parsedData);
  };

  const saveGeoData = () => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(geoData)]);
    a.href = URL.createObjectURL(file);
    a.download = "data.geojson";
    a.click();
  };

  const saveDataStyles = <K extends keyof GeoDataStyleSettings>(
    key: K,
    value: Partial<GeoDataStyleSettings[K]>
  ) => {
    setDataStyles({
      ...dataStyles,
      [key]: {
        ...dataStyles[key],
        ...value,
      },
    });
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <menu id="tab-menu">
          <TabMenu
            onOpen={updateGeoData}
            onSave={saveGeoData}
            onEdit={() => setSidepanelOption("edit")}
            onStyle={() => setSidepanelOption("style")}
          />
        </menu>
        <section id="visualization">
          <GeoJSONVisualization
            data={geoData}
            dataStyles={dataStyles}
            onOpen={updateGeoData}
          />
        </section>
        <section id="sidepanel">
          <Sidepanel
            option={sidepanelOption}
            onClose={() => setSidepanelOption("none")}
            data={geoData}
            dataStyles={dataStyles}
            saveEditedData={(editedData) => setGeoData(JSON.parse(editedData))}
            saveDataStyles={saveDataStyles}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
