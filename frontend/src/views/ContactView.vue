<template>
  <div class="contact-view">
    <div class="content-card">
      <h1 class="page-title">📞 Контакты</h1>
      
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>info@audiolibrary.ru</p>
              <p>support@audiolibrary.ru</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">📱</div>
            <div>
              <h3>Телефон</h3>
              <p>+7 (495) 123-45-67</p>
              <p>+7 (800) 123-45-67 (бесплатно)</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">🏢</div>
            <div>
              <h3>Адрес</h3>
              <p>г. Москва, ул. Примерная, д. 123</p>
              <p>Бизнес-центр "Аудиотека"</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">🕒</div>
            <div>
              <h3>Часы работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб-Вс: 10:00 - 16:00</p>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>📨 Напишите нам</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Имя *</label>
              <input v-model="form.name" type="text" required>
            </div>
            
            <div class="form-group">
              <label>Email *</label>
              <input v-model="form.email" type="email" required>
            </div>
            
            <div class="form-group">
              <label>Тема</label>
              <input v-model="form.subject" type="text">
            </div>
            
            <div class="form-group">
              <label>Сообщение *</label>
              <textarea v-model="form.message" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="submit-btn">Отправить сообщение</button>
          </form>
        </div>
      </div>

      <div class="map-section">
        <h2>📍 Мы на карте</h2>
        <div class="map-placeholder">
          <div class="map-content">
            <p>🗺️ Карта расположения</p>
            <p>г. Москва, ул. Примерная, д. 123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
}
</script>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.contact-item p {
  color: #7f8c8d;
  margin: 0.2rem 0;
}

.contact-form {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(45deg, #2980b9, #1c6ea4);
  transform: translateY(-2px);
}

.map-section {
  margin-top: 3rem;
}

.map-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.map-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-align: center;
}

.map-content p:first-child {
  font-size: 2rem;
  margin-bottom: 1rem;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-item {
    padding: 1rem;
  }
  
  .contact-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-item {
    flex-direction: column;
    text-align: center;
  }
  
  .map-placeholder {
    height: 200px;
    font-size: 1rem;
  }
  
  .map-content p:first-child {
    font-size: 1.5rem;
  }
}
</style>