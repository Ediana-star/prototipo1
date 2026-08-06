<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()
const router = useRouter()

const usuario = ref('')
const clave = ref('')
const errorMsg = ref('')

const iniciarSesion = () => {
  errorMsg.value = ''

  if (!usuario.value.trim() || !clave.value.trim()) {
    errorMsg.value = 'Por favor, completá todos los campos.'
    return
  }

  // Intentamos iniciar sesión mediante la acción de Pinia
  const exito = store.loginAdmin(usuario.value, clave.value)

  if (exito) {
    router.push('/admin') // Redirigimos al Dashboard
  } else {
    errorMsg.value = 'Credenciales inválidas. Verificá tu usuario y contraseña.'
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      
      <!-- Encabezado con la marca -->
      <div class="brand-header">
        <h1 class="logo-text">María Urbana</h1>
        <span class="badge-admin">🔒 Panel de Control</span>
      </div>

      <p class="instrucciones">
        Ingresá tus credenciales de administrador para gestionar el catálogo y pedidos.
      </p>

      <!-- Formulario de Login -->
      <form @submit.prevent="iniciarSesion" class="form-admin">
        
        <div class="form-group">
          <label for="usuario">Usuario</label>
          <input 
            id="usuario"
            type="text" 
            v-model="usuario" 
            placeholder="Ej: admin"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label for="clave">Contraseña</label>
          <input 
            id="clave"
            type="password" 
            v-model="clave" 
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>

        <!-- Mensaje de error dinámico -->
        <div v-if="errorMsg" class="error-box">
          ⚠️ {{ errorMsg }}
        </div>

        <button type="submit" class="btn-ingresar">
          Ingresar al Panel
        </button>
      </form>

      <!-- Enlace para volver a la tienda pública -->
      <div class="footer-card">
        <RouterLink to="/" class="btn-volver">
          ← Volver a la Tienda
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FAF8F5; /* Tono beige suave cálido */
  padding: 1.5rem;
}

.login-card {
  background-color: #FFFFFF;
  border: 1px solid #EAE5DF;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
}

.brand-header {
  text-align: center;
  margin-bottom: 0.8rem;
}

.logo-text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.8rem;
  color: #2C2623;
  margin-bottom: 0.4rem;
}

.badge-admin {
  display: inline-block;
  background-color: #F3EFEA;
  color: #8C7355;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.instrucciones {
  text-align: center;
  color: #7A6E65;
  font-size: 0.88rem;
  line-height: 1.4;
  margin-bottom: 2rem;
}

.form-admin {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4A3E3D;
}

input {
  padding: 0.8rem 1rem;
  border: 1px solid #DDD7D0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #2C2623;
  background-color: #FAFAFA;
  outline: none;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #8C7355;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(140, 115, 85, 0.1);
}

.error-box {
  background-color: #FDF2F2;
  border: 1px solid #F8B4B4;
  color: #9B1C1C;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.btn-ingresar {
  background-color: #8C7355;
  color: #FFFFFF;
  border: none;
  padding: 0.9rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}

.btn-ingresar:hover {
  background-color: #6E5941;
}

.footer-card {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #F3EFEA;
}

.btn-volver {
  color: #8A7E77;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.btn-volver:hover {
  color: #2C2623;
}
</style>