import './App.css'
import FileInput from './components/file-input'
import DataVisualization from './components/map'

function App() {
  const topic = `Vizualizátor GeoJSON - GVis
    Bude se jednat o sigle page aplikaci, která bude zprostředkovávat vizualizaci souborů ve formátu GeoJSON.
    Stránka bude mít dvě hlavní části - mapu s vizualizací a sidebar s různými akcemi.
    Nahrávaní GeoJSON souborů bude možné přímo z lokálního zařízení nebo pomocí URL.
    Soubory bude možné editovat, specifikovat jejich projekci a upravovat parametry vizualizace. `


  return (
    <>
      <h1>Topic</h1>
      <p>{topic}</p>
      <FileInput />
      <DataVisualization />
    </>
  )
}

export default App
