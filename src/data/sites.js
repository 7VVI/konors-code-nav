// 编程导航网站数据配置
export const siteCategories = [
  {
    id: 'development',
    name: '开发工具',
    icon: '🛠️',
    sites: [
      {
        id: 'github',
        name: 'GitHub',
        description: '全球最大的代码托管平台',
        url: 'https://github.com',
        icon: '🐙',
        tags: ['代码托管', 'Git', '开源']
      },
      {
        id: 'vscode',
        name: 'VS Code',
        description: '微软开发的免费代码编辑器',
        url: 'https://code.visualstudio.com',
        icon: '📝',
        tags: ['编辑器', 'IDE', '微软']
      },
      {
        id: 'stackoverflow',
        name: 'Stack Overflow',
        description: '程序员问答社区',
        url: 'https://stackoverflow.com',
        icon: '❓',
        tags: ['问答', '社区', '技术支持']
      }
    ]
  },
  {
    id: 'frontend',
    name: '前端开发',
    icon: '🎨',
    sites: [
      {
        id: 'vue',
        name: 'Vue.js',
        description: '渐进式JavaScript框架',
        url: 'https://vuejs.org',
        icon: '💚',
        tags: ['框架', 'JavaScript', 'Vue']
      },
      {
        id: 'react',
        name: 'React',
        description: 'Facebook开发的UI库',
        url: 'https://reactjs.org',
        icon: '⚛️',
        tags: ['框架', 'JavaScript', 'React']
      },
      {
        id: 'mdn',
        name: 'MDN Web Docs',
        description: 'Web开发者文档',
        url: 'https://developer.mozilla.org',
        icon: '📚',
        tags: ['文档', 'Web', 'Mozilla']
      }
    ]
  },
  {
    id: 'backend',
    name: '后端开发',
    icon: '⚙️',
    sites: [
      {
        id: 'nodejs',
        name: 'Node.js',
        description: 'JavaScript运行时环境',
        url: 'https://nodejs.org',
        icon: '🟢',
        tags: ['JavaScript', '后端', '运行时']
      },
      {
        id: 'spring',
        name: 'Spring',
        description: 'Java企业级开发框架',
        url: 'https://spring.io',
        icon: '🍃',
        tags: ['Java', '框架', '企业级']
      },
      {
        id: 'docker',
        name: 'Docker',
        description: '容器化平台',
        url: 'https://www.docker.com',
        icon: '🐳',
        tags: ['容器', 'DevOps', '部署']
      }
    ]
  },
  {
    id: 'design',
    name: '设计资源',
    icon: '🎭',
    sites: [
      {
        id: 'figma',
        name: 'Figma',
        description: '在线UI设计工具',
        url: 'https://www.figma.com',
        icon: '🎨',
        tags: ['设计', 'UI', '协作']
      },
      {
        id: 'dribbble',
        name: 'Dribbble',
        description: '设计师作品展示平台',
        url: 'https://dribbble.com',
        icon: '🏀',
        tags: ['设计', '灵感', '作品集']
      },
      {
        id: 'unsplash',
        name: 'Unsplash',
        description: '免费高质量图片素材',
        url: 'https://unsplash.com',
        icon: '📷',
        tags: ['图片', '素材', '免费']
      }
    ]
  },
  {
    id: 'learning',
    name: '学习资源',
    icon: '📖',
    sites: [
      {
        id: 'freecodecamp',
        name: 'freeCodeCamp',
        description: '免费编程学习平台',
        url: 'https://www.freecodecamp.org',
        icon: '🔥',
        tags: ['学习', '免费', '编程']
      },
      {
        id: 'coursera',
        name: 'Coursera',
        description: '在线课程平台',
        url: 'https://www.coursera.org',
        icon: '🎓',
        tags: ['课程', '学习', '认证']
      },
      {
        id: 'leetcode',
        name: 'LeetCode',
        description: '算法练习平台',
        url: 'https://leetcode.com',
        icon: '🧮',
        tags: ['算法', '面试', '练习']
      }
    ]
  }
];

// 获取所有网站
export const getAllSites = () => {
  return siteCategories.flatMap(category => 
    category.sites.map(site => ({
      ...site,
      category: category.name,
      categoryId: category.id
    }))
  );
};

// 根据分类获取网站
export const getSitesByCategory = (categoryId) => {
  const category = siteCategories.find(cat => cat.id === categoryId);
  return category ? category.sites : [];
};

// 搜索网站
export const searchSites = (keyword) => {
  const allSites = getAllSites();
  const lowerKeyword = keyword.toLowerCase();
  
  return allSites.filter(site => 
    site.name.toLowerCase().includes(lowerKeyword) ||
    site.description.toLowerCase().includes(lowerKeyword) ||
    site.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
};