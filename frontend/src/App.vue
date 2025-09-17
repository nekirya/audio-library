<template>
  <div id="app">
    <!-- Навигационная панель -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h1>🎵 Аудиотека 📚</h1>
        </div>

        
        
        <div class="nav-menu">
                    <router-link to="/" class="nav-link">🏠 Главная</router-link>
          <router-link to="/about" class="nav-link">👥 О нас</router-link>
          <router-link to="/contact" class="nav-link">📞 Контакты</router-link>
          <router-link to="/music" class="nav-link">
            <span class="nav-icon">🎵</span>
            Музыка
          </router-link>
          <router-link to="/books" class="nav-link">
            <span class="nav-icon">📚</span>
            Книги
          </router-link>
          
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="nav-link">
              <span class="nav-icon">🔐</span>
              Войти
            </router-link>
            <router-link to="/register" class="nav-link">
              <span class="nav-icon">📝</span>
              Регистрация
            </router-link>
          </template>
          
          <template v-else>
            <router-link v-if="user?.role === 'admin'" to="/admin" class="nav-link admin-nav">
              <span class="nav-icon">⚙️</span>
              Админ-панель
            </router-link>
            
            <div class="user-menu">
              <span class="user-greeting">
                <span class="user-icon">👋</span>
                Привет, {{ user?.username }}!
              </span>
              <span v-if="user?.role === 'admin'" class="admin-badge">
                <span class="badge-icon">👑</span>
                Админ
              </span>
              <button @click="logout" class="logout-btn">
                <span class="btn-icon">🚪</span>
                Выйти
              </button>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <!-- Основное содержимое -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useAuthStore } from './store/auth';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'App',
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logout'])
  },
  created() {
    const authStore = useAuthStore();
    if (authStore.token) {
      authStore.checkAuth();
    }
  }
}
</script>

<style>
/* Сброс стилей */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #2c3e50;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Навигационная панель */
.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 3px solid #e74c3c;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  flex-shrink: 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand h1 {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, #e74c3c, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0;
  height: 100%;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 1.5rem;
  height: 100%;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  position: relative;
}

.nav-link:hover {
  background: linear-gradient(135deg, #3498db15, #2ecc7115);
  color: #3498db;
  border-bottom-color: #3498db;
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #3498db25, #2ecc7125);
  color: #e74c3c;
  border-bottom-color: #e74c3c;
}

.nav-link.admin-nav.router-link-active {
  background: linear-gradient(135deg, #9b59b625, #8e44ad25);
  color: #9b59b6;
  border-bottom-color: #9b59b6;
}

.nav-icon {
  font-size: 1.2rem;
}

/* Пользовательское меню */
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #ecf0f1;
  height: 40px;
}

.user-greeting {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #2c3e50;
}

.user-icon {
  font-size: 1.1rem;
}

.admin-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.badge-icon {
  font-size: 0.9rem;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(45deg, #95a5a6, #7f8c8d);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(149, 165, 166, 0.3);
}

.logout-btn:hover {
  background: linear-gradient(45deg, #7f8c8d, #6c7a7a);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(149, 165, 166, 0.4);
}

.btn-icon {
  font-size: 1rem;
}

/* Основное содержимое */
.main-content {
  flex: 1;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Глобальные стили для контента */
.content-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin: 0 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 1400px;
  width: 100%;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: 1rem 0;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.3rem;
  color: #7f8c8d;
  font-weight: 600;
}

/* Стили для сеток - ЦЕНТРИРУЕМ */
.music-grid,
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin: 0 auto;
  justify-content: center;
  max-width: 1200px;
}

.music-card,
.book-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 350px;
}

.music-card:hover,
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.music-cover,
.book-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.music-info,
.book-info {
  width: 100%;
  text-align: center;
}

.music-info h3,
.book-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.music-info p,
.book-info p {
  color: #7f8c8d;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-link {
    padding: 0 1rem;
    font-size: 0.9rem;
  }
  
  .user-menu {
    gap: 0.8rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
    gap: 1rem;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
  }
  
  .nav-link {
    padding: 0.8rem 1rem;
    height: auto;
    border-bottom: 2px solid transparent;
    border-radius: 10px;
  }
  
  .user-menu {
    flex-wrap: wrap;
    justify-content: center;
    border-left: none;
    border-top: 2px solid #ecf0f1;
    padding: 1rem 0 0;
    margin: 1rem 0 0;
    width: 100%;
    gap: 0.8rem;
  }
  
  .music-grid,
  .books-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
  
  .content-card {
    margin: 0 1rem;
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .nav-brand h1 {
    font-size: 1.5rem;
  }
  
  .nav-menu {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-link {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
  
  .user-menu {
    flex-direction: column;
    text-align: center;
  }
  
  .logout-btn {
    width: 100%;
    justify-content: center;
  }
  
  .music-card,
  .book-card {
    max-width: 100%;
    margin: 0 0.5rem;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>