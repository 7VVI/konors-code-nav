# CodeNav - 编程导航

🚀 一个现代化的编程资源导航网站，帮助开发者快速找到所需的工具、学习资源和技术文档。

## ✨ 特性

- 🎨 **现代化设计** - 深色主题，简洁美观的界面
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🔍 **智能搜索** - 快速搜索网站和工具
- 🏷️ **分类导航** - 按技术领域分类整理资源
- ⚡ **快速访问** - 一键跳转到目标网站
- 🎯 **精选资源** - 收录高质量的开发工具和学习资源

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式**: CSS3 + Flexbox + Grid
- **开发语言**: TypeScript

## 📦 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd konors-code-nav

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 📁 项目结构

```
konors-code-nav/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── Navigation.vue   # 主导航组件
│   │   ├── SiteCard.vue     # 网站卡片组件
│   │   └── Pagination.vue   # 分页组件
│   ├── data/
│   │   └── sites.js         # 网站数据配置
│   ├── assets/              # 静态资源
│   ├── App.vue              # 根组件
│   ├── main.ts              # 应用入口
│   └── style.css            # 全局样式
├── public/                  # 公共资源
├── package.json             # 项目配置
└── README.md                # 项目说明
```

## 🎯 功能模块

### 分类导航
- 🛠️ **开发工具** - GitHub、VS Code、Stack Overflow 等
- 📚 **学习资源** - MDN、W3Schools、菜鸟教程 等
- 🎨 **设计工具** - Figma、Adobe Creative Suite 等
- ☁️ **云服务** - AWS、阿里云、腾讯云 等
- 🔧 **实用工具** - 在线工具、转换器、生成器 等

### 搜索功能
- 实时搜索网站名称和描述
- 支持中英文搜索
- 搜索结果高亮显示

### 响应式设计
- 桌面端：多列网格布局
- 平板端：自适应列数
- 移动端：单列布局，优化触摸体验

## 🎨 设计特色

- **深色主题**: 护眼的深色配色方案
- **卡片设计**: 现代化的卡片式布局
- **悬停效果**: 丰富的交互动画
- **绿色强调**: 使用 `#00d4aa` 作为主题色
- **圆角设计**: 统一的圆角风格

## 🔧 自定义配置

### 添加新网站

在 `src/data/sites.js` 中添加新的网站数据：

```javascript
{
  id: 'unique-id',
  name: '网站名称',
  description: '网站描述',
  url: 'https://example.com',
  icon: '🌟',
  tags: ['标签1', '标签2']
}
```

### 添加新分类

```javascript
{
  id: 'category-id',
  name: '分类名称',
  icon: '🎯',
  sites: [/* 网站列表 */]
}
```

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态文件服务器。

### 推荐部署平台

- **Vercel** - 零配置部署
- **Netlify** - 持续集成部署
- **GitHub Pages** - 免费静态托管
- **阿里云OSS** - 国内访问优化

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为开源社区做出贡献的开发者们！

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
