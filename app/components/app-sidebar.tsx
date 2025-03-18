import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Map, Layers, Info, Menu, MapPin, Search, Square, Users, Compass, Star } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { Island } from "@/api/types"
// TODO: Remove this once the query is implemented
import { islandsPromise } from "@/data/islands"

import { getIslandsQueryOptions } from "@/api/queries"


interface AppSidebarProps {
    onSelect?: (island: Island) => void;
}

export function AppSidebar({ onSelect }: AppSidebarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: islands } = useQuery({
        ...getIslandsQueryOptions({ searchTerm }, {
            placeholderData: (previousData: Island[]) => previousData ?? [],
        }),
    });

    // TODO: Remove this once the query is implemented
    // const [islands, setIslands] = useState<Island[]>([]);
    // Load islands data
    // useEffect(() => {
    //     islandsPromise.then(data => setIslands(data));
    // }, []);
    // const filteredIslands = islands.filter(island =>
    //     searchTerm === "" ||
    //     island.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     island.native_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     island.group.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // Group filtered islands by their group property
    const groupedIslands = islands.reduce((acc, island) => {
        if (!acc[island.group]) {
            acc[island.group] = []
        }
        acc[island.group].push(island)
        return acc
    }, {} as Record<string, Island[]>);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`
        }
        return num.toString()
    }

    return (
        <Sidebar className="bg-white">
            <SidebarHeader className="gap-2 border-b border-border p-4 bg-white">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900">Shima Guni</h2>
                    <p className="text-sm text-gray-600">Japanese Islands Explorer</p>
                </div>
                <SidebarInput
                    placeholder="Search islands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 bg-gray-50 hover:bg-white focus:bg-white transition-colors"
                />
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea className="h-[calc(100vh-7rem)]">
                    {Object.entries(groupedIslands).map(([group, groupIslands]) => (
                        <SidebarGroup key={group} className="px-0">
                            <SidebarGroupLabel className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50">
                                {group}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                {groupIslands.map((island) => (
                                    <button
                                        key={island.id}
                                        className={`w-full text-left flex flex-col gap-1.5 p-4 hover:bg-gray-50 cursor-pointer transition-all border-b border-gray-200`}
                                        onClick={() => onSelect?.(island)}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-medium text-gray-900 text-sm">{island.name}</span>
                                                <span className="text-sm text-gray-600">{island.native_name}</span>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-white text-xs font-medium
                                                ${island.mainland_distance <= 50 ? 'bg-emerald-500' :
                                                    island.mainland_distance <= 100 ? 'bg-blue-500' :
                                                        island.mainland_distance <= 200 ? 'bg-amber-500' :
                                                            'bg-rose-500'}`}
                                            >
                                                <MapPin className="h-3 w-3" />
                                                <span>{island.mainland_distance}km</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 pt-1 text-xs text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Square className="h-4 w-4" />
                                                <span>{island.area}km²</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4" />
                                                <span>{formatNumber(island.population)}</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    )
} 