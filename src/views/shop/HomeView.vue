<script setup>
import { RouterLink } from 'vue-router'
import ShopHeader from '../../components/shop/ShopHeader.vue'
import ShopFooter from '../../components/shop/ShopFooter.vue'
import { useTiendaStore } from '../../stores/useTiendaStore'

// --- Importaciones para el Carrusel Swiper ---
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

// --- Importación de tus imágenes ---
// Asegurate de que estas rutas coincidan con tu estructura
import img1 from '@/assets/images/lentesLampara.jpg'
import img2 from '@/assets/images/vest.jpg'
import img3 from '@/assets/images/carteraUnias.jpg'

const store = useTiendaStore()

// Módulos que usa Swiper para autoplay y el efecto desvanecimiento
const swiperModules = [Autoplay, EffectFade]
</script>

<template>
  <ShopHeader />

  <main class="home-container">
    
    <!-- 🌟 1. BANNER PRINCIPAL (CARRUSEL SWIPER) -->
    <section class="hero-banner-slider">
     <swiper
        :modules="swiperModules"
        :slides-per-view="1"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :speed="300"
        :loop="true"
        :autoplay="{ delay: 4500, disableOnInteraction: false }"
        class="mySwiper"
      >
        <!-- Slide 1 -->
        <swiper-slide>
          <div class="slide-content" :style="{ backgroundImage: `url(${img1})` }">
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
          </div>
        </swiper-slide>

        <!-- Slide 2 -->
        <swiper-slide>
          <div class="slide-content" :style="{ backgroundImage: `url(${img2})` }">
            <div class="hero-contenido">
              <span class="hero-subtitulo">Colección Urbana</span>
              <h1 class="hero-titulo">Elegancia en cada paso.</h1>
              <p class="hero-descripcion">
                Renová tu armario con tonos cálidos y texturas suaves que marcan la diferencia.
              </p>
              <RouterLink to="/catalogo" class="btn-hero-cta">
                Explorar Colección
              </RouterLink>
            </div>
          </div>
        </swiper-slide>

        <!-- Slide 3 -->
        <swiper-slide>
          <div class="slide-content" :style="{ backgroundImage: `url(${img3})` }">
            <div class="hero-contenido">
              <span class="hero-subtitulo">Accesorios Destacados</span>
              <h1 class="hero-titulo">El toque final perfecto.</h1>
              <p class="hero-descripcion">
                Completá tu look con detalles que resaltan tu personalidad vayas donde vayas.
              </p>
              <RouterLink to="/catalogo" class="btn-hero-cta">
                Explorar Colección
              </RouterLink>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <!-- 🏷️ 2. SECCIÓN DE CATEGORÍAS DESTACADAS -->
    <section class="seccion-categorias">
      <h2 class="titulo-seccion">Comprá por Categoría</h2>
      <p class="subtitulo-seccion">Encuentra exactamente lo que estás buscando</p>
      
      <div class="grilla-categorias-home">
        <div class="tarjeta-cat-home">
          <div class="cat-imagen-placeholder">👕</div>
          <h3>Camisetas</h3>
          <RouterLink to="/catalogo?categoria=Camisetas" class="link-cat">Ver más →</RouterLink>
        </div>

        <div class="tarjeta-cat-home">
          <div class="cat-imagen-placeholder">🧥</div>
          <h3>Hoodies</h3>
          <RouterLink to="/catalogo?categoria=Hoodies" class="link-cat">Ver más →</RouterLink>
        </div>

        <div class="tarjeta-cat-home">
          <div class="cat-imagen-placeholder">👖</div>
          <h3>Pantalones</h3>
          <RouterLink to="/catalogo?categoria=Pantalones" class="link-cat">Ver más →</RouterLink>
        </div>

        <div class="tarjeta-cat-home">
          <div class="cat-imagen-placeholder">👜</div>
          <h3>Accesorios</h3>
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

/* --- Estilos del Banner Principal (Carrusel) --- */
.hero-banner-slider {
  height: 550px;
  background-color: #F3EFE9;
  position: relative;
}

.mySwiper {
  width: 100%;
  height: 100%;
}

.slide-content {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 15%; /* Ajusta esto si ves que corta la cabeza de las modelos */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5%;
  position: relative;
}

/* Degrado sutil para que el texto siempre sea legible sin importar la foto de fondo */
.slide-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(243, 239, 233, 0.95) 0%, rgba(243, 239, 233, 0.6) 45%, rgba(243, 239, 233, 0) 100%);
  z-index: 1;
}

.hero-contenido {
  max-width: 600px;
  position: relative;
  z-index: 2; /* Para que quede por encima del degradado */
}

/* Suaviza la transición entre fotos (Fade elegante de 1.2 segundos) */
.swiper-fade .swiper-slide {
  transition-duration: 1200ms !important;
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
  font-family: 'Playfair Display', serif;
}

.hero-descripcion {
  color: #555555;
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

/* --- Ajustes Mobile para el Slider --- */
@media (max-width: 768px) {
  .slide-content::before {
    /* En móvil el degradado cubre todo para que se lea el texto centrado */
    background: rgba(243, 239, 233, 0.85); 
  }
  .slide-content {
    justify-content: center;
    text-align: center;
  }
  .hero-titulo {
    font-size: 2.2rem;
  }
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