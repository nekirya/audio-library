<template>
  <div class="admin-music">
    <div class="admin-header">
      <h3>Управление музыкой</h3>
      <button @click="showAddForm = true" class="add-btn">
        + Добавить музыку
      </button>
    </div>
    <!-- Поиск для админов -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="🔍 Поиск музыки..."
        class="search-input"
      />
    </div>
    <div v-if="showAddForm" class="modal-overlay">
      <div class="modal">
        <h4>{{ editingMusic ? 'Редактировать' : 'Добавить' }} музыку</h4>
        <form @submit.prevent="saveMusic">
          <div class="form-row">
            <div class="form-group">
              <label>Название *</label>
              <input v-model="musicForm.title" required type="text">
            </div>
            <div class="form-group">
              <label>Исполнитель *</label>
              <input v-model="musicForm.artist" required type="text">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Альбом</label>
              <input v-model="musicForm.album" type="text">
            </div>
            <div class="form-group">
              <label>Длительность (секунды) *</label>
              <input v-model="musicForm.duration" required type="number" min="1">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Жанр</label>
              <input v-model="musicForm.genre" type="text">
            </div>
            <div class="form-group">
              <label>Год</label>
              <input v-model="musicForm.year" type="number" min="1900" :max="new Date().getFullYear()">
            </div>
          </div>
          <div class="form-group">
            <label>URL обложки *</label>
            <input v-model="musicForm.photo" required type="text" placeholder="https://example.com/cover.jpg">
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="musicForm.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>URL файла *</label>
            <input v-model="musicForm.filePath" required type="text" placeholder="https://example.com/music.mp3">
          </div>
          <div class="form-actions">
            <button type="button" @click="cancelEdit" class="cancel-btn">Отмена</button>
            <button type="submit" :disabled="loading" class="save-btn">
              {{ loading ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else>
      <div class="music-table">
        <table>
          <thead>
            <tr>
              <th>Обложка</th>
              <th>Название</th>
              <th>Исполнитель</th>
              <th>Альбом</th>
              <th>Длительность</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in music" :key="item.id">
              <td>
                <img :src="item.photo" :alt="item.title" class="table-cover">
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.artist }}</td>
              <td>{{ item.album || '-' }}</td>
              <td>{{ formatDuration(item.duration) }}</td>
              <td>
                <button @click="editMusic(item)" class="edit-btn">✏️</button>
                <button @click="deleteMusic(item.id)" class="delete-btn">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Пагинация для админов -->
      <Pagination
        v-if="musicPagination.totalPages > 1"
        :pagination="musicPagination"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import { musicService } from '../../services/api'; // Правильный импорт
import Pagination from '../Pagination.vue';

export default {
  name: 'AdminMusic',
  components: {
    Pagination
  },
  data() {
    return {
      music: [],
      musicPagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
      },
      loading: false,
      showAddForm: false,
      editingMusic: null,
      searchQuery: '',
      debounceTimer: null,
      musicForm: {
        title: '',
        artist: '',
        album: '',
        duration: '',
        genre: '',
        year: '',
        photo: '',
        description: '',
        filePath: ''
      }
    };
  },
  async mounted() {
    await this.loadMusic();
  },
  methods: {
    async loadMusic(page = 1, limit = 10, search = '') {
      this.loading = true;
      try {
        const response = await musicService.getAll(page, limit, search);
        this.music = response.data.music;
        this.musicPagination = response.data.pagination;
        this.searchQuery = search;
      } catch (error) {
        console.error('Ошибка загрузки музыки:', error);
        alert('Ошибка загрузки музыки');
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      this.loadMusic(page, this.musicPagination.itemsPerPage, this.searchQuery);
    },
    handleSearch() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.loadMusic(1, 10, this.searchQuery);
      }, 500);
    },
    editMusic(music) {
      this.editingMusic = music;
      this.musicForm = { ...music };
      this.showAddForm = true;
    },
    cancelEdit() {
      this.showAddForm = false;
      this.editingMusic = null;
      this.resetForm();
    },
    resetForm() {
      this.musicForm = {
        title: '',
        artist: '',
        album: '',
        duration: '',
        genre: '',
        year: '',
        photo: '',
        description: '',
        filePath: ''
      };
    },
    async saveMusic() {
      this.loading = true;
      try {
        let response;
        if (this.editingMusic) {
          // Обновляем существующую запись
          response = await musicService.update(this.editingMusic.id, this.musicForm);
        } else {
          // Создаем новую запись
          response = await musicService.create(this.musicForm);
        }
        this.showAddForm = false;
        this.editingMusic = null;
        this.resetForm();
        await this.loadMusic(this.musicPagination.currentPage, this.musicPagination.itemsPerPage, this.searchQuery);
        alert('Музыка сохранена успешно!');
      } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка сохранения музыки: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading = false;
      }
    },
    async deleteMusic(id) {
      if (!confirm('Вы уверены, что хотите удалить эту музыку?')) return;
      try {
        await musicService.delete(id);
        await this.loadMusic(this.musicPagination.currentPage, this.musicPagination.itemsPerPage, this.searchQuery);
        alert('Музыка удалена успешно!');
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка удаления музыки: ' + (error.response?.data?.message || error.message));
      }
    },
    formatDuration(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  },
  beforeUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
};
</script>

<style scoped>
/* Стили остаются без изменений */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.add-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.add-btn:hover {
  background: #229954;
}
.search-box {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}
.search-input {
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 25px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  outline: none;
}
.search-input:focus {
  border-color: #3498db;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
.cancel-btn {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.save-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.save-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
.music-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background: #f8f9fa;
  font-weight: bold;
}
.table-cover {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
.edit-btn, .delete-btn {
  border: none;
  padding: 5px 10px;
  margin: 0 2px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.edit-btn {
  background: #f39c12;
  color: white;
}
.delete-btn {
  background: #e74c3c;
  color: white;
}
.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}
</style>