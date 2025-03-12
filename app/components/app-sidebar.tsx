import { Map, Layers, Info, Menu, MapPin, Search, Square, Users, Compass } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
} from "@/components/ui/sidebar"
import { islands } from "@/data/islands"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface AppSidebarProps {
    onIslandSelect?: (coordinates: [number, number], zoom?: number) => void
}

export function AppSidebar({ onIslandSelect }: AppSidebarProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Filter islands based on search query
    const filteredIslands = islands.filter(island =>
        searchQuery === "" ||
        island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        island.nameJp.includes(searchQuery) ||
        island.group.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Group filtered islands by their group property
    const groupedIslands = filteredIslands.reduce((acc, island) => {
        if (!acc[island.group]) {
            acc[island.group] = []
        }
        acc[island.group].push(island)
        return acc
    }, {} as Record<string, typeof islands>)

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`
        }
        return num.toString()
    }

    return (
        <Sidebar>
            <SidebarHeader className="gap-2 border-b border-border p-3">
                <div className="flex flex-col">
                    <h2 className="text-base font-semibold">Shima Guni</h2>
                    <p className="text-xs text-muted-foreground">Japanese Islands Explorer</p>
                </div>
                <SidebarInput
                    placeholder="Search islands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8"
                />
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea className="h-[calc(100vh-7rem)]">
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
                                        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Square className="h-3 w-3" />
                                                <span>{island.area}km²</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                <span>{formatNumber(island.population)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Compass className="h-3 w-3" />
                                                <span>{island.mainlandDistance}km</span>
                                            </div>
                                        </div>
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