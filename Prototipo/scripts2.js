
// Simulación de datos de la API de la DIAN
const categoriasDIAN = [
    { id: 1, nombre: 'Electrónicos' },
    { id: 2, nombre: 'Tecnología' },
    { id: 3, nombre: 'Muebles' },
    { id: 4, nombre: 'Papelería' },
    { id: 5, nombre: 'Servicios Profesionales' }
];

const unidadesMedidaDIAN = [
    { id: 1, nombre: 'Unidad' },
    { id: 2, nombre: 'Kilogramo' },
    { id: 3, nombre: 'Metro' },
    { id: 4, nombre: 'Litro' },
    { id: 5, nombre: 'Hora' },
    { id: 6, nombre: 'Conjunto' }
];

// Datos de ejemplo
let items = [
    { id: 1, codigo: 'P001', nombre: 'Laptop HP', tipo: 'Producto', categoria: 'Electrónicos', precio: 2500000, iva: 19, descripcion: 'Laptop HP de última generación', codigoUNSPSC: '43211503', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG001' },
    { id: 2, codigo: 'S001', nombre: 'Mantenimiento PC', tipo: 'Servicio', categoria: 'Tecnología', precio: 150000, iva: 19, descripcion: 'Servicio de mantenimiento para PC', codigoUNSPSC: '81111812', unidadMedida: 'Hora', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG002' },
    { id: 3, codigo: 'P002', nombre: 'Impresora Epson', tipo: 'Producto', categoria: 'Electrónicos', precio: 800000, iva: 19, descripcion: 'Impresora multifuncional Epson', codigoUNSPSC: '43212105', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG003' },
    { id: 4, codigo: 'C001', nombre: 'Combo Oficina', tipo: 'Combo', categoria: 'Varios', precio: 3200000, iva: 19, descripcion: 'Combo de equipos para oficina', codigoUNSPSC: '43000000', unidadMedida: 'Conjunto', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG004' },
    { id: 5, codigo: 'S002', nombre: 'Consultoría IT', tipo: 'Servicio', categoria: 'Tecnología', precio: 500000, iva: 19, descripcion: 'Servicio de consultoría en TI', codigoUNSPSC: '80101507', unidadMedida: 'Hora', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG005' },
    { id: 6, codigo: 'P003', nombre: 'Mouse Inalámbrico', tipo: 'Producto', categoria: 'Electrónicos', precio: 80000, iva: 19, descripcion: 'Mouse inalámbrico ergonómico', codigoUNSPSC: '43211708', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG006' },
    { id: 7, codigo: 'S003', nombre: 'Instalación de Software', tipo: 'Servicio', categoria: 'Tecnología', precio: 120000, iva: 19, descripcion: 'Servicio de instalación de software', codigoUNSPSC: '81112201', unidadMedida: 'Servicio', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG007' },
    { id: 8, codigo: 'P004', nombre: 'Monitor Samsung', tipo: 'Producto', categoria: 'Electrónicos', precio: 900000, iva: 19, descripcion: 'Monitor Samsung de 24 pulgadas', codigoUNSPSC: '43211902', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG008' },
    { id: 9, codigo: 'P005', nombre: 'Teclado Mecánico', tipo: 'Producto', categoria: 'Electrónicos', precio: 150000, iva: 19, descripcion: 'Teclado mecánico con retroiluminación', codigoUNSPSC: '43211706', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG009' },
    { id: 10, codigo: 'S004', nombre: 'Capacitación en TI', tipo: 'Servicio', categoria: 'Educación', precio: 300000, iva: 19, descripcion: 'Capacitación avanzada en tecnologías de la información', codigoUNSPSC: '86132100', unidadMedida: 'Curso', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG010' },
    { id: 11, codigo: 'P006', nombre: 'Disco Duro Externo', tipo: 'Producto', categoria: 'Electrónicos', precio: 350000, iva: 19, descripcion: 'Disco duro externo de 1TB', codigoUNSPSC: '43201803', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG011' },
    { id: 12, codigo: 'P007', nombre: 'Cámara Web', tipo: 'Producto', categoria: 'Electrónicos', precio: 120000, iva: 19, descripcion: 'Cámara web HD', codigoUNSPSC: '45121520', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG012' },
    { id: 13, codigo: 'P008', nombre: 'Memoria USB', tipo: 'Producto', categoria: 'Electrónicos', precio: 50000, iva: 19, descripcion: 'Memoria USB de 16GB', codigoUNSPSC: '43202010', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG013' },
    { id: 14, codigo: 'S005', nombre: 'Soporte Remoto', tipo: 'Servicio', categoria: 'Tecnología', precio: 200000, iva: 19, descripcion: 'Soporte remoto para solución de problemas', codigoUNSPSC: '81112300', unidadMedida: 'Hora', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG014' },
    { id: 15, codigo: 'P009', nombre: 'Altavoces Bluetooth', tipo: 'Producto', categoria: 'Electrónicos', precio: 180000, iva: 19, descripcion: 'Altavoces inalámbricos Bluetooth', codigoUNSPSC: '52161512', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG015' },
    { id: 16, codigo: 'S006', nombre: 'Auditoría de Seguridad', tipo: 'Servicio', categoria: 'Tecnología', precio: 600000, iva: 19, descripcion: 'Auditoría de seguridad informática', codigoUNSPSC: '81111704', unidadMedida: 'Servicio', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG016' },
    { id: 17, codigo: 'P010', nombre: 'Router Wi-Fi', tipo: 'Producto', categoria: 'Electrónicos', precio: 250000, iva: 19, descripcion: 'Router inalámbrico de alta velocidad', codigoUNSPSC: '43222609', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG017' },
    { id: 18, codigo: 'S007', nombre: 'Consultoría en Seguridad', tipo: 'Servicio', categoria: 'Tecnología', precio: 700000, iva: 19, descripcion: 'Consultoría avanzada en ciberseguridad', codigoUNSPSC: '80101507', unidadMedida: 'Hora', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG018' },
    { id: 19, codigo: 'P011', nombre: 'Cargador Portátil', tipo: 'Producto', categoria: 'Electrónicos', precio: 90000, iva: 19, descripcion: 'Cargador portátil para dispositivos móviles', codigoUNSPSC: '39121006', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG019' },
    { id: 20, codigo: 'S008', nombre: 'Desarrollo de Aplicaciones', tipo: 'Servicio', categoria: 'Tecnología', precio: 2500000, iva: 19, descripcion: 'Desarrollo de aplicaciones personalizadas', codigoUNSPSC: '81111500', unidadMedida: 'Proyecto', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG020' },
    { id: 21, codigo: 'P012', nombre: 'Cable HDMI', tipo: 'Producto', categoria: 'Electrónicos', precio: 30000, iva: 19, descripcion: 'Cable HDMI de alta velocidad', codigoUNSPSC: '26121620', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG021' },
    { id: 22, codigo: 'S009', nombre: 'Análisis de Datos', tipo: 'Servicio', categoria: 'Consultoría', precio: 800000, iva: 19, descripcion: 'Análisis avanzado de datos', codigoUNSPSC: '81111600', unidadMedida: 'Servicio', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG022' },
    { id: 23, codigo: 'P013', nombre: 'Tableta Gráfica', tipo: 'Producto', categoria: 'Electrónicos', precio: 600000, iva: 19, descripcion: 'Tableta gráfica para diseño', codigoUNSPSC: '43211713', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG023' },
    { id: 24, codigo: 'S010', nombre: 'Pruebas de Software', tipo: 'Servicio', categoria: 'Tecnología', precio: 400000, iva: 19, descripcion: 'Servicio de pruebas y aseguramiento de calidad de software', codigoUNSPSC: '81111504', unidadMedida: 'Servicio', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG024' },
    { id: 25, codigo: 'P014', nombre: 'Proyector', tipo: 'Producto', categoria: 'Electrónicos', precio: 1200000, iva: 19, descripcion: 'Proyector de alta definición', codigoUNSPSC: '45111614', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG025' },
    { id: 26, codigo: 'S011', nombre: 'Soporte Técnico', tipo: 'Servicio', categoria: 'Tecnología', precio: 150000, iva: 19, descripcion: 'Soporte técnico en sitio', codigoUNSPSC: '81112300', unidadMedida: 'Hora', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG026' },
    { id: 27, codigo: 'P015', nombre: 'Parlantes de Escritorio', tipo: 'Producto', categoria: 'Electrónicos', precio: 85000, iva: 19, descripcion: 'Parlantes de escritorio con conexión USB', codigoUNSPSC: '52161512', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG027' },
    { id: 28, codigo: 'S012', nombre: 'Optimización de Bases de Datos', tipo: 'Servicio', categoria: 'Consultoría', precio: 1000000, iva: 19, descripcion: 'Optimización avanzada de bases de datos', codigoUNSPSC: '81112006', unidadMedida: 'Proyecto', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG028' },
    { id: 29, codigo: 'P016', nombre: 'Cable de Red', tipo: 'Producto', categoria: 'Electrónicos', precio: 20000, iva: 19, descripcion: 'Cable de red de 1 metro', codigoUNSPSC: '26121609', unidadMedida: 'Unidad', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG029' },
    { id: 30, codigo: 'S013', nombre: 'Monitoreo de Red', tipo: 'Servicio', categoria: 'Tecnología', precio: 500000, iva: 19, descripcion: 'Servicio de monitoreo de red 24/7', codigoUNSPSC: '81111805', unidadMedida: 'Servicio', imagen: '/placeholder.svg?height=100&width=100', programaDIAN: 'PROG030' }
];



//CODIGO PARA MEJORAR 

//muestra item completo personalizado
function verItem(id) {
    const item = items.find(i => i.id === id);
    const modalBody = document.getElementById('verItemModalBody');
    modalBody.innerHTML = `
                <div class="container-fluid">
        <div class="row">
            <div class="col-md-5 mb-4 mb-md-0">
            <div class="position-relative">
                <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded-3 shadow-lg" style="width: 100%; height: 300px; object-fit: cover;">
                <div class="position-absolute bottom-0 start-0 bg-primary text-white p-2 rounded-end">
                <h6 class="mb-0">Código: ${item.codigo}</h6>
                </div>
            </div>
            <div class="mt-3">
                <div class="d-flex justify-content-between align-items-center bg-light p-2 rounded-3 mb-2">
                <span class="fw-bold">Precio:</span>
                <span class="badge bg-success fs-6">${item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center bg-light p-2 rounded-3">
                <span class="fw-bold">IVA:</span>
                <span class="badge bg-info fs-6">${item.iva}%</span>
                </div>
            </div>
            </div>
            <div class="col-md-7">
            <div class="card mb-3">
                <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Descripción</h6>
                <p class="card-text">${item.descripcion}</p>
                </div>
            </div>
            <div class="row g-2">
                <div class="col-sm-6">
                <div class="card h-100">
                    <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Tipo</h6>
                    <p class="card-text">${item.tipo}</p>
                    </div>
                </div>
                </div>
                <div class="col-sm-6">
                <div class="card h-100">
                    <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Categoría</h6>
                    <p class="card-text">${item.categoria}</p>
                    </div>
                </div>
                </div>
                <div class="col-sm-6">
                <div class="card h-100">
                    <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Unidad de Medida</h6>
                    <p class="card-text">${item.unidadMedida}</p>
                    </div>
                </div>
                </div>
                <div class="col-sm-6">
                <div class="card h-100">
                    <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Código UNSPSC</h6>
                    <p class="card-text">${item.codigoUNSPSC}</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div class="modal-footer bg-light">
    <div class="me-auto">
      <small class="text-muted">Programa DIAN: ${item.programaDIAN}</small>
    </div>
            `;
    const modal = new bootstrap.Modal(document.getElementById('verItemModal'));
    modal.show();
}


//editar items
function editarItem(id) {
    const item = items.find(i => i.id === id);
    document.getElementById('itemId').value = item.id;
    document.getElementById('codigoItem').value = item.codigo;
    document.getElementById('nombreItem').value = item.nombre;
    document.getElementById('tipoItem').value = item.tipo;
    document.getElementById('categoriaItem').value = item.categoria;
    document.getElementById('precioBaseItem').value = item.precio;
    document.getElementById('precioItem').value = item.precio;
    document.getElementById('ivaItem').value = item.iva;
    document.getElementById('descripcionItem').value = item.descripcion;
    document.getElementById('codigoUNSPSC').value = item.codigoUNSPSC;
    document.getElementById('unidadMedida').value = item.unidadMedida;
    document.getElementById('programaDIAN').value = item.programaDIAN;
    document.getElementById('descripcionCambios').value = '';

    // Cargar categorías y unidades de medida
    cargarCategorias('categoriaItem');
    cargarUnidadesMedida('unidadMedida');

    const modal = new bootstrap.Modal(document.getElementById('actualizarItemModal'));
    modal.show();
}

//valida y guarda categorias 
function validarYGuardar() {
    const form = document.getElementById('actualizarItemForm');
    if (form.checkValidity()) {
        const id = parseInt(document.getElementById('itemId').value);
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            const imagenInput = document.getElementById('imagenItem');
            const imagen = imagenInput.files.length > 0 ? URL.createObjectURL(imagenInput.files[0]) : items[index].imagen;
            items[index] = {
                id: id,
                codigo: document.getElementById('codigoItem').value,
                nombre: document.getElementById('nombreItem').value,
                tipo: document.getElementById('tipoItem').value,
                categoria: document.getElementById('categoriaItem').value,
                precio: parseFloat(document.getElementById('precioItem').value),
                iva: parseInt(document.getElementById('ivaItem').value),
                descripcion: document.getElementById('descripcionItem').value,
                codigoUNSPSC: document.getElementById('codigoUNSPSC').value,
                unidadMedida: document.getElementById('unidadMedida').value,
                imagen: imagen,
                programaDIAN: document.getElementById('programaDIAN').value
            };
            const descripcionCambios = document.getElementById('descripcionCambios').value;
            alert(`Cambios guardados correctamente.
    Descripción de los cambios: ${descripcionCambios}`);
            cargarItems();
            const modal = bootstrap.Modal.getInstance(document.getElementById('actualizarItemModal'));
            modal.hide();
        }
    } else {
        form.classList.add('was-validated');
    }
}



// GENERALES___________________________________________________________________________________________________________________________________________________

//inicializa contenidos
document.addEventListener('DOMContentLoaded', function () {
    cargarItems();
    cargarCategorias('categoria');
    cargarCategorias('categoriaServicio');
    cargarCategorias('categoriaCombo');
    cargarCategorias('categoriaItem');
    cargarUnidadesMedida('unidadMedida');
    cargarUnidadesMedida('unidadMedidaNuevo');
    contarItems();
    contarProductos();
    contarCombos();
    contarServicios();

    //inicializa los items del combo
    cargarItemsParaCombo();
    const comboTab = document.getElementById('combo-tab');
    comboTab.addEventListener('shown.bs.tab', function (e) {
        cargarItemsParaCombo();
    });
});

//carga items en una tabla
function cargarItems(itemsFiltrados = items) {
    const tbody = document.getElementById('itemsTableBody');
    tbody.innerHTML = '';
    itemsFiltrados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>
                        <div class="btn-group" role="group" aria-label="Acciones de item">
                            <button type="button" class="btn btn-sm btn-outline-primary" title="Ver" onclick="verItem(${item.id})">
                                <i class="bi bi-eye"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" title="Actualizar" onclick="editarItem(${item.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="mostrarEliminarItem(${item.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                    <td>${item.codigo}</td>
                    <td>${item.nombre}</td>
                    <td>${item.tipo}</td>
                    <td>${item.categoria}</td>
                    <td>${item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                    <td>${item.iva}%</td>
                `;
        tbody.appendChild(tr);
    });
}
// Contar el número de items
function contarItems() {
    const totalItems = items.length;
    document.getElementById('totalItems').textContent = totalItems;
}

//aplica los filtros a la tabla
function aplicarFiltros() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const tipoFilter = document.getElementById('tipoItemFilter').value;

    const itemsFiltrados = items.filter(item =>
        (item.nombre.toLowerCase().includes(searchTerm) ||
            item.codigo.toLowerCase().includes(searchTerm) ||
            item.categoria.toLowerCase().includes(searchTerm)) &&
        (tipoFilter === '' || item.tipo === tipoFilter)
    );

    cargarItems(itemsFiltrados);
}

//carga las categorias
function cargarCategorias(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Seleccione una categoría</option>';
    categoriasDIAN.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nombre;
        option.textContent = categoria.nombre;
        select.appendChild(option);
    });
}

//carga unidades de medida
function cargarUnidadesMedida(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Seleccione una unidad de medida</option>';
    unidadesMedidaDIAN.forEach(unidad => {
        const option = document.createElement('option');
        option.value = unidad.nombre;
        option.textContent = unidad.nombre;
        select.appendChild(option);
    });
}

//confirma ka ekiminacion de un item
function confirmarEliminacion() {
    const razonEliminacion = document.getElementById('razonEliminacion');
    if (razonEliminacion.value.trim() === '') {
        razonEliminacion.classList.add('is-invalid');
        return;
    }
    razonEliminacion.classList.remove('is-invalid');

    const itemId = parseInt(document.getElementById('eliminarItemInfo').querySelector('strong').nextSibling.textContent.trim());
    const index = items.findIndex(item => item.id === itemId);

    if (index !== -1) {
        items.splice(index, 1);
        alert(`Ítem eliminado correctamente.
    Razón: ${razonEliminacion.value}`);
        const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarItemModal'));
        modal.hide();
        cargarItems();
    }
}

//muestra modal para eliminar un item
function mostrarEliminarItem(id) {
    const item = items.find(i => i.id === id);
    document.getElementById('eliminarItemInfo').innerHTML = `
                <strong>Código:</strong> ${item.codigo}<br>
                <strong>Nombre:</strong> ${item.nombre}<br>
                <strong>Tipo:</strong> ${item.tipo}
            `;
    document.getElementById('razonEliminacion').value = '';
    const modal = new bootstrap.Modal(document.getElementById('eliminarItemModal'));
    modal.show();
}
// PRODUCTOS___________________________________________________________________________________________________________________________________________________

//cuenta los productos
function contarProductos() {
    let totalProductos = 0;
    items.forEach(element => {
        if (element.tipo === "Producto") {
            totalProductos++;
        }
    });
    document.getElementById("totalProductos").textContent = totalProductos;
}

// COMBOS___________________________________________________________________________________________________________________________________________________

//cuenta los combos
function contarCombos() {
    let totalProductos = 0;
    items.forEach(element => {
        if (element.tipo === "Combo") {
            totalProductos++;
        }
    });
    document.getElementById("totalCombos").textContent = totalProductos;
}

//elima items del combo
function eliminarItemDelCombo(itemId) {
    itemsCombo = itemsCombo.filter(item => item.id !== itemId);
    actualizarListaItemsCombo();
}

//actualiza items del combo
function actualizarListaItemsCombo() {
    const lista = document.getElementById('listaItemsCombo');
    lista.innerHTML = '';
    itemsCombo.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.nombre} (${item.tipo}) - Cantidad: ${item.cantidad}
            <button type="button" class="btn btn-sm btn-danger" onclick="eliminarItemDelCombo(${item.id})">Eliminar</button>
        `;
        lista.appendChild(li);
    });
}

//agregar items al combo
function agregarItemAlCombo() {
    const itemId = document.getElementById('itemCombo').value;
    const cantidad = parseInt(document.getElementById('cantidadItemCombo').value);

    if (itemId && cantidad > 0) {
        const item = items.find(i => i.id === parseInt(itemId));
        if (item) {
            const itemCombo = {
                id: item.id,
                nombre: item.nombre,
                tipo: item.tipo,
                cantidad: cantidad
            };

            const existingIndex = itemsCombo.findIndex(i => i.id === itemCombo.id);
            if (existingIndex !== -1) {
                itemsCombo[existingIndex].cantidad += cantidad;
            } else {
                itemsCombo.push(itemCombo);
            }

            actualizarListaItemsCombo();
            document.getElementById('itemCombo').value = '';
            document.getElementById('cantidadItemCombo').value = '1';
        }
    }
}

let itemsCombo = [];

//carga lositems al combo
function cargarItemsParaCombo() {
    const select = document.getElementById('itemCombo');
    select.innerHTML = '<option value="">Seleccione un producto o servicio</option>';
    items.forEach(item => {
        if (item.tipo !== 'Combo') { // Exclude existing combos
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = `${item.nombre} (${item.tipo})`;
            select.appendChild(option);
        }
    });
}
// SERVICIOS_________________________________________________________________________________________________________________________________________________

//Cuenta los Servicios
function contarServicios() {
    let totalProductos = 0;
    items.forEach(element => {
        if (element.tipo === "Servicio") {
            totalProductos++;
        }
    });
    document.getElementById("totalServicios").textContent = totalProductos;
}