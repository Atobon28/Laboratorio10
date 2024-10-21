class Tarea {
    constructor(nombre, estado = 'pendiente') {
        this.nombre = nombre;
        this.estado = estado;
    }
}

let tareas = [];

function renderizarTareas() {
    const pendientesList = document.getElementById('pendientes-list');
    const haciendoList = document.getElementById('haciendo-list');
    const completadaList = document.getElementById('completada-list');

    pendientesList.innerHTML = '';
    haciendoList.innerHTML = '';
    completadaList.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const tareaDiv = document.createElement('div');
        tareaDiv.className = 'task';
        tareaDiv.innerHTML = `
            <span>${tarea.nombre}</span>
            <div class="task-buttons">
                ${tarea.estado === 'pendiente' ? `<button class="arrow-btn" onclick="cambiarEstado(${index}, 'haciendo')">→</button>` : ''}
                ${tarea.estado === 'haciendo' ? `<button class="arrow-btn" onclick="cambiarEstado(${index}, 'completada')">→</button>` : ''}
                ${tarea.estado === 'haciendo' ? `<button class="arrow-btn" onclick="cambiarEstado(${index}, 'pendiente')">←</button>` : ''}
                <button class="delete-btn" onclick="eliminarTarea(${index})">X</button>
            </div>
        `;

        if (tarea.estado === 'pendiente') {
            pendientesList.appendChild(tareaDiv);
        } else if (tarea.estado === 'haciendo') {
            haciendoList.appendChild(tareaDiv);
        } else if (tarea.estado === 'completada') {
            completadaList.appendChild(tareaDiv);
        }
    });
}

function agregarTarea() {
    const taskInput = document.getElementById('new-task');
    const nombreTarea = taskInput.value.trim();

    if (nombreTarea) {
        const nuevaTarea = new Tarea(nombreTarea);
        tareas.push(nuevaTarea);
        taskInput.value = '';
        renderizarTareas();
    }
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    renderizarTareas();
}

function cambiarEstado(index, nuevoEstado) {
    if (tareas[index].estado !== 'completada') {
        tareas[index].estado = nuevoEstado;
        renderizarTareas();
    }
}

function limpiarCompletada() {
    tareas = tareas.filter(tarea => tarea.estado !== 'completada');
    renderizarTareas();
}

document.addEventListener('DOMContentLoaded', renderizarTareas);
