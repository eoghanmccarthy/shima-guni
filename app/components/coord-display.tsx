interface CoordDisplayProps {
    coordinates: [number, number] | null;
}

export function CoordDisplay({ coordinates }: CoordDisplayProps) {
    if (!coordinates) return null;

    return (
        <div className="absolute top-4 right-4 bg-background/90 border rounded-md px-3 py-2 text-xs shadow-md z-[1000] w-[180px]">
            <div className="flex flex-col gap-0.5">
                <div className="text-muted-foreground">Mouse Position</div>
                <div className="font-mono">
                    {coordinates[0].toFixed(4)}°, {coordinates[1].toFixed(4)}°
                </div>
            </div>
        </div>
    );
} 