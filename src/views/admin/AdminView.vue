<script setup>
import { RouterView } from 'vue-router'
import AdminSidebar from '../../components/admin/AdminSidebar.vue'
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />

    <div class="admin-bloque-derecho">
      
      <header class="admin-topbar">
        <div class="topbar-buscador">
          <span class="icono-buscar">🔍</span>
          <input type="text" placeholder="Buscar..." />
        </div>
        <div class="topbar-usuario">
          <span class="notificacion-bell">🔔</span>
          <div class="usuario-perfil">
            <span class="avatar-placeholder">👤</span>
            <span class="usuario-nombre">Hola, Administrador ▼</span>
          </div>
        </div>
      </header>

      <main class="admin-contenido-dinamico">
        <RouterView />
      </main>

    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  background-color: #F4EFEA; /* Fondo beige claro de la imagen */
  min-height: 100vh;
}

.admin-bloque-derecho {
  flex-grow: 1;
  padding-left: 260px; /* Evita que la barra lateral tape el contenido */
  display: flex;
  flex-direction: column;
}

.admin-topbar {
  background-color: #FFFFFF;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid #EAE5DF;
}

.topbar-buscador {
  display: flex;
  align-items: center;
  background-color: #F9F7F5;
  border: 1px solid #E2DDD7;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 300px;
}

.topbar-buscador input {
  border: none;
  background: transparent;
  margin-left: 0.5rem;
  outline: none;
  width: 100%;
  font-size: 0.9rem;
}

.topbar-usuario {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.usuario-perfil {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.avatar-placeholder {
  font-size: 1.2rem;
  background-color: #EFECE8;
  padding: 0.3rem;
  border-radius: 50%;
}

.usuario-nombre {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4A3E3D;
}

.admin-contenido-dinamico {
  padding: 2.5rem;
  flex-grow: 1;
}
</style>