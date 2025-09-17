<template>
  <div class="home-view">
    <div class="content-card">
      <div class="hero-section">
        <h1>🎵 Добро пожаловать в Аудиотеку! 📚</h1>
        <p class="subtitle">Ваша цифровая библиотека музыки и книг</p>
        <img src="https://i.pinimg.com/originals/e7/7a/54/e77a54696932bc7b822dcc89fe6688d7.jpg" alt="Аудиотека" class="hero-image" />
        
        <div class="features">
          <div class="feature">
            <div class="feature-icon">🎵</div>
            <h3>Богатая коллекция музыки</h3>
            <p>Более 100 музыкальных композиций различных жанров и исполнителей</p>
          </div>
          
          <div class="feature">
            <div class="feature-icon">📚</div>
            <h3>Обширная библиотека книг</h3>
            <p>Классические и современные произведения от лучших авторов</p>
          </div>
          
          <div class="feature">
            <div class="feature-icon">⚡</div>
            <h3>Быстрый доступ</h3>
            <p>Удобный поиск и навигация по всей коллекции</p>
          </div>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="stat-number">100+</span>
            <span class="stat-label">Музыкальных треков</span>
          </div>
          <div class="stat">
            <span class="stat-number">100+</span>
            <span class="stat-label">Книг</span>
          </div>
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Доступ</span>
          </div>
        </div>

        <div class="cta-buttons">
          <router-link to="/music" class="cta-btn primary">
            🎵 Слушать музыку
          </router-link>
          <router-link to="/books" class="cta-btn secondary">
            📚 Читать книги
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-view {
  width: 100%;
}

.hero-section {
  text-align: center;
  padding: 2rem 0;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3498db, #e74c3c, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.3rem;
  color: #7f8c8d;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.hero-image {
  width: 100%;
  max-width: 400px; /* Ограничиваем максимальную ширину */
  height: auto;
  border-radius: 15px; /* Добавляем скругление углов для гармонии с дизайном */
  margin: 0 auto 2rem auto; /* Центрируем изображение и добавляем отступ снизу */
  display: block; /* Убираем подчеркивание, если оно появится */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Добавляем легкую тень для глубины */
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature p {
  color: #7f8c8d;
  line-height: 1.6;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #7f8c8d;
  font-weight: 600;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 1rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-btn.primary {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
}

.cta-btn.secondary {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .stats {
    gap: 2rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}
</style>