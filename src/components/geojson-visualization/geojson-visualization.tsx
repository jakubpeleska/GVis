import React, { FC } from 'react'

import { GeoJson, Map, Point } from 'pigeon-maps';
import { osm, stamenToner, stamenTerrain } from 'pigeon-maps/providers'

interface GeoJSONVisualizationProps {
  data?: string
}

const GeoJSONVisualization: FC<GeoJSONVisualizationProps> = ({ data }) => {

  const position: Point = [50.076689, 14.417775]

  const parsedData = data ? JSON.parse(data) : undefined

  return (
    <>
      <Map defaultCenter={position} defaultZoom={16} provider={stamenTerrain} minZoom={3} metaWheelZoom={true}>
        <GeoJson
          data={parsedData}
          styleCallback={(feature: unknown, hover: boolean) =>
            hover
              ? { fill: '#93c0d099', strokeWidth: '2' }
              : { fill: '#d4e6ec99', strokeWidth: '1' }
          }
        />
      </Map>
    </>
  );
};

export default GeoJSONVisualization;