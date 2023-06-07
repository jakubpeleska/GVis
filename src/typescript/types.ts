export interface GeoDataStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface GeoDataStyleSettings {
  style: GeoDataStyle;
  hoverStyle: GeoDataStyle;
  toggle: { useHoverStyle: boolean };
}
