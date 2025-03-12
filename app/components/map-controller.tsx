import { useMap } from "react-leaflet"

interface MapControllerProps {
    coordinates: [number, number];
    zoom?: number;
}

export function MapController({ coordinates, zoom = 12 }: MapControllerProps) {
    const map = useMap();

    if (coordinates && zoom) {
        map.flyTo(coordinates, zoom, {
            duration: 1,
            easeLinearity: 0.5
        });
    }

    return null;
} 