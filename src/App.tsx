import './App.css'

import { useState } from 'react'

import { parse as parseWKT } from 'wkt'

import { GeoJSON, Geometry } from 'geojson'

import { Header, Footer, GeoJSONVisualization, TabMenu, Sidepanel } from './components'


function App() {
  const [geoData, setGeoData] = useState<GeoJSON>({
    type: "FeatureCollection",
    features: []
  })

  const [sidepanelOption, setSidepanelOption] = useState('none' as 'none' | 'edit' | 'style')

  const updateGeoData = (type: 'wkt' | 'geojson', data: string) => {
    if (type === 'wkt') {
      let parsedData = parseWKT(data)
      if (parsedData.type === 'GeometryCollection') {
        parsedData = {
          type: "FeatureCollection",
          features: parsedData.geometries.map(g => ({ type: "Feature", geometry: g, properties: {} }))
        }
      }
      else if (parsedData.type !== 'FeatureCollection') {
        parsedData = {
          type: "FeatureCollection",
          features: [
            { type: "Feature", geometry: parsedData as Geometry, properties: {} }
          ]
        }
      }
      setGeoData(parsedData)
    }
    else {
      setGeoData(JSON.parse(data))
    }
  }

  const sidepanelVisible = sidepanelOption !== 'none'

  return (
    <>
      <Header />
      <main id='main-content'>
        <section id='visualization'>
          <TabMenu
            onOpen={(type, data) => updateGeoData(type, data)}
            onSave={() => {
              const a = document.createElement("a")
              const file = new Blob([JSON.stringify(geoData)])
              a.href = URL.createObjectURL(file)
              a.download = 'data.geojson'
              a.click()
            }}
            onEdit={() => setSidepanelOption('edit')}
            onStyle={() => setSidepanelOption('style')}
          />
          <GeoJSONVisualization data={geoData} onOpen={(type, data) => updateGeoData(type, data)} />
        </section>
        <section id='sidepanel'
          style={{
            width: !sidepanelVisible ? 0 : '',
            visibility: sidepanelVisible ? 'visible' : 'hidden',
            transition: 'width 0.5s'
          }}
        >
          <button onClick={() => setSidepanelOption('none')} style={{ display: sidepanelVisible ? '' : 'none' }}>Close</button>
          <Sidepanel option={sidepanelOption} />
        </section>
      </main >
      <Footer />
    </>
  )
}

export default App
