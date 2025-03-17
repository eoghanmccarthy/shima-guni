import { parse } from 'csv-parse/browser/esm/sync';

import type { Island } from '../api/types';

// Import CSV as URL
const csvUrl = new URL('./islands.csv', import.meta.url).href;

// Function to load and parse islands data
async function loadIslands(): Promise<Island[]> {
    const response = await fetch(csvUrl);
    const csvData = await response.text();

    const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        cast: true
    });

    return records.map((record: any, index: number) => ({
        id: index,
        name: record.name,
        nameJp: record.native_name,
        coordinates: [Number(record.latitude), Number(record.longitude)],
        group: record.group,
        description: record.description,
        zoom: record.zoom ? Number(record.zoom) : undefined,
        area: Number(record.area),
        population: Number(record.population),
        mainlandDistance: Number(record.mainland_distance)
    }));
}

// Export the promise that resolves to the islands data
export const islandsPromise = loadIslands(); 