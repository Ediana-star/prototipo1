<script setup>
import { RouterLink } from 'vue-router'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
</script>

<template>
  <ShopHeader />

  <main class="home-container">
    
    <!-- 🌟 1. BANNER PRINCIPAL (HERO SECTION) -->
    <section class="hero-banner">
      <div class="hero-contenido">
        <span class="hero-subtitulo">Nueva Temporada 2026</span>
        <h1 class="hero-titulo">Sencillez, tendencia y comodidad.</h1>
        <p class="hero-descripcion">
          Diseños pensados para acompañar tu día a día con estilo propio. Descubrí prendas exclusivas hechas para vos.
        </p>
        <RouterLink to="/catalogo" class="btn-hero-cta">
          Explorar Colección
        </RouterLink>
      </div>
    </section>

    <!-- 🏷️ 2. SECCIÓN DE CATEGORÍAS DESTACADAS -->
    <section class="seccion-categorias">
      <h2 class="titulo-seccion">Comprá por Categoría</h2>
      <p class="subtitulo-seccion">Encuentra exactamente lo que estás buscando</p>
      
     <!-- Buscá la grilla de categorías y cambiá los enlaces por estos: -->
<div class="grilla-categorias-home">
  
  <div class="tarjeta-cat-home">
    <div class="cat-imagen-placeholder">👕</div>
    <h3>Camisetas</h3>
    <!-- 👇 CAMBIADO -->
    <RouterLink to="/catalogo?categoria=Camisetas" class="link-cat">Ver más →</RouterLink>
  </div>

  <div class="tarjeta-cat-home">
    <div class="cat-imagen-placeholder">🧥</div>
    <h3>Hoodies</h3>
    <!-- 👇 CAMBIADO -->
    <RouterLink to="/catalogo?categoria=Hoodies" class="link-cat">Ver más →</RouterLink>
  </div>

  <div class="tarjeta-cat-home">
    <div class="cat-imagen-placeholder">👖</div>
    <h3>Pantalones</h3>
    <!-- 👇 CAMBIADO -->
    <RouterLink to="/catalogo?categoria=Pantalones" class="link-cat">Ver más →</RouterLink>
  </div>

  <div class="tarjeta-cat-home">
    <div class="cat-imagen-placeholder">👜</div>
    <h3>Accesorios</h3>
    <!-- 👇 CAMBIADO -->
    <RouterLink to="/catalogo?categoria=Accesorios" class="link-cat">Ver más →</RouterLink>
  </div>

</div>
    </section>

    <!-- 🍂 3. BLOQUE SOBRE LA MARCA (MANIFIESTO) -->
    <section class="sobre-nosotros">
      <div class="bloque-texto-marca">
        <h2>Sobre María Urbana</h2>
        <p>
          Nacimos con el deseo de fusionar la comodidad urbana con un toque de elegancia clásica. Creemos en la moda lenta, en las prendas duraderas y en que vestirse bien todos los días debería ser un proceso simple y disfrutable.
        </p>
      </div>
    </section>

  </main>

  <ShopFooter />
</template>

<style scoped>
.home-container {
  min-height: 80vh;
}

/* --- Estilos del Banner Principal --- */
.hero-banner {
  background-color: #F3EFE9; /* Un beige un toque más profundo y cálido */
  padding: 6rem 5%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 450px;
}

.hero-contenido {
  max-width: 600px;
}

.hero-subtitulo {
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: #8C7355;
  font-weight: bold;
}

.hero-titulo {
  font-size: 3rem;
  color: #333333;
  margin: 1rem 0;
  line-height: 1.2;
  font-family: 'Playfair Display', serif; /* Si tenés una fuente serif, si no usa la de por defecto */
}

.hero-descripcion {
  color: #666666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.btn-hero-cta {
  display: inline-block;
  background-color: #8C7355;
  color: #FFFFFF;
  text-decoration: none;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-hero-cta:hover {
  background-color: #6E5941;
}

/* --- Estilos de Categorías --- */
.seccion-categorias {
  padding: 5rem 5%;
  text-align: center;
}

.titulo-seccion {
  font-size: 2rem;
  color: #333333;
  margin-bottom: 0.5rem;
}

.subtitulo-seccion {
  color: #888888;
  margin-bottom: 3rem;
}

.grilla-categorias-home {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.tarjeta-cat-home {
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  padding: 2.5rem 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s;
}

.tarjeta-cat-home:hover {
  transform: translateY(-5px);
}

.cat-imagen-placeholder {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.tarjeta-cat-home h3 {
  font-size: 1.2rem;
  color: #333333;
  margin-bottom: 0.8rem;
}

.link-cat {
  color: #8C7355;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
}

/* --- Estilos sobre la marca --- */
.sobre-nosotros {
  background-color: #FFFFFF;
  padding: 6rem 5%;
  display: flex;
  justify-content: center;
  border-top: 1px solid #F0F0F0;
}

.bloque-texto-marca {
  max-width: 700px;
  text-align: center;
}

.bloque-texto-marca h2 {
  font-size: 1.8rem;
  color: #333333;
  margin-bottom: 1.5rem;
}

.bloque-texto-marca p {
  color: #666666;
  line-height: 1.8;
  font-size: 1.1rem;
}
</style>