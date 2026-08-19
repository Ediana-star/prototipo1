<script setup>
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()

const confirmarVenta = (pedido) => {
  const confirmar = confirm(`¿Confirmar entrega del pedido #${pedido.id}? Se descontará el stock de las prendas.`)
  if (confirmar) {
    store.completarPedido(pedido.id)
  }
}

const rechazarVenta = (pedido) => {
  const confirmar = confirm(`¿Cancelar el pedido #${pedido.id}? El stock no se verá afectado.`)
  if (confirmar) {
    store.cancelarPedido(pedido.id)
  }
}
</script>

<template>
  <div class="admin-pedidos-container">
    <div class="header-pantalla-admin">
      <div>
        <h1>Gestión de Pedidos</h1>
        <p class="subtitulo">Revisá los pedidos recibidos desde la web y confirmá las ventas para descontar el stock.</p>
      </div>
    </div>

    <div v-if="store.pedidos.length === 0" class="sin-pedidos">
      <p>Aún no hay pedidos registrados.</p>
    </div>

    <div v-else class="lista-pedidos">
      <div 
        v-for="pedido in store.pedidos" 
        :key="pedido.id" 
        :class="['tarjeta-pedido', pedido.estado.toLowerCase()]"
      >
        <div class="header-pedido">
          <div>
            <span class="id-pedido">Pedido #{{ pedido.id }}</span>
            <span class="fecha-pedido">{{ pedido.fecha }}</span>
          </div>
          <span :class="['badge-estado', pedido.estado.toLowerCase()]">
            {{ pedido.estado }}
          </span>
        </div>

        <div class="cuerpo-pedido">
          <div class="info-cliente">
            <h4>Datos del Cliente</h4>
            <p><strong>Nombre:</strong> {{ pedido.cliente.nombre }}</p>
            <p><strong>Teléfono:</strong> {{ pedido.cliente.telefono }}</p>
            <p><strong>Dirección:</strong> {{ pedido.cliente.direccion }}</p>
          </div>

          <div class="info-items">
            <h4>Prendas Solicitadas</h4>
            <ul>
              <li v-for="(item, index) in pedido.items" :key="index">
                {{ item.cantidad }}x {{ item.nombre }} (Talle: {{ item.talle }}) - ${{ item.precio * item.cantidad }}
              </li>
            </ul>
            <p class="total-pedido">Total: <span>${{ pedido.total }}</span></p>
          </div>
        </div>

        <!-- Botones de Acción (solo visibles si está Pendiente) -->
        <div v-if="pedido.estado === 'Pendiente'" class="acciones-pedido">
          <button @click="confirmarVenta(pedido)" class="btn-aprobar">
            ✓ Confirmar Entrega y Descontar Stock
          </button>
          <button @click="rechazarVenta(pedido)" class="btn-cancelar">
            ✕ Cancelar Pedido
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-pedidos-container {
  padding: 1rem 0;
}

.header-pantalla-admin h1 {
  font-size: 1.8rem;
  color: #333333;
  margin: 0 0 0.3rem 0;
}

.subtitulo {
  color: #777777;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.sin-pedidos {
  background-color: #FFFFFF;
  padding: 3rem;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #EAEAEA;
  color: #777777;
}

.lista-pedidos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tarjeta-pedido {
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 5px solid #8C7355;
}

.tarjeta-pedido.entregado {
  border-left-color: #2E7D32;
}

.tarjeta-pedido.cancelado {
  border-left-color: #C0392B;
  opacity: 0.7;
}

.header-pedido {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F0F0F0;
  padding-bottom: 0.8rem;
  margin-bottom: 1rem;
}

.id-pedido {
  font-weight: bold;
  color: #333333;
  margin-right: 1rem;
}

.fecha-pedido {
  font-size: 0.85rem;
  color: #888888;
}

.badge-estado {
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.badge-estado.pendiente {
  background-color: #FFF3CD;
  color: #856404;
}

.badge-estado.entregado {
  background-color: #D4EDDA;
  color: #155724;
}

.badge-estado.cancelado {
  background-color: #F8D7DA;
  color: #721C24;
}

.cuerpo-pedido {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.info-cliente, .info-items {
  flex: 1;
  min-width: 250px;
}

.info-cliente h4, .info-items h4 {
  font-size: 0.95rem;
  color: #555555;
  margin-top: 0;
  margin-bottom: 0.6rem;
}

.info-cliente p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  color: #444444;
}

.info-items ul {
  list-style: none;
  padding: 0;
  margin: 0 0 0.8rem 0;
}

.info-items li {
  font-size: 0.9rem;
  color: #444444;
  padding: 0.2rem 0;
}

.total-pedido {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333333;
  margin: 0;
}

.total-pedido span {
  color: #8C7355;
}

.acciones-pedido {
  display: flex;
  gap: 1rem;
  border-top: 1px solid #F0F0F0;
  padding-top: 1rem;
}

.btn-aprobar {
  background-color: #2E7D32;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
}

.btn-cancelar {
  background-color: #FFF0F0;
  color: #C0392B;
  border: 1px solid #C0392B;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
}

.btn-aprobar:hover {
  background-color: #1B5E20;
}

.btn-cancelar:hover {
  background-color: #C0392B;
  color: white;
}
</style>