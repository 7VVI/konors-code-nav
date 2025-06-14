<template>
  <div class="navigation">
    <!-- 头部 -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>CodeNav</h1>
          </div>
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              type="text" 
              placeholder="搜索网站或工具" 
              class="search-input"
              @input="handleSearch"
            />
            <div class="search-icon">🔍</div>
          </div>
          <div class="user-area">
            <div class="user-avatar">
              <div class="avatar-placeholder">👤</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 分类导航 -->
    <nav class="category-nav">
      <div class="container">
        <div class="category-tabs">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-tab', { active: activeCategory === category.id }]"
            @click="setActiveCategory(category.id)"
          >
            <span class="category-name">{{ category.name }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- 网站卡片区域 -->
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { siteCategories, searchSites, getAllSites } from '../data/sites.js'
import SiteCard from './SiteCard.vue'
import Pagination from './Pagination.vue'

const categories = ref(siteCategories)
const activeCategory = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
// 根据屏幕尺寸动态调整每页显示数量
const pageSize = computed(() => {
  if (window.innerWidth <= 480) {
    return 6 // 小屏幕显示6个
  } else if (window.innerWidth <= 768) {
    return 8 // 中等屏幕显示8个
  } else {
    return 12 // 大屏幕显示12个
  }
})

const isSearching = computed(() => searchKeyword.value.trim().length > 0)

// 获取当前显示的所有网站
const allDisplaySites = computed(() => {
  if (isSearching.value) {
    return searchSites(searchKeyword.value)
  }
  
  if (activeCategory.value === 'all') {
    return getAllSites()
  }
  
  const category = categories.value.find(cat => cat.id === activeCategory.value)
  return category ? category.sites.map(site => ({
    ...site,
    category: category.name,
    categoryId: category.id
  })) : []
})

// 分页后的网站数据
const paginatedSites = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return allDisplaySites.value.slice(start, end)
})

// 总数据量
const totalSites = computed(() => allDisplaySites.value.length)

const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  searchKeyword.value = ''
  currentPage.value = 1 // 切换分类时重置到第一页
}

const handleSearch = () => {
  // 搜索时自动切换到全部分类
  if (isSearching.value) {
    activeCategory.value = 'all'
  }
  currentPage.value = 1 // 搜索时重置到第一页
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听窗口大小变化，重新计算分页
const handleResize = () => {
  // 当页面大小改变时，重置到第一页
  currentPage.value = 1
}

onMounted(() => {
  // 添加全部分类选项
  categories.value.unshift({
    id: 'all',
    name: '全部',
    icon: '🌟',
    sites: []
  })
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navigation {
  min-height: 100vh;
  background: #1a1d29;
  color: white;
}

.container {
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1200px;
}

/* 头部样式 */
.header {
  background: #1a1d29;
  padding: 20px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logo h1 {
  color: #00d4aa;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  max-width: 500px;
  margin: 0 20px;
}

.search-input {
  width: 100%;
  padding: 12px 45px 12px 20px;
  border: 1px solid #2d3748;
  border-radius: 8px;
  background: #2d3748;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #a0aec0;
}

.search-input:focus {
  border-color: #00d4aa;
  background: #374151;
}

.search-icon {
  position: absolute;
  right: 15px;
  font-size: 16px;
  color: #a0aec0;
}

/* 用户区域样式 */
.user-area {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #00d4aa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-avatar:hover {
  background: #00b894;
  transform: scale(1.05);
}

.avatar-placeholder {
  font-size: 18px;
  color: white;
}

/* 分类导航样式 */
.category-nav {
  background: #1a1d29;
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
  color: #a0aec0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.category-tab:hover {
  background: #2d3748;
  color: white;
}

.category-tab.active {
  background: #00d4aa;
  color: white;
}

.category-icon {
  font-size: 18px;
}

/* 主要内容样式 */
.main-content {
  padding: 30px 0;
  flex: 1;
  background: #1a1d29;
}

.results-header {
  margin-bottom: 24px;
}

.results-title {
  color: white;
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  min-height: 400px;
  justify-content: start;
}

/* 无结果样式 */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #a0aec0;
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
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .logo h1 {
    font-size: 1.6rem;
  }
  
  .search-box {
    order: 2;
    margin: 0;
    max-width: 100%;
  }
  
  .user-area {
    order: 3;
  }
  
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
  
  .logo h1 {
    font-size: 1.4rem;
  }
  
  .search-input {
    font-size: 14px;
    padding: 10px 40px 10px 16px;
  }
  
  .sites-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .category-tab {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  .results-title {
    font-size: 1.2rem;
  }
}
</style>