<template>
  <div class="site-card" @click="showDetail" @mousedown="() => console.log('mousedown')" @mouseup="() => console.log('mouseup')">
    <div class="card-header">
      <div class="site-icon">{{ site.icon }}</div>
      <div class="site-info">
        <h3 class="site-name">{{ site.name }}</h3>
        <p class="site-description">{{ site.description }}</p>
        <!-- 星级评分 -->
        <div class="rating-section">
          <div class="stars">
            <span 
              v-for="star in 5" 
              :key="star"
              class="star"
              :class="{ filled: star <= Math.floor(site.rating), half: star === Math.ceil(site.rating) && site.rating % 1 !== 0 }"
            >
              ★
            </span>
          </div>
          <span class="rating-text">{{ site.rating }}</span>
          <span class="reviews-text">({{ site.reviews }})</span>
        </div>
      </div>
    </div>
    
    <div class="card-footer">
      <div class="site-tags">
        <span 
          v-for="tag in site.tags" 
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    
    <!-- 悬浮效果 -->
    <div class="card-overlay"></div>
  </div>
</template>

<script setup lang="ts">
interface Site {
  id: string
  name: string
  description: string
  url: string
  icon: string
  tags: string[]
  rating: number
  reviews: number
  detailDescription: string
  features: string[]
  pros: string[]
  cons: string[]
}

interface Props {
  site: Site
}

interface Emits {
  (e: 'show-detail', site: Site): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showDetail = () => {
  console.log('SiteCard clicked:', props.site.name)
  emit('show-detail', props.site)
}
</script>

<style scoped>
.site-card {
  position: relative;
  background: #2d3748;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #4a5568;
  overflow: hidden;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
}

.site-card:active {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  background: #374151;
  border-color: #00d4aa;
}

.site-card:hover .card-overlay {
  opacity: 1;
}

.site-card:hover .site-icon {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 212, 170, 0.05) 0%, rgba(0, 212, 170, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.site-icon {
  font-size: 2.5rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.site-info {
  flex: 1;
  min-width: 0;
}

.site-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.site-description {
  font-size: 0.85rem;
  color: #a0aec0;
  margin: 0 0 8px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  color: #4a5568;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.star.filled {
  color: #ffd700;
}

.star.half {
  color: #ffd700;
}

.rating-text {
  color: #00d4aa;
  font-size: 0.8rem;
  font-weight: 600;
}

.reviews-text {
  color: #a0aec0;
  font-size: 0.75rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
}

.site-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(0, 212, 170, 0.1);
  color: #00d4aa;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(0, 212, 170, 0.2);
  transition: all 0.2s ease;
}

.site-card:hover .tag {
  background: rgba(0, 212, 170, 0.15);
  border-color: rgba(0, 212, 170, 0.3);
}



/* 响应式设计 */
@media (max-width: 768px) {
  .site-card {
    padding: 16px;
    height: 160px;
  }
  
  .card-header {
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .site-icon {
    font-size: 2rem;
  }
  
  .site-name {
    font-size: 1rem;
  }
  
  .site-description {
    font-size: 0.85rem;
  }
  
  .tag {
    font-size: 0.7rem;
    padding: 3px 6px;
  }
}

@media (max-width: 480px) {
  .site-card {
    padding: 16px;
    min-height: 120px;
  }
  
  .card-header {
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .site-icon {
    font-size: 1.8rem;
  }
  
  .site-name {
    font-size: 1rem;
  }
  
  .site-description {
    font-size: 0.8rem;
    -webkit-line-clamp: 1;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .visit-button {
    align-self: flex-end;
  }
}

/* 动画效果 */
@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.site-card {
  animation: cardEnter 0.5s ease-out;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .site-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .site-card:hover {
    background: rgba(40, 40, 40, 0.98);
  }
  
  .site-name {
    color: #f0f0f0;
  }
  
  .site-description {
    color: #b0b0b0;
  }
  
  .tag {
    background: rgba(102, 126, 234, 0.2);
    color: #8fa7ff;
    border-color: rgba(102, 126, 234, 0.3);
  }
  
  .visit-button {
    color: #8fa7ff;
  }
}
</style>