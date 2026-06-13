export type Prioridad = 'baja' | 'media' | 'alta';
export type EstadoIncidente = 'abierto' | 'en progreso' | 'resuelto';
export interface Incidente {
    readonly id: string;
    titulo: string;
    descripcion: string;
    reportadoPor: string;
    prioridad: Prioridad;
    estado: EstadoIncidente;
    fechaCreacion: Date;
}
export type CrearIncidenteDTO = Omit<Incidente, 'id' | 'estado' | 'fechaCreacion'>;
//# sourceMappingURL=types.d.ts.map