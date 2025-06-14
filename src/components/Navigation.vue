<template>
  <div class="navigation">
    <!-- 头部组件 -->
    <Header 
      :search-keyword="searchKeyword"
      :is-dark="isDark"
      @update:search-keyword="searchKeyword = $event"
      @search="handleSearch"
      @toggle-theme="toggleTheme"
    />

    <!-- 分类导航组件 -->
    <CategoryNav 
      :categories="categories"
      :active-category="activeCategory"
      @update:active-category="setActiveCategory"
    />

    <!-- 主要内容组件 -->
    <MainContent 
      :categories="categories"
      :active-category="activeCategory"
      :is-searching="isSearching"
      :paginated-sites="paginatedSites"
      :total-sites="totalSites"
      :page-size="pageSize"
      :current-page="currentPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { siteCategories, searchSites, getAllSites } from '@/data/sites.js'
import Header from './Header.vue'
import CategoryNav from './CategoryNav.vue'
import MainContent from './MainContent.vue'

const categories = ref(siteCategories)
const activeCategory = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
const isDark = ref(true) // 默认暗色主题
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
  
  const category = categories.value.find((cat: { id: string }) => cat.id === activeCategory.value)
  return category ? category.sites.map((site: any) => ({
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

const toggleTheme = () => {
  isDark.value = !isDark.value
  // 保存主题设置到本地存储
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  // 更新body的class来应用全局主题
  document.body.className = isDark.value ? 'dark-theme' : 'light-theme'
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
  
  // 初始化主题设置
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  }
  document.body.className = isDark.value ? 'dark-theme' : 'light-theme'
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navigation {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}
</style>