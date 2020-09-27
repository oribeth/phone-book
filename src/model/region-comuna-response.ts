export interface Comuna {
    id: number;
    nombre: string;
}

export interface RegionResponse {
    id: number;
    nombre: string;
    comunas: Comuna[];
}
