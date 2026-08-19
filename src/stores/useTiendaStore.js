import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTiendaStore = defineStore('tienda', () => {
  
  // 1. ESTADO
  const productos = ref([
    { id: 1, nombre: 'Camisa Blanca Hombre', categoria: 'Remeras y Camisas', genero: 'Hombre', precio: 1290, stock: 20, descripcion: 'Camisa de vestir blanca, corte entallado.', talles: ['S', 'M', 'L', 'XL'], imagen: '/imagenes/camisa-hombre.jpeg' },
    { id: 2, nombre: 'Remera Algodón Hombre', categoria: 'Remeras y Camisas', genero: 'Hombre', precio: 590, stock: 45, descripcion: 'Remera lisa de algodón, muy cómoda.', talles: ['S', 'M', 'L'], imagen: '/imagenes/camiseta-hombre.jpg' },
    { id: 3, nombre: 'Remera Básica Mujer', categoria: 'Remeras y Camisas', genero: 'Mujer', precio: 590, stock: 35, descripcion: 'Remera básica de mujer ideal para uso diario.', talles: ['S', 'M', 'L'], imagen: '/imagenes/camiseta-mujer.jpg' },
    { id: 4, nombre: 'Campera Invierno Hombre', categoria: 'Camperas', genero: 'Hombre', precio: 2890, stock: 15, descripcion: 'Campera acolchada de abrigo para hombre.', talles: ['M', 'L', 'XL'], imagen: '/imagenes/campera-hombre (2).jpeg' },
    { id: 5, nombre: 'Campera de Cuero Mujer', categoria: 'Camperas', genero: 'Mujer', precio: 2490, stock: 10, descripcion: 'Campera estilo biker de cuero sintético.', talles: ['S', 'M'], imagen: '/imagenes/campera-mujer.jpeg' },
    { id: 6, nombre: 'Enterito Elegante', categoria: 'Vestidos y Enteritos', genero: 'Mujer', precio: 1890, stock: 12, descripcion: 'Enterito largo sin mangas, ideal para la noche.', talles: ['S', 'M', 'L'], imagen: '/imagenes/enterito.jpeg' },
    { id: 7, nombre: 'Jean Clásico Mujer', categoria: 'Pantalones', genero: 'Mujer', precio: 1490, stock: 25, descripcion: 'Jean ajustado de tiro alto para mujer.', talles: ['S', 'M', 'L'], imagen: '/imagenes/jean-mujer.jpeg' },
    { id: 8, nombre: 'Jean Suelto Mujer', categoria: 'Pantalones', genero: 'Mujer', precio: 1590, stock: 20, descripcion: 'Jean holgado y relajado, estilo urbano.', talles: ['M', 'L', 'XL'], imagen: '/imagenes/jean-mujer-suelto.jpeg' },
    { id: 9, nombre: 'Pantalón Chino Hombre', categoria: 'Pantalones', genero: 'Hombre', precio: 1390, stock: 30, descripcion: 'Pantalón de gabardina de corte clásico.', talles: ['S', 'M', 'L', 'XL'], imagen: '/imagenes/pantalon-hombre.jpg' },
    { id: 10, nombre: 'Pantalón Vestir Mujer', categoria: 'Pantalones', genero: 'Mujer', precio: 1690, stock: 18, descripcion: 'Pantalón elegante de vestir para mujer.', talles: ['S', 'M', 'L'], imagen: '/imagenes/pantalon-mujer.jpeg' },
    { id: 11, nombre: 'Vestido Estampado', categoria: 'Vestidos y Enteritos', genero: 'Mujer', precio: 1990, stock: 14, descripcion: 'Vestido largo y fresco con estampado.', talles: ['S', 'M'], imagen: '/imagenes/vestido.jpeg' },
    { id: 12, nombre: 'Reloj Deportivo Negro', categoria: 'Accesorios', genero: 'Hombre', precio: 2190, stock: 8, descripcion: 'Reloj resistente con correa de silicona.', talles: ['Único'], imagen: '/imagenes/reloj-negro.jpeg' },
    { id: 13, nombre: 'Reloj Clásico Azul', categoria: 'Accesorios', genero: 'Hombre', precio: 1990, stock: 5, descripcion: 'Reloj analógico con detalles en azul.', talles: ['Único'], imagen: '/imagenes/reloj-azul.jpeg' },
    { id: 14, nombre: 'Musculosa Básica', categoria: 'Remeras y Camisas', genero: 'Mujer', precio: 490, stock: 50, descripcion: 'Musculosa de hilo ligera para el verano.', talles: ['S', 'M', 'L'], imagen: '/imagenes/musculosa.jpeg' },
    { id: 15, nombre: 'Soutien Encaje', categoria: 'Ropa Interior', genero: 'Mujer', precio: 890, stock: 40, descripcion: 'Soutien cómodo de encaje delicado.', talles: ['S', 'M', 'L'], imagen: '/imagenes/sutien.jpeg' }
  ])

  const carrito = ref([])
  const pedidos = ref([])

  const configuracion = ref({
    nombreTienda: 'María Urbana',
    descripcionTienda: 'Tienda online de ropa y accesorios.'
  })

  // 2. ACCIONES
  const agregarAlCarrito = (producto, talle, cantidad) => {
    const existe = carrito.value.find(item => item.id === producto.id && item.talle === talle)
    if (existe) {
      existe.cantidad += cantidad
    } else {
      carrito.value.push({
        ...producto,
        talle: talle,
        cantidad: cantidad
      })
    }
  }

  const eliminarDelCarrito = (id, talle) => {
    carrito.value = carrito.value.filter(item => !(item.id === id && item.talle === talle))
  }

  const agregarProducto = (nuevoProducto) => {
    const siguienteId = productos.value.length > 0 ? productos.value[productos.value.length - 1].id + 1 : 1
    productos.value.push({ id: siguienteId, ...nuevoProducto })
  }

  // --- GESTIÓN DE PEDIDOS Y STOCK ---
  const crearPedido = (clienteData, itemsCarrito, total) => {
    const nuevoPedido = {
      id: Date.now(),
      cliente: clienteData,
      items: JSON.parse(JSON.stringify(itemsCarrito)),
      total: total,
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString('es-UY', { hour: '2-digit', minute: '2-digit' })
    }
    pedidos.value.unshift(nuevoPedido)
  }

  const completarPedido = (pedidoId) => {
    const pedido = pedidos.value.find(p => p.id === pedidoId)
    if (pedido && pedido.estado === 'Pendiente') {
      pedido.items.forEach(itemPedido => {
        const prod = productos.value.find(p => p.id === itemPedido.id)
        if (prod && prod.stock >= itemPedido.cantidad) {
          prod.stock -= itemPedido.cantidad
        }
      })
      pedido.estado = 'Entregado'
    }
  }

  const cancelarPedido = (pedidoId) => {
    const pedido = pedidos.value.find(p => p.id === pedidoId)
    if (pedido && pedido.estado === 'Pendiente') {
      pedido.estado = 'Cancelado'
    }
  }

  // 3. GETTERS
  const totalArticulos = computed(() => {
    return carrito.value.reduce((suma, item) => suma + item.cantidad, 0)
  })

  return {
    productos,
    carrito,
    pedidos,
    configuracion,
    totalArticulos,
    agregarAlCarrito,
    eliminarDelCarrito,
    agregarProducto,
    crearPedido,
    completarPedido,
    cancelarPedido
  }
})