<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
const router = useRouter()

// 1. Datos reactivos para el formulario de envío
const nombre = ref('')
const telefono = ref('')
const direccion = ref('')
const notas = ref('')

// 2. Calculamos el total de la compra trayendo los datos de Pinia
const totalPagar = computed(() => {
  return store.carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0)
})

// 3. Función para procesar y finalizar la compra
const confirmarPedido = () => {
  // Validamos de forma sencilla que los campos obligatorios no estén vacíos
  if (!nombre.value || !telefono.value || !direccion.value) {
    alert('Por favor, completá todos los campos obligatorios (*) para el envío.')
    return
  }

  // Simulamos el envío exitoso del pedido
  alert(`¡Gracias por tu compra, ${nombre.value}! Tu pedido a la dirección "${direccion.value}" ha sido registrado con éxito.`)
  
  // ¡MAGIA!: Vaciamos el carrito en Pinia porque la compra ya se realizó
  store.carrito = []
  
  // Redirigimos automáticamente al usuario a la página de inicio
  router.push('/')
}
</script>

<template>
  <ShopHeader />

  <main class="checkout-container">
    <h1 class="titulo-checkout">Finalizar Compra</h1>

    <!-- Si intentan entrar al checkout sin haber agregado productos al carrito -->
    <div v-if="store.carrito.length === 0" class="checkout-vacio">
      <p>No hay productos en el carrito para procesar un pedido.</p>
      <RouterLink to="/catalogo" class="btn-volver">Ir al Catálogo</RouterLink>
    </div>

    <!-- FLUJO SEGURO: Sin buscador expuesto -->
    <div v-else class="wrapper-checkout">
      
      <!-- Columna Izquierda: Formulario de Envío Seguro -->
      <form @submit.prevent="confirmarPedido" class="formulario-envio">
        <h2>Datos para la entrega de tu pedido</h2>
        <p class="aclaracion-seguridad">
          🔒 Tus datos se procesan de forma segura para coordinar la entrega.
        </p>
        
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

        <div class="campo">
          <label for="direccion">Dirección de envío *</label>
          <input 
            type="text" 
            id="direccion" 
            v-model="direccion" 
            placeholder="Ej: Av. Principal 1234, Ap. 201" 
            autocomplete="street-address"
            required
          >
        </div>

        <div class="campo">
          <label for="notas">Notas adicionales (Opcional)</label>
          <textarea 
            id="notas" 
            v-model="notas" 
            placeholder="Ej: Tocar el timbre dos veces, dejar en portería, etc." 
            rows="3"
          ></textarea>
        </div>

        <!-- Nota aclaratoria del boceto original -->
        <p class="nota-pago">
          *No procesamos pagos online. Una vez confirmado, coordinaremos el pago y envío por WhatsApp.
        </p>
      </form>

      <!-- Columna Derecha: Tu Pedido -->
      <div class="resumen-final">
        <h2>Tu Pedido</h2>
        
        <div class="lista-resumen-checkout">
          <div class="item-checkout" v-for="item in store.carrito" :key="item.id + item.talle">
            <span class="cant-item">{{ item.cantidad }}x</span>
            <div class="detalles-item">
              <h4>{{ item.nombre }}</h4>
              <p>Talle: {{ item.talle }}</p>
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

/* Distribución en 2 columnas */
.wrapper-checkout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

/* Estilos del Formulario */
.formulario-envio {
  flex: 1.5;
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  padding: 2rem;
  border-radius: 8px;
}

.formulario-envio h2, .resumen-final h2 {
  font-size: 1.3rem;
  color: #333333;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #F0F0F0;
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
  transition: border-color 0.3s;
}

.campo input:focus, .campo textarea:focus {
  outline: none;
  border-color: #8C7355;
}

/* Estilos de la Columna Resumen */
.resumen-final {
  flex: 1;
  background-color: #F7F5F0;
  border: 1px solid #EAEAEA;
  padding: 2rem;
  border-radius: 8px;
}

.lista-resumen-checkout {
  max-height: 240px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.item-checkout {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #EAEAEA;
}

.cant-item {
  font-weight: bold;
  color: #8C7355;
}

.detalles-item {
  flex: 1;
}

.detalles-item h4 {
  font-size: 0.95rem;
  color: #333333;
  margin: 0;
}

.detalles-item p {
  font-size: 0.8rem;
  color: #777777;
  margin: 0;
}

.precio-item {
  font-weight: bold;
  color: #333333;
  font-size: 0.95rem;
}

/* Totales */
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

/* Botón de Confirmación */
.btn-confirmar {
  display: block;
  width: 100%;
  background-color: #8C7355;
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
  background-color: #6E5941;
}

.aclaracion-seguridad {
  font-size: 0.85rem;
  color: #2e7d32;
  margin-bottom: 1.5rem;
}

.nota-pago {
  font-size: 0.85rem;
  color: #666666;
  margin-top: 1.5rem;
  line-height: 1.4;
}
</style>