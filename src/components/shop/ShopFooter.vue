<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="shop-footer">
    <!-- Grilla principal de 4 columnas -->
    <div class="footer-grid">
      
      <!-- Columna 1: Marca y descripción -->
      <div class="col-footer">
        <h3 class="brand-title">María Urbana</h3>
        <p class="brand-desc">
          Tienda de ropa femenina con lo mejor de las tendencias y la comodidad.
        </p>
      </div>

      <!-- Columna 2: Atención al cliente -->
      <div class="col-footer">
        <h4>Atención al cliente</h4>
        <ul class="lista-footer">
          <li><a href="https://wa.me/59800000000" target="_blank">💬 WhatsApp</a></li>
          <li><a href="mailto:info@mariaurbana.com">✉️ info@mariaurbana.com</a></li>
        </ul>
      </div>

      <!-- Columna 3: Seguinos -->
      <div class="col-footer">
        <h4>Seguinos</h4>
        <ul class="lista-footer">
          <li><a href="https://instagram.com" target="_blank">📷 Instagram</a></li>
          <li><a href="https://facebook.com" target="_blank">📘 Facebook</a></li>
        </ul>
      </div>

      
    </div>

    <!-- Parte inferior: Acceso Admin + Copyright -->
    <div class="footer-bottom">
      <RouterLink to="/admin/login" class="link-admin">
        🔒 Acceso Administrador
      </RouterLink>
      <p class="copyright">
        © 2026 María Urbana - Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.shop-footer {
  background-color: #ead3b7; /* Tono beige suave igual al fondo de la maqueta */
  border-top: 1px solid #EAE5DF;
  padding: 3.5rem 6% 1.5rem 6%;
  margin-top: 4rem;
  color: #554A46;
}

/* Grilla responsive que distribuye las 4 columnas de forma prolija */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto 3rem auto;
}

.brand-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2C2623;
  margin-bottom: 0.6rem;
}

.brand-desc {
  color: #7A6E65;
  font-size: 0.88rem;
  line-height: 1.5;
}

.col-footer h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #2C2623;
  margin-bottom: 1rem;
}

.lista-footer {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-footer li {
  margin-bottom: 0.6rem;
}

.lista-footer a {
  color: #665B55;
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.3s;
}

.lista-footer a:hover {
  color: #8C7355;
}

/* Sección inferior central */
.footer-bottom {
  border-top: 1px solid #EAE5DF;
  padding-top: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.link-admin {
  color: #8C7355;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.link-admin:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.copyright {
  font-size: 0.8rem;
  color: #8A7E77;
}
</style>