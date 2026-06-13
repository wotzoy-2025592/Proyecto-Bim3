import * as readline from 'readline';
import { reportarIncidente,cambiarEstadoIncidente, obtenerReporteDiario,obtenerReporteMensual,obtenerTodosLosIncidentes
} from './incidentes.js';
import type { Prioridad, EstadoIncidente } from './types.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (pregunta: string): Promise<string> => {
    return new Promise((resolve) => rl.question(pregunta, resolve));
};


async function menuPrincipal() {
    console.log("\n|WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW|");
    console.log("|         SISTEMA DE CONTROL DE INCIDENTES - LABORATORIO C27              |");
    console.log("|/////////////////////////////////////////////////////////////////////////|");
    console.log("|    1. Reportar un nuevo problema tecnológico                            |");
    console.log("|    2. Cambiar estado de un incidente (Abierto/En progreso/Resuelto)     |");
    console.log("|    3. Ver reporte diario actual (Tabla)                                 |");
    console.log("|    4. Ver reporte mensual actual (Tabla)                                |");
    console.log("|    5. Ver todos los incidentes.                                         |")
    console.log("|    6. Salir.                                                            |");
    console.log("|/////////////////////////////////////////////////////////////////////////|");
    console.log("")

    const opcion = await preguntar("Selecciona una opción (1-6): ");

    switch (opcion.trim()) {
        case '1':
            console.log("\n--- REGISTRAR NUEVO INCIDENTE ---");
            const titulo = await preguntar("Título del problema (ej. PC-02 no enciende): ");
            const descripcion = await preguntar("Descripción de la falla: ");
            const reportadoPor = await preguntar("¿Quién lo reporta? (Tu nombre o Maestro): ");
            
            console.log("Prioridades válidas: baja | media | alta");
            let prioridad = await preguntar("Prioridad: ") as Prioridad;
            
            if (prioridad !== 'baja' && prioridad !== 'media' && prioridad !== 'alta') {
                console.log("[ERROR] Prioridad no válida. Se asignará 'baja' por defecto.");
                prioridad = 'baja';
            }
            reportarIncidente({ titulo, descripcion, reportadoPor, prioridad });
            
            await preguntar("\nPresiona ENTER para continuar...");
            break;

        case '2':
            if (obtenerTodosLosIncidentes().length === 0) {
                console.log("\n[ERROR] No existen incidentes registrados.");
                break;
            }

            console.log("\n--- CAMBIAR ESTADO DE UN INCIDENTE ---");
            const idBusqueda = await preguntar("Introduce el ID del incidente (ej. inc_xxxx): ");
            
            console.log("Estados válidas: abierto | en progreso | resuelto");
            const nuevoEstado = await preguntar("Nuevo estado: ") as EstadoIncidente;

            if (nuevoEstado !== 'abierto' && nuevoEstado !== 'en progreso' && nuevoEstado !== 'resuelto') {
                console.log("[ERROR] Estado no escrito correctamente.");
            } else {
                cambiarEstadoIncidente(idBusqueda, nuevoEstado);
            }

            await preguntar("\nPresiona ENTER para continuar...");
            break;

        case '3':
            console.log("\n--- REPORTE DIARIO ---");

            const diario = obtenerReporteDiario();

            if (diario.length === 0) {
                console.log("No existen incidentes hoy.");
            } else {
                console.table(diario);
            }

            await preguntar("\nPresiona ENTER para continuar...");
            break;

        case '4':
            const mesActual = new Date().getMonth();
            const anioActual = new Date().getFullYear();
            console.log(`\n--- REPORTE DEL MES ACTUAL (Mes: ${mesActual + 1} / Año: ${anioActual}) ---`);
            
            const reporte = obtenerReporteMensual(mesActual, anioActual);
            if (reporte.length === 0) {
                console.log("No hay incidentes reportados en este mes.");
            } else {
                console.table(reporte);
            }

            await preguntar("\nPresiona ENTER para continuar...");
            break;
            
        case '5':
            console.log("\n--- TODOS LOS INCIDENTES EN LA BASE DE DATO MOCK ---");
            const todos = obtenerTodosLosIncidentes();
            if (todos.length === 0) {
                console.log("La base de datos está vacía.");
            } else {
                console.table(todos);
            }

            await preguntar("\nPresiona ENTER para continuar...");
            break;

        case '6':
            console.log("\n¡Gracias por usar el sistema del C27! Saliendo...");
            rl.close();
            return; 

        default:
            console.log("[ERROR] Opción inválida, intenta de nuevo.");
            break;
    }

    menuPrincipal();
}

menuPrincipal();