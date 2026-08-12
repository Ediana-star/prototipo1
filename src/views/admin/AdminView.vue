<script setup>
import { RouterView, useRouter } from 'vue-router'
import AdminSidebar from '../../components/admin/AdminSidebar.vue'
import { ref, onMounted } from 'vue'

const router = useRouter()

const nombreAdmin = ref('Administrador')

onMounted(() => {
  const correoGuardado = localStorage.getItem('adminEmail')

  if (correoGuardado) {
    nombreAdmin.value = correoGuardado.split('@')[0]
  }
})

// ==========================================
// 🔒 CERRAR SESIÓN
// ==========================================
const cerrarSesion = () => {
  localStorage.removeItem('sesionIniciada')

  // Después de cerrar sesión, volvemos al login
  router.push('/admin/login')
}
</script>


<template>
  <div class="admin-layout">
    <AdminSidebar />

    <div class="admin-bloque-derecho">
      
      <header class="admin-topbar">
       <div class="topbar-usuario">
  <div class="usuario-perfil">
    <span class="avatar-placeholder">👤</span>
    <span class="usuario-nombre">Hola, {{ nombreAdmin }}</span>
  </div>

  <button class="btn-cerrar-sesion" @click="cerrarSesion">
    Cerrar sesión
  </button>
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
  /* CAMBIAMOS ESTO: de space-between a flex-end */
  justify-content: flex-end; 
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

.btn-cerrar-sesion {
  background-color: transparent;
  border: 1px solid #DDD7D0;
  color: #6E5941;
  padding: 0.55rem 0.9rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cerrar-sesion:hover {
  background-color: #F3EFEA;
  border-color: #8C7355;
}
</style>