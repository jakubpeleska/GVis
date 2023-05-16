import './App.css'

import { useState } from 'react'

import { Header, Footer, GeoJSONVisualization, TabMenu } from './components'
import GeoDataInput from './components/geo-data-input'


function App() {

  const [geoData, setGeoData] = useState<string | undefined>(undefined)

  return (
    <>
      <Header />
      <main>
        <div id='content'>
          <div id='visualization'>
            <TabMenu onOpen={(type) => alert(type)} />
            <GeoJSONVisualization data={geoData} />
          </div>
        </div>
      </main>
      <GeoDataInput setGeoData={setGeoData} />
      <Footer />
    </>
  )
}

export default App
