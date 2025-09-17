<template>
  <div class="books-list">
    <div class="content-card">
      <h2 class="page-title">📚 Библиотека книг</h2>
      <!-- Поиск -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="🔍 Поиск книг..."
          class="search-input"
        />
      </div>
      <div v-if="loading" class="loading">⏳ Загрузка книг...</div>
      <div v-else>
        <!-- Сетка книг -->
        <div class="books-grid">
          <div v-for="book in books" :key="book.id" class="book-card">
            <img :src="book.photo" :alt="book.title" class="book-cover" />
            <div class="book-info">
              <h3>📖 {{ book.title }}</h3>
              <p><span class="info-icon">✍️</span> {{ book.author }}</p>
              <p><span class="info-icon">🏢</span> {{ book.publisher || 'Не указано' }}</p>
              <p><span class="info-icon">📚</span> {{ book.genre || 'Не указан' }}</p>
              <p><span class="info-icon">📅</span> {{ book.year || 'Не указан' }}</p>
              <p><span class="info-icon">📄</span> {{ book.pages }} страниц</p>
            </div>
          </div>
        </div>
        <!-- Пагинация -->
        <Pagination
          v-if="booksPagination.totalPages > 1"
          :pagination="booksPagination"
          @page-change="changePage"
        />
        <!-- Сообщение если нет результатов -->
        <div v-if="books.length === 0" class="no-results">
          <p>📚 Книги не найдены</p>
          <p v-if="searchQuery">Попробуйте изменить поисковый запрос</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDataStore } from '../store/data';
import { mapState, mapActions } from 'pinia';
import Pagination from './Pagination.vue';

export default {
  name: 'BooksList',
  components: {
    Pagination
  },
  data() {
    return {
      searchQuery: '',
      debounceTimer: null
    };
  },
  computed: {
    ...mapState(useDataStore, ['books', 'booksPagination', 'loading'])
  },
  methods: {
    ...mapActions(useDataStore, ['fetchBooks', 'setBooksPage']),
    changePage(page) {
      this.setBooksPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleSearch() {
      // Очищаем предыдущий таймер
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      // Устанавливаем новый таймер
      this.debounceTimer = setTimeout(() => {
        this.fetchBooks(1, 10, this.searchQuery);
      }, 500); // Задержка 500ms
    }
  },
  mounted() {
    this.fetchBooks();
  },
  // Очищаем таймер при уничтожении компонента
  beforeUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}
</script>

<style scoped>
.search-box {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}
.search-input {
  padding: 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 25px;
  font-size: 1.1rem;
  width: 100%;
  max-width: 400px;
  outline: none;
  transition: border-color 0.3s ease;
}
.search-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}
.no-results {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.2rem;
}
.no-results p:first-child {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>