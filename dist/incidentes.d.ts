import type { Incidente, CrearIncidenteDTO, EstadoIncidente } from './types.js';
export declare function reportarIncidente(datos: CrearIncidenteDTO): Incidente;
export declare function cambiarEstadoIncidente(idIncidente: string, nuevoEstado: EstadoIncidente): void;
/**

 * @param anio
 * @param mes
 */
export declare function obtenerReporteMensual(mes: number, anio: number): Incidente[];
export declare function obtenerReporteDiario(): Incidente[];
export declare function obtenerTodosLosIncidentes(): Incidente[];
//# sourceMappingURL=incidentes.d.ts.map