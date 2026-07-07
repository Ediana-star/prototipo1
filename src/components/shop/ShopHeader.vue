<script setup>
import { RouterLink } from 'vue-router'
import { useTiendaStore } from '../../stores/useTiendaStore' // 👈 Importamos el cerebro

// Inicializamos el store para poder leer la cantidad de artículos
const store = useTiendaStore()
</script>

<template>
  <header class="shop-header">
    <!-- Logo de la tienda -->
    <div class="logo">
      <RouterLink to="/">María Urbana</RouterLink>
    </div>

    <!-- Menú de navegación central -->
    <nav class="menu">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/catalogo">Catálogo</RouterLink>
    </nav>

    <!-- Ícono del carrito con CONTADOR DINÁMICO -->
    <div class="cart-icon">
      <RouterLink to="/carrito">
        🛒 Carrito 
        <!-- Si no hay ítems, muestra (0), si hay, se actualiza solo mágicamente -->
        <span class="contador">({{ store.totalArticulos }})</span>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background-color: #FFFFFF;
  border-bottom: 1px solid #EAEAEA;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #8C7355;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 2.5rem;
}

.menu a {
  text-decoration: none;
  color: #555555;
  font-weight: 500;
  transition: color 0.3s;
}

.menu a:hover {
  color: #8C7355;
}

.cart-icon a {
  text-decoration: none;
  color: #333333;
  font-weight: 500;
  transition: color 0.3s;
}

.cart-icon a:hover {
  color: #8C7355;
}

/* Un pequeño estilo extra para que el numerito resalte delicadamente */
.contador {
  color: #8C7355;
  font-weight: bold;
}
</style>