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
        tags: ['代码托管', 'Git', '开源'],
        rating: 4.8,
        reviews: 1250,
        detailDescription: 'GitHub是全球最大的代码托管平台，为开发者提供Git版本控制、协作开发、项目管理等功能。支持公开和私有仓库，拥有强大的社区生态系统。',
        features: ['Git版本控制', '协作开发', 'Issues跟踪', 'Pull Request', 'Actions CI/CD', '项目管理'],
        pros: ['免费使用', '强大的社区', '丰富的开源项目', '完善的文档'],
        cons: ['国内访问较慢', '私有仓库有限制']
      },
      {
        id: 'vscode',
        name: 'VS Code',
        description: '微软开发的免费代码编辑器',
        url: 'https://code.visualstudio.com',
        icon: '📝',
        tags: ['编辑器', 'IDE', '微软'],
        rating: 4.7,
        reviews: 980,
        detailDescription: 'Visual Studio Code是微软开发的免费、开源的代码编辑器，支持多种编程语言，拥有丰富的插件生态系统。',
        features: ['智能代码补全', '调试功能', '插件扩展', 'Git集成', '多语言支持', '主题定制'],
        pros: ['完全免费', '轻量快速', '插件丰富', '跨平台支持'],
        cons: ['内存占用较高', '启动速度一般']
      },
      {
        id: 'stackoverflow',
        name: 'Stack Overflow',
        description: '程序员问答社区',
        url: 'https://stackoverflow.com',
        icon: '❓',
        tags: ['问答', '社区', '技术支持'],
        rating: 4.6,
        reviews: 2100,
        detailDescription: 'Stack Overflow是全球最大的程序员问答社区，开发者可以在这里提问、回答技术问题，分享编程知识。',
        features: ['技术问答', '代码分享', '声誉系统', '标签分类', '搜索功能', '社区投票'],
        pros: ['问题质量高', '回答及时', '知识丰富', '搜索便利'],
        cons: ['英文为主', '新手门槛高', '重复问题多']
      },
      {
        id: 'jetbrains',
        name: 'JetBrains',
        description: '专业的集成开发环境',
        url: 'https://www.jetbrains.com/',
        icon: '🧠',
        tags: ['IDE', '开发工具', '编程'],
        rating: 4.6,
        reviews: 8520,
        detailDescription: 'JetBrains是一家专注于开发工具的公司，提供IntelliJ IDEA、PyCharm、WebStorm等多款专业IDE。这些工具以其强大的代码分析、智能提示和重构功能而闻名，是许多专业开发者的首选。',
        features: ['智能代码补全', '强大的重构工具', '集成版本控制', '插件生态丰富', '多语言支持'],
        pros: ['功能强大', '用户体验优秀', '持续更新', '社区活跃'],
        cons: ['价格较高', '资源占用大', '学习曲线陡峭']
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
        tags: ['JavaScript', '后端', '运行时'],
        rating: 4.5,
        reviews: 12450,
        detailDescription: 'Node.js是一个基于Chrome V8引擎的JavaScript运行时环境，让JavaScript能够在服务器端运行。它采用事件驱动、非阻塞I/O模型，使其轻量且高效，非常适合构建数据密集型的实时应用。',
        features: ['事件驱动架构', '非阻塞I/O', 'NPM包管理', '跨平台支持', '活跃社区'],
        pros: ['性能优秀', '生态丰富', '学习成本低', '全栈开发'],
        cons: ['单线程限制', '回调地狱', 'CPU密集型任务性能差']
      },
      {
        id: 'spring',
        name: 'Spring',
        description: 'Java企业级开发框架',
        url: 'https://spring.io',
        icon: '🍃',
        tags: ['Java', '框架', '企业级'],
        rating: 4.7,
        reviews: 9876,
        detailDescription: 'Spring是Java平台上最流行的企业级开发框架，提供了全面的编程和配置模型。Spring Boot进一步简化了Spring应用的创建和部署，让开发者能够快速构建生产级别的应用。',
        features: ['依赖注入', '面向切面编程', '事务管理', '数据访问', '安全框架'],
        pros: ['功能全面', '文档完善', '社区强大', '企业级支持'],
        cons: ['学习曲线陡峭', '配置复杂', '框架较重']
      },
      {
        id: 'docker',
        name: 'Docker',
        description: '容器化平台',
        url: 'https://www.docker.com',
        icon: '🐳',
        tags: ['容器', 'DevOps', '部署'],
        rating: 4.4,
        reviews: 7654,
        detailDescription: 'Docker是一个开源的容器化平台，可以将应用程序及其依赖项打包到轻量级、可移植的容器中。这种方式确保了应用在任何环境中都能一致运行，大大简化了部署和运维工作。',
        features: ['容器化技术', '镜像管理', '编排工具', '跨平台支持', '微服务架构'],
        pros: ['部署简单', '环境一致', '资源利用率高', '扩展性好'],
        cons: ['学习成本高', '安全性考虑', '存储管理复杂']
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