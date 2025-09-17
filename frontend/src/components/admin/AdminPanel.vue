<template>
  <div class="admin-panel">
    <h2>Панель администратора</h2>
    <div class="admin-tabs">
      <button 
        @click="activeTab = 'music'" 
        :class="{ 'active': activeTab === 'music' }"
        class="tab-btn"
      >
        Управление музыкой
      </button>
      <button 
        @click="activeTab = 'books'" 
        :class="{ 'active': activeTab === 'books' }"
        class="tab-btn"
      >
        Управление книгами
      </button>
    </div>

    <div class="tab-content">
      <AdminMusic v-if="activeTab === 'music'" />
      <AdminBooks v-else-if="activeTab === 'books'" />
    </div>
  </div>
</template>

<script>
import AdminMusic from './AdminMusic.vue';
import AdminBooks from './AdminBooks.vue';

export default {
  name: 'AdminPanel',
  components: {
    AdminMusic,
    AdminBooks
  },
  data() {
    return {
      activeTab: 'music'
    };
  }
}
</script>

<style scoped>
.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.admin-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  color: #3498db;
}

.tab-btn.active {
  color: #3498db;
  border-bottom-color: #3498db;
  background-color: #f8f9fa;
}

.tab-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>