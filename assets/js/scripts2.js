const table = new Tabulator("#items-table", {
    height: "400px",
    layout: "fitColumns", // Ajuste automático del ancho de columnas
    responsiveLayout: "collapse", // Colapsa columnas en pantalla pequeña
    columns: [
        { title: "#", field: "id", width: 10, hozAlign: "center" },
        { title: "Nombre", field: "nombre" },
        { title: "Código Único", field: "codigoUnico" },
        { title: "Categoría", field: "categoria" },
        { title: "Tipo", field: "tipo" }, // Agregado: Tipo de ítem
        { title: "Precio Base", field: "precioBase", formatter: "money", hozAlign: "right" },
        { title: "Precio Venta", field: "precioVenta", formatter: "money", hozAlign: "right" },
        { title: "IVA (%)", field: "iva", hozAlign: "center" },
        { title: "Unidad de Medida", field: "unidadMedida" },
        { title: "Descripción", field: "descripcion", width: 250, formatter: "textarea" },
        {
            title: "Acciones",
            field: "acciones",
            hozAlign: "center",
            formatter: function (cell, formatterParams) {
                const item = cell.getData(); // Obtener datos del ítem

                return `
                    <button class="btn btn-primary btn-sm" data-bs-toggle="modal" 
                            data-item='${JSON.stringify(item)}'>
                        <i class="bi bi-eye mirar-icon mx-1"></i>
                    </button>
                    <button class="btn btn-success btn-sm editar-icon" 
                            data-item='${JSON.stringify(item)}'>
                        <i class="bi bi-pencil-square editar-icon mx-1"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" data-bs-toggle="modal" 
                            data-bs-target="#eliminarItemModal" 
                            data-item='${JSON.stringify(item)}'>
                        <i class="bi bi-trash borrar-icon mx-1"></i>
                    </button>`;
            }
        },
    ]
});

// Cargar datos usando AJAX con jQuery
$.ajax({
    url: './JSON/items.json', // Ruta del archivo JSON
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        table.setData(data); // Cargar los datos en la tabla
        updateTotals(data); // Actualizar los totales al cargar los datos
    },
    error: function (xhr, status, error) {
        console.error('Error al cargar los datos:', error);
    }
});

// Función para actualizar los totales
function updateTotals(data) {
    const totalItems = data.length;
    const totalProductos = data.filter(item => item.tipo === "Producto").length;
    const totalServicios = data.filter(item => item.tipo === "Servicio").length;
    const totalCombos = data.filter(item => item.tipo === "Combo").length;

    document.getElementById("totalItems").innerText = totalItems;
    document.getElementById("totalProductos").innerText = totalProductos;
    document.getElementById("totalServicios").innerText = totalServicios;
    document.getElementById("totalCombos").innerText = totalCombos;
}

// Filtrar por tipo de ítem usando el selector
$("#tipoItemFilter").on("change", function () {
    const filtro = $(this).val();

    if (filtro) {
        table.setFilter("tipo", "=", filtro); // Aplicar filtro por tipo
    } else {
        table.clearFilter(); // Limpiar el filtro
    }
    updateVisibleTotals(); // Actualizar los totales visibles después del filtrado
});

// Filtrado utilizando un solo input
document.getElementById("filterInput").addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase();
    table.setFilter([
        [
            { field: "nombre", type: "like", value },
            { field: "categoria", type: "like", value },
            { field: "codigoUnico", type: "like", value },
        ],
    ]);
    updateVisibleTotals(); // Actualizar los totales visibles después del filtrado
});

// Función para actualizar los totales visibles
function updateVisibleTotals() {
    const data = table.getData(); // Obtener los datos visibles en la tabla
    const totalItems = data.length;
    const totalProductos = data.filter(item => item.tipo === "Producto").length;
    const totalServicios = data.filter(item => item.tipo === "Servicio").length;
    const totalCombos = data.filter(item => item.tipo === "Combo").length;

    document.getElementById("totalItems").innerText = totalItems;
    document.getElementById("totalProductos").innerText = totalProductos;
    document.getElementById("totalServicios").innerText = totalServicios;
    document.getElementById("totalCombos").innerText = totalCombos;
}
function abrirModalEdicion(item) {
    if (item.tipo === 'Producto') {
        $('#editarProductoModal').modal('show');
        $('#editNombreProducto').val(item.nombre);
        $('#editCodigoUnicoProducto').val(item.codigoUnico);
        $('#editCodigoGtin').val(item.codigoGtin || '');
        $('#editCategoriaProducto').val(item.categoria);
        $('#editPrecioBase').val(item.precioBase);
        $('#editImpuestos').val(item.impuestos);
        $('#editPrecioVenta').val(item.precioVenta);
        $('#editUnidadMedida').val(item.unidadMedida);
        $('#editDescripcionProducto').val(item.descripcion);
        $('#editCantidadInicial').val(item.cantidadInicial || 0);
        $('#editCodigoUNSPSC').val(item.codigoUNSPSC || '');
    }
    if (item.tipo === 'Servicio') {
        $('#editarServicioModal').modal('show');
        $('#editNombreServicio').val(item.nombre);
        $('#editCodigoUnicoServicio').val(item.codigoUnico);
        $('#editCodigoUNSPSCServicio').val(item.codigoUNSPSC || '');
        $('#editCategoriaServicio').val(item.categoria);
        $('#editPrecioBaseServicio').val(item.precioBase);
        $('#editImpuestosAplicablesServicio').val(item.impuestos);
        $('#editPrecioVentaServicio').val(item.precioVenta);
        $('#editDescripcionServicio').val(item.descripcion);
        $('#editCodigoGtinServicios').val(item.codigoGtin);
    }
    if (item.tipo === 'Combo') {
        $('#editarComboModal').modal('show');
        $('#editNombreCombo').val(item.nombre || '');
        $('#editCodigoUnicoCombo').val(item.codigoUnico || '');
        $('#editPrecioBaseCombo').val(item.precioBase || 0);
        $('#editCategoriaCombo').val(item.categoria || '');
        $('#editPrecioVentaCombo').val(item.precioVenta || 0);
        $('#editImpuestosAplicablesCombo').val(item.impuestos || '');
        $('#editDescripcionCombo').val(item.descripcion || '');

        // Limpiar la lista de ítems del combo
        $('#editListaItemsCombo').empty();

        // Verificar si el campo 'items' existe y es un array
        if (Array.isArray(item.items)) {
            item.items.forEach((item) => {
                $('#editListaItemsCombo').append(`
                    <li class="list-group-item">
                        ${item.nombre} - Cantidad: ${item.cantidad}
                    </li>
                `);
            });
        } else {
            $('#editListaItemsCombo').append('<li class="list-group-item">No hay ítems en este combo.</li>');
        }
    }
}

// Asignar la función al botón de editar
$(document).on('click', '.editar-icon', function () {
    const itemData = $(this).closest('button').data('item');
    abrirModalEdicion(itemData);
});

// Asignar la función al botón de editar
$(document).on('click', '.mirar-icon', function () {
    const itemData = $(this).closest('button').data('item');
    abrirModalVer(itemData);
});

// Referencias a los botones y archivo de input
const inputExcel = document.getElementById('inputExcel');
const btnImportar = document.getElementById('btnImportar');
const btnExportar = document.getElementById('btnExportar');

// Evento para abrir el selector de archivos al hacer clic en "Importar"
btnImportar.addEventListener('click', () => inputExcel.click());

// Lógica de importación de Excel
inputExcel.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Selecciona la primera hoja
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Cargar los datos en la tabla
            table.setData(jsonData);
            updateTotals(jsonData); // Actualizar totales si es necesario
        };
        reader.readAsArrayBuffer(file);
    }
});

// Lógica de exportación a Excel
btnExportar.addEventListener('click', () => {
    const tableData = table.getData(); // Obtener los datos actuales de la tabla

    // Convertir los datos a hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

    // Generar archivo Excel y descargarlo
    XLSX.writeFile(workbook, 'datos_exportados.xlsx');
});


//Carga los Formularios de Descuento, Impuesto y Categoria
document.addEventListener('DOMContentLoaded', function () {
    const formularios = {
        descuento: document.getElementById('formularioDescuento'),
        impuesto: document.getElementById('formularioImpuesto'),
        categoria: document.getElementById('formularioCategoria')
    };

    Object.values(formularios).forEach(formulario => {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            if (!formulario.checkValidity()) {
                evento.stopPropagation();
            } else {
                const datosFormulario = new FormData(formulario);
                const datos = Object.fromEntries(datosFormulario.entries());

                console.log('Formulario enviado:', datos);
                // agregar la lógica para enviar los datos al servidor
                const modal = bootstrap.Modal.getInstance(formulario.closest('.modal'));
                modal.hide();
            }

            formulario.classList.add('was-validated');
        });
    });

    // Validación personalizada para fechas
    const pares = [
        { inicio: 'fechaInicio', fin: 'fechaFin' },
        { inicio: 'fechaInicioImpuesto', fin: 'fechaFinImpuesto' }
    ];

    pares.forEach(par => {
        const inputInicio = document.getElementById(par.inicio);
        const inputFin = document.getElementById(par.fin);

        if (inputInicio && inputFin) {
            inputFin.addEventListener('change', function () {
                if (inputInicio.value && inputFin.value) {
                    if (new Date(inputFin.value) <= new Date(inputInicio.value)) {
                        inputFin.setCustomValidity('La fecha de fin debe ser posterior a la fecha de inicio');
                    } else {
                        inputFin.setCustomValidity('');
                    }
                }
            });

            inputInicio.addEventListener('change', function () {
                inputFin.value = '';
                inputFin.setCustomValidity('');
            });
        }
    });

    // Validación del código DIAN
    const inputCodigoDIAN = document.getElementById('codigoDIAN');
    if (inputCodigoDIAN) {
        inputCodigoDIAN.addEventListener('input', function () {
            if (this.validity.patternMismatch) {
                this.setCustomValidity('El código DIAN debe tener al menos 4 dígitos numéricos');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

//Agrega la data a los campos de todos lo modales de Ver
function abrirModalVer(item) {
    if (item.tipo === 'Producto') {
        $('#verProductoModal').modal('show');
        $('#verNombreProducto').val(item.nombre);
        $('#verCodigoUnicoProducto').val(item.codigoUnico);
        $('#verCodigoGtin').val(item.codigoGtin || '');
        $('#verCategoriaProducto').val(item.categoria);
        $('#verPrecioBase').val(item.precioBase);
        $('#verImpuestos').val(item.impuestos);
        $('#verPrecioVenta').val(item.precioVenta);
        $('#verUnidadMedida').val(item.unidadMedida);
        $('#verDescripcionProducto').val(item.descripcion);
        $('#verCantidadInicial').val(item.cantidadInicial || 0);
        $('#verCodigoUNSPSC').val(item.codigoUNSPSC || '');
        $('#imagenProducto').css('background-image', `url(${item.imagen || '/placeholder-image.jpg'})`);
    }
    if (item.tipo === 'Servicio') {
        $('#verServicioModal').modal('show');
        $('#verNombreServicio').val(item.nombre);
        $('#verCodigoUnicoServicio').val(item.codigoUnico);
        $('#verCodigoUNSPSCServicio').val(item.codigoUNSPSC || '');
        $('#verCategoriaServicio').val(item.categoria);
        $('#verPrecioBaseServicio').val(item.precioBase);
        $('#verImpuestosAplicablesServicio').val(item.impuestos);
        $('#verPrecioVentaServicio').val(item.precioVenta);
        $('#verDescripcionServicio').val(item.descripcion);
        $('#verCodigoGtinServicios').val(item.codigoGtin);
        $('#imagenServicio').css('background-image', `url(${item.imagen || '/placeholder-image.jpg'})`);
    }
    if (item.tipo === 'Combo') {
        $('#verComboModal').modal('show');
        $('#verNombreCombo').val(item.nombre || '');
        $('#verCodigoUnicoCombo').val(item.codigoUnico || '');
        $('#verPrecioBaseCombo').val(item.precioBase || 0);
        $('#verCategoriaCombo').val(item.categoria || '');
        $('#verPrecioVentaCombo').val(item.precioVenta || 0);
        $('#verImpuestosAplicablesCombo').val(item.impuestos || '');
        $('#verDescripcionCombo').val(item.descripcion || '');
        $('#imagenCombo').css('background-image', `url(${item.imagen || '/placeholder-image.jpg'})`);

        // Limpiar la lista de ítems del combo
        $('#verListaItemsCombo').empty();

        // Verificar si el campo 'items' existe y es un array
        if (Array.isArray(item.items)) {
            item.items.forEach((item) => {
                $('#verListaItemsCombo').append(`
                    <li class="list-group-item">
                        ${item.nombre} - Cantidad: ${item.cantidad}
                    </li>
                `);
            });
        } else {
            $('#verListaItemsCombo').append('<li class="list-group-item">No hay ítems en este combo.</li>');
        }
    }
}

// Función para validar y guardar productos
function validarYGuardarProductos() {
    const form = document.getElementById('formProductos');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const producto = Object.fromEntries(formData.entries());

        // Asegurar que los campos numéricos sean números
        producto.precioBase = parseFloat(producto.precioBase);
        producto.precioVenta = parseFloat(producto.precioVenta);
        producto.iva = parseInt(producto.iva);
        producto.cantidadInicial = parseInt(producto.cantidadInicial) || 0;

        fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Producto guardado:', data);
                $('#agregarItemModal').modal('hide');
                actualizarTablaItems();
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarMensajeError('Error al guardar el producto');
            });
    } else {
        form.classList.add('was-validated');
    }
}

// Función para validar y guardar servicios
function validarYGuardarServicio() {
    const form = document.getElementById('form-servicios');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const servicio = Object.fromEntries(formData.entries());

        // Asegurar que los campos numéricos sean números
        servicio.precioBase = parseFloat(servicio.precioBase);
        servicio.precioVenta = parseFloat(servicio.precioVenta);
        servicio.iva = parseInt(servicio.iva);

        fetch('/api/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servicio),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Servicio guardado:', data);
                $('#agregarItemModal').modal('hide');
                actualizarTablaItems();
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarMensajeError('Error al guardar el servicio');
            });
    } else {
        form.classList.add('was-validated');
    }
}

// Función para validar y guardar combos
function validarYGuardarCombo() {
    const form = document.getElementById('form-combos');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const combo = Object.fromEntries(formData.entries());

        // Asegurar que los campos numéricos sean números
        combo.precioBase = parseFloat(combo.precioBase);
        combo.precioVenta = parseFloat(combo.precioVenta);
        combo.iva = parseInt(combo.iva);

        // Obtener los items del combo
        combo.itemsIncluidos = obtenerItemsCombo();

        fetch('/api/combos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combo),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Combo guardado:', data);
                $('#agregarItemModal').modal('hide');
                actualizarTablaItems();
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarMensajeError('Error al guardar el combo');
            });
    } else {
        form.classList.add('was-validated');
    }
}

// Función auxiliar para obtener los items del combo
function obtenerItemsCombo() {
    const itemsCombo = [];
    const listaItems = document.getElementById('listaItemsCombo').children;
    for (let item of listaItems) {
        const [nombre, cantidad] = item.textContent.split(' - Cantidad: ');
        itemsCombo.push({ nombre, cantidad: parseInt(cantidad) });
    }
    return itemsCombo;
}

// Función para actualizar la tabla de items
function actualizarTablaItems() {
    fetch('/api/productos')
        .then(response => response.json())
        .then(data => {
            table.setData(data);
            updateTotals(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            mostrarMensajeError('Error al actualizar la tabla de items');
        });
}

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    // Implementa esta función para mostrar mensajes de error al usuario
    // Podrías usar un toast de Bootstrap o un alert personalizado
    alert(mensaje);
}

// Asignar las funciones a los botones de guardar en cada formulario
document.addEventListener('DOMContentLoaded', function () {
    const btnGuardarProducto = document.querySelector('#formProductos button[type="button"]');
    if (btnGuardarProducto) {
        btnGuardarProducto.addEventListener('click', validarYGuardarProductos);
    }

    const btnGuardarServicio = document.querySelector('#form-servicios button[type="button"]');
    if (btnGuardarServicio) {
        btnGuardarServicio.addEventListener('click', validarYGuardarServicio);
    }

    const btnGuardarCombo = document.querySelector('#form-combos button[type="button"]');
    if (btnGuardarCombo) {
        btnGuardarCombo.addEventListener('click', validarYGuardarCombo);
    }
});

//SIMULACIONES DE CATEGORIAS Y IMPUESTOS 
// Simulated JSON data
const jsonData = {
    categorias: [
        { id: 1, nombre: "Electrónicos" },
        { id: 2, nombre: "Ropa" },
        { id: 3, nombre: "Alimentos" },
        { id: 4, nombre: "Hogar" },
        { id: 5, nombre: "Deportes" }
    ],
    unidadesMedida: [
        { id: 1, nombre: "Unidad" },
        { id: 2, nombre: "Kilogramo" },
        { id: 3, nombre: "Litro" },
        { id: 4, nombre: "Metro" },
        { id: 5, nombre: "Metro cuadrado" }
    ],
    impuestos: [
        { id: 1, nombre: "IVA 19%" },
        { id: 2, nombre: "IVA 5%" },
        { id: 3, nombre: "Exento" },
        { id: 4, nombre: "Consumo 8%" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const categoriaSelect = document.getElementById('categoria');
    const categoriasSeleccionadas = document.getElementById('categoriasSeleccionadas').getElementsByTagName('tbody')[0];
    const unidadMedidaSelect = document.getElementById('unidadMedidaNuevo');
    const impuestosSelect = document.getElementById('impuestosAplicables');

    // Cargar categorías
    jsonData.categorias.forEach(categoria => {
        const option = new Option(categoria.nombre, categoria.id);
        categoriaSelect.add(option);
    });

    // Cargar unidades de medida
    jsonData.unidadesMedida.forEach(unidad => {
        const option = new Option(unidad.nombre, unidad.id);
        unidadMedidaSelect.add(option);
    });

    // Cargar impuestos
    jsonData.impuestos.forEach(impuesto => {
        const option = new Option(impuesto.nombre, impuesto.id);
        impuestosSelect.add(option);
    });

    // Manejar selección de categorías
    categoriaSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value) {
            agregarCategoria(selectedOption.value, selectedOption.text);
            this.value = ''; // Resetear el select
        }
    });

    // Función para agregar una categoría seleccionada
    function agregarCategoria(id, nombre) {
        const fila = categoriasSeleccionadas.insertRow();
        fila.insertCell(0).textContent = nombre;
        const celdaAccion = fila.insertCell(1);
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Quitar';
        botonEliminar.className = 'btn btn-danger btn-sm';
        botonEliminar.onclick = function() {
            categoriasSeleccionadas.removeChild(fila);
        };
        celdaAccion.appendChild(botonEliminar);
    }
});

//SIMULACION DE ITEMS 

// Simulated data for products and services
const itemsData = [
    { id: 1, nombre: "Producto 1", tipo: "Producto" },
    { id: 2, nombre: "Servicio 1", tipo: "Servicio" },
    { id: 3, nombre: "Producto 2", tipo: "Producto" },
    { id: 4, nombre: "Servicio 2", tipo: "Servicio" }
];

document.addEventListener('DOMContentLoaded', function() {
    const itemComboSelect = document.getElementById('itemCombo');
    const cantidadItemCombo = document.getElementById('cantidadItemCombo');
    const listaItemsCombo = document.getElementById('listaItemsCombo');

    // Cargar opciones de productos y servicios
    itemsData.forEach(item => {
        const option = new Option(`${item.nombre} (${item.tipo})`, item.id);
        itemComboSelect.add(option);
    });

    // Función para agregar item al combo
    window.agregarItemAlCombo = function() {
        const itemId = itemComboSelect.value;
        const cantidad = parseInt(cantidadItemCombo.value);

        if (itemId && cantidad > 0) {
            const itemSeleccionado = itemsData.find(item => item.id == itemId);
            if (itemSeleccionado) {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    ${itemSeleccionado.nombre} - Cantidad: ${cantidad}
                    <button class="btn btn-danger btn-sm" onclick="quitarItemDelCombo(this)">Quitar</button>
                `;
                listaItemsCombo.appendChild(listItem);

                // Resetear selección y cantidad
                itemComboSelect.value = '';
                cantidadItemCombo.value = 1;
            }
        } else {
            alert('Por favor, seleccione un item y especifique una cantidad válida.');
        }
    };

    // Función para quitar item del combo
    window.quitarItemDelCombo = function(button) {
        button.closest('li').remove();
    };
});

// Función para obtener los items del combo (útil para guardar el combo)
function obtenerItemsCombo() {
    const items = [];
    const listaItems = document.getElementById('listaItemsCombo').children;
    for (let item of listaItems) {
        const [nombre, cantidadText] = item.textContent.split(' - Cantidad: ');
        const cantidad = parseInt(cantidadText);
        items.push({ nombre, cantidad });
    }
    return items;
}

// Ejemplo de cómo usar la función obtenerItemsCombo en la función validarYGuardarCombo
function validarYGuardarCombo() {
    const form = document.getElementById('form-combos');
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const combo = Object.fromEntries(formData.entries());

        // Asegurar que los campos numéricos sean números
        combo.precioBase = parseFloat(combo.precioBase);
        combo.precioVenta = parseFloat(combo.precioVenta);
        combo.impuestosAplicables = combo.impuestosAplicables; // Asumiendo que es un string o un array

        // Obtener los items del combo
        combo.items = obtenerItemsCombo();

        console.log('Combo a guardar:', combo);
        // Aquí iría el código para enviar el combo al servidor
        // Por ejemplo:
        // fetch('/api/combos', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(combo)
        // }).then(response => response.json())
        //   .then(data => console.log('Combo guardado:', data))
        //   .catch(error => console.error('Error al guardar el combo:', error));

        // Cerrar el modal o limpiar el formulario después de guardar
        // $('#agregarItemModal').modal('hide');
        form.reset();
        document.getElementById('listaItemsCombo').innerHTML = '';
    } else {
        form.classList.add('was-validated');
    }
}
