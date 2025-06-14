<template>
  <div class="pagination-wrapper" v-if="totalPages > 1">
    <div class="pagination-info">
      <span class="total-info">共 {{ total }} 个网站</span>
      <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
    </div>
    
    <div class="pagination-controls">
      <!-- 上一页按钮 -->
      <button 
        class="pagination-btn prev-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <span class="btn-icon">←</span>
        <span class="btn-text">上一页</span>
      </button>
      
      <!-- 页码按钮 -->
      <div class="page-numbers">
        <!-- 第一页 -->
        <button 
          v-if="showFirstPage"
          class="page-btn"
          :class="{ active: currentPage === 1 }"
          @click="goToPage(1)"
        >
          1
        </button>
        
        <!-- 左侧省略号 -->
        <span v-if="showLeftEllipsis" class="ellipsis">...</span>
        
        <!-- 中间页码 -->
        <button 
          v-for="page in visiblePages"
          :key="page"
          class="page-btn"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        
        <!-- 右侧省略号 -->
        <span v-if="showRightEllipsis" class="ellipsis">...</span>
        
        <!-- 最后一页 -->
        <button 
          v-if="showLastPage"
          class="page-btn"
          :class="{ active: currentPage === totalPages }"
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>
      
      <!-- 下一页按钮 -->
      <button 
        class="pagination-btn next-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <span class="btn-text">下一页</span>
        <span class="btn-icon">→</span>
      </button>
    </div>
    
    <!-- 快速跳转 -->
    <div class="quick-jump">
      <span>跳转到</span>
      <input 
        v-model="jumpPage"
        type="number"
        :min="1"
        :max="totalPages"
        class="jump-input"
        @keyup.enter="handleJump"
      />
      <span>页</span>
      <button class="jump-btn" @click="handleJump">确定</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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
  const page = Number(jumpPage.value)
  if (page >= 1 && page <= totalPages.value) {
    goToPage(page)
    jumpPage.value = ''
  }
}

// 监听当前页变化，清空跳转输入
watch(() => props.currentPage, () => {
  jumpPage.value = ''
})
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-top: 40px;
}

.pagination-info {
  display: flex;
  gap: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 16px;
  font-weight: bold;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.page-btn.active {
  background: white;
  color: #667eea;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.ellipsis {
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  padding: 0 8px;
  user-select: none;
}

.quick-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.jump-input {
  width: 60px;
  padding: 6px 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  text-align: center;
  outline: none;
}

.jump-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.jump-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.jump-btn:hover {
  background: white;
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pagination-wrapper {
    gap: 15px;
    padding: 20px 15px;
  }
  
  .pagination-info {
    flex-direction: column;
    gap: 5px;
    text-align: center;
    font-size: 13px;
  }
  
  .pagination-controls {
    gap: 8px;
  }
  
  .pagination-btn {
    padding: 8px 12px;
    font-size: 13px;
    min-width: 70px;
  }
  
  .page-btn {
    width: 36px;
    height: 36px;
    font-size: 13px;
  }
  
  .quick-jump {
    font-size: 13px;
    gap: 6px;
  }
  
  .jump-input {
    width: 50px;
    padding: 4px 6px;
  }
}

@media (max-width: 480px) {
  .pagination-controls {
    flex-direction: column;
    gap: 12px;
  }
  
  .page-numbers {
    order: 1;
  }
  
  .prev-btn {
    order: 0;
  }
  
  .next-btn {
    order: 2;
  }
  
  .btn-text {
    display: none;
  }
  
  .pagination-btn {
    min-width: 40px;
    padding: 8px;
  }
}
</style>