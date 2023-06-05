import { GeoJSON } from "geojson"

declare namespace wkt {
  function parse(wktString: string): GeoJSON
  function stringify(geoJSON: GeoJSON): string
}

export const parse = wkt.parse
export const stringify = wkt.stringify
