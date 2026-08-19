<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()

// Variable para controlar qué producto se está editando en el modal
const productoEditando = ref(null)

// --- LÓGICA DEL CARTELITO ---
const mostrarNotificacion = ref(false)
const mensajeNotificacion = ref('')
const tipoNotificacion = ref('exito')

const mostrarAviso = (mensaje, tipo = 'exito') => {
  mensajeNotificacion.value = mensaje
  tipoNotificacion.value = tipo
  mostrarNotificacion.value = true
  
  setTimeout(() => {
    mostrarNotificacion.value = false
  }, 3000)
}
// ----------------------------

const abrirEdicion = (producto) => {
  productoEditando.value = { ...producto }
}

const guardarCambios = () => {
  const index = store.productos.findIndex(p => p.id === productoEditando.value.id)
  if (index !== -1) {
    store.productos[index] = { ...productoEditando.value }
  }
  productoEditando.value = null 
  
  mostrarAviso('¡Los cambios se guardaron correctamente!', 'exito')
}

const eliminarProducto = (id, nombre) => {
  const confirmar = confirm(`¿Estás seguro de que querés eliminar "${nombre}" del catálogo?`)
  if (confirmar) {
    store.productos = store.productos.filter(p => p.id !== id)
    mostrarAviso(`El producto "${nombre}" fue eliminado.`, 'exito')
  }
}
</script>

<template>
  <div class="admin-view-container">
    
    <div class="header-pantalla-admin">
      <div>
        <h1>Control de Inventario</h1>
        <p class="subtitulo">Gestioná los productos visibles en la tienda, editá sus precios y controlá los talles.</p>
      </div>
      
      <RouterLink to="/admin/agregar-producto" class="btn-agregar-nuevo">
        ➕ Agregar Nuevo Producto
      </RouterLink>
    </div>

    <!-- Tabla de Productos -->
    <div class="contenedor-tabla card-admin">
      <table class="tabla-admin">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prenda</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Disponibles</th>
            <th>Talles Activos</th>
            <th class="texto-derecha">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in store.productos" :key="producto.id">
            <td class="col-id">#{{ producto.id }}</td>
            
            <td class="col-prenda">
              <div class="info-prenda-tabla">
                <div class="contenedor-foto-tabla">
                  <img :src="producto.imagen || 'https://via.placeholder.com/50'" alt="Foto prenda" class="foto-miniatura-tabla" />
                </div>
                <div>
                  <span class="nombre-prenda">{{ producto.nombre }}</span>
                  <span class="descripcion-corta">{{ producto.descripcion.substring(0, 45) }}...</span>
                </div>
              </div>
            </td>
            
            <td><span class="tag-categoria-admin">{{ producto.categoria }}</span></td>
            <td class="precio-admin">${{ producto.precio }}</td>
            <td class="stock-unidades"><strong>{{ producto.stock ?? 0 }}</strong> u.</td>

            <td>
              <div class="lista-talles-admin">
                <span v-for="talle in producto.talles" :key="talle" class="badge-talle">{{ talle }}</span>
              </div>
            </td>
            
            <td class="texto-derecha">
              <div class="acciones-grupo">
                <button class="btn-accion editar" @click="abrirEdicion(producto)">
                  ✏️ Editar
                </button>
                <button class="btn-accion eliminar" @click="eliminarProducto(producto.id, producto.nombre)">
                  🗑️ Borrar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- VENTANA EMERGENTE (MODAL DE EDICIÓN) -->
    <div v-if="productoEditando" class="overlay-modal">
      <div class="contenido-modal">
        <h3>Editar Prenda #{{ productoEditando.id }}</h3>
        
        <label>Nombre:</label>
        <input v-model="productoEditando.nombre" type="text" class="input-modal" />

        <label>Precio ($):</label>
        <input v-model.number="productoEditando.precio" type="number" class="input-modal" />

        <label>Stock disponible:</label>
        <input v-model.number="productoEditando.stock" type="number" class="input-modal" />

        <div class="botones-modal">
          <button @click="guardarCambios" class="btn-guardar">Guardar Cambios</button>
          <button @click="productoEditando = null" class="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Cartelito flotante con estética de la tienda -->
    <div v-if="mostrarNotificacion" :class="['toast-notificacion', tipoNotificacion]">
      <span v-if="tipoNotificacion === 'exito'" class="icono-toast">✓</span>
      <span v-else class="icono-toast">!</span>
      <p>{{ mensajeNotificacion }}</p>
    </div>

  </div>
</template>

<style scoped>
.contenedor-foto-tabla { width: 45px; height: 45px; border-radius: 6px; overflow: hidden; border: 1px solid #EAE5DF; background-color: #FAF9F6; }
.foto-miniatura-tabla { width: 100%; height: 100%; object-fit: cover; }
.header-pantalla-admin { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; gap: 1rem; flex-wrap: wrap; }
.header-pantalla-admin h1 { font-size: 1.8rem; color: #333333; margin: 0 0 0.3rem 0; }
.subtitulo { color: #777777; font-size: 0.95rem; margin: 0; }
.btn-agregar-nuevo { background-color: #8C7355; color: #FFFFFF; text-decoration: none; padding: 0.7rem 1.2rem; border-radius: 4px; font-weight: bold; font-size: 0.9rem; transition: background-color 0.2s; }
.btn-agregar-nuevo:hover { background-color: #735D43; }
.contenedor-tabla { overflow-x: auto; padding: 0; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #EAE5DF; box-shadow: 0 4px 10px rgba(0,0,0,0.01); }
.tabla-admin { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem; }
.tabla-admin th { background-color: #F7F5F0; color: #555555; padding: 1rem 1.5rem; font-weight: bold; border-bottom: 2px solid #EAEAEA; }
.tabla-admin td { padding: 1.2rem 1.5rem; border-bottom: 1px solid #F0F0F0; color: #444444; vertical-align: middle; }
.col-id { font-family: monospace; color: #888888; font-size: 0.9rem; }
.info-prenda-tabla { display: flex; align-items: center; gap: 0.8rem; }
.nombre-prenda { display: block; font-weight: 600; color: #333333; }
.descripcion-corta { display: block; font-size: 0.8rem; color: #888888; margin-top: 0.1rem; }
.tag-categoria-admin { background-color: #EFECE6; color: #555555; font-size: 0.8rem; padding: 0.2rem 0.6rem; border-radius: 4px; }
.precio-admin { font-weight: bold; color: #8C7355; }
.lista-talles-admin { display: flex; gap: 0.3rem; flex-wrap: wrap; }
.badge-talle { background-color: #FFFFFF; border: 1px solid #DDDDDD; color: #555555; font-size: 0.75rem; padding: 0.1rem 0.4rem; border-radius: 3px; }
.texto-derecha { text-align: right; }
.acciones-grupo { display: flex; gap: 0.5rem; justify-content: flex-end; }
.btn-accion { padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; }
.btn-accion.editar { background-color: #FFFFFF; border-color: #D2B9A1; color: #8C7355; }
.btn-accion.editar:hover { background-color: #FAF9F6; }
.btn-accion.eliminar { background-color: #FFF0F0; color: #C62828; }
.btn-accion.eliminar:hover { background-color: #FFE5E5; }

/* ESTILOS DEL MODAL EMERGENTE */
.overlay-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex; justify-content: center; align-items: center;
  z-index: 100;
  backdrop-filter: blur(2px);
}
.contenido-modal {
  background: #FFFFFF; padding: 2rem; border-radius: 12px; width: 380px;
  display: flex; flex-direction: column; gap: 0.8rem;
  border: 1px solid #EAE5DF;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.contenido-modal h3 {
  color: #333333;
  margin-top: 0;
  font-size: 1.3rem;
}
.contenido-modal label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4A3E3D;
  margin-top: 0.3rem;
}
.input-modal {
  padding: 0.65rem 0.9rem; border: 1px solid #D2B9A1; border-radius: 6px; width: 100%;
  background-color: #FAF9F6; font-size: 0.95rem; color: #333; outline: none;
  transition: all 0.2s;
}
.input-modal:focus {
  border-color: #8C7355;
  background-color: #FFFFFF;
}
.botones-modal { display: flex; gap: 0.8rem; margin-top: 1.2rem; }
.btn-guardar { background: #8C7355; color: white; border: none; padding: 0.65rem 1rem; border-radius: 6px; cursor: pointer; flex: 1; font-weight: bold; transition: background-color 0.2s; }
.btn-guardar:hover { background: #735D43; }
.btn-cancelar { background: #EFECE8; color: #555555; border: none; padding: 0.65rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 500; transition: background-color 0.2s; }
.btn-cancelar:hover { background: #E2DDD7; }

/* ESTILOS DEL TOAST / CARTELITO OPTIMIZADOS CON LA PALETA DE LA TIENDA */
.toast-notificacion {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  font-weight: 500;
  font-size: 0.95rem;
  animation: aparecer 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: #FDFCF7;
  color: #333333;
  border: 1px solid #EAE5DF;
}

/* Éxito: usa los tonos marrones/arena cálidos de la tienda (#8C7355 / #C0955B) */
.toast-notificacion.exito { 
  border-left: 5px solid #8C7355; 
}
.toast-notificacion.exito .icono-toast { 
  background-color: #8C7355; 
}

/* Error: se mantiene un rojo elegante pero que contrasta bien */
.toast-notificacion.error { 
  border-left: 5px solid #C0392B; 
}
.toast-notificacion.error .icono-toast { 
  background-color: #C0392B; 
}

.icono-toast {
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.85rem;
  flex-shrink: 0;
}

@keyframes aparecer {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>