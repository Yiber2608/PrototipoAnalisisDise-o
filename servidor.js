const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const PRODUCTOS_FILE = path.join(__dirname,'JSON', 'items.json');

async function readProductosFile() {
  try {
    const data = await fs.readFile(PRODUCTOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading productos.json:', error);
    return [];
  }
}

async function writeProductosFile(data) {
  try {
    await fs.writeFile(PRODUCTOS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to productos.json:', error);
    throw error;
  }
}

async function generateId() {
  const productos = await readProductosFile();
  return productos.length + 1;
}

app.post('/api/productos', async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const productos = await readProductosFile();
    nuevoProducto.id = generateId();
    nuevoProducto.tipo = 'Producto';
    nuevoProducto.iva = parseInt(nuevoProducto.iva) || 19; // Default to 19 if not provided
    nuevoProducto.cantidadInicial = parseInt(nuevoProducto.cantidadInicial) || 0;
    nuevoProducto.imagen = nuevoProducto.imagen || "https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg";
    productos.push(nuevoProducto);
    await writeProductosFile(productos);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el producto' });
  }
});

app.post('/api/servicios', async (req, res) => {
  try {
    const nuevoServicio = req.body;
    const productos = await readProductosFile();
    nuevoServicio.id = generateId();
    nuevoServicio.tipo = 'Servicio';
    nuevoServicio.iva = parseInt(nuevoServicio.iva) || 19; // Default to 19 if not provided
    nuevoServicio.imagen = nuevoServicio.imagen || "https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg";
    productos.push(nuevoServicio);
    await writeProductosFile(productos);
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el servicio' });
  }
});

app.post('/api/combos', async (req, res) => {
  try {
    const nuevoCombo = req.body;
    const productos = await readProductosFile();
    nuevoCombo.id = generateId();
    nuevoCombo.tipo = 'Combo';
    nuevoCombo.iva = parseInt(nuevoCombo.iva) || 19; // Default to 19 if not provided
    nuevoCombo.imagen = nuevoCombo.imagen || "https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg";
    nuevoCombo.itemsIncluidos = nuevoCombo.itemsIncluidos || [];
    productos.push(nuevoCombo);
    await writeProductosFile(productos);
    res.status(201).json(nuevoCombo);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el combo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ejemplos de uso
const producto = {
  nombre: "Monitor LG 27'",
  codigoUnico: "P005",
  codigoGtin: "9876543210123",
  categoria: "Electrónicos",
  precioBase: 800000,
  precioVenta: 950000,
  iva: 19,
  unidadMedida: "Unidad",
  descripcion: "Monitor de 27 pulgadas LG con resolución 4K.",
  cantidadInicial: 5,
  codigoUNSPSC: "43211902"
};

const servicio = {
  nombre: "Configuración de Red",
  codigoUnico: "S004",
  codigoGtin: "1234567890987",
  categoria: "Tecnología",
  precioBase: 250000,
  precioVenta: 300000,
  iva: 19,
  unidadMedida: "Hora",
  descripcion: "Servicio de configuración de red para empresas.",
  codigoUNSPSC: "81111819"
};

const combo = {
  nombre: "Combo Oficina Ejecutiva",
  codigoUnico: "C004",
  categoria: "Muebles",
  precioBase: 4000000,
  precioVenta: 4500000,
  iva: 19,
  descripcion: "Combo ejecutivo con escritorio, silla ergonómica y archivador.",
  itemsIncluidos: [
    { nombre: "Escritorio Ejecutivo", cantidad: 1 },
    { nombre: "Silla Ergonómica", cantidad: 1 },
    { nombre: "Archivador", cantidad: 1 }
  ]
};

// Función para enviar datos al servidor
function enviarDatos(url, datos) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
  .then(response => response.json())
  .then(data => console.log('Datos guardados:', data))
  .catch(error => console.error('Error:', error));
}

// Enviar ejemplos al servidor
//enviarDatos('http://localhost:3000/api/productos', producto);
//enviarDatos('http://localhost:3000/api/servicios', servicio);
//enviarDatos('http://localhost:3000/api/combos', combo);