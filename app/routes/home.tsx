import type { Route } from "./+types/home";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useCallback, useState } from "react";

// MapController component to handle map operations
function MapController({
    coordinates,
    zoom
}: {
    coordinates?: [number, number];
    zoom?: number;
}) {
    const map = useMap();

    if (coordinates && zoom) {
        map.flyTo(coordinates, zoom, {
            duration: 1,
            easeLinearity: 0.5
        });
    }

    return null;
}

export function clientLoader() {
    return { name: "Shima Guni" };
}

// Japan's center coordinates (approximately)
const JAPAN_CENTER: [number, number] = [36.2048, 138.2529];
const INITIAL_ZOOM = 5;

export default function Home({ loaderData }: Route.ComponentProps) {
    const [selectedLocation, setSelectedLocation] = useState<{
        coordinates: [number, number];
        zoom?: number;
    } | null>(null);

    const handleIslandSelect = useCallback((coordinates: [number, number], zoom?: number) => {
        setSelectedLocation({ coordinates, zoom: zoom || INITIAL_ZOOM });
    }, []);

    return (
        <SidebarProvider style={{
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties}>
            <div className="w-screen h-screen flex">
                <AppSidebar onIslandSelect={handleIslandSelect} />
                <main className="flex-1 relative">
                    <div className="absolute top-4 left-4 z-[1000]">
                        <SidebarTrigger />
                    </div>
                    <MapContainer
                        center={JAPAN_CENTER}
                        zoom={INITIAL_ZOOM}
                        className="w-full h-full"
                        zoomControl={false}
                        attributionControl={true}
                    >
                        <ZoomControl position="bottomright" />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {selectedLocation && (
                            <MapController
                                coordinates={selectedLocation.coordinates}
                                zoom={selectedLocation.zoom}
                            />
                        )}
                    </MapContainer>
                </main>
            </div>
        </SidebarProvider>
    );
}