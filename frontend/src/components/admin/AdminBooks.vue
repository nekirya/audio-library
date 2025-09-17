<template>
  <div class="admin-books">
    <div class="admin-header">
      <h3>Управление книгами</h3>
      <button @click="showAddForm = true" class="add-btn">
        + Добавить книгу
      </button>
    </div>
    <!-- Поиск для админов -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="🔍 Поиск книг..."
        class="search-input"
      />
    </div>
    <div v-if="showAddForm" class="modal-overlay">
      <div class="modal">
        <h4>{{ editingBook ? 'Редактировать' : 'Добавить' }} книгу</h4>
        <form @submit.prevent="saveBook">
          <div class="form-row">
            <div class="form-group">
              <label>Название *</label>
              <input v-model="bookForm.title" required type="text">
            </div>
            <div class="form-group">
              <label>Автор *</label>
              <input v-model="bookForm.author" required type="text">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Издатель</label>
              <input v-model="bookForm.publisher" type="text">
            </div>
            <div class="form-group">
              <label>Страницы *</label>
              <input v-model="bookForm.pages" required type="number" min="1">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Жанр</label>
              <input v-model="bookForm.genre" type="text">
            </div>
            <div class="form-group">
              <label>Год</label>
              <input v-model="bookForm.year" type="number" min="1900" :max="new Date().getFullYear()">
            </div>
          </div>
          <div class="form-group">
            <label>URL обложки *</label>
            <input v-model="bookForm.photo" required type="text" placeholder="https://example.com/cover.jpg">
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea v-model="bookForm.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>URL файла *</label>
            <input v-model="bookForm.filePath" required type="text" placeholder="https://example.com/book.pdf">
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
      <div class="books-table">
        <table>
          <thead>
            <tr>
              <th>Обложка</th>
              <th>Название</th>
              <th>Автор</th>
              <th>Издатель</th>
              <th>Страницы</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in books" :key="item.id">
              <td>
                <img :src="item.photo" :alt="item.title" class="table-cover">
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.author }}</td>
              <td>{{ item.publisher || '-' }}</td>
              <td>{{ item.pages }}</td>
              <td>
                <button @click="editBook(item)" class="edit-btn">✏️</button>
                <button @click="deleteBook(item.id)" class="delete-btn">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Пагинация для админов -->
      <Pagination
        v-if="booksPagination.totalPages > 1"
        :pagination="booksPagination"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import { booksService } from '../../services/api'; // Правильный импорт
import Pagination from '../Pagination.vue';

export default {
  name: 'AdminBooks',
  components: {
    Pagination
  },
  data() {
    return {
      books: [],
      booksPagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNext: false,
        hasPrev: false
      },
      loading: false,
      showAddForm: false,
      editingBook: null,
      searchQuery: '',
      debounceTimer: null,
      bookForm: {
        title: '',
        author: '',
        publisher: '',
        pages: '',
        genre: '',
        year: '',
        photo: '',
        description: '',
        filePath: ''
      }
    };
  },
  async mounted() {
    await this.loadBooks();
  },
  methods: {
    async loadBooks(page = 1, limit = 10, search = '') {
      this.loading = true;
      try {
        const response = await booksService.getAll(page, limit, search);
        this.books = response.data.books;
        this.booksPagination = response.data.pagination;
        this.searchQuery = search;
      } catch (error) {
        console.error('Ошибка загрузки книг:', error);
        alert('Ошибка загрузки книг');
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      this.loadBooks(page, this.booksPagination.itemsPerPage, this.searchQuery);
    },
    handleSearch() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.loadBooks(1, 10, this.searchQuery);
      }, 500);
    },
    editBook(book) {
      this.editingBook = book;
      this.bookForm = { ...book };
      this.showAddForm = true;
    },
    cancelEdit() {
      this.showAddForm = false;
      this.editingBook = null;
      this.resetForm();
    },
    resetForm() {
      this.bookForm = {
        title: '',
        author: '',
        publisher: '',
        pages: '',
        genre: '',
        year: '',
        photo: '',
        description: '',
        filePath: ''
      };
    },
    async saveBook() {
      this.loading = true;
      try {
        let response;
        if (this.editingBook) {
          // Обновляем существующую запись
          response = await booksService.update(this.editingBook.id, this.bookForm);
        } else {
          // Создаем новую запись
          response = await booksService.create(this.bookForm);
        }
        this.showAddForm = false;
        this.editingBook = null;
        this.resetForm();
        await this.loadBooks(this.booksPagination.currentPage, this.booksPagination.itemsPerPage, this.searchQuery);
        alert('Книга сохранена успешно!');
      } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert('Ошибка сохранения книги: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading = false;
      }
    },
    async deleteBook(id) {
      if (!confirm('Вы уверены, что хотите удалить эту книгу?')) return;
      try {
        await booksService.delete(id);
        await this.loadBooks(this.booksPagination.currentPage, this.booksPagination.itemsPerPage, this.searchQuery);
        alert('Книга удалена успешно!');
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка удаления книги: ' + (error.response?.data?.message || error.message));
      }
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
/* Стили аналогичны AdminMusic.vue */
.admin-books {
  padding: 20px;
}
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
.books-table {
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