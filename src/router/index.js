import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ==========================================
    // 🛒 RUTAS DEL COMPRADOR (TIENDA PÚBLICA)
    // ==========================================
    {
      path: '/',
      name: 'home',
      component: () => import('../views/shop/HomeView.vue')
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/shop/CatalogView.vue')
    },
    {
      path: '/tabla-de-talles', // 👈 NUEVA RUTA DE TALLES
      name: 'tabla-de-talles',
      component: () => import('../views/shop/TallesView.vue')
    },
    {
      path: '/producto/:id', // El ":id" permite que la URL cambie según la prenda (ej: /producto/1)
      name: 'producto',
      component: () => import('../views/shop/ProductDetailView.vue')
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/shop/CartView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/shop/CheckoutView.vue')
    },

    // ==========================================
    // ⚙️ RUTAS DEL ADMINISTRADOR (CORREGIDO Y SIN CONFUSIONES)
    // ==========================================
    {
      path: '/admin',
      component: () => import('../views/admin/AdminView.vue'), // 1. El caparazón principal
      children: [
        {
          path: '', // Cuando entran a /admin a secas
          name: 'admin-dashboard',
          component: () => import('../views/admin/AdminDashboardView.vue') // 2. El Escritorio de las tarjetas
        },
        {
          path: 'catalogo',
          name: 'admin-catalogo',
          component: () => import('../views/admin/AdminCatalogView.vue') // 3. Tabla de stock
        },
        {
          path: 'agregar-producto',
          name: 'admin-agregar-producto',
          component: () => import('../views/admin/AdminAddProductView.vue') // 4. Agregar
        },
        {
          path: 'pedidos',
          name: 'admin-pedidos',
          component: () => import('../views/admin/AdminOrdersView.vue') // 5. Pedidos
        },
        {
          path: 'clientes',
          name: 'admin-clientes',
          component: () => import('../views/admin/AdminClientsView.vue') // 6. Clientes
        },
        {
          path: 'configuracion',
          name: 'admin-configuracion',
          component: () => import('../views/admin/AdminConfigView.vue') // 7. Configuración
        }
      ]
    }
  ]
})

export default router