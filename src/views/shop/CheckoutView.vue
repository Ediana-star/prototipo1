<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
const router = useRouter()

const nombre = ref('')
const telefono = ref('')
const direccion = ref('')
const notas = ref('')

const totalPagar = computed(() => {
  return store.carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0)
})

// 🚨 BRECHA 1: Función actualizada para conectar con la API de WhatsApp (CU-03 Paso 10)
const confirmarPedido = () => {
  if (!nombre.value || !telefono.value || !direccion.value) {
    alert('Por favor, completá todos los campos obligatorios (*) para el envío.')
    return
  }

  // 1. Preparamos el mensaje codificado para la URL de WhatsApp
  const numeroWhatsApp = "59899123456" // Reemplaza con el número real de la tienda
  const mensaje = `Hola, soy ${nombre.value}, acabo de realizar un pedido en la web por un total de $${totalPagar.value}. Mi dirección de envío es: ${direccion.value}. Teléfono de contacto: ${telefono.value}.`
  const mensajeCodificado = encodeURIComponent(mensaje)

  // 2. Vaciamos el carrito en Pinia y registramos la orden
  store.carrito = []

  // 3. Abrimos WhatsApp en una nueva pestaña y redirigimos al inicio
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank')
  router.push('/')
}
</script>

<template>
  <ShopHeader />

  <main class="checkout-container">
    <h1 class="titulo-checkout">Finalizar Compra</h1>

    <div v-if="store.carrito.length === 0" class="checkout-vacio">
      <p>No hay productos en el carrito para procesar un pedido.</p>
      <RouterLink to="/catalogo" class="btn-volver">Ir al Catálogo</RouterLink>
    </div>

    <div v-else class="wrapper-checkout">
      
      <!-- Columna Izquierda: Formulario de Envío -->
      <form @submit.prevent="confirmarPedido" class="formulario-envio">
        <h2>O completa tus datos para un nuevo pedido:</h2>
        
        <div class="campo">
          <label for="nombre">Nombre Completo *</label>
          <input 
            type="text" 
            id="nombre" 
            v-model="nombre" 
            placeholder="Ej: María García" 
            autocomplete="name"
            required
          >
        </div>

        <div class="campo">
          <label for="telefono">Teléfono de contacto *</label>
          <input 
            type="tel" 
            id="telefono" 
            v-model="telefono" 
            placeholder="Ej: 099 123 456" 
            autocomplete="tel"
            required
          >
        </div>

        <!-- 🚨 BRECHA 2: Cambiamos a textarea expansible según requisitos del CU-03 -->
        <div class="campo">
          <label for="direccion">Dirección de envío *</label>
          <textarea 
            id="direccion" 
            v-model="direccion" 
            placeholder="Ej: Av. Principal 1234, Ap. 201 (Detallá piso o referencias)" 
            rows="3"
            required
          ></textarea>
        </div>

        <p class="nota-pago">
          *No procesamos pagos online. Una vez confirmado, coordinaremos el pago y envío por WhatsApp.
        </p>
      </form>

      <!-- Columna Derecha: Resumen de Compra (CU-03 Paso 2) -->
      <div class="resumen-final">
        <h2>Resumen de Compra</h2>
        
        <!-- 🚨 BRECHA 3: Estructura detallada con miniatura, cantidad y precio -->
        <div class="lista-resumen-checkout">
          <div class="item-checkout" v-for="item in store.carrito" :key="item.id + item.talle">
            <div class="item-mini-chico">
              <img 
                :src="item.imagen || item.producto?.imagen || 'https://via.placeholder.com/80?text=Sin+Foto'" 
                :alt="item.nombre"
                class="foto-mini-chica"
              />
            </div>
            <div class="detalles-item">
              <h4>{{ item.nombre }}</h4>
              <p>Talle: {{ item.talle }} | Cant: {{ item.cantidad }}</p>
            </div>
            <span class="precio-item">${{ item.precio * item.cantidad }}</span>
          </div>
        </div>

        <div class="totales-checkout">
          <div class="fila-total">
            <span>Subtotal</span>
            <span>${{ totalPagar }}</span>
          </div>
          <div class="fila-total">
            <span>Envío</span>
            <span class="gratis">Gratis</span>
          </div>
          <div class="fila-total final">
            <span>Total</span>
            <span>${{ totalPagar }}</span>
          </div>
        </div>

        <button type="button" @click="confirmarPedido" class="btn-confirmar">
          [Confirmar Pedido]
        </button>
      </div>

    </div>
  </main>

  <ShopFooter />
</template>

<style scoped>
.checkout-container {
  padding: 2rem 5%;
  min-height: 65vh;
}

.titulo-checkout {
  color: #333333;
  margin-bottom: 2.5rem;
  font-size: 1.8rem;
  text-align: center;
}

.checkout-vacio {
  text-align: center;
  padding: 3rem;
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
}

.btn-volver {
  display: inline-block;
  background-color: #8C7355;
  color: #FFFFFF;
  text-decoration: none;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: bold;
}

.wrapper-checkout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.formulario-envio {
  flex: 1.5;
  background-color: #FDFCF7; /* Tono cálido de los mockups */
  border: 1px solid #EAEAEA;
  padding: 2rem;
  border-radius: 8px;
}

.formulario-envio h2, .resumen-final h2 {
  font-size: 1.2rem;
  color: #333333;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #EAEAEA;
  padding-bottom: 0.5rem;
}

.campo {
  margin-bottom: 1.2rem;
}

.campo label {
  display: block;
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

.campo input, .campo textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  background-color: #FFFFFF;
  transition: border-color 0.3s;
}

.campo input:focus, .campo textarea:focus {
  outline: none;
  border-color: #8C7355;
}

.resumen-final {
  flex: 1;
  background-color: #FDFCF7;
  border: 1px solid #EAEAEA;
  padding: 2rem;
  border-radius: 8px;
}

.lista-resumen-checkout {
  max-height: 260px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

/* 🚨 Estilos para los ítems detallados con foto en el resumen */
.item-checkout {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #EAEAEA;
}

.item-mini-chico {
  width: 50px;
  height: 50px;
  background-color: #F7F5F0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #EAEAEA;
  flex-shrink: 0;
}

.foto-mini-chica {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detalles-item {
  flex: 1;
}

.detalles-item h4 {
  font-size: 0.9rem;
  color: #333333;
  margin: 0;
}

.detalles-item p {
  font-size: 0.75rem;
  color: #777777;
  margin: 0;
}

.precio-item {
  font-weight: bold;
  color: #333333;
  font-size: 0.95rem;
}

.totales-checkout {
  margin-bottom: 2rem;
}

.fila-total {
  display: flex;
  justify-content: space-between;
  color: #666666;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
}

.gratis {
  color: #2e7d32;
  font-weight: bold;
}

.final {
  border-top: 1px solid #DDDDDD;
  padding-top: 0.8rem;
  margin-top: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333333;
}

.final span:last-child {
  color: #8C7355;
}

.btn-confirmar {
  display: block;
  width: 100%;
  background-color: #C0955B; /* Tono dorado/mostaza oficial */
  color: #FFFFFF;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.btn-confirmar:hover {
  background-color: #A37F4C;
}

.nota-pago {
  font-size: 0.85rem;
  color: #666666;
  margin-top: 1.5rem;
  line-height: 1.4;
}
</style>