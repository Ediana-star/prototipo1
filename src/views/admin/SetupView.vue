<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const guardarAdmin = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden. Revisalas.')
    return 
  }

  if (email.value === '' || password.value === '') {
    alert('Por favor, completá todos los campos.')
    return
  }

  try {
    // Le mandamos los datos al backend real
    const respuesta = await fetch('http://localhost:8000/api/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const datos = await respuesta.json()

    if (respuesta.ok) {
      alert('¡Administrador creado con éxito en la base de datos!')
      router.push('/admin/login')
    } else {
      // Si el backend lo rechaza (ej. si ya hay un admin creado)
      alert(datos.message || 'Hubo un error al crear el administrador.')
    }
  } catch (error) {
    alert('No se pudo conectar con el servidor de Laravel.')
  }
}
</script>

<template>
  <div class="setup-layout">
    <div class="setup-card">
      
      <div class="card-header">
        <h1 class="brand-title">María <span>Urbana 🌿</span></h1>
        <h2 class="subtitle">Asistente de<br>Configuración Inicial</h2>
      </div>

      <div class="card-body">
        <h3>Definir Administrador Maestro</h3>
        
        <div class="input-group">
          <label>Correo electrónico del Administrador Principal</label>
          <!-- Usamos v-model para conectar el input con la variable -->
          <input type="email" v-model="email" placeholder="ejemplo@correo.com" />
        </div>
        
        <div class="input-group">
          <label>Contraseña</label>
          <input type="password" v-model="password" placeholder="Tu contraseña" />
        </div>
        
        <div class="input-group">
          <label>Confirmar Contraseña</label>
          <input type="password" v-model="confirmPassword" placeholder="Repetí la contraseña" />
        </div>
        
        <p class="help-text">
          Esta será la cuenta de administrador principal para el
          sistema. Por favor, defina sus credenciales iniciales.
        </p>
        
        <!-- Le decimos al botón que ejecute la función al hacer clic -->
        <button class="btn-submit" @click="guardarAdmin">
          Crear Cuenta de Administrador Maestro y Continuar
        </button>
      </div>

    </div>
    
    <p class="step-footer">Instalación de María Urbana - Paso 1</p>
  </div>
</template>

<style scoped>
/* Fondo general de toda la pantalla */
.setup-layout {
  min-height: 100vh;
  background-color: #F8F5F1; /* Beige muy clarito */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}

/* La tarjeta principal flotante */
.setup-card {
  width: 100%;
  max-width: 450px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  overflow: hidden; /* Para que el fondo beige del header no se salga de las esquinas redondeadas */
  margin-bottom: 2rem;
}

/* Cabecera beige de la tarjeta */
.card-header {
  background-color: #EBE1D3; /* Beige más oscuro */
  padding: 2.5rem 2rem;
  text-align: center;
}

.brand-title {
  margin: 0;
  font-size: 2rem;
  font-weight: normal;
  color: #2C2623;
}

.brand-title span {
  display: block; /* Manda "Urbana" a la línea de abajo si queremos ese estilo, o quítalo para que quede en una */
}

.subtitle {
  margin: 1rem 0 0 0;
  font-size: 1.5rem;
  font-weight: normal;
  color: #2C2623;
  line-height: 1.2;
}

/* Cuerpo blanco del formulario */
.card-body {
  padding: 2rem;
}

.card-body h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #000;
  text-align: center;
}

.input-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
  color: #333;
}

.input-group input {
  padding: 0.8rem;
  border: 1px solid #CCC;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
}

.input-group input:focus {
  border-color: #A68A61;
}

.help-text {
  font-size: 0.85rem;
  color: #000;
  line-height: 1.4;
  margin-bottom: 1.5rem;
}

.btn-submit {
  width: 100%;
  background-color: #A68A61; /* Marrón/Dorado */
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #8D7450;
}

.step-footer {
  font-size: 0.9rem;
  color: #555;
}
</style>