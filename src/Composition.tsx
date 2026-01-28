
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { VideoConfig, SceneType, ShowcaseProps } from './types';
import { LayoutContainer } from './components/LayoutContainer';
import { AnimatedTitle } from './components/AnimatedTitle';
import { Subtitle } from './components/Subtitle';
import { BulletList } from './components/BulletList';
import { CodeBlock } from './components/CodeBlock';
import { NumberedSteps } from './components/NumberedSteps';
import { SimpleDiagram } from './components/SimpleDiagram';
import { Chart } from './components/Chart';
import { ProgressBar } from './components/ProgressBar';
import { SceneTransition } from './components/SceneTransition';

// 统一从 index.ts 导入所有 Showcase 组件
import * as SC from './components/Showcase';

/**
 * ============================================================================================
 * 🛠️ Remotion 脚手架演示配置
 * 
 * 这个文件演示了如何通过配置 `videoConfig` 来生成一段完整的技术讲解视频。
 * 本示例视频的主题是：“介绍这个 Remotion 脚手架的功能”。
 * 
 * 你可以复制下面的结构，修改 `scenes` 数组来制作你自己的视频。
 * ============================================================================================
 */

// Showcase Factory: 根据 variant 渲染对应组件 (保持不变)
const ShowcaseFactory: React.FC<ShowcaseProps> = ({ variant, title, subtitle, items, color = '#00E5FF', style }) => {
  switch (variant) {
    // --- 1. Cards ---
    case 'GlassCard': return <SC.GlassCard title={title || 'Glass UI'} subtitle={subtitle || 'Modern Aesthetics'} />;
    case 'NeonCard': return <SC.NeonCard title={title || 'Cyberpunk'} color={color} />;
    case 'HoloCard': return <SC.HoloCard title={title || 'HOLOGRAPHIC'} />;
    case 'GradientBorderCard': return <SC.GradientBorderCard title={title || 'Gradient'} subtitle={subtitle || 'Border Effect'} />;
    case 'TiltCard': return <SC.TiltCard title={title || '3D Perspective'} />;
    case 'ProjectCard': return <SC.ProjectCard title={title || 'Project A'} subtitle={subtitle || 'Description'} />;
    
    // [特殊映射说明] ProfileCard
    // items[0]: 头像 URL (string)
    // items[1]: 统计数据对象 { followers: string, following: string }
    case 'ProfileCard': return <SC.ProfileCard name={title || 'Sophie Bennett'} role={subtitle || 'Product Designer'} imageUrl={items?.[0]} stats={items?.[1]} />;
    
    case 'ParallaxStack': return <SC.ParallaxStack items={items} />;
    case 'ReflectiveCard': return <SC.ReflectiveCard title={title || 'SHINE'} color={color} />;
    case 'SpotlightCard': return <SC.SpotlightCard title={title || 'Spotlight'} subtitle={subtitle || 'Moving Glow'} color={color} />; 
    
    // --- 2. Devices ---
    case 'BrowserWindow': return <SC.BrowserWindow url={subtitle} />;
    case 'BrowserV2': return <SC.BrowserV2 url={subtitle} title={title} />;
    case 'TerminalWindow': return <SC.TerminalWindow commands={items || ['npm install remotion', 'npm start']} />;
    case 'PowerShell': return <SC.PowerShell commands={items} />; 
    case 'MobileFrame': return <SC.MobileFrame />;
    case 'IPhoneMockup': return <SC.IPhoneMockup wallpaper={subtitle} />; 
    
    // --- 3. Widgets ---
    case 'KeyboardShortcut': return <SC.KeyboardShortcut keys={items || ['Cmd', 'C']} />;
    case 'MouseCursor': return <SC.MouseCursor x={0} y={0} label={title} />;
    case 'FileTree': return <SC.FileTree files={items || ['src/', 'src/index.tsx', 'package.json']} />;
    case 'TechBadge': return <div style={{display:'flex', gap:20}}><SC.TechBadge text="React" color="#61DAFB" /><SC.TechBadge text="TypeScript" color="#3178C6" /></div>;
    case 'ActivityHeatmap': return <SC.ActivityHeatmap />;
    case 'NotificationToast': return <SC.NotificationToast title={title || 'Success'} message={subtitle || 'Operation completed.'} />;
    case 'MetricCard': return <SC.MetricCard label={title || 'Total Views'} value={subtitle || '1,024'} trend="12%" />;
    case 'CircularProgress': return <SC.CircularProgress progress={75} color={color} />;
    case 'GitGraph': return <SC.GitGraph />;
    case 'GlassDock': return <SC.GlassDock items={items} />; 
    
    // --- 3.5 Advanced UI ---
    case 'RealisticButton': return <SC.RealisticButton label={title || 'Click Me'} color={color} />;
    case 'AlertBox': return <SC.AlertBox title={title || 'Error'} message={subtitle || 'Something went wrong.'} type={items?.[0] || 'error'} />;
    case 'Tooltip': return <SC.Tooltip content={title || 'Tooltip text'} />;
    case 'HighlightBox': return <SC.HighlightBox label={title} />;
    case 'GlassPanel': return <SC.GlassPanel>{items?.[0] || <div style={{fontSize: 40, color: '#fff'}}>Content</div>}</SC.GlassPanel>;

    // --- 4. Layouts ---
    case 'BentoGrid': return <SC.BentoGrid children={[<SC.MetricCard label="Components" value="30+" />, <SC.NeonCard title="4K" color={color} />, <SC.CircularProgress progress={100} />]} />;
    case 'SplitScreen': return <SC.SplitScreen left={<CodeBlock code="console.log('Left')" fontFamily="monospace" />} right={<SC.GlassCard title="Right" subtitle="Preview" />} />;
    case 'QuoteCard': return <SC.QuoteCard text={title || 'Simplicity is the soul of efficiency.'} author={subtitle || 'Austin Freeman'} />;
    case 'MosaicGrid': return <SC.MosaicGrid />;
    case 'ParallaxScroll': return <SC.ParallaxScroll items={items} />;
    case 'ParallaxGallery': return <SC.ParallaxGallery items={items} />; 
    case 'MasonryWaterfall': return <SC.MasonryWaterfall items={items} />;

    // --- 5. Extras ---
    case 'SocialPost': return <SC.SocialPost author={title || 'Dev User'} content={subtitle || 'Just shipped a new feature! 🚀'} />;
    case 'TwitterCard': return <SC.TwitterCard name={title || 'Elon Musk'} handle={items?.[0] || '@elonmusk'} content={subtitle || 'To the moon! 🚀'} stats={items?.[1]} />;
    case 'KanbanBoard': return <SC.KanbanBoard />;
    case 'AudioWaveform': return <SC.AudioWaveform color={color} />;
    case 'GlobeWireframe': return <SC.GlobeWireframe />;
    case 'CalendarEvent': return <SC.CalendarEvent date={title || 'DEC 25'} title={subtitle || 'Launch Day'} />;
    case 'SearchOmnibar': return <SC.SearchOmnibar />;
    case 'ToggleSwitch': return <SC.ToggleSwitch />;
    case 'AvatarGroup': return <SC.AvatarGroup />;
    case 'PricingTier': return <SC.PricingTier price={title || '$29'} tier={subtitle || 'Pro Plan'} />;
    case 'LoadingSpinner': return <SC.LoadingSpinner />;
    case 'ProgressGauge': return <SC.ProgressGauge value={85} />;
    case 'CinematicText': return <SC.CinematicText title={title || 'TITLE'} subtitle={subtitle} />;
    case 'ExplodingLaptop': return <SC.ExplodingLaptop />; 
    case 'AndroidMascot': return <SC.AndroidMascot />; 
    case 'StickerWall': return <SC.StickerWall />; 

    // --- 6. Backgrounds ---
    case 'GradientMesh': return <SC.GradientMesh />;
    case 'GridPattern': return <SC.GridPattern />;
    case 'ParticleField': return <SC.ParticleField />;
    case 'DaVinciArt': return <SC.DaVinciArt title={title} />; 
    case 'ParticleText': return <SC.ParticleText title={title} />; 
    
    default: return <div>Unknown Variant: {variant}</div>;
  }
};

export const videoConfig: VideoConfig = {
  width: 3840,
  height: 1600,
  fps: 30,
  backgroundColor: '#050505',
  accentColor: '#00E5FF', // 科技青色
  textColor: '#FFFFFF',
  fontFamily: '"Noto Sans SC", "Alibaba PuHuiTi", sans-serif',
  codeFontFamily: '"JetBrains Mono", "Fira Code", monospace',
  scenes: [
    // --- 章节 1: 开场 (Intro) ---
    { 
      id: 'intro', type: SceneType.Showcase, durationInFrames: 100, transition: 'fade', 
      props: { variant: 'CinematicText', title: 'Remotion Scaffold', subtitle: '专为技术内容创作打造', background: true } 
    },
    
    // --- 章节 2: 核心痛点 (Problem) ---
    {
      id: 'subtitle-problem', type: SceneType.Subtitle, durationInFrames: 60, transition: 'slide',
      props: { text: '手写动画太麻烦？' }
    },
    {
      id: 'code-demo', type: SceneType.Code, durationInFrames: 120, transition: 'wipe',
      props: { 
        code: `// 不再需要手写复杂的 useFrame() 和 interpolate()\n// 只需要简单的 JSON 配置\n\nconst scene = {\n  type: 'Showcase',\n  variant: 'GlassCard',\n  title: 'Hello World'\n};`,
        fileName: 'composition.tsx',
        highlightLines: [4, 5, 6, 7, 8]
      }
    },

    // --- 章节 3: 解决方案 (Solution - Showcase) ---
    {
      id: 'subtitle-solution', type: SceneType.Subtitle, durationInFrames: 60, transition: 'slide',
      props: { text: '30+ 开箱即用的高级组件' }
    },
    // 展示组件网格 (BentoGrid)
    {
      id: 'bento-grid', type: SceneType.Showcase, durationInFrames: 120, transition: 'fade',
      props: { variant: 'BentoGrid', background: true } 
    },
    
    // --- 章节 4: 具体组件演示 (Features) ---
    // 演示 1: 浏览器模拟
    { 
      id: 'browser-demo', type: SceneType.Showcase, durationInFrames: 90, transition: 'slide',
      props: { variant: 'BrowserV2', title: 'Documentation', subtitle: 'remotion.dev/docs' } 
    },
    // 演示 2: Profile Card (NEW)
    {
      id: 'profile-demo', type: SceneType.Showcase, durationInFrames: 120, transition: 'fade',
      props: { 
        variant: 'ProfileCard', 
        title: 'Sophie Bennett', 
        subtitle: 'Product Designer who focuses on simplicity & usability.',
        items: [
           'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
           { followers: '312', following: '48' }
        ]
      }
    },
    // 演示 3: Twitter 模拟 (NEW)
    {
      id: 'twitter-demo', type: SceneType.Showcase, durationInFrames: 90, transition: 'slide',
      props: { variant: 'TwitterCard', title: 'Remotion', subtitle: 'Video creation in React is just awesome! ⚛️🎥', items: ['@remotion'] }
    },
    // 演示 4: 瀑布流 (NEW)
    {
      id: 'waterfall-demo', type: SceneType.Showcase, durationInFrames: 120, transition: 'fade',
      props: { variant: 'MasonryWaterfall', background: true } // 无 items 则显示默认色块
    },
    // 演示 5: 3D 粒子文字
    { 
      id: 'particle-text', type: SceneType.Showcase, durationInFrames: 90, transition: 'fade',
      props: { variant: 'ParticleText', title: '4K Ready' } 
    },

    // --- 章节 5: 结尾 (Outro) ---
    { 
      id: 'outro', type: SceneType.Title, durationInFrames: 90, transition: 'fade', 
      props: { title: '立即开始创作', subtitle: '修改 src/Composition.tsx 即可生成' } 
    },
  ],
};

export const MainComposition: React.FC = () => {
  const { scenes, backgroundColor, accentColor, textColor, fontFamily, codeFontFamily } = videoConfig;
  let currentFrameCount = 0;

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily }}>
      {/* =====================================================================================
          🌍 全局氛围层 (Global Ambience)
          这里放置贯穿全片的背景元素，增强视觉统一性
      ===================================================================================== */}
      
      {/* 3. 漂浮几何体 (增加空间深度) */}
      <SC.FloatingGeometry />

      {/* 4. 核心内容渲染层 */}
      {scenes.map((scene) => {
        const from = currentFrameCount;
        currentFrameCount += scene.durationInFrames;
        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.durationInFrames}>
            <SceneTransition type={scene.transition}>
              {/* Showcase 组件特殊处理 */}
              {scene.type === SceneType.Showcase ? (
                 <>
                   {/* 特效背景按需加载 */}
                   {scene.props.variant === 'CinematicText' && <SC.GradientMesh />}
                   {scene.props.variant === 'ParticleText' && <SC.ParticleField />}
                   
                   {/* 判断是否直接渲染 (全屏背景类) 还是包裹在 LayoutContainer 中 (卡片/组件类) */}
                   {['GradientMesh', 'GridPattern', 'ParticleField', 'MasonryWaterfall'].includes(scene.props.variant) ? (
                      <ShowcaseFactory {...scene.props} />
                   ) : (
                      <LayoutContainer>
                        <ShowcaseFactory {...scene.props} color={accentColor} />
                      </LayoutContainer>
                   )}
                 </>
              ) : (
                // 基础组件 (Title, Code, Bullets etc.)
                <LayoutContainer>
                  {scene.type === SceneType.Title && <AnimatedTitle {...scene.props} themeColor={accentColor} textColor={textColor} />}
                  {scene.type === SceneType.Subtitle && <Subtitle {...scene.props} textColor={textColor} />}
                  {scene.type === SceneType.Bullets && <BulletList {...scene.props} accentColor={accentColor} textColor={textColor} />}
                  {scene.type === SceneType.Code && <CodeBlock {...scene.props} fontFamily={codeFontFamily} />}
                  {scene.type === SceneType.Steps && <NumberedSteps {...scene.props} accentColor={accentColor} textColor={textColor} />}
                  {scene.type === SceneType.Diagram && <SimpleDiagram {...scene.props} accentColor={accentColor} textColor={textColor} />}
                  {scene.type === SceneType.Chart && <Chart {...scene.props} accentColor={accentColor} textColor={textColor} />}
                </LayoutContainer>
              )}
            </SceneTransition>
          </Sequence>
        );
      })}

      {/* 5. 前景 HUD 层 (Head-Up Display) */}
      <SC.CyberHUD />

      {/* 8. 底部进度条 */}
      <ProgressBar color={accentColor} />
    </AbsoluteFill>
  );
};
