import { Map, Layers, Info, Menu, MapPin } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { islands } from "@/data/islands"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AppSidebarProps {
    onIslandSelect?: (coordinates: [number, number], zoom?: number) => void
}

export function AppSidebar({ onIslandSelect }: AppSidebarProps) {
    // Group islands by their group property
    const groupedIslands = islands.reduce((acc, island) => {
        if (!acc[island.group]) {
            acc[island.group] = []
        }
        acc[island.group].push(island)
        return acc
    }, {} as Record<string, typeof islands>)

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-border p-3">
                <h2 className="text-base font-semibold">Shima Guni</h2>
                <p className="text-xs text-muted-foreground">Japanese Islands Explorer</p>
            </SidebarHeader>
            <SidebarContent className="no-scrollbar">
                <ScrollArea className="h-[calc(100vh-4rem)] no-scrollbar">
                    {Object.entries(groupedIslands).map(([group, groupIslands]) => (
                        <SidebarGroup key={group} className="px-0">
                            <SidebarGroupLabel className="px-4 py-1 text-xs font-medium text-muted-foreground">
                                {group}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                {groupIslands.map((island) => (
                                    <a
                                        key={island.id}
                                        className="flex flex-col gap-1 border-b p-3 text-sm leading-tight hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                        onClick={() => onIslandSelect?.(island.coordinates, island.zoom)}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium">{island.name}</span>
                                            <span className="text-xs text-muted-foreground">{island.nameJp}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {island.coordinates[0].toFixed(4)}°, {island.coordinates[1].toFixed(4)}°
                                        </span>
                                    </a>
                                ))}
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    )
} 