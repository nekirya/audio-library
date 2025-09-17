<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Имя пользователя:</label>
          <input
            type="text"
            v-model="userData.username"
            required
            placeholder="Введите имя пользователя"
          />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input
            type="email"
            v-model="userData.email"
            required
            placeholder="Введите ваш email"
          />
        </div>
        <div class="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            v-model="userData.password"
            required
            placeholder="Введите пароль (мин. 6 символов)"
            minlength="6"
          />
        </div>
        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>
      </form>
      <p class="auth-link">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';
import { mapActions } from 'pinia';

export default {
  name: 'Register',
  data() {
    return {
      userData: {
        username: '',
        email: '',
        password: ''
      },
      loading: false,
      error: '',
      success: ''
    };
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    async handleRegister() {
      this.loading = true;
      this.error = '';
      this.success = '';
      
      try {
        await this.register(this.userData);
        this.success = 'Регистрация успешна! Перенаправление...';
        setTimeout(() => {
          this.$router.push('/music');
        }, 2000);
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка регистрации';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.auth-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #229954;
}

.submit-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}

.success-message {
  color: #27ae60;
  text-align: center;
  margin-top: 1rem;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.auth-link a {
  color: #3498db;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>