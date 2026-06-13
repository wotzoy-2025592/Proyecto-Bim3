const listarIncidentes = [];
export function reportarIncidente(datos) {
    const nuevoIncidente = {
        id: "inc_" + Math.random().toString(36).substring(2, 10),
        ...datos,
        estado: 'abierto',
        fechaCreacion: new Date()
    };
    listarIncidentes.push(nuevoIncidente);
    console.log(`[ÉXITO] Ticket registrado: "${nuevoIncidente.titulo}" asignado automáticamente como ABIERTO.`);
    return nuevoIncidente;
}
export function cambiarEstadoIncidente(idIncidente, nuevoEstado) {
    const incidenteEncontrado = listarIncidentes.find(inc => inc.id === idIncidente);
    if (incidenteEncontrado) {
        incidenteEncontrado.estado = nuevoEstado;
        console.log(`[ÉXITO] El incidente con ID ${idIncidente} cambió su estado a: ${nuevoEstado}.`);
    }
    else {
        console.log(`[ERROR] No se encontró ningún incidente con el ID: ${idIncidente}.`);
    }
}
/**

 * @param anio
 * @param mes
 */
export function obtenerReporteMensual(mes, anio) {
    // Usamos .filter() para evaluar las fechas de creación de cada registro
    return listarIncidentes.filter(incidente => {
        const coincidenciaMes = incidente.fechaCreacion.getMonth() === mes;
        const coincidenciaAnio = incidente.fechaCreacion.getFullYear() === anio;
        return coincidenciaMes && coincidenciaAnio;
    });
}
export function obtenerReporteDiario() {
    const hoy = new Date();
    return listarIncidentes.filter(incidente => incidente.fechaCreacion.getDate() === hoy.getDate() &&
        incidente.fechaCreacion.getMonth() === hoy.getMonth() &&
        incidente.fechaCreacion.getFullYear() === hoy.getFullYear());
}
export function obtenerTodosLosIncidentes() {
    return [...listarIncidentes];
}
//# sourceMappingURL=incidentes.js.map