<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const route = useRoute()
const store = useTiendaStore()

// 1. Capturamos el ID de la URL (ej: si es /producto/3, extrae el 3)
const productoId = Number(route.params.id)

// 2. Buscamos de forma reactiva el producto en Pinia que coincida con ese ID
const producto = computed(() => {
  return store.productos.find(p => p.id === productoId)
})

// 3. Estado local para guardar el talle que elija el cliente
const talleSeleccionado = ref('')

// Cambiamos la simulación por la lógica real conectada a Pinia
const agregarAlCarritoReal = () => {
  if (!talleSeleccionado.value) {
    alert('Por favor, seleccioná un talle antes de agregar al carrito.')
    return
  }
  
  // Llamamos a la acción de Pinia pasándole el producto entero y el talle elegido
  store.agregarAlCarrito(producto.value, talleSeleccionado.value)
  
  alert(`¡Listo! Agregaste ${producto.value.nombre} (Talle: ${talleSeleccionado.value}) al carrito.`)
}
</script>

<template>
  <ShopHeader />
  
  <!-- Validamos que el producto exista por las dudas -->
  <main class="detalle-container" v-if="producto">
    
    <!-- Botón para volver atrás -->
    <RouterLink to="/catalogo" class="btn-volver">← Volver al Catálogo</RouterLink>

    <div class="wrapper-producto">
      <!-- Columna Izquierda: Foto de la prenda -->
      <div class="foto-grande">
        <span>FOTO DE {{ producto.nombre.toUpperCase() }}</span>
      </div>

      <!-- Columna Derecha: Información y Compra -->
      <div class="info-compra">
        <span class="categoria">{{ producto.categoria }}</span>
        <h1 class="nombre">{{ producto.nombre }}</h1>
        <p class="precio">${{ producto.precio }}</p>
        <p class="descripcion">{{ producto.descripcion }}</p>

        <!-- Selector de Talles Dinámico -->
        <div class="seccion-talles">
          <h3>Seleccioná tu Talle:</h3>
          <div class="lista-talles">
            <button 
              v-for="talle in producto.talles" 
              :key="talle"
              :class="['btn-talle', { activo: talleSeleccionado === talle }]"
              @click="talleSeleccionado = talle"
            >
              {{ talle }}
            </button>
          </div>
        </div>

        <!-- Botón de compra -->
        <button class="btn-agregar" @click="agregarAlCarritoReal">
          Agregar al Carrito
        </button>
      </div>
    </div>

  </main>

  <!-- Mensaje de error si escriben un ID que no existe en la URL -->
  <main class="detalle-container error" v-else>
    <h2>Ups... El producto que buscás no existe.</h2>
    <RouterLink to="/catalogo" class="btn-volver">Volver al Catálogo</RouterLink>
  </main>

  <ShopFooter />
</template>

<style scoped>
.detalle-container {
  padding: 2rem 5%;
  min-height: 70vh;
}

.btn-volver {
  display: inline-block;
  color: #8C7355;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.3s;
}

.btn-volver:hover {
  color: #333333;
}

/* Distribución en dos columnas principales */
.wrapper-producto {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

.foto-grande {
  background-color: #F7F5F0;
  flex: 1;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #CCCCCC;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #EAEAEA;
}

.info-compra {
  flex: 1;
}

.categoria {
  color: #999999;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.nombre {
  font-size: 2.5rem;
  color: #333333;
  margin: 0.5rem 0 1rem 0;
}

.precio {
  font-size: 2rem;
  color: #8C7355;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.descripcion {
  color: #666666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Selector de Talles */
.seccion-talles {
  margin-bottom: 2.5rem;
}

.seccion-talles h3 {
  font-size: 1rem;
  color: #333333;
  margin-bottom: 0.8rem;
}

.lista-talles {
  display: flex;
  gap: 1rem;
}

.btn-talle {
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-talle:hover {
  border-color: #8C7355;
  color: #8C7355;
}

/* Estilo para resaltar el talle seleccionado */
.btn-talle.activo {
  background-color: #8C7355;
  border-color: #8C7355;
  color: #FFFFFF;
}

/* Botón Agregar */
.btn-agregar {
  background-color: #8C7355;
  color: #FFFFFF;
  border: none;
  padding: 1rem 2rem;
  width: 100%;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-agregar:hover {
  background-color: #6E5941;
}

.error {
  text-align: center;
  padding-top: 5rem;
}
</style>