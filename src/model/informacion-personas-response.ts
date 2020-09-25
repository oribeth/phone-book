export interface Comuna {
    id: number;
    nombre: string;
}

export interface Direccion {
    calle: string;
    numero: number;
    comuna: Comuna;
}

export interface InformacionPersonaResponse {
    id: number;
    nombre: string;
    apellido: string;
    telefono: any;
    rut: string;
    direccion: Direccion;
    activo: number;
}
