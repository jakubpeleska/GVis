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

function App() {
  const [geoData, setGeoData] = useState<GeoJSON>({
    type: "FeatureCollection",
    features: [],
  });
  const [visualization, _setVisualization] = useState({
    style: { fill: "#93c0d099", strokeWidth: 2, stroke: "white" },
    hoverStyle: { fill: "#d4e6ec99", strokeWidth: 1, stroke: "white" },
    useHoverStyle: true,
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
            visualization={visualization}
            onOpen={(type, data) => updateGeoData(type, data)}
          />
        </section>
        <section id="sidepanel">
          <Sidepanel
            option={sidepanelOption}
            onClose={() => setSidepanelOption("none")}
            geoData={geoData}
            saveEditedData={(editedData) => setGeoData(JSON.parse(editedData))}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
