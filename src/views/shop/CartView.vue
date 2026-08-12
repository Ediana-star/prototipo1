<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()

// Usamos un computed local para calcular el precio total a pagar en tiempo real
const totalPagar = computed(() => {
  return store.carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0)
})
</script>

<template>
  <ShopHeader />

  <main class="carrito-container">
    <h1 class="titulo-carrito">Tu Carrito</h1>

    <div v-if="store.carrito.length === 0" class="carrito-vacio">
      <p>Tu carrito está vacío</p>
      <p class="subtexto">¿No sabés por dónde empezar? ¡Mirá nuestras prendas exclusivas!</p>
      <RouterLink to="/catalogo" class="btn-ir-catalogo">Volver al Catálogo</RouterLink>
    </div>

    <div v-else class="wrapper-carrito">
      
      <div class="lista-items">
        <div class="item-carrito" v-for="item in store.carrito" :key="item.id + item.talle">
          
          <!-- Miniatura con la foto real del producto -->
          <div class="item-mini">
            <img 
              :src="item.imagen || item.producto?.imagen || 'https://via.placeholder.com/100?text=Sin+Foto'" 
              :alt="item.nombre"
              class="foto-mini"
            />
          </div>

          <div class="item-detalles">
            <span class="item-cat">{{ item.categoria }}</span>
            <h3>{{ item.nombre }}</h3>
            <p class="item-talle">Talle: <strong>{{ item.talle }}</strong></p>
          </div>

          <div class="item-cantidad">
            <!-- 🚨 BRECHA 1: Agregamos :disabled cuando la cantidad es 1 (CU-02 A2) -->
            <button 
               @click="item.cantidad > 1 ? item.cantidad-- : null" 
               :disabled="item.cantidad === 1"
               class="btn-cant"
            >
              -
            </button>
            <span class="numero-cant">{{ item.cantidad }}</span>
            <button 
              @click="item.cantidad++" 
              class="btn-cant"
            >
              +
            </button>
          </div>

          <div class="item-subtotal">
            <p>${{ item.precio * item.cantidad }}</p>
          </div>

          <!-- 🚨 BRECHA 2: Cambiamos el tacho por la X acorde al mockup y CU-02 A4 -->
          <button 
            @click="store.eliminarDelCarrito(item.id, item.talle)" 
            class="btn-eliminar"
            title="Eliminar producto"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="resumen-compra">
        <h3>Resumen del Pedido</h3>
        
        <div class="fila-resumen">
          <span>Productos ({{ store.totalArticulos }})</span>
          <span>${{ totalPagar }}</span>
        </div>
        
        <div class="fila-resumen envio">
          <span>Envío</span>
          <span class="gratis">Gratis</span>
        </div>

        <div class="fila-resumen total">
          <span>Total</span>
          <span>${{ totalPagar }}</span>
        </div>

        <!-- 🚨 BRECHA 3: Cambiamos el texto a "Finalizar Compra" según CU-02 Paso 5 -->
        <RouterLink to="/checkout" class="btn-proceder">
          Finalizar Compra
        </RouterLink>
      </div>

    </div>
  </main>

  <ShopFooter />
</template>

<style scoped>
.carrito-container {
  padding: 2rem 5%;
  min-height: 65vh;
}

.titulo-carrito {
  color: #333333;
  margin-bottom: 2.5rem;
  font-size: 1.8rem;
}

/* Estilos de Carrito Vacío */
.carrito-vacio {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
}

.carrito-vacio p {
  font-size: 1.3rem;
  color: #555555;
}

.carrito-vacio .subtexto {
  font-size: 1rem;
  color: #999999;
  margin: 0.5rem 0 2rem 0;
}

.btn-ir-catalogo {
  display: inline-block;
  background-color: #8C7355;
  color: #FFFFFF;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-ir-catalogo:hover {
  background-color: #6E5941;
}

/* Distribución del Carrito Lleno (2 Columnas) */
.wrapper-carrito {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.lista-items {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Fila de cada producto */
.item-carrito {
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  padding: 1.5rem;
  border-radius: 8px;
  gap: 1.5rem;
}

.item-mini {
  background-color: #F7F5F0;
  width: 70px;
  height: 70px;
  border-radius: 6px;
  border: 1px solid #EAEAEA;
  overflow: hidden; 
  flex-shrink: 0;   
}

.foto-mini {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
}

.item-detalles {
  flex: 2;
}

.item-cat {
  font-size: 0.75rem;
  color: #999999;
  text-transform: uppercase;
}

.item-detalles h3 {
  font-size: 1.1rem;
  color: #333333;
  margin: 0.2rem 0;
}

.item-talle {
  font-size: 0.9rem;
  color: #666666;
}

/* Controles de más/menos cantidad */
.item-cantidad {
  display: flex;
  align-items: center;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  overflow: hidden;
}

.btn-cant {
  background-color: #FFFFFF;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  color: #555555;
  transition: background-color 0.2s;
}

.btn-cant:hover:not(:disabled) {
  background-color: #F0F0F0;
}

/* Estilo visual cuando el botón menos está deshabilitado */
.btn-cant:disabled {
  color: #CCCCCC;
  cursor: not-allowed;
}

.numero-cant {
  padding: 0 1rem;
  font-weight: bold;
  color: #333333;
}

.item-subtotal {
  flex: 1;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  color: #8C7355;
}

.btn-eliminar {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #333333;
  transition: transform 0.2s, color 0.2s;
}

.btn-eliminar:hover {
  transform: scale(1.15);
  color: #C0392B;
}

/* Columna de la Derecha: El Resumen */
.resumen-compra {
  flex: 1;
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  padding: 2rem;
  border-radius: 8px;
}

.resumen-compra h3 {
  font-size: 1.3rem;
  color: #333333;
  border-bottom: 1px solid #F0F0F0;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.fila-resumen {
  display: flex;
  justify-content: space-between;
  color: #666666;
  margin-bottom: 1rem;
}

.envio .gratis {
  color: #2e7d32;
  font-weight: bold;
}

.total {
  border-top: 1px solid #F0F0F0;
  padding-top: 1rem;
  margin-top: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333333;
}

.total span:last-child {
  color: #8C7355;
}

.btn-proceder {
  display: block;
  text-align: center;
  background-color: #C0955B; /* Tono dorado/mostaza de la marca */
  color: #FFFFFF;
  text-decoration: none;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.95rem;
  transition: background-color 0.3s;
}

.btn-proceder:hover {
  background-color: #A37F4C;
}
</style>