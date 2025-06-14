<template>
  <nav class="category-nav">
    <div class="container">
      <div class="category-tabs">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-tab', { active: activeCategory === category.id }]"
          @click="handleCategoryClick(category.id)"
        >
          <span class="category-name">{{ category.name }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Site {
  id: string
  name: string
  url: string
  description: string
  tags: string[]
  category?: string
  categoryId?: string
  rating?: number
  reviews?: number
  detailDescription?: string
  features?: string[]
  pros?: string[]
  cons?: string[]
}

interface Category {
  id: string
  name: string
  icon: string
  sites: Site[]
}

interface Props {
  categories: Category[]
  activeCategory: string
}

interface Emits {
  (e: 'update:activeCategory', categoryId: string): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCategoryClick = (categoryId: string) => {
  emit('update:activeCategory', categoryId)
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1400px;
}

/* 分类导航样式 */
.category-nav {
  background: var(--bg-primary);
  padding: 20px 0;
}

.category-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.category-tab {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.category-tab:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.category-tab.active {
  background: var(--accent-color);
  color: white;
}

.category-icon {
  font-size: 18px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .category-tabs {
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .category-tabs::-webkit-scrollbar {
    display: none;
  }
  
  .category-tab {
    flex-shrink: 0;
    font-size: 13px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .category-tab {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>