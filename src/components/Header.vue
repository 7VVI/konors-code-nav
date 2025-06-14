<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1>Konors-code-nav</h1>
        </div>
        <div class="search-box">
          <input 
            :value="searchKeyword" 
            type="text" 
            placeholder="搜索网站或工具" 
            class="search-input"
            @input="handleSearchInput"
          />
          <div class="search-icon">🔍</div>
        </div>
        <div class="user-area">
          <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换到亮色主题' : '切换到暗色主题'">
            <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
          <div class="user-avatar">
            <div class="avatar-placeholder">👤</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  searchKeyword: string
  isDark: boolean
}

interface Emits {
  (e: 'update:searchKeyword', value: string): void
  (e: 'search'): void
  (e: 'toggle-theme'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchKeyword', target.value)
  emit('search')
}

const toggleTheme = () => {
  emit('toggle-theme')
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1400px;
}

/* 头部样式 */
.header {
  background: var(--bg-primary);
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
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-input:focus {
  border-color: var(--accent-color);
  background: var(--bg-tertiary);
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
  gap: 12px;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.theme-toggle:hover {
  background: var(--bg-tertiary);
  transform: scale(1.05);
}

.theme-icon {
  font-size: 16px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-color);
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
}
</style>