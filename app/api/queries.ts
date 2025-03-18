import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase'; // Your Supabase client initialization
import type { Island } from './types';

export const islandKeys = {
    all: ['islands'] as const,
    lists: () => [...islandKeys.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...islandKeys.lists(), { filters }] as const,
};

export const getIslandsQueryOptions = (filters?: Record<string, unknown>, options = {}) => queryOptions({
    queryKey: islandKeys.list(filters ?? {}),
    queryFn: async () => {
        let query = supabase
            .from('islands')
            .select(`
                    *,
                    island_groups(id, name)
                `);

        // Apply search filter if provided
        if (filters?.searchTerm && typeof filters.searchTerm === 'string') {
            query = query.ilike('name', `%${filters.searchTerm}%`);
        }

        const { data, error } = await query;


        if (error) throw error;

        return data.map(island => ({
            ...island,
            group: island.island_groups?.name,
            island_groups: undefined  // Remove original nested object
        }));
    },
    ...options
});
