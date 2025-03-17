import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase'; // Your Supabase client initialization
import type { Island } from './types';

export const islandKeys = {
    all: ['islands'] as const,
    lists: () => [...islandKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...islandKeys.lists(), { filters }] as const,
    details: () => [...islandKeys.all, 'detail'] as const,
    detail: (id: string) => [...islandKeys.details(), id] as const,
};

export function useIslands(filters?: Record<string, unknown>) {
    console.log("filters", filters);
    return useQuery({
        queryKey: islandKeys.list(filters ?? {}),
        queryFn: async () => {
            const { data, error } = await supabase.from('islands').select('*');
            console.log("data", data);

            if (error) throw error;
            return data;
        }
    });
}