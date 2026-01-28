

# 📘 Remotion 组件 AI 使用手册 (Component Manual)

> **致 AI 助手 (ChatGPT / Claude / Cursor)**:
> 当用户要求你生成视频配置时，请**必须**查阅本文档。
> 下表定义了 `SceneType.Showcase` 支持的所有 `variant` 参数。请根据用户的文本描述，选择最匹配视觉意图的组件。

## 🧩 通用数据结构

所有 `Showcase` 场景的 JSON 结构如下：

```typescript
{
  id: 'unique-id',
  type: SceneType.Showcase,
  durationInFrames: 90, // 推荐 60-120 帧
  props: {
    variant: '组件名称', // 见下表
    title: '主标题',     // 可选
    subtitle: '副标题/内容/数值', // 可选
    items: [],          // 可选，用于列表数据
    color: '#00E5FF'    // 可选，覆盖主题色
  }
}
```

---

## 📚 Showcase 组件变体索引 (Variant Index)

### 1. 🌟 电影级/高级视觉 (Ultra Premium)
**用途**：用于开场、重要转场或需要极强视觉冲击力的时刻。

| Variant (变体名) | 视觉描述 | Props 映射说明 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **`ParticleText`** | **3D粒子文字** (NEW)，大量光点组成文字。 | `title`: 要展示的中文/英文 | **强烈推荐**：核心技术概念、大标题 |
| **`DaVinciArt`** | **达芬奇名画** (NEW)，金色画框+复古滤镜。 | `title`: 画中文字 (模拟名画标题) | 艺术、历史、经典、永恒话题 |
| **`SpotlightCard`** | **聚光灯卡片**，光斑随时间移动照亮边框。 | `title`: 标题, `color`: 光色 | **推荐**：展示核心概念，科技感极强 |
| **`ReflectiveCard`** | **流光卡片**，光束扫过黑色表面。 | `title`: 卡片文字, `color`: 光束颜色 | 只有 1-2 个词的核心概念 |
| **`CinematicText`** | **电影字幕**，模糊进场+字距拉伸。 | `title`: 主标题, `subtitle`: 小字 | **视频开场**、章节大标题 |
| **`GradientMesh`** | **弥散渐变**，流动的极光背景。 | (无 Props) | 这里的背景通常作为其他组件的衬托 |

### 2. 💥 极繁主义与躁动 (Maximalism & Chaos)
**用途**：制造视觉噪音、紧迫感或赛博朋克风格的高密度信息流。

| Variant (变体名) | 视觉描述 | Props 映射说明 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **`StickerWall`** | **波普贴纸墙** (NEW)，随机散布的Emoji/图标。 | (无 Props) | 创意爆发、混乱、丰富多彩的生态 |

### 3. 💻 设备与环境 (Devices)
**用途**：模拟代码运行环境、网页或 App。

| Variant (变体名) | 视觉描述 | Props 映射说明 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **`PowerShell`** | **Win终端** (NEW)，蓝底白字经典界面。 | `items`: 命令列表 (`string[]`) | Windows 环境、系统管理、脚本 |
| **`IPhoneMockup`** | **iPhone 14** (NEW)，灵动岛+圆角。 | `subtitle`: 屏幕壁纸URL (可选) | 移动端展示、iOS App |
| **`AndroidMascot`** | **安卓机器人** (NEW)，挥手的绿色吉祥物。 | (无特定 Props) | Android 开发、移动生态 |
| **`BrowserV2`** | **高级浏览器**，真实 Chrome 界面。 | `title`: 标签页标题, `subtitle`: URL | **推荐**：网页演示、SaaS 产品 |
| **`TerminalWindow`** | **终端**，纯黑 Mac 命令行界面。 | `items`: `string[]` (命令列表) | CLI 教程、安装步骤 |

### 4. 🧩 趣味与扩展 (Extra & Widgets)
**用途**：增加视频趣味性或强调特定状态。

| Variant (变体名) | 视觉描述 | Props 映射说明 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **`TwitterCard`** | **拟真推文** (NEW)，黑底白字含蓝标。 | `title`: 姓名, `subtitle`: 内容, `items[0]`: @handle | 引用名人名言、展示社区反馈 |
| **`ExplodingLaptop`** | **电脑爆炸** (NEW)，震动+冒烟+Error。 | (无特定 Props) | 错误演示、系统崩溃、Bug 警告 |
| **`GlassDock`** | **毛玻璃底座**，macOS 风格。 | `items`: 图标/文字数组 | **推荐**：技术栈图标展示 |
| **`KeyboardShortcut`** | **快捷键**，立体键帽。 | `items`: `['Cmd', 'C']` | 快捷键教学 |
| **`NotificationToast`** | **通知弹窗**，侧边带色条。 | `title`: 标题, `subtitle`: 内容 | 成功/错误提示 |

### 5. 📇 通用卡片 (Cards)
**用途**：展示概念、名言、项目或强调某个模块。

| Variant (变体名) | 视觉描述 | Props 映射说明 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **`ProfileCard`** | **个人资料卡** (NEW)，含头像、简介、数据。 | `items`: **`[头像URL, {followers, following}]`** | 团队介绍、用户案例 |
| **`GlassCard`** | **毛玻璃**，半透明磨砂，高端质感。 | `title`: 标题, `subtitle`: 描述 | 介绍概念、通用展示 |
| **`NeonCard`** | **霓虹发光**，黑底+彩色光晕。 | `title`: 文字, `color`: 光色 | 赛博朋克、黑客、游戏 |
| **`ProjectCard`** | **项目卡片**，上图下文布局。 | `title`: 项目名, `subtitle`: 描述 | GitHub 项目介绍、案例展示 |

### 6. 📐 布局与画廊 (Layouts)
**用途**：组合多个元素，展示大量内容。

| Variant (变体名) | 视觉描述 | Props 映射说明 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **`MasonryWaterfall`** | **流动瀑布流** (NEW)，多列卡片自动滚动。 | `items`: 图片URL数组或文本数组 | **强烈推荐**：作品集、图片画廊、多案例展示 |
| **`ParallaxGallery`** | **视差画廊**，横向滚动带视差背景。 | `items`: 卡片内容数组 | 图片墙、横向展示 |
| **`BentoGrid`** | **便当盒布局**，3x2 网格，大小不一。 | `children`: 子组件数组 | 仪表盘、功能概览 |

---

## 📝 给 AI 的配置生成范例

**任务**：展示一段 Windows 脚本执行过程。

```typescript
{
  id: 'win-script',
  type: SceneType.Showcase,
  durationInFrames: 120,
  props: {
    variant: 'PowerShell',
    items: ['npm run build', 'Build success!']
  }
}
```

**任务**：展示 Elon Musk 的一条推文。

```typescript
{
  id: 'elon-tweet',
  type: SceneType.Showcase,
  durationInFrames: 120,
  props: {
    variant: 'TwitterCard',
    title: 'Elon Musk',
    subtitle: 'Make humanity multiplanetary! 🚀',
    items: ['@elonmusk']
  }
}
```

**任务**：介绍团队核心成员 (注意 `items` 格式)。

```typescript
{
  id: 'team-member',
  type: SceneType.Showcase,
  durationInFrames: 120,
  props: {
    variant: 'ProfileCard',
    title: 'Sophie Bennett',
    subtitle: 'Product Designer',
    items: [
      'https://example.com/avatar.jpg', 
      { followers: '312', following: '48' } // 必须作为 items[1] 传入
    ]
  }
}
```
