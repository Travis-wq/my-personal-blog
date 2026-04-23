# Travis 的个人博客

一个现代化的网络安全工程师个人博客，使用 Next.js + TypeScript + Tailwind CSS 构建。

## 特性

- **现代化技术栈**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **深色模式**: 支持自动/手动切换深色/浅色主题
- **博客系统**: 基于 MDX 的文章管理，支持目录、代码高亮
- **响应式设计**: 完美适配桌面和移动设备
- **SEO 优化**: 完善的 meta 标签和 Open Graph 支持
- **动画效果**: 使用 Framer Motion 实现流畅的页面过渡和交互动画

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [MDX](https://mdxjs.com/) - Markdown 组件
- [next-themes](https://github.com/pacocoursey/next-themes) - 主题管理

## 项目结构

```
my-blog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 根布局
│   ├── globals.css        # 全局样式
│   ├── blog/              # 博客相关页面
│   ├── projects/          # 项目展示页
│   ├── about/             # 关于我
│   └── contact/           # 联系页
├── components/            # React 组件
│   ├── layout/           # 布局组件 (Navbar, Footer)
│   ├── home/             # 首页组件
│   ├── blog/             # 博客组件
│   ├── projects/         # 项目组件
│   ├── about/            # 关于页组件
│   ├── contact/          # 联系页组件
│   └── ui/               # 通用 UI 组件
├── content/posts/         # 博客文章 (MDX)
├── data/                  # 数据文件
│   ├── site.ts           # 站点配置
│   ├── nav.ts            # 导航数据
│   ├── skills.ts         # 技能数据
│   ├── projects.ts       # 项目数据
│   └── timeline.ts       # 时间线数据
├── lib/                   # 工具函数
│   ├── utils.ts          # 通用工具
│   └── posts.ts          # 文章相关工具
├── types/                 # TypeScript 类型定义
├── public/               # 静态资源
└── styles/               # 样式文件
```

## 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

## 开发运行

```bash
npm run dev
```

访问 http://localhost:3000

## 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 部署到 Vercel

1. 在 [Vercel](https://vercel.com) 注册账号
2. 导入 GitHub 仓库
3. 框架预设选择 `Next.js`
4. 点击 Deploy

或者使用 Vercel CLI:

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

## 如何自定义内容

### 1. 修改个人信息

编辑 `data/site.ts`:

```typescript
export const siteConfig = {
  name: "你的名字",
  title: "你的博客标题",
  description: "你的博客描述",
  author: "作者名",
  email: "your@email.com",
  github: "https://github.com/yourusername",
  // ...
};
```

### 2. 添加/修改导航

编辑 `data/nav.ts`:

```typescript
export const navItems = [
  { label: "首页", href: "/" },
  { label: "博客", href: "/blog" },
  // 添加更多...
];
```

### 3. 添加博客文章

在 `content/posts/` 目录下创建 `.mdx` 文件:

```markdown
---
title: 文章标题
date: "2024-01-01"
excerpt: 文章摘要
category: 分类
tags: ["标签1", "标签2"]
published: true
---

文章内容，支持 Markdown 语法...
```

### 4. 修改技能展示

编辑 `data/skills.ts`:

```typescript
export const skills = [
  { name: "技能名称", level: 80, category: "security" },
  // ...
];
```

### 5. 添加项目

编辑 `data/projects.ts`:

```typescript
export const projects = [
  {
    id: "project-id",
    name: "项目名称",
    description: "项目描述",
    techStack: ["技术1", "技术2"],
    githubUrl: "https://github.com/...",
    demoUrl: "https://...",
  },
  // ...
];
```

### 6. 修改学习历程

编辑 `data/timeline.ts`:

```typescript
export const timelineItems = [
  {
    date: "2024.01",
    title: "事件标题",
    description: "事件描述",
    type: "milestone", // milestone | learning | project | work
  },
  // ...
];
```

### 7. 修改头像

当前使用首字母作为头像。如需使用图片:

1. 将头像图片放入 `public/images/`
2. 修改 `components/home/Hero.tsx` 中的头像部分

## License

MIT License
