<template>
  <main class="main-content">
    <div class="container">
      <!-- 结果统计 -->
      <div class="results-header">
        <h2 v-if="isSearching" class="results-title">
          搜索结果 ({{ totalSites }})
        </h2>
        <h2 v-else class="results-title">
          <span v-if="activeCategory === 'all'">
            <span class="category-icon">🌟</span>
            全部网站 ({{ totalSites }})
          </span>
          <span v-else>
            <span class="category-icon">{{ categories.find(cat => cat.id === activeCategory)?.icon }}</span>
            {{ categories.find(cat => cat.id === activeCategory)?.name }} ({{ totalSites }})
          </span>
        </h2>
      </div>
      
      <!-- 网站卡片网格 -->
      <div class="sites-grid">
        <SiteCard 
          v-for="site in paginatedSites" 
          :key="site.id"
          :site="site"
          @show-detail="handleShowDetail"
        />
      </div>
      
      <!-- 无结果提示 -->
      <div v-if="totalSites === 0" class="no-results">
        <div class="no-results-icon">😔</div>
        <p v-if="isSearching">没有找到相关网站</p>
        <p v-else>该分类暂无网站</p>
      </div>
      
      <!-- 分页组件 -->
      <Pagination 
        v-if="totalSites > 0"
        :total="totalSites"
        :page-size="pageSize"
        :current-page="currentPage"
        @update:current-page="handlePageChange"
        @page-change="handlePageChange"
      />
    </div>
    
    <!-- 详情弹窗 -->
    <SiteDetailModal 
      :visible="showDetailModal"
      :site="selectedSite"
      @close="handleCloseDetail"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SiteCard from './SiteCard.vue'
import Pagination from './Pagination.vue'
import SiteDetailModal from './SiteDetailModal.vue'

interface Category {
  id: string
  name: string
  icon: string
  sites: any[]
}

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

interface Props {
  categories: Category[]
  activeCategory: string
  isSearching: boolean
  paginatedSites: Site[]
  totalSites: number
  pageSize: number
  currentPage: number
}

interface Emits {
  (e: 'page-change', page: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// 详情弹窗状态
const showDetailModal = ref(false)
const selectedSite = ref<Site | null>(null)

const handlePageChange = (page: number) => {
  emit('page-change', page)
}

const handleShowDetail = (site: Site) => {
  console.log('handleShowDetail called:', site.name)
  selectedSite.value = site
  showDetailModal.value = true
  console.log('Modal state:', showDetailModal.value, selectedSite.value)
}

const handleCloseDetail = () => {
  showDetailModal.value = false
  selectedSite.value = null
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1400px;
}

/* 主要内容样式 */
.main-content {
  padding: 30px 0;
  flex: 1;
  background: var(--bg-primary);
}

.results-header {
  margin-bottom: 24px;
}

.results-title {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-icon {
  font-size: 1.2rem;
}

/* 网站卡片网格 */
.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 320px));
  gap: 20px;
  margin-bottom: 40px;
  min-height: 400px;
  justify-content: start;
}

/* 无结果样式 */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.no-results p {
  font-size: 1.2rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    justify-content: start;
  }
  
  .results-title {
    font-size: 1.3rem;
  }
  
  .main-content {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .sites-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .results-title {
    font-size: 1.2rem;
  }
}
</style>