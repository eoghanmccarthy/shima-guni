import type { FC } from 'react';

interface MapCrosshairProps {
    isDragging: boolean;
}

export const MapCrosshair: FC<MapCrosshairProps> = ({ isDragging }) => {
    if (!isDragging) return null;

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-[1000]">
            <div className="relative w-20 h-20">
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/50" />
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/50" />
            </div>
        </div>
    );
}; 