export interface Repository {
    filter?: any;
    filterFailMessage?: string | null;
    maxLength?: number;
    [key: string]: Repository | Function | null | undefined | string | number;
}