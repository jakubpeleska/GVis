import './visualization.css'

import { FC, useState } from 'react'
import { GeoJSON } from 'geojson';

import { GeoJson, Map, Point, ZoomControl } from 'pigeon-maps';
import { stamenTerrain } from 'pigeon-maps/providers'

interface Props {
  data: GeoJSON,
  onOpen: (filetype: 'wkt' | 'geojson', data: string) => void
}

const GeoJSONVisualization: FC<Props> = ({ data, onOpen }) => {

  const [dragActive, updateDrag] = useState(false)

  const [center, setCenter] = useState([50.076689, 14.417775] as Point)
  const [zoom, setZoom] = useState(13)

  return (
    <div
      id='wrapper'
      onDrop={async e => {
        e.preventDefault()

        updateDrag(false)

        const file = e.dataTransfer.files.item(0)

        if (!file) return

        const extension = file.name.split('.').at(-1)

        if (extension === 'wkt') {
          onOpen('wkt', await file.text())
        }
        else if (extension === 'geojson' || extension === 'json') {
          onOpen('geojson', await file.text())
        }
      }}
      onDragOver={e => e.preventDefault()}
      onDragEnter={() => updateDrag(true)}
      onDragLeave={() => updateDrag(false)}
    >
      {dragActive && <div id='drag-overlay'>
        Drop .geojson or .wkt file
      </div>}
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        provider={stamenTerrain}
        minZoom={3}
        metaWheelZoom={true}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center)
          setZoom(zoom)
        }}
      >
        <ZoomControl style={{ top: '90%', zIndex: 100 }} />
        <GeoJson
          data={data}
          styleCallback={(_feature: unknown, hover: boolean) =>
            hover
              ? { fill: '#93c0d099', strokeWidth: '2' }
              : { fill: '#d4e6ec99', strokeWidth: '1' }
          }
        />
      </Map>
    </div>
  );
};

export default GeoJSONVisualization;