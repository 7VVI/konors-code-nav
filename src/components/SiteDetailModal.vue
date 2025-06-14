<template>
  <div v-if="visible && site" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <!-- 模态框头部 -->
      <div class="modal-header">
        <div class="site-header">
          <div class="site-icon">{{ site.icon }}</div>
          <div class="site-basic-info">
            <h2 class="site-name">{{ site.name }}</h2>
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
              <span class="rating-text">{{ site.rating }} ({{ site.reviews }} 评价)</span>
            </div>
          </div>
        </div>
        <button class="close-btn" @click="$emit('close')">
          ✕
        </button>
      </div>

      <!-- 模态框内容 -->
      <div class="modal-body">
        <!-- 网站描述 -->
        <section class="description-section">
          <h3>详细介绍</h3>
          <p class="detail-description">{{ site.detailDescription }}</p>
        </section>

        <!-- 功能特性 -->
        <section class="features-section">
          <h3>主要功能</h3>
          <ul class="features-list">
            <li v-for="feature in site.features" :key="feature" class="feature-item">
              <span class="feature-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </section>

        <!-- 优缺点 -->
        <div class="pros-cons-section">
          <div class="pros">
            <h3>优点</h3>
            <ul class="pros-list">
              <li v-for="pro in site.pros" :key="pro" class="pro-item">
                <span class="pro-icon">👍</span>
                {{ pro }}
              </li>
            </ul>
          </div>
          <div class="cons">
            <h3>缺点</h3>
            <ul class="cons-list">
              <li v-for="con in site.cons" :key="con" class="con-item">
                <span class="con-icon">👎</span>
                {{ con }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 标签 -->
        <section class="tags-section">
          <h3>相关标签</h3>
          <div class="tags">
            <span v-for="tag in site.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </section>

        <!-- 评论区占位 -->
        <section class="comments-section">
          <h3>用户评论</h3>
          <div class="comments-placeholder">
            <p>评论功能即将上线，敬请期待...</p>
          </div>
        </section>
      </div>

      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button class="visit-btn" @click="visitSite">
          <span class="visit-icon">🔗</span>
          访问网站
        </button>
      </div>
    </div>
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
  visible: boolean
  site: Site | null
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleOverlayClick = () => {
  emit('close')
}

const visitSite = () => {
  if (props.site) {
    window.open(props.site.url, '_blank')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--bg-secondary);
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.site-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.site-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.site-basic-info {
  flex: 1;
}

.site-name {
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: var(--border-color);
  font-size: 1.2rem;
  transition: color 0.2s ease;
}

.star.filled {
  color: #ffd700;
}

.star.half {
  color: #ffd700;
}

.rating-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-body section {
  margin-bottom: 32px;
}

.modal-body section:last-child {
  margin-bottom: 0;
}

.modal-body h3 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  padding: 8px 12px;
  background: rgba(0, 212, 170, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 170, 0.2);
}

.feature-icon {
  color: var(--accent-color);
  font-weight: bold;
}

.pros-cons-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.pros-list,
.cons-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pro-item,
.con-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.pro-item:last-child,
.con-item:last-child {
  border-bottom: none;
}

.pro-icon {
  font-size: 1rem;
}

.con-icon {
  font-size: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  background: rgba(0, 212, 170, 0.1);
  color: var(--accent-color);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(0, 212, 170, 0.2);
}

.comments-placeholder {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 2px dashed var(--border-color);
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.visit-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.visit-btn:hover {
  background: #00b894;
  transform: translateY(-1px);
}

.visit-icon {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }
  
  .site-header {
    gap: 12px;
  }
  
  .site-icon {
    font-size: 2.5rem;
  }
  
  .site-name {
    font-size: 1.5rem;
  }
  
  .pros-cons-section {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>