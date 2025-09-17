import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  { 
    path: '/about', 
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  { 
    path: '/contact', 
    name: 'Contact',
    component: () => import('../views/ContactView.vue')
  },
  { 
    path: '/music', 
    component: () => import('../components/MusicList.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/books', 
    component: () => import('../components/BooksList.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/admin', 
    component: () => import('../components/admin/AdminPanel.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { 
    path: '/login', 
    component: () => import('../components/Login.vue'),
    meta: { requiresGuest: true }
  },
  { 
    path: '/register', 
    component: () => import('../components/Register.vue'),
    meta: { requiresGuest: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
    next('/music');
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/music');
  } else {
    next();
  }
});

export default router;