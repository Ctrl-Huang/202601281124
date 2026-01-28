
import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * 38. 马赛克艺术墙 (Mosaic Grid)
 * 模拟世界名画或复杂构图，由 60+ 个小组件组成。
 * 
 * 核心逻辑：
 * - 使用 CSS Grid 的 `grid-auto-flow: dense` 特性。
 * - 通过伪随机算法决定每个格子的 `colSpan` (宽度) 和 `rowSpan` (高度)。
 * - 结合 `scale` 和 `opacity` 实现类似"积木堆叠"的进场动画。
 */
export const MosaicGrid: React.FC<{ items?: string[] }> = ({ items = [] }) => {
  const frame = useCurrentFrame();
  
  // 生成 60 个格子位置
  // 这里我们用一个固定但看似随机的布局来模拟艺术构图
  const cells = Array.from({ length: 60 }).map((_, i) => i);
  
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(10, 1fr)', 
      gridAutoRows: '120px', 
      gap: 15,
      width: '90%',
      maxWidth: 1800,
      transform: 'rotate(-2deg) scale(0.9)', // 整体艺术倾斜
    }}>
      {cells.map((i) => {
        // 伪随机大小计算：根据索引决定格子的跨度
        const colSpan = (i % 7 === 0) ? 2 : (i % 13 === 0) ? 3 : 1;
        const rowSpan = (i % 5 === 0) ? 2 : 1;
        
        // 错峰动画延迟：让格子不是同时出现，而是像波浪一样
        const delay = (i % 20) * 3;
        const scale = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });
        const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });

        // 颜色生成 (基于索引的伪随机 HSL)
        const hue = (i * 37) % 360;
        const color = `hsl(${hue}, 70%, 60%)`;

        return (
          <div key={i} style={{ 
            gridColumn: `span ${colSpan}`,
            gridRow: `span ${rowSpan}`,
            background: i % 3 === 0 ? '#1a1a1a' : color,
            borderRadius: 16,
            opacity,
            transform: `scale(${scale})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            {/* 内部细节：如果是大块，加点装饰 */}
            {colSpan > 1 && (
               <div style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', opacity: 0.5 }}>
                  {i % 2 === 0 ? 'IMG' : 'TXT'}
               </div>
            )}
            {/* 模拟图片占位或内容 */}
            {i % 4 === 0 && <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2))' }} />}
          </div>
        );
      })}
    </div>
  );
};

/**
 * 39. 视差堆叠卡片 (Parallax Stack)
 * 多张卡片层叠在一起，随时间轻微浮动，产生 2.5D 深度感。
 * 适合展示"多层架构"、"技术栈堆叠"等概念。
 */
export const ParallaxStack: React.FC<{ items?: string[] }> = ({ items = ['Card 1', 'Card 2', 'Card 3'] }) => {
  const frame = useCurrentFrame();
  
  return (
    <div style={{ position: 'relative', width: 600, height: 400 }}>
      {[0, 1, 2].map((i) => {
        // 每个卡片的浮动频率和相位不同，制造"分离感"
        const float = Math.sin((frame + i * 100) / 40) * 20;
        const xOffset = i * 40;
        const yOffset = i * 40;
        
        return (
          <div key={i} style={{
            position: 'absolute',
            top: yOffset,
            left: xOffset,
            width: 500,
            height: 300,
            background: i === 2 ? '#00E5FF' : i === 1 ? '#222' : '#111', // 最上层高亮
            border: '1px solid #333',
            borderRadius: 24,
            boxShadow: '-20px 20px 60px rgba(0,0,0,0.5)',
            transform: `translateY(${float}px)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: i
          }}>
             <h2 style={{ color: i === 2 ? '#000' : '#fff', fontSize: 40 }}>{items[i] || `Layer ${i}`}</h2>
          </div>
        );
      })}
    </div>
  );
};

/**
 * 40. 视差滚动流 (Parallax Scroll)
 * 模拟两列长列表，以不同的速度垂直滚动。
 * 左列快，右列慢，制造视觉上的深度差。
 */
export const ParallaxScroll: React.FC<{ items?: string[] }> = ({ items = [] }) => {
  const frame = useCurrentFrame();
  const list = items.length ? items : Array.from({length: 10}).map((_, i) => `Item ${i + 1}`);
  
  // Left col: faster speed
  const y1 = -(frame * 2); 
  // Right col: slower speed, initial offset
  const y2 = -(frame * 1.5) - 100;

  return (
    <div style={{ 
      display: 'flex', gap: 40, width: 1000, height: 800, 
      overflow: 'hidden', 
      // 上下边缘遮罩，让滚动更自然
      maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' 
    }}>
      {/* Col 1 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, transform: `translateY(${y1}px)` }}>
        {list.map((item, i) => (
          <div key={i} style={{ height: 300, background: '#222', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 40, color: '#555' }}>
            {item}
          </div>
        ))}
        {/* Repeat for loop illusion (Duplicate content) */}
        {list.map((item, i) => (
          <div key={`rep-${i}`} style={{ height: 300, background: '#222', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 40, color: '#555' }}>
            {item}
          </div>
        ))}
      </div>

      {/* Col 2 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, transform: `translateY(${y2}px)` }}>
        {list.reverse().map((item, i) => (
           <div key={i} style={{ height: 400, background: '#1a1a1a', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 40, color: '#555' }}>
            {item}
          </div>
        ))}
         {list.map((item, i) => (
           <div key={`rep-${i}`} style={{ height: 400, background: '#1a1a1a', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 40, color: '#555' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 41. 视差画廊 (Parallax Gallery)
 * 横向滚动的卡片组，卡片内部的内容移动速度与容器不同，产生经典的 WebGL 风格视差效果。
 * 适合展示作品集、图片墙。
 */
export const ParallaxGallery: React.FC<{ items?: string[] }> = ({ items = ['Image 1', 'Image 2', 'Image 3', 'Image 4'] }) => {
  const frame = useCurrentFrame();
  const width = 1600;
  
  // 容器整体向左移动
  const xScroll = -(frame * 5);

  return (
    <div style={{ width, height: 600, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 40, transform: `translateX(${xScroll}px)` }}>
        {/* 渲染三份以支持长滚动 */}
        {[...items, ...items, ...items].map((item, i) => {
          // 视差计算核心：内部图片的反向移动
          // 当卡片向左移动时，背景图微微向右移动 (parallaxOffset)，模拟深度
          const parallaxOffset = (frame * 5 + i * 440) * 0.1; 

          return (
            <div key={i} style={{ 
              width: 400, height: 500, borderRadius: 24, overflow: 'hidden', 
              position: 'relative', flexShrink: 0,
              border: '1px solid #333'
            }}>
               {/* Parallax Background Layer */}
               <div style={{
                 position: 'absolute', top: 0, left: -100, width: '200%', height: '100%',
                 background: `linear-gradient(45deg, ${i%2===0 ? '#222' : '#333'}, ${i%3===0 ? '#444' : '#111'})`,
                 transform: `translateX(${-parallaxOffset % 100}px)`, // Apply parallax
                 zIndex: 0
               }} />
               
               {/* Content Layer (Fixed) */}
               <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <h3 style={{ fontSize: 40, color: '#fff', textShadow: '0 5px 10px rgba(0,0,0,0.5)' }}>{item}</h3>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * 42. 流动瀑布流 (Masonry Waterfall)
 * 高级多列布局，每一列以不同的速度垂直滚动，模拟自然的“流”动感。
 * 
 * 特性：
 * - 自动分列：将 items 均匀分配到 4 列中。
 * - 差速滚动：偶数列和奇数列速度不同，中间列速度更快。
 * - 自动填充：如果没有提供 items，会自动生成不同高度和颜色的占位符。
 * - 智能渲染：自动识别图片 URL 并渲染为 `img`，否则渲染为文字卡片。
 * 
 * @param items - 内容数组 (图片URL 或 文字)
 * @param speed - 全局滚动速度倍率 (默认 1)
 */
export const MasonryWaterfall: React.FC<{ items?: string[]; speed?: number }> = ({ items, speed = 1 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  // 1. 数据预处理：如果没有提供 items，生成默认的占位数据
  const data = useMemo(() => {
    if (items && items.length) return items.map((content, i) => ({ id: i, content, type: 'content' }));
    
    // 生成 40 个默认色块
    return Array.from({length: 40}).map((_, i) => ({
       id: i,
       type: 'placeholder',
       height: 300 + (i * 137) % 300, // 伪随机高度 300-600px
       color: `hsl(${(i * 47) % 360}, 60%, 20%)`, // 伪随机颜色
       label: `Item ${i + 1}`
    }));
  }, [items]);

  // 2. 列分配逻辑：将数据分配到 4 列 (4K宽屏下比较合适)
  const columns = useMemo(() => {
    const cols: any[][] = [[], [], [], []];
    data.forEach((item, i) => {
      cols[i % 4].push(item);
    });
    return cols;
  }, [data]);

  return (
    <div style={{ 
      display: 'flex', gap: 30, width: '120%', height: '120%', 
      position: 'absolute', left: '-10%', top: '-10%', // 稍微溢出以支持旋转不露边
      padding: '0 40px', boxSizing: 'border-box',
      transform: 'rotate(-3deg)', // 整体轻微倾斜，增加动感
      opacity: 0.9
    }}>
      {columns.map((col, colIndex) => {
         // 3. 速度计算：每一列的速度不同，制造错落感
         // 基础速度 * (基数 + 微调)
         const colSpeed = speed * (3 + (colIndex % 2 === 0 ? 0.5 : -0.5) + (colIndex === 2 ? 1 : 0)); 
         const yPos = -(frame * colSpeed); 
         
         return (
           <div key={colIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30 }}>
              <div style={{ transform: `translateY(${yPos}px)` }}>
                 {/* 渲染三遍，确保循环滚动时首尾衔接 */}
                 {[...col, ...col, ...col].map((item: any, i) => (
                    <div key={i} style={{
                       height: item.type === 'placeholder' ? item.height : 450, // 图片默认高度 450
                       background: item.type === 'placeholder' ? item.color : '#222',
                       borderRadius: 20,
                       overflow: 'hidden',
                       position: 'relative',
                       border: '1px solid rgba(255,255,255,0.1)',
                       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                       marginBottom: 30,
                       display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                       {/* 内容渲染逻辑：判断是图片 URL 还是普通文本 */}
                       {item.type === 'content' && (item.content.startsWith('http') || item.content.startsWith('data')) ? (
                          <img src={item.content} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Masonry Item" />
                       ) : (
                          // 文字或占位符逻辑
                          <div style={{ 
                             width: '100%', height: '100%', 
                             padding: 20,
                             display: 'flex', justifyContent: 'center', alignItems: 'center', 
                             fontSize: 40, color: 'rgba(255,255,255,0.7)', fontWeight: 'bold',
                             textAlign: 'center'
                          }}>
                             {item.type === 'placeholder' ? item.label : item.content}
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           </div>
         )
      })}
    </div>
  );
};
