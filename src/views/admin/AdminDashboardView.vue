<script setup>
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
</script>

<template>
  <div class="escritorio-container">
    <h1 class="titulo-dashboard">Escritorio</h1>
    <p class="subtitulo-dashboard">Bienvenido al panel de administración de María Urbana.</p>

    <div class="grid-tarjetas">
      
      <div class="tarjeta-blanca">
        <div class="icono-box color-prod">👜</div>
        <div class="texto-box">
          <span class="titulo-card">Productos</span>
          <span class="numero-card">{{ store.productos.length }}</span>
          <span class="detalle-card">Total de productos</span>
        </div>
      </div>

      <div class="tarjeta-blanca">
        <div class="icono-box color-pedidos">📋</div>
        <div class="texto-box">
          <span class="titulo-card">Pedidos</span>
          <span class="numero-card">56</span>
          <span class="detalle-card">Total de pedidos</span>
        </div>
      </div>

      <div class="tarjeta-blanca">
        <div class="icono-box color-clientes">👥</div>
        <div class="texto-box">
          <span class="titulo-card">Clientes</span>
          <span class="numero-card">74</span>
          <span class="detalle-card">Total de clientes</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.titulo-dashboard {
  font-size: 2.2rem;
  color: #1A1A1A;
  margin: 0 0 0.3rem 0;
  font-weight: 600;
}

.subtitulo-dashboard {
  color: #666666;
  font-size: 1rem;
  margin: 0 0 2.5rem 0;
}

.grid-tarjetas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.tarjeta-blanca {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border: 1px solid #EAE5DF;
  box-shadow: 0 4px 10px rgba(0,0,0,0.01);
}

.icono-box {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

.color-prod { background-color: #F7EFE9; }
.color-pedidos { background-color: #E8F4EC; }
.color-clientes { background-color: #F5EFEB; }

.texto-box {
  display: flex;
  flex-direction: column;
}

.titulo-card {
  font-size: 0.95rem;
  font-weight: bold;
  color: #1A1A1A;
}

.numero-card {
  font-size: 2rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0.1rem 0;
}

.detalle-card {
  font-size: 0.8rem;
  color: #888888;
}
</style>