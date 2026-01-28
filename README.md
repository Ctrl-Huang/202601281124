
# 🎥 中文技术讲解视频 Remotion 脚手架 (4K)

专为**中文技术讲解视频**打造的专业级 Remotion 项目脚手架。
**配置驱动 (Configuration Driven)**，开箱即用，支持 4K 分辨率 (3840x1600)，内置 33+ 种高亮代码块、流程图、图表及高级 UI 演示组件。

---

## 🚀 核心特性

- **📄 配置即视频**：无需手写 React 动画代码，只需修改 `src/Composition.tsx` 中的 JSON 配置即可生成专业视频。
- **🖥️ 4K 超宽屏**：默认 3840 x 1600 分辨率，适应现代沉浸式观看体验，支持 60fps 流畅渲染。
- **🇨🇳 中文优化**：
  - 预设 Noto Sans SC 字体，针对汉字排版优化的行高与间距。
  - 所有文档、注释均为简体中文。
- **🧩 30+ 高级组件 (Showcase)**：
  - **设备模拟**：iPhone 14 Pro (灵动岛)、macOS 终端、Chrome 浏览器。
  - **精美卡片**：毛玻璃 (Glassmorphism)、赛博朋克霓虹 (Neon)、全息投影 (Holo)。
  - **数据可视化**：GitHub 热力图、Git 分支图、动态图表。
  - **特效背景**：黑客帝国数字雨、3D 粒子文字、达芬奇名画框。

---

## 🛠️ 快速开始

确保你安装了 Node.js (v16+) 和 NPM。

### 1. 安装依赖
```bash
npm install
```

### 2. 启动预览
启动本地预览服务器，实时编辑。
```bash
npm start
```
访问 http://localhost:3000 查看预览。

### 3. 生成视频
将配置渲染为最终的 MP4 文件。
```bash
npm run build
```
视频将输出到 `out/video.mp4`。

---

## 📝 如何制作视频

核心逻辑位于 `src/Composition.tsx` 文件。你只需要修改 `videoConfig.scenes` 数组。

### 场景配置示例

**1. 展示代码片段**
```typescript
{
  id: 'demo-code',
  type: SceneType.Code, 
  durationInFrames: 90, 
  props: { 
    code: "console.log('Hello Remotion');", 
    fileName: 'index.ts',
    highlightLines: [1] 
  }
}
```

**2. 展示高级组件 (Showcase)**
```typescript
{
  id: 'demo-browser',
  type: SceneType.Showcase,
  durationInFrames: 120,
  props: {
    variant: 'BrowserV2', // 组件名
    title: '我的网站',
    subtitle: 'mysite.com'
  }
}
```

👉 **[查看完整组件手册 (COMPONENT_MANUAL.md)](./COMPONENT_MANUAL.md)** 获取所有 `variant` 名称及其效果预览。

---

## 📂 目录结构

```
src/
├── components/          # 组件库
│   ├── Showcase/        # [核心] 30+ 高级演示组件 (Cards, Devices...)
│   ├── CodeBlock.tsx    # 代码高亮组件
│   ├── ...              # 其他基础组件
├── utils/               # 动画与文本工具函数
├── Composition.tsx      # [入口] 视频编排与配置中心
├── types.ts             # [文档] TypeScript 类型定义与注释
├── Root.tsx             # Remotion 注册入口
└── index.tsx            # Webpack 入口
```

## 🤖 AI 协作指南

如果你使用 Cursor、Copilot 或 ChatGPT 辅助开发，请提示 AI：
> "请阅读 `src/types.ts` 中的 `ShowcaseVariant` 类型定义，根据我描述的内容选择最合适的组件变体。"

本项目已在 `src/types.ts` 中为 AI 添加了详尽的上下文注释。

## 📄 许可证

MIT License
