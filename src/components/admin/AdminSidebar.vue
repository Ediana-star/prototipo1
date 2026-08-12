<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="admin-sidebar">
    <!-- Encabezado del Panel -->
    <div class="sidebar-header">
      <h2>María Urbana</h2>
      <span class="rol-tag">Panel de Control</span>
    </div>

    <!-- Menú de Navegación Interno -->
  <!-- Buscá el <nav> de tu AdminSidebar y dejalo así: -->
  <nav class="sidebar-menu">
      
      <RouterLink to="/admin/catalogo" class="menu-item" active-class="activo">
        📦 Catálogo de Productos
      </RouterLink>
      

      <RouterLink to="/admin/configuracion" class="menu-item" active-class="activo">
        ⚙️ Configuración del Sitio
      </RouterLink>
    </nav>

    <!-- Botón de Salida al pie de la barra -->
    <div class="sidebar-footer">
      <RouterLink to="/" class="btn-volver-tienda">
        🚪 Volver a la Tienda
      </RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 260px;
  height: 100vh;
  background-color: #4A3B2C; /* Un marrón chocolate oscuro y profesional */
  color: #F7F5F0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #5C4A37;
  text-align: center;
}

.sidebar-header h2 {
  font-size: 1.4rem;
  margin: 0;
  color: #FFFFFF;
  letter-spacing: 1px;
}

.rol-tag {
  display: inline-block;
  font-size: 0.75rem;
  background-color: #8C7355;
  color: #FFFFFF;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  margin-top: 0.5rem;
  font-weight: bold;
}

.sidebar-menu {
  flex-grow: 1;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  color: #D1C7BD;
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #5C4A37;
  color: #FFFFFF;
}

/* Esta clase se activa sola gracias a Vue Router cuando estamos en esa pantalla */
.menu-item.activo {
  background-color: #8C7355;
  color: #FFFFFF;
  font-weight: bold;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #5C4A37;
}

.btn-volver-tienda {
  display: block;
  text-align: center;
  background-color: transparent;
  border: 1px solid #8C7355;
  color: #FFFFFF;
  text-decoration: none;
  padding: 0.7rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-volver-tienda:hover {
  background-color: #8C7355;
}
</style>