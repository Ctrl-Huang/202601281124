
import { z } from 'zod';
import React from 'react';

/**
 * 场景类型枚举
 * 决定了当前片段渲染哪种基础布局
 */
export enum SceneType {
  Title = 'title',       // 居中大标题，用于开场或结尾
  Subtitle = 'subtitle', // 居中次级标题，用于章节过渡
  Code = 'code',         // 代码演示窗口，支持简单的语法高亮
  Bullets = 'bullets',   // 竖向列表，用于列举要点
  Steps = 'steps',       // 横向步骤条 (1->2->3)，用于展示流程
  Diagram = 'diagram',   // 简单的节点连接图 (Node-Edge)
  Chart = 'chart',       // 数据图表 (柱状图/折线图)
  Showcase = 'showcase', // 【核心】高级组件展示，包含 30+ 种变体
  Custom = 'custom',     // 自定义场景 (预留)
}

/**
 * 基础场景接口
 * 所有场景都必须包含的通用属性
 */
export interface BaseScene {
  /** 场景唯一标识符 (key) */
  id: string;
  /** 场景类型 */
  type: SceneType;
  /** 持续时长 (帧数), 30fps 下 30帧=1秒 */
  durationInFrames: number;
  /** 进场转场效果 */
  transition?: 'fade' | 'slide' | 'wipe' | 'none';
}

// --- 基础组件 Props 定义 ---

export interface TitleProps { 
  /** 主标题文本 */
  title: string; 
  /** 副标题文本 */
  subtitle?: string; 
  /** 布局变体: 居中 | 左对齐 | 科技感装饰 */
  variant?: 'center' | 'left' | 'tech'; 
}

export interface SubtitleProps { 
  /** 字幕文本 */
  text: string; 
}

export interface CodeProps { 
  /** 代码内容 */
  code: string; 
  /** 语言 (目前仅用于显示文件名后缀，高亮逻辑通用) */
  language?: string; 
  /** 是否显示行号 */
  showLineNumbers?: boolean; 
  /** 需要高亮的行号数组 (从1开始) */
  highlightLines?: number[]; 
  /** 窗口顶部显示的文件名 */
  fileName?: string; 
}

export interface BulletItem { 
  /** 列表项文本 */
  text: string; 
  /** 图标: 支持 Emoji, SVG Path 或 图片 URL */
  icon?: string; 
  /** 图标颜色覆盖 */
  color?: string; 
}

export interface BulletsProps { 
  /** 列表标题 (可选) */
  title?: string; 
  /** 列表项数组 */
  items: BulletItem[]; 
  /** 布局方式 (预留) */
  layout?: 'left' | 'center'; 
}

export interface StepItem { 
  /** 步骤标题 */
  title: string; 
  /** 步骤描述 (可选) */
  description?: string; 
}

export interface StepsProps { 
  /** 步骤数组 */
  steps: StepItem[]; 
  /** 当前高亮的步骤索引 (0-based, undefined则全部高亮) */
  currentStepIndex?: number; 
}

// 流程图节点
export interface DiagramNode { 
  id: string; 
  label: string; 
  x: number; // 0-100 (百分比坐标)
  y: number; // 0-100 (百分比坐标)
  type?: 'rect' | 'circle' | 'diamond'; 
  color?: string; 
}
// 流程图连线
export interface DiagramEdge { 
  fromId: string; 
  toId: string; 
  label?: string; 
}
export interface DiagramProps { 
  nodes: DiagramNode[]; 
  edges: DiagramEdge[]; 
  title?: string; 
}

// 图表数据点
export interface ChartDataPoint { 
  label: string; 
  value: number; 
  color?: string; 
}
export interface ChartProps { 
  type: 'bar' | 'line'; 
  data: ChartDataPoint[]; 
  title?: string; 
  yAxisLabel?: string; 
}

// --- 新增：Showcase 高级组件 Props (30+ Variants) ---

/**
 * Showcase 组件变体列表
 * 下游 AI 请根据此列表的中文注释，选择最匹配视觉需求的组件名称
 */
export type ShowcaseVariant = 
  // --- 1. 卡片类 (Cards) - 用于展示核心概念、名言或项目 ---
  | 'GlassCard'           // [卡片] 毛玻璃质感，现代简约，适合通用标题
  | 'NeonCard'            // [卡片] 赛博朋克霓虹风格，黑底发光，适合强调技术词汇
  | 'TiltCard'            // [卡片] 3D 倾斜视差效果，增加画面深度
  | 'HoloCard'            // [卡片] 全息投影故障风格，科幻感强
  | 'GradientBorderCard'  // [卡片] 渐变流光边框，时尚动感
  | 'ProjectCard'         // [卡片] 项目/案例展示 (带预览图占位符)
  | 'ProfileCard'         // [卡片] 个人资料卡 (items: [头像URL, {数据对象}]) (NEW)
  | 'ParallaxStack'       // [布局] 多卡片堆叠视差效果，适合展示"多层架构"
  | 'ReflectiveCard'      // [卡片] 金属反光质感，高端大气
  | 'SpotlightCard'       // [卡片] 鼠标聚光灯跟随效果，极具交互感 (NEW)

  // --- 2. 设备样机类 (Devices) - 用于展示网页、终端或 App ---
  | 'BrowserWindow'       // [设备] 极简浏览器窗口，适合展示网页截图
  | 'BrowserV2'           // [设备] 拟真 Chrome 浏览器 (带标签页/地址栏/加载条) (NEW)
  | 'TerminalWindow'      // [设备] macOS 风格终端窗口，适合展示 CLI 命令
  | 'PowerShell'          // [设备] Windows PowerShell 蓝底终端，适合 Windows 场景 (NEW)
  | 'MobileFrame'         // [设备] 通用智能手机外壳
  | 'IPhoneMockup'        // [设备] iPhone 14 Pro 灵动岛样机，适合 iOS App 展示 (NEW)

  // --- 3. 科技小组件 (Widgets) - 用于点缀画面或展示微小数据 ---
  | 'KeyboardShortcut'    // [组件] 实体键盘按键，适合演示快捷键 (e.g. Cmd+C)
  | 'MouseCursor'         // [组件] 鼠标光标，可配合 HighlightBox 使用
  | 'GitGraph'            // [组件] Git 提交分支图，适合讲版本控制
  | 'FileTree'            // [组件] VSCode 风格文件树，适合讲项目结构
  | 'TechBadge'           // [组件] 技术栈徽章 (Pill shape)
  | 'ActivityHeatmap'     // [组件] GitHub 贡献热力图
  | 'NotificationToast'   // [组件] 系统通知弹窗 (Success/Error)
  | 'MetricCard'          // [组件] 核心指标卡 (Label + Big Value)
  | 'CircularProgress'    // [组件] 环形进度条
  | 'GlassDock'           // [组件] macOS 风格底部 Dock 栏，适合展示工具链图标 (NEW)

  // --- 3.5 真实 UI 模拟 (Realistic UI) ---
  | 'RealisticButton'     // [UI] 拟真 3D 按钮，带点击动画
  | 'AlertBox'            // [UI] 警告/错误提示框 (Error/Warning/Success)
  | 'Tooltip'             // [UI] 悬浮提示气泡
  | 'HighlightBox'        // [UI] 红框标记，用于高亮屏幕某一部分
  | 'GlassPanel'          // [容器] 通用磨砂玻璃容器，可包裹自定义内容

  // --- 4. 视觉背景类 (Visuals) - 用于营造氛围 ---
  | 'GradientMesh'        // [背景] 弥散渐变极光
  | 'GridPattern'         // [背景] 基础网格线
  | 'ParticleField'       // [背景] 漂浮粒子
  | 'DaVinciArt'          // [艺术] 达芬奇名画框，适合讲"艺术与技术" (NEW)
  | 'ParticleText'        // [文字] 3D 粒子汇聚成文字，适合大标题 (NEW)

  // --- 5. 布局类 (Layouts) - 用于组合多个元素 ---
  | 'BentoGrid'           // [布局] 便当盒网格 (Bento UI)，展示多个小组件
  | 'MosaicGrid'          // [布局] 马赛克艺术墙，由大量小块组成
  | 'MasonryWaterfall'    // [布局] 流动瀑布流，自动滚动的图片/卡片墙，列速不同 (NEW)
  | 'ParallaxScroll'      // [布局] 双列视差滚动列表，适合展示长列表
  | 'ParallaxGallery'     // [布局] 横向视差画廊，适合展示图片集 (NEW)
  | 'SplitScreen'         // [布局] 左右分屏对比 (左代码，右预览)
  | 'QuoteCard'           // [布局] 名人名言引用

  // --- 6. 扩展类 (Extras) ---
  | 'SocialPost'          // [组件] 简单社交媒体帖子
  | 'TwitterCard'         // [组件] 拟真 Twitter/X 帖子，包含蓝标/转评赞 (NEW)
  | 'KanbanBoard'         // [组件] 看板 (Trello 风格)
  | 'AudioWaveform'       // [组件] 音频波形跳动
  | 'GlobeWireframe'      // [组件] 线框地球
  | 'CalendarEvent'       // [组件] 日历事项卡片
  | 'SearchOmnibar'       // [组件] 全能搜索框 (Spotlight 风格)
  | 'ToggleSwitch'        // [组件] 开关控件
  | 'AvatarGroup'         // [组件] 用户头像组
  | 'PricingTier'         // [组件] 价格方案卡片
  | 'LoadingSpinner'      // [组件] 加载转圈
  | 'ProgressGauge'       // [组件] 仪表盘进度
  | 'CinematicText'       // [文字] 电影级模糊进场文字
  | 'ExplodingLaptop'     // [动画] 电脑爆炸/故障动画，适合讲 Bug (NEW)
  | 'AndroidMascot'       // [动画] 安卓机器人吉祥物 (NEW)
  | 'StickerWall';        // [背景] 随机贴纸墙，波普艺术风格 (NEW)

export interface ShowcaseProps {
  /** 
   * 组件变体名称
   * 决定了具体渲染哪个高级组件 
   */
  variant: ShowcaseVariant;
  
  /** 
   * 主标题 
   * 大多数组件将其映射为 Header, Label 或 Name 
   */
  title?: string;
  
  /** 
   * 副标题 
   * 大多数组件将其映射为 Description, URL, Content 或 Value
   */
  subtitle?: string;
  
  /** 
   * 列表数据 
   * 用于 Terminal (命令), FileTree (文件路径), KeyboardShortcut (按键), GlassDock (图标名) 等需要数组的组件
   */
  items?: any[]; 
  
  /** 
   * 主题色覆盖 
   * 默认为 VideoConfig 的 accentColor，传入此值可强制改变组件颜色 
   */
  color?: string; 
  
  /** 
   * 是否包含背景 
   * 部分组件(如文字类)默认透明，设为 true 可强制渲染一个默认的各种背景组件 
   */
  background?: boolean; 
  
  /** 自定义子元素 (高阶用法，直接传入 React Node) */
  children?: React.ReactNode; 
  
  /** 自定义样式对象 */
  style?: React.CSSProperties;
}

/**
 * 联合类型：场景定义
 * 视频配置数组中的每一项必须是以下之一
 */
export type Scene = BaseScene & {
  props:
    | TitleProps
    | SubtitleProps
    | CodeProps
    | BulletsProps
    | StepsProps
    | DiagramProps
    | ChartProps
    | ShowcaseProps 
    | any;
};

/**
 * 全局视频配置
 * 控制视频的整体参数
 */
export interface VideoConfig {
  /** 视频宽度 (px) - 推荐 3840 (4K) */
  width: number;
  /** 视频高度 (px) - 推荐 1600 (超宽屏) */
  height: number;
  /** 帧率 (fps) */
  fps: number;
  /** 全局背景色 (Hex) */
  backgroundColor: string;
  /** 全局强调色 (Hex) - 用于高亮、图标、按钮等 */
  accentColor: string;
  /** 全局文字颜色 (Hex) */
  textColor: string;
  /** 全局主要字体 */
  fontFamily: string;
  /** 代码块专用字体 */
  codeFontFamily: string;
  /** 场景列表 - 视频的核心内容 */
  scenes: Scene[];
}
