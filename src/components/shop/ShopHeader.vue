<script setup>
import { RouterLink } from 'vue-router'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
</script>

<template>
  <header class="shop-header">
    <!-- Logo de la tienda -->
    <div class="logo">
      <RouterLink to="/">María Urbana</RouterLink>
    </div>

    <!-- Menú de navegación central con separadores -->
    <nav class="menu">
      <RouterLink to="/" active-class="activo">Inicio</RouterLink>
      <span class="separador">|</span>
      
      <RouterLink to="/catalogo" active-class="activo">Catálogo</RouterLink>
      <span class="separador">|</span>
      
      <RouterLink to="/tabla-de-talles" active-class="activo">Tabla de talles</RouterLink>
    </nav>

    <!-- Ícono del carrito -->
    <div class="cart-icon">
      <RouterLink to="/carrito">
        🛒 Carrito 
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
  align-items: center;
  gap: 1.5rem;
}

.menu a {
  text-decoration: none;
  color: #555555;
  font-weight: 500;
  transition: color 0.3s;
  padding-bottom: 3px; /* Espacio para el borde activo */
}

.menu a:hover {
  color: #8C7355;
}

/* 🌟 Estilo para la pestaña activa (como en la maqueta) */
.menu a.activo {
  color: #8C7355;
  font-weight: 600;
  border-bottom: 2px solid #8C7355;
}

/* 🌟 Separadores de la barra de navegación */
.separador {
  color: #CCCCCC;
  font-size: 0.9rem;
  user-select: none;
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

.contador {
  color: #8C7355;
  font-weight: bold;
}
</style>