<template>
  <div class="pagination-wrapper" v-if="totalPages >= 1">
    <div class="pagination-controls">
      <!-- 左箭头 -->
      <button 
        class="arrow-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        ←
      </button>
      
      <!-- 页码按钮 -->
      <button 
        class="page-btn"
        :class="{ active: currentPage === 1 }"
        @click="goToPage(1)"
      >
        1
      </button>
      
      <button 
        class="page-btn"
        :class="{ active: currentPage === 2 }"
        @click="goToPage(2)"
        v-if="totalPages >= 2"
      >
        2
      </button>
      
      <button 
        class="page-btn"
        :class="{ active: currentPage === 3 }"
        @click="goToPage(3)"
        v-if="totalPages >= 3"
      >
        3
      </button>
      
      <!-- 右箭头 -->
      <button 
        class="arrow-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        →
      </button>
      
      <!-- 跳转 -->
      <span class="jump-label">跳页</span>
      <input 
        v-model="jumpPage"
        type="number"
        :min="1"
        :max="totalPages"
        class="jump-input"
        @keyup.enter="handleJump"
        placeholder="页码"
      />
      <button class="go-btn" @click="handleJump">Go</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  total: number
  pageSize: number
  currentPage: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'pageChange': [page: number]
}>()

const jumpPage = ref<number | string>('')

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

// 计算可见页码
const visiblePages = computed(() => {
  const pages: number[] = []
  const { currentPage } = props
  const { maxVisiblePages } = props
  const total = totalPages.value
  
  if (total <= maxVisiblePages) {
    // 总页数小于等于最大可见页数，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 计算显示范围
    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(total, start + maxVisiblePages - 1)
    
    // 调整起始位置
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }
    
    // 避免与第一页和最后一页重复
    if (start <= 2) {
      start = 1
      end = Math.min(total, maxVisiblePages)
    }
    if (end >= total - 1) {
      end = total
      start = Math.max(1, total - maxVisiblePages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i)
      }
    }
  }
  
  return pages
})

// 是否显示第一页
const showFirstPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(1)
})

// 是否显示最后一页
const showLastPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(totalPages.value)
})

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  return showFirstPage.value && visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  return showLastPage.value && visiblePages.value.length > 0 && 
         visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1
})

// 跳转到指定页
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('update:currentPage', page)
    emit('pageChange', page)
  }
}

// 处理快速跳转
const handleJump = () => {
  const pageNum = Number(jumpPage.value)
  if (pageNum >= 1 && pageNum <= totalPages.value) {
    goToPage(pageNum)
    jumpPage.value = ''
  } else if (jumpPage.value !== '') {
    alert('页码超出范围！')
  }
}


</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-btn:hover:not(:disabled) {
  background: var(--bg-tertiary);
  transform: scale(1.1);
}

.arrow-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover {
  background: var(--bg-tertiary);
  transform: scale(1.1);
}

.page-btn.active {
  background: var(--accent-color);
  color: white;
  font-weight: 600;
}



.jump-label {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  margin-left: 16px;
}

.jump-input {
  width: 60px;
  height: 32px;
  padding: 0 8px;
  margin-left: 8px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 12px;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;
}

.jump-input:focus {
  border-color: var(--accent-color);
  background: var(--bg-tertiary);
  box-shadow: 0 0 0 2px rgba(0, 212, 170, 0.2);
}

.jump-input::placeholder {
  color: var(--text-secondary);
  font-size: 12px;
}

.go-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 16px;
  background: var(--accent-color);
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.go-btn:hover {
  background: #00c49a;
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pagination-controls {
    gap: 6px;
  }
  
  .arrow-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
  
  .page-btn {
    width: 28px;
    height: 28px;
    font-size: 13px;
  }
  
  .jump-label {
    font-size: 13px;
    margin-left: 12px;
  }
  
  .jump-input {
    width: 50px;
    height: 28px;
    font-size: 11px;
    margin-left: 6px;
  }
  
  .go-btn {
    padding: 4px 8px;
    font-size: 11px;
    margin-left: 6px;
  }
}

@media (max-width: 480px) {
  .jump-label,
  .jump-input,
  .go-btn {
    display: none;
  }
  
  .pagination-controls {
    gap: 4px;
  }
  
  .arrow-btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
  
  .page-btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
}
</style>