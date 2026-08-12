<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const route = useRoute()
const store = useTiendaStore()

const productoId = Number(route.params.id)

const producto = computed(() => {
  return store.productos.find(p => p.id === productoId)
})

const talleSeleccionado = ref('')

// 🚨 BRECHA 1: Creamos el estado para la cantidad (por defecto en 1)
const cantidadSeleccionada = ref(1)

// 🚨 Funciones para aumentar o disminuir la cantidad sin bajar de 1
const aumentarCantidad = () => {
  cantidadSeleccionada.value++
}

const disminuirCantidad = () => {
  if (cantidadSeleccionada.value > 1) {
    cantidadSeleccionada.value--
  }
}

const agregarAlCarritoReal = () => {
  if (!talleSeleccionado.value) {
    alert('Por favor, seleccioná un talle antes de agregar al carrito.')
    return
  }
  
  // 🚨 BRECHA 2: Pasamos la cantidad seleccionada a la tienda Pinia
  store.agregarAlCarrito(producto.value, talleSeleccionado.value, cantidadSeleccionada.value)
  
  alert(`¡Listo! Agregaste ${cantidadSeleccionada.value} unidad(es) de ${producto.value.nombre} (Talle: ${talleSeleccionado.value}) al carrito.`)
}
</script>

<template>
  <ShopHeader />
  
  <main class="detalle-container" v-if="producto">
    
    <RouterLink to="/catalogo" class="btn-volver">← Volver al Catálogo</RouterLink>

    <div class="wrapper-producto">
      <div class="foto-grande">
        <img 
          :src="producto.imagen || 'https://via.placeholder.com/500?text=Sin+Foto'" 
          :alt="producto.nombre"
          class="imagen-detalle"
        />
      </div>

      <div class="info-compra">
        <span class="categoria">{{ producto.categoria }}</span>
        <h1 class="nombre">{{ producto.nombre }}</h1>
        <p class="precio">${{ producto.precio }}</p>
        <p class="descripcion">{{ producto.descripcion }}</p>

        <!-- Contenedor flex para Talles y Cantidad -->
        <div class="controles-compra">
          
          <div class="seccion-talles">
            <h3>Talles disponibles</h3>
            <div class="lista-talles">
              <!-- 
                🚨 BRECHA 3 (Requisito futuro): 
                Cuando Pinia maneje el stock por talle, deberás agregar aquí la condición:
                :disabled="!producto.stockTalles[talle] > 0"
              -->
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

          <!-- 🚨 BRECHA 1: Selector de Cantidad -->
          <div class="seccion-cantidad">
             <!-- Puedes omitir el h3 si quieres que se vea igual al mockup -->
            <div class="selector-cantidad">
              <button class="btn-cant" @click="disminuirCantidad" :disabled="cantidadSeleccionada === 1">−</button>
              <span class="numero-cant">{{ cantidadSeleccionada }}</span>
              <button class="btn-cant" @click="aumentarCantidad">+</button>
            </div>
          </div>

        </div>

        <button class="btn-agregar" @click="agregarAlCarritoReal">
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>

  </main>

  <main class="detalle-container error" v-else>
    <h2>Ups... El producto que buscás no existe.</h2>
    <RouterLink to="/catalogo" class="btn-volver">Volver al Catálogo</RouterLink>
  </main>

  <ShopFooter />
</template>

<style scoped>
/* Conserve los estilos existentes y añadí los nuevos al final */
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
  border-radius: 8px;
  border: 1px solid #EAEAEA;
  overflow: hidden; 
}

.imagen-detalle {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
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

/* 🚨 Estilos Nuevos para Controles de Compra */
.controles-compra {
  display: flex;
  align-items: flex-end; /* Alinea los elementos a la parte inferior */
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.seccion-talles h3 {
  font-size: 0.9rem; /* Un poco más pequeño como en el mockup */
  color: #333333;
  margin-bottom: 0.8rem;
}

.lista-talles {
  display: flex;
  gap: 0.8rem;
}

.btn-talle {
  background-color: transparent;
  border: 1px solid #DDDDDD;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s;
  min-width: 45px;
}

.btn-talle:hover {
  border-color: #8C7355;
}

.btn-talle.activo {
  border-color: #8C7355;
  background-color: transparent; /* En el mockup el activo solo tiene el borde más oscuro */
  font-weight: bold;
}

/* 🚨 Estilos Selector de Cantidad */
.selector-cantidad {
  display: flex;
  align-items: center;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  padding: 0.2rem;
}

.btn-cant {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  color: #555555;
}

.btn-cant:disabled {
  color: #CCCCCC;
  cursor: not-allowed;
}

.numero-cant {
  padding: 0 1rem;
  font-weight: bold;
  color: #333333;
}

.btn-agregar {
  background-color: #C0955B; /* Color mostaza/dorado del mockup */
  color: #FFFFFF;
  border: none;
  padding: 1.2rem 2rem;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-agregar:hover {
  background-color: #A37F4C;
}

.error {
  text-align: center;
  padding-top: 5rem;
}
</style>