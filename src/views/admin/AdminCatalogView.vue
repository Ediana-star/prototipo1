<script setup>
import { RouterLink } from 'vue-router'
import { useTiendaStore } from '../../stores/useTiendaStore'

const store = useTiendaStore()

// Funciones de simulación para las acciones del administrador
const eliminarProducto = (id, nombre) => {
  const confirmar = confirm(`¿Estás seguro de que querés eliminar "${nombre}" del catálogo?`)
  if (confirmar) {
    // Acá luego conectaremos la lógica real para borrar de Pinia
    alert(`Producto con ID ${id} eliminado (Simulación)`)
  }
}
</script>

<template>
  <div class="admin-view-container">
    
    <!-- Encabezado de la pantalla -->
    <div class="header-pantalla-admin">
      <div>
        <h1>Control de Inventario</h1>
        <p class="subtitulo">Gestioná los productos visibles en la tienda, editá sus precios y controlá los talles.</p>
      </div>
      
      <!-- Botón que lleva a la vista de agregar -->
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
          <!-- Recorremos los productos que están guardados en el "Cerebro" (Pinia) -->
          <tr v-for="producto in store.productos" :key="producto.id">
            <td class="col-id">#{{ producto.id }}</td>
            
            <td class="col-prenda">
              <div class="info-prenda-tabla">
               <div class="contenedor-foto-tabla">
                 <img 
                     :src="producto.imagen || 'https://via.placeholder.com/50'" 
                     alt="Foto prenda" 
                     class="foto-miniatura-tabla" 
                      />
                </div>
                
                <div>
                  <span class="nombre-prenda">{{ producto.nombre }}</span>
                  <span class="descripcion-corta">{{ producto.descripcion.substring(0, 45) }}...</span>
                </div>
              </div>
            </td>
            
            <td>
              <span class="tag-categoria-admin">{{ producto.categoria }}</span>
            </td>
            
            <td class="precio-admin">${{ producto.precio }}</td>
            
            <td class="stock-unidades">
                <strong>{{ producto.stock ?? 0 }}</strong> u.
            </td>

            <td>
              <div class="lista-talles-admin">
                <span v-for="talle in producto.talles" :key="talle" class="badge-talle">
                  {{ talle }}
                </span>
              </div>
            </td>
            
            <td class="texto-derecha">
              <div class="acciones-grupo">
                <button class="btn-accion editar" @click="alert('Editar producto ID: ' + producto.id)">
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

  </div>
</template>

<style scoped>
.contenedor-foto-tabla {
  width: 45px;
  height: 45px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #EAE5DF;
  background-color: #FAF9F6;
}

.foto-miniatura-tabla {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-pantalla-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-pantalla-admin h1 {
  font-size: 1.8rem;
  color: #333333;
  margin: 0 0 0.3rem 0;
}

.subtitulo {
  color: #777777;
  font-size: 0.95rem;
  margin: 0;
}

.btn-agregar-nuevo {
  background-color: #8C7355;
  color: #FFFFFF;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-agregar-nuevo:hover {
  background-color: #6E5941;
}

/* Contenedor y Tabla */
.contenedor-tabla {
  overflow-x: auto;
  padding: 0; /* Reseteamos el padding interno de la tarjeta para que la tabla llegue al borde */
}

.tabla-admin {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

.tabla-admin th {
  background-color: #F7F5F0;
  color: #555555;
  padding: 1rem 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #EAEAEA;
}

.tabla-admin td {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #F0F0F0;
  color: #444444;
  vertical-align: middle;
}

.col-id {
  font-family: monospace;
  color: #888888;
  font-size: 0.9rem;
}

.info-prenda-tabla {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.emoji-tabla {
  font-size: 1.5rem;
  background-color: #F7F5F0;
  padding: 0.4rem;
  border-radius: 6px;
}

.nombre-prenda {
  display: block;
  font-weight: 600;
  color: #333333;
}

.descripcion-corta {
  display: block;
  font-size: 0.8rem;
  color: #888888;
  margin-top: 0.1rem;
}

.tag-categoria-admin {
  background-color: #EFECE6;
  color: #555555;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-weight: 500;
}

.precio-admin {
  font-weight: bold;
  color: #333333;
}

.lista-talles-admin {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.badge-talle {
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  color: #555555;
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  min-width: 24px;
  text-align: center;
}

.texto-derecha {
  text-align: right;
}

.acciones-grupo {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.btn-accion {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.btn-accion.editar {
  background-color: #FFFFFF;
  border-color: #DDDDDD;
  color: #555555;
}

.btn-accion.editar:hover {
  border-color: #8C7355;
  color: #8C7355;
}

.btn-accion.eliminar {
  background-color: #FFF0F0;
  color: #C62828;
}

.btn-accion.eliminar:hover {
  background-color: #C62828;
  color: #FFFFFF;
}
</style>