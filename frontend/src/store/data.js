import { defineStore } from 'pinia';
import { musicService, booksService } from '../services/api';

export const useDataStore = defineStore('data', {
  state: () => ({
    music: [],
    books: [],
    musicPagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
      hasNext: false,
      hasPrev: false
    },
    booksPagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
      hasNext: false,
      hasPrev: false
    },
    loading: false,
    searchQuery: ''
  }),
  actions: {
    async fetchMusic(page = 1, limit = 10, search = '') {
      this.loading = true;
      try {
        const response = await musicService.getAll(page, limit, search);
        this.music = response.data.music;
        this.musicPagination = response.data.pagination;
        this.searchQuery = search;
      } catch (error) {
        console.error('Error fetching music:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchBooks(page = 1, limit = 10, search = '') {
      this.loading = true;
      try {
        const response = await booksService.getAll(page, limit, search);
        this.books = response.data.books;
        this.booksPagination = response.data.pagination;
        this.searchQuery = search;
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        this.loading = false;
      }
    },
    
    setMusicPage(page) {
      this.fetchMusic(page, this.musicPagination.itemsPerPage, this.searchQuery);
    },
    
    setBooksPage(page) {
      this.fetchBooks(page, this.booksPagination.itemsPerPage, this.searchQuery);
    }
  }
});