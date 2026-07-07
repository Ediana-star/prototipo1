<script setup>
import { ref, computed, watch } from 'vue' // 👈 1. IMPORTAMOS 'watch' ACÁ
import { useRoute, RouterLink } from 'vue-router'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
const route = useRoute()

// Estados reactivos de los filtros básicos
const textoBusqueda = ref('')
const talleSeleccionado = ref('Todos')
const ordenPrecio = ref('defecto')

// Inicializamos la categoría con lo que venga en la URL, o 'Todos'
const categoriaSeleccionada = ref(route.query.categoria || 'Todos')

// 🌟 LA SOLUCIÓN: Este vigilante se activa cada vez que la URL cambia
watch(
  () => route.query.categoria,
  (nuevaCategoria) => {
    // Si la URL se queda sin categoría (como en Explorar Colección), vuelve automáticamente a 'Todos'
    categoriaSeleccionada.value = nuevaCategoria || 'Todos'
  }
)

const categorias = ['Todos', 'Camisetas', 'Hoodies', 'Pantalones', 'Accesorios']
const tallesDisponibles = ['Todos', 'S', 'M', 'L', 'XL', 'Único']

// El computed de productosFiltrados queda exactamente igual...
const productosFiltrados = computed(() => {
  let resultado = store.productos.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda.value.toLowerCase()) ||
                            producto.descripcion.toLowerCase().includes(textoBusqueda.value.toLowerCase())
    
    const coincideCategoria = categoriaSeleccionada.value === 'Todos' || 
                              producto.categoria === categoriaSeleccionada.value

    const coincideTalle = talleSeleccionado.value === 'Todos' || 
                          producto.talles.includes(talleSeleccionado.value)

    return coincideBusqueda && coincideCategoria && coincideTalle
  })

  if (ordenPrecio.value === 'menor-mayor') {
    resultado.sort((a, b) => a.precio - b.precio)
  } else if (ordenPrecio.value === 'mayor-menor') {
    resultado.sort((a, b) => b.precio - a.precio)
  }

  return resultado
})
</script>

<template>
  <ShopHeader />
  
  <main class="catalogo-container">
    <h1 class="titulo-catalogo">Colección María Urbana</h1>
    
    <div class="panel-filtros">
      
      <div class="fila-controles-superior">
        <div class="buscador-caja">
          <span class="lupa">🔍</span>
          <input type="text" v-model="textoBusqueda" placeholder="¿Qué estás buscando hoy?...">
        </div>

        <div class="ordenar-caja">
          <label for="orden">Ordenar por:</label>
          <select id="orden" v-model="ordenPrecio" class="select-orden">
            <option value="defecto">Recomendados</option>
            <option value="menor-mayor">Precio: Menor a Mayor</option>
            <option value="mayor-menor">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      <div class="bloque-filtro">
        <span class="etiqueta-filtro">Categorías:</span>
        <div class="grupo-botones">
          <button 
            v-for="cat in categorias" :key="cat"
            :class="['btn-filtro', { activo: categoriaSeleccionada === cat }]"
            @click="categoriaSeleccionada = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="bloque-filtro">
        <span class="etiqueta-filtro">Filtrar por Talle:</span>
        <div class="grupo-botones">
          <button 
            v-for="talle in tallesDisponibles" :key="talle"
            :class="['btn-filtro talle', { activo: talleSeleccionado === talle }]"
            @click="talleSeleccionado = talle"
          >
            {{ talle }}
          </button>
        </div>
      </div>

    </div>

    <div class="grilla-productos" v-if="productosFiltrados.length > 0">
      <div class="tarjeta-producto" v-for="producto in productosFiltrados" :key="producto.id">
        <div class="imagen-placeholder">
          <span>👕</span>
        </div>
        
        <div class="info-producto">
          <span class="categoria">{{ producto.categoria }}</span>
          <h3 class="nombre">{{ producto.nombre }}</h3>
          <p class="precio">${{ producto.precio }}</p>
          <p class="talles-tarjeta">Talles: {{ producto.talles.join(', ') }}</p>
        </div>

        <RouterLink :to="`/producto/${producto.id}`" class="btn-ver">
          Ver Detalles
        </RouterLink>
      </div>
    </div>

    <div class="sin-resultados" v-else>
      <h3>No hay prendas que coincidan con todos estos filtros combinados.</h3>
      <p>Probá restableciendo algunos filtros para ver más opciones.</p>
    </div>

  </main>

  <ShopFooter />
</template>

<style scoped>
.catalogo-container {
  padding: 2rem 5%;
  min-height: 60vh;
}

.titulo-catalogo {
  text-align: center;
  color: #333333;
  margin-bottom: 2.5rem;
  font-size: 2rem;
}

/* Contenedor de filtros elegante */
.panel-filtros {
  background-color: #F7F5F0;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #EAEAEA;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.fila-controles-superior {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.buscador-caja {
  position: relative;
  flex: 1;
  min-width: 280px;
}

.buscador-caja input {
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  font-size: 0.95rem;
}

.lupa {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
}

/* Ordenar selector */
.ordenar-caja {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555555;
  font-size: 0.95rem;
}

.select-orden {
  padding: 0.6rem 1rem;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  background-color: #FFFFFF;
  color: #333333;
  cursor: pointer;
}

/* Bloques de categorías y talles */
.bloque-filtro {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.etiqueta-filtro {
  font-weight: bold;
  color: #555555;
  font-size: 0.9rem;
  min-width: 120px;
}

.grupo-botones {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-filtro {
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  color: #555555;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-filtro.talle {
  padding: 0.4rem 0.8rem;
  min-width: 40px;
  text-align: center;
}

.btn-filtro:hover {
  border-color: #8C7355;
  color: #8C7355;
}

.btn-filtro.activo {
  background-color: #8C7355;
  border-color: #8C7355;
  color: #FFFFFF;
}

/* Grilla de productos */
.grilla-productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2.5rem;
}

.tarjeta-producto {
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}

.tarjeta-producto:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.imagen-placeholder {
  background-color: #F7F5F0;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}

.info-producto {
  padding: 1.2rem;
  text-align: center;
  flex-grow: 1;
}

.categoria {
  font-size: 0.75rem;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nombre {
  font-size: 1.1rem;
  color: #333333;
  margin: 0.4rem 0;
}

.precio {
  font-size: 1.3rem;
  color: #8C7355;
  font-weight: bold;
}

.talles-tarjeta {
  font-size: 0.8rem;
  color: #888888;
  margin-top: 0.5rem;
}

.btn-ver {
  display: block;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  color: #8C7355;
  border: 1px solid #8C7355;
  padding: 0.7rem;
  margin: 0 1.2rem 1.2rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.btn-ver:hover {
  background-color: #8C7355;
  color: #FFFFFF;
}

.sin-resultados {
  text-align: center;
  padding: 4rem 0;
  color: #666666;
}
</style>