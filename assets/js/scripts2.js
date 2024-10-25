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



