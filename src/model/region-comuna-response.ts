export interface Comuna {
    id: number;
    nombre: string;
}

export interface RegionComunaResponse {
    id: number;
    nombre: string;
    comunas: Comuna[];
}
