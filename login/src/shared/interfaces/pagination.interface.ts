export interface Pagination {
    offset: string;
    limit: string;
}

export interface MongoPaginationFilters {
    skip: number;
    limit: number;
}

export interface PaginationResponse {
    data: any;
}