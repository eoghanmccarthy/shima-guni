export interface Island {
    id: string;
    name: string;
    native_name: string;
    latitude: number;
    longitude: number;
    group: string;
    description: string;
    zoom: number;
    area: number;
    population: number;
    mainland_distance: number;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    page: number;
    totalPages: number;
    totalItems: number;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
} 