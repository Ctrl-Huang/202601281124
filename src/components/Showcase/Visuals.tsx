
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, random } from 'remotion';

// 17. 渐变网格 (Gradient Mesh)
export const GradientMesh: React.FC = () => {
  const frame = useCurrentFrame();
  
  // 模拟三个浮动的光斑
  const t = frame / 100;
  const x1 = 50 + 20 * Math.sin(t);
  const y1 = 50 + 20 * Math.cos(t * 0.8);
  
  const x2 = 30 + 30 * Math.cos(t * 1.2);
  const y2 = 70 + 20 * Math.sin(t * 0.9);

  const x3 = 80 + 20 * Math.sin(t * 0.5);
  const y3 = 30 + 30 * Math.cos(t * 1.1);

  return (
    <AbsoluteFill style={{ background: '#050505', overflow: 'hidden', zIndex: -1 }}>
      {/* Orb 1 */}
      <div style={{
        position: 'absolute', top: `${y1}%`, left: `${x1}%`,
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)', filter: 'blur(80px)'
      }} />
      {/* Orb 2 */}
      <div style={{
        position: 'absolute', top: `${y2}%`, left: `${x2}%`,
        width: '70vw', height: '70vw',
        background: 'radial-gradient(circle, rgba(121, 40, 202, 0.4) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)', filter: 'blur(100px)'
      }} />
      {/* Orb 3 */}
      <div style={{
        position: 'absolute', top: `${y3}%`, left: `${x3}%`,
        width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(255, 0, 128, 0.3) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)', filter: 'blur(60px)'
      }} />
      
      {/* Noise Texture Overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
    </AbsoluteFill>
  );
};

// 18. 网格图案 (Grid Pattern)
export const GridPattern: React.FC = () => (
  <AbsoluteFill style={{
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '100px 100px',
    zIndex: -1
  }} />
);

// 19. 粒子场 (Particle Field)
export const ParticleField: React.FC = () => (
  <AbsoluteFill>
    {Array.from({ length: 50 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        background: '#fff',
        borderRadius: '50%',
        opacity: Math.random() * 0.5
      }} />
    ))}
  </AbsoluteFill>
);

// 19.1 达芬奇世界名画 (DaVinciArt)
export const DaVinciArt: React.FC<{ title?: string }> = ({ title = 'Mona Lisa' }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: 600, height: 800,
      boxShadow: '0 50px 100px rgba(0,0,0,0.8)'
    }}>
      <div style={{
        position: 'absolute', inset: -40,
        border: '40px solid #b8860b',
        borderImage: 'linear-gradient(45deg, #8a6e2f, #d4af37, #8a6e2f) 1',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
        zIndex: 2
      }} />
      <div style={{
        position: 'absolute', inset: -10,
        border: '10px solid #4a3c1b',
        zIndex: 1
      }} />
      <div style={{
        width: '100%', height: '100%',
        background: '#e0d6c2',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
         <div style={{ 
           position: 'absolute', inset: 0, 
           background: 'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
           zIndex: 1, pointerEvents: 'none', mixBlendMode: 'multiply'
         }} />
         <div style={{
            fontFamily: '"Times New Roman", serif', 
            fontSize: 60, color: '#3e2b14', 
            textAlign: 'center', fontStyle: 'italic',
            filter: 'sepia(0.8) contrast(1.2)'
         }}>
            {title}
            <div style={{ fontSize: 20, marginTop: 20 }}>Leonardo da Vinci</div>
         </div>
         <div style={{
           position: 'absolute', inset: 0, opacity: 0.3, zIndex: 2,
           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           mixBlendMode: 'overlay'
         }} />
      </div>
    </div>
  );
};

// 19.2 3D 粒子文字 (Particle Text)
export const ParticleText: React.FC<{ title?: string }> = ({ title = '中文' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dispersion = interpolate(frame, [0, 60], [20, 0], { extrapolateRight: 'clamp' });
  const blur = interpolate(frame, [0, 60], [20, 0], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{
        fontSize: 200, fontWeight: 900, color: 'transparent',
        backgroundImage: 'radial-gradient(circle, #00E5FF 20%, transparent 25%)',
        backgroundSize: '10px 10px',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        letterSpacing: dispersion * 2,
        filter: `blur(${blur}px)`,
        opacity,
        transform: `perspective(500px) rotateX(${Math.sin(frame/40)*5}deg)`,
        textShadow: `0 0 ${20 - dispersion}px rgba(0,229,255,0.5)`
      }}>
        {title}
      </h1>
      {Array.from({length: 10}).map((_, i) => (
         <div key={i} style={{
            position: 'absolute',
            left: `${50 + Math.sin(frame/20 + i) * 30}%`,
            top: `${50 + Math.cos(frame/15 + i) * 30}%`,
            width: 6, height: 6, background: '#00E5FF', borderRadius: '50%',
            opacity: 0.5, pointerEvents: 'none'
         }} />
      ))}
    </div>
  );
};

// 43. 赛博 HUD 遮罩 (CyberHUD)
export const CyberHUD: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const scanLineY = (frame * 8) % height;
    
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
            <div style={{ position: 'absolute', top: 50, left: 50, width: 100, height: 100, borderTop: '4px solid #00E5FF', borderLeft: '4px solid #00E5FF' }} />
            <div style={{ position: 'absolute', top: 50, right: 50, width: 100, height: 100, borderTop: '4px solid #00E5FF', borderRight: '4px solid #00E5FF' }} />
            <div style={{ position: 'absolute', bottom: 50, left: 50, width: 100, height: 100, borderBottom: '4px solid #00E5FF', borderLeft: '4px solid #00E5FF' }} />
            <div style={{ position: 'absolute', bottom: 50, right: 50, width: 100, height: 100, borderBottom: '4px solid #00E5FF', borderRight: '4px solid #00E5FF' }} />
            
            <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 20, fontFamily: 'monospace', color: '#00E5FF', fontSize: 16 }}>
                <span>REC ● 00:00:{Math.floor(frame / 30).toString().padStart(2, '0')}</span>
                <span>ISO 800</span>
                <span>F/2.8</span>
                <span>4K RAW</span>
            </div>

            <div style={{ 
                position: 'absolute', top: scanLineY, left: 0, width: '100%', height: 2, 
                background: 'rgba(0, 229, 255, 0.5)',
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)' 
            }} />
            
            <div style={{ position: 'absolute', bottom: 60, left: 200, display: 'flex', gap: 4, height: 20, opacity: 0.6 }}>
                 {Array.from({length: 20}).map((_, i) => (
                     <div key={i} style={{ width: Math.random() * 10 + 2, background: '#00E5FF' }} />
                 ))}
            </div>
        </div>
    );
}

// 44. 漂浮几何体 (Floating Geometry)
export const FloatingGeometry: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    const items = useMemo(() => Array.from({ length: 15 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 40 + 20,
        type: Math.random() > 0.5 ? 'square' : 'circle',
        speed: Math.random() * 0.5 + 0.2
    })), []);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {items.map((item, i) => {
                const yPos = (item.top * height / 100 + frame * item.speed) % height;
                const rotation = frame * item.speed * 2;
                
                return (
                    <div key={i} style={{
                        position: 'absolute',
                        left: `${item.left}%`,
                        top: yPos,
                        width: item.size,
                        height: item.size,
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: item.type === 'circle' ? '50%' : 0,
                        transform: `rotate(${rotation}deg) rotateX(${rotation}deg)`,
                        background: 'rgba(255,255,255,0.02)'
                    }} />
                )
            })}
        </div>
    )
}

// 45. 贴纸墙 (StickerWall) - NEW
// 极繁主义的特征：在屏幕上随机堆叠大量图标、Emoji 和科技符号，制造“波普艺术”感
export const StickerWall: React.FC = () => {
  const { width, height } = useVideoConfig();
  
  // 随机生成 30 个贴纸
  const stickers = useMemo(() => {
    const icons = ['🚀', '⚡', '💾', '⚛️', '💎', '🔥', '👾', '🎃', '👁️', '💊', '💣', '🧸', 'WARNING', 'ERROR', '404'];
    return Array.from({ length: 30 }).map(() => ({
      icon: icons[Math.floor(random(Math.random()) * icons.length)],
      x: random(Math.random() + 1) * width,
      y: random(Math.random() + 2) * height,
      rot: random(Math.random() + 3) * 360,
      scale: 0.5 + random(Math.random() + 4) * 1.5,
    }));
  }, [width, height]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {stickers.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: s.x, top: s.y,
          fontSize: 60,
          transform: `translate(-50%, -50%) rotate(${s.rot}deg) scale(${s.scale})`,
          opacity: 0.15, // 低透明度，作为纹理
          filter: 'grayscale(100%)', // 统一色调
        }}>
          {s.icon}
        </div>
      ))}
    </div>
  );
};
