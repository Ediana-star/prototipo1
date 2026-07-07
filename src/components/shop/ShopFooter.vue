<template>
  <footer class="shop-footer">
    <div class="footer-content">
      <div class="brand">
        <h3>María Urbana</h3>
        <p>Estilo, calidad y comodidad en cada prenda.</p>
      </div>
      
      <!-- Nuevos enlaces de soporte al cliente -->
      <div class="links">
        <a href="#">Preguntas Frecuentes</a>
        <a href="#">Políticas de Cambio</a>
        <a href="#">Contacto</a>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2026 María Urbana. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.shop-footer {
  background-color: #F7F5F0; /* Un beige un poco más oscurito para diferenciarlo del fondo */
  border-top: 1px solid #EAEAEA;
  padding: 3rem 5% 1rem 5%;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.brand h3 {
  color: #8C7355;
  margin-bottom: 0.5rem;
}

.brand p {
  color: #666666;
  font-size: 0.9rem;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.links a {
  text-decoration: none;
  color: #555555;
  transition: color 0.3s;
}

.links a:hover {
  color: #8C7355;
}

.copyright {
  text-align: center;
  color: #999999;
  font-size: 0.8rem;
  border-top: 1px solid #EAEAEA;
  padding-top: 1rem;
}
</style>