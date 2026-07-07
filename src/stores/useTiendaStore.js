import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTiendaStore = defineStore('tienda', () => {
  
  // 1. ESTADO (Datos)
  const productos = ref([
    { id: 1, nombre: 'Camiseta Básica', categoria: 'Camisetas', precio: 590, stock: 45, descripcion: 'Camiseta de algodón orgánico, corte relajado y cómodo.', talles: ['S', 'M', 'L'] },
    { id: 2, nombre: 'Hoodie Oversize', categoria: 'Hoodies', precio: 1290, stock: 28, descripcion: 'Buzo abrigo oversize con capucha, ideal para el invierno.', talles: ['M', 'L', 'XL'] },
    { id: 3, nombre: 'Jean Clásico', categoria: 'Pantalones', precio: 1190, stock: 32, descripcion: 'Jean rígido clásico tiro alto, calce perfecto.', talles: ['S', 'M'] },
    { id: 4, nombre: 'Bolso de Lona', categoria: 'Accesorios', precio: 690, stock: 15, descripcion: 'Bolso amplio de lona resistente para llevar todos los días.', talles: ['Único'] },
    { id: 5, nombre: 'Gorra Bordada', categoria: 'Accesorios', precio: 490, stock: 60, descripcion: 'Gorra con visera curva y bordado exclusivo en el frente.', talles: ['Único'] }
  ])

  // 👇 NUEVO: Acá se van a ir guardando las prendas que elija el comprador
  const carrito = ref([])

  const configuracion = ref({
    nombreTienda: 'María Urbana',
    descripcionTienda: 'Tienda online de ropa y accesorios para mujeres.'
  })

  // 2. ACCIONES (Funciones)
  
  // 👇 NUEVA ACCIÓN: Para meter cosas al carrito
  const agregarAlCarrito = (producto, talle) => {
    // Primero revisamos si ese mismo producto Y con ese mismo talle ya está en el carrito
    const existe = carrito.value.find(item => item.id === producto.id && item.talle === talle)

    if (existe) {
      // Si ya existía, solo le sumamos 1 a la cantidad
      existe.cantidad++
    } else {
      // Si es nuevo, lo agregamos a la lista con cantidad 1
      carrito.value.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        talle: talle,
        cantidad: 1
      })
    }
  }

  // 👇 NUEVA ACCIÓN: Para sacar un producto del carrito
  const eliminarDelCarrito = (id, talle) => {
    carrito.value = carrito.value.filter(item => !(item.id === id && item.talle === talle))
  }

  // 3. GETTERS (Datos calculados automáticamente)
  // 👇 NUEVO: Cuenta cuántos artículos hay en total en el carrito (para poner el numerito en el Header)
  const totalArticulos = computed(() => {
    return carrito.value.reduce((suma, item) => suma + item.cantidad, 0)
  })

  // Funciones de administración (las dejamos como estaban)
  const agregarProducto = (nuevoProducto) => {
    const siguienteId = productos.value.length > 0 ? productos.value[productos.value.length - 1].id + 1 : 1
    productos.value.push({ id: siguienteId, ...nuevoProducto })
  }

  return {
    productos,
    carrito, // 👈 Exportamos el carrito
    configuracion,
    totalArticulos, // 👈 Exportamos el contador total
    agregarAlCarrito, // 👈 Exportamos la función de agregar
    eliminarDelCarrito, // 👈 Exportamos la función de eliminar
    agregarProducto
  }
})