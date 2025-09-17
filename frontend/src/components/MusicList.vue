<template>
  <div class="music-list">
    <div class="content-card">
      <h2 class="page-title">🎵 Музыкальная библиотека</h2>
      
      <!-- Поиск -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="🔍 Поиск музыки..."
          class="search-input"
        />
      </div>

      <div v-if="loading" class="loading">⏳ Загрузка музыки...</div>
      
      <div v-else>
        <!-- Сетка музыки -->
        <div class="music-grid">
          <div v-for="item in music" :key="item.id" class="music-card">
            <img :src="item.photo" :alt="item.title" class="music-cover" />
            <div class="music-info">
              <h3>🎶 {{ item.title }}</h3>
              <p><span class="info-icon">🎤</span> {{ item.artist }}</p>
              <p><span class="info-icon">💿</span> {{ item.album || 'Без альбома' }}</p>
              <p><span class="info-icon">🎵</span> {{ item.genre || 'Не указан' }}</p>
              <p><span class="info-icon">📅</span> {{ item.year || 'Не указан' }}</p>
              <p><span class="info-icon">⏱️</span> {{ formatDuration(item.duration) }}</p>
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <Pagination
          v-if="musicPagination.totalPages > 1"
          :pagination="musicPagination"
          @page-change="changePage"
        />

        <!-- Сообщение если нет результатов -->
        <div v-if="music.length === 0" class="no-results">
          <p>🎵 Музыка не найдена</p>
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
import { debounce } from 'lodash';

export default {
  name: 'MusicList',
  components: {
    Pagination
  },
  data() {
    return {
      searchQuery: '',
      searchDebounce: null
    };
  },
  computed: {
    ...mapState(useDataStore, ['music', 'musicPagination', 'loading'])
  },
  methods: {
    ...mapActions(useDataStore, ['fetchMusic', 'setMusicPage']),
    
    formatDuration(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    
    changePage(page) {
      this.setMusicPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    handleSearch: debounce(function() {
      this.fetchMusic(1, 10, this.searchQuery);
    }, 500)
  },
  mounted() {
    this.fetchMusic();
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