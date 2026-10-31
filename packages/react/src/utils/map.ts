// Map utility functions: embed URLs for the supported providers.

export interface MapLocation {
  latitude: number;
  longitude: number;
  /** Tile zoom level (1-19). */
  zoom: number;
  marker: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Bounding box around the point at the given zoom, sized like a 16:9 tile of the map. At zoom
 * `z` one tile spans `360 / 2^z` degrees of longitude; latitude degrees shrink with the cosine.
 */
export function boundingBox({
  latitude,
  longitude,
  zoom,
}: Omit<MapLocation, "marker">): [number, number, number, number] {
  const z = clamp(Math.round(zoom), 1, 19);
  const lonSpan = 360 / 2 ** z;
  const latSpan = (lonSpan * 9) / 16 / Math.max(0.1, Math.cos((latitude * Math.PI) / 180));
  const round = (n: number) => Number(n.toFixed(6));
  return [
    round(clamp(longitude - lonSpan / 2, -180, 180)),
    round(clamp(latitude - latSpan / 2, -90, 90)),
    round(clamp(longitude + lonSpan / 2, -180, 180)),
    round(clamp(latitude + latSpan / 2, -90, 90)),
  ];
}

/** OpenStreetMap embed URL (`export/embed.html`) for the location. */
export function openStreetMapEmbedUrl(location: MapLocation): string {
  const [minLon, minLat, maxLon, maxLat] = boundingBox(location);
  const params = new URLSearchParams({
    bbox: `${minLon},${minLat},${maxLon},${maxLat}`,
    layer: "mapnik",
  });
  if (location.marker) params.set("marker", `${location.latitude},${location.longitude}`);
  return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
}

/** Link to the full OpenStreetMap page for the location. */
export function openStreetMapUrl({ latitude, longitude, zoom, marker }: MapLocation): string {
  const z = clamp(Math.round(zoom), 1, 19);
  const pin = marker ? `?mlat=${latitude}&mlon=${longitude}` : "";
  return `https://www.openstreetmap.org/${pin}#map=${z}/${latitude}/${longitude}`;
}
