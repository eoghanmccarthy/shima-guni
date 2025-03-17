import { useCallback, useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { Route } from "./+types/home";

import type { Island } from "@/api/types"

import { useIslands } from "@/api/queries"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CoordDisplay } from "@/components/coord-display";
import { MapCrosshair } from '@/components/map-crosshair';

function MapInteractionHandler({
    onCoordChange,
    targetLocation
}: {
    onCoordChange: (coords: [number, number] | null) => void;
    targetLocation?: { coordinates: [number, number]; zoom?: number; }
}) {
    const map = useMap();
    const [lastCoords, setLastCoords] = useState<[number, number] | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useMapEvents({
        mousemove: (e) => {
            const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
            setLastCoords(coords);
            onCoordChange(coords);
        },
        mouseout: () => {
            setLastCoords(null);
            onCoordChange(null);
        },
        dragstart: () => setIsDragging(true),
        dragend: () => setIsDragging(false)
    });

    // Handle map navigation when targetLocation changes
    useEffect(() => {
        if (targetLocation) {
            map.flyTo(targetLocation.coordinates, targetLocation.zoom || 12, {
                duration: 1,
                easeLinearity: 0.5
            });
        }
    }, [map, targetLocation]);

    // Add keyboard shortcut for copying coordinates
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'c' && lastCoords) {
                const coordString = `${lastCoords[0].toFixed(4)},${lastCoords[1].toFixed(4)}`;
                navigator.clipboard.writeText(coordString).then(() => {
                    console.log('Coordinates copied:', coordString);
                });
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [lastCoords]);

    return <MapCrosshair isDragging={isDragging} />;
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
    const [mouseCoords, setMouseCoords] = useState<[number, number] | null>(null);

    const { data: islands, isLoading, error } = useIslands();
    console.log("islands", islands);

    const handleIslandSelect = useCallback((island: Island) => {
        setSelectedLocation({ coordinates: island.coordinates, zoom: island.zoom || INITIAL_ZOOM });
    }, []);

    return (
        <SidebarProvider style={{
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties}>
            <div className="w-screen h-screen flex">
                <AppSidebar onSelect={handleIslandSelect} />
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
                        <MapInteractionHandler
                            onCoordChange={setMouseCoords}
                            targetLocation={selectedLocation || undefined}
                        />
                    </MapContainer>
                    <CoordDisplay coordinates={mouseCoords} />
                </main>
            </div>
        </SidebarProvider>
    );
}