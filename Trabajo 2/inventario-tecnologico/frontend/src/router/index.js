import { createRouter, createWebHistory } from 'vue-router'

import EquiposView from '../views/EquiposView.vue'
import EquipoDetalleView from '../views/EquipoDetalleView.vue'

const routes = [
  { path: '/', redirect: '/equipos' },
  { path: '/equipos', name: 'equipos', component: EquiposView },
  {
    path: '/equipos/nuevo',
    name: 'nuevo-equipo',
    component: () => import('../views/NuevoEquipoView.vue'),
  },
  { path: '/equipos/:id', name: 'equipo-detalle', component: EquipoDetalleView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router