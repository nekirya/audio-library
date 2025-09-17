<template>
  <div class="pagination">
    <button 
      @click="goToPage(1)" 
      :disabled="pagination.currentPage === 1"
      class="pagination-btn first"
    >
      ⏮️ Первая
    </button>
    
    <button 
      @click="goToPage(pagination.currentPage - 1)" 
      :disabled="!pagination.hasPrev"
      class="pagination-btn prev"
    >
      ◀️ Назад
    </button>

    <span class="page-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="['page-btn', { active: page === pagination.currentPage }]"
      >
        {{ page }}
      </button>
      
      <span v-if="hasEllipsis" class="ellipsis">...</span>
    </span>

    <button 
      @click="goToPage(pagination.currentPage + 1)" 
      :disabled="!pagination.hasNext"
      class="pagination-btn next"
    >
      Вперед ▶️
    </button>
    
    <button 
      @click="goToPage(pagination.totalPages)" 
      :disabled="pagination.currentPage === pagination.totalPages"
      class="pagination-btn last"
    >
      Последняя ⏭️
    </button>

    <span class="pagination-info">
      Страница {{ pagination.currentPage }} из {{ pagination.totalPages }}
      (Всего: {{ pagination.totalItems }})
    </span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  computed: {
    visiblePages() {
      const current = this.pagination.currentPage;
      const total = this.pagination.totalPages;
      const half = Math.floor(this.maxVisiblePages / 2);
      
      let start = Math.max(1, current - half);
      let end = Math.min(total, start + this.maxVisiblePages - 1);
      
      if (end - start + 1 < this.maxVisiblePages) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }
      
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    },
    
    hasEllipsis() {
      return this.pagination.totalPages > this.maxVisiblePages && 
             this.visiblePages[this.visiblePages.length - 1] < this.pagination.totalPages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.pagination.totalPages && page !== this.pagination.currentPage) {
        this.$emit('page-change', page);
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #bdc3c7;
  color: #bdc3c7;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  padding: 0.5rem 0.75rem;
  border: 2px solid #ecf0f1;
  background: white;
  color: #2c3e50;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 40px;
}

.page-btn:hover {
  border-color: #3498db;
  color: #3498db;
}

.page-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.ellipsis {
  padding: 0.5rem;
  color: #7f8c8d;
  font-weight: 600;
}

.pagination-info {
  margin-left: 1rem;
  color: #7f8c8d;
  font-weight: 600;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .pagination {
    gap: 0.25rem;
  }
  
  .pagination-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .page-btn {
    padding: 0.4rem 0.6rem;
    min-width: 35px;
    font-size: 0.9rem;
  }
  
  .pagination-info {
    display: none;
  }
}

@media (max-width: 480px) {
  .pagination-btn.first,
  .pagination-btn.last {
    display: none;
  }
}
</style>