import React, { FC } from 'react'

import { Map, Marker, Point } from 'pigeon-maps';


const DataVisualization: FC = () => {

  const position: Point = [50.076689, 14.417775]

  return (
    <>
      <Map height={500} defaultCenter={position} defaultZoom={15}>
        <Marker width={50} anchor={position} />
      </Map>
    </>
  );
};

export default DataVisualization;