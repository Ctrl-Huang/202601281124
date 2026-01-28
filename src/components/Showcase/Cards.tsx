
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

// 通用容器
const CardBase: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ padding: 60, borderRadius: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', ...style }}>
    {children}
  </div>
);

// 1. 毛玻璃卡片 (Glassmorphism)
export const GlassCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <CardBase style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 45px rgba(0,0,0,0.2)',
      width: 800, height: 500
    }}>
      <h2 style={{ color: '#fff', fontSize: 60, marginBottom: 20 }}>{title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 30 }}>{subtitle}</p>
    </CardBase>
  );
};

// 2. 霓虹发光卡片 (Cyberpunk)
export const NeonCard: React.FC<{ title: string; color: string }> = ({ title, color }) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 30], [20, 60], { extrapolateRight: 'clamp' });
  
  return (
    <CardBase style={{
      background: '#000',
      border: `4px solid ${color}`,
      boxShadow: `0 0 ${glow}px ${color}`,
      width: 800, height: 500
    }}>
      <h2 style={{ color: '#fff', fontSize: 70, textShadow: `0 0 20px ${color}` }}>{title}</h2>
    </CardBase>
  );
};

// 3. 全息卡片 (Holographic)
export const HoloCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <CardBase style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      width: 800, height: 500,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.2) 50%, transparent 60%)',
        opacity: 0.5,
      }} />
      <h2 style={{ color: '#0ff', fontSize: 60, fontFamily: 'monospace', letterSpacing: 4 }}>{title}</h2>
    </CardBase>
  );
};

// 4. 渐变边框卡片 (Gradient Border)
export const GradientBorderCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div style={{
      position: 'relative', width: 800, height: 500, borderRadius: 30,
      background: 'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)',
      padding: 6, // Border width
    }}>
      <div style={{
        background: '#1a1a1a', width: '100%', height: '100%', borderRadius: 24,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: 60 }}>{title}</h2>
        <p style={{ color: '#aaa', fontSize: 30, marginTop: 20 }}>{subtitle}</p>
      </div>
    </div>
  );
};

// 5. 3D倾斜卡片 (Tilt Card)
export const TiltCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div style={{
      width: 600, height: 400, background: '#222', borderRadius: 20,
      transform: 'perspective(1000px) rotateY(-15deg) rotateX(10deg)',
      boxShadow: '-20px 20px 40px rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      border: '2px solid #333'
    }}>
      <h2 style={{ color: '#fff', fontSize: 50 }}>{title}</h2>
    </div>
  );
};

// 6. 项目展示卡片 (Project Card)
export const ProjectCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div style={{ width: 700, background: '#181818', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
      <div style={{ height: 300, background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#555', fontSize: 40 }}>
        Preview Image
      </div>
      <div style={{ padding: 40 }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: 40 }}>{title}</h3>
        <p style={{ color: '#888', fontSize: 24, marginTop: 15 }}>{subtitle}</p>
      </div>
    </div>
  );
};

// 7. 流光反光卡片 (Reflective Card)
export const ReflectiveCard: React.FC<{ title: string; color?: string }> = ({ title, color = '#fff' }) => {
  const frame = useCurrentFrame();
  // 光效从左到右扫过
  const shinePos = interpolate(frame % 120, [0, 60], [-150, 250], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{ 
      width: 800, height: 500, background: '#111', borderRadius: 30, 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      position: 'relative', overflow: 'hidden', border: '1px solid #333',
      boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
    }}>
      {/* 纹理背景 */}
      <div style={{
         position: 'absolute', inset: 0, opacity: 0.1,
         backgroundImage: 'radial-gradient(circle at 50% 50%, #555 1px, transparent 1px)',
         backgroundSize: '20px 20px'
      }} />
      
      <h2 style={{ color: '#fff', fontSize: 80, fontWeight: 800, zIndex: 2 }}>{title}</h2>
      
      {/* 流光层 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '60%', height: '100%',
        background: `linear-gradient(90deg, transparent 0%, ${color}20 50%, transparent 100%)`,
        transform: `skewX(-25deg) translateX(${shinePos}%)`,
        pointerEvents: 'none', zIndex: 1
      }} />
      
      {/* 高光边框 */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 30,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)'
      }} />
    </div>
  );
};

/**
 * 8. 聚光灯卡片 (Spotlight Card)
 * 模拟一个圆形光斑（Spotlight）在卡片表面移动，照亮边框和内部纹理。
 */
export const SpotlightCard: React.FC<{ title: string; subtitle: string; color?: string }> = ({ 
  title, subtitle, color = '#00E5FF' 
}) => {
  const frame = useCurrentFrame();
  const width = 800;
  const height = 500;
  
  // 模拟鼠标/光源移动轨迹 (圆形轨迹)
  const t = frame / 30; // 速度
  const spotX = width / 2 + Math.sin(t) * (width / 3);
  const spotY = height / 2 + Math.cos(t) * (height / 3);

  return (
    <div style={{ 
      position: 'relative', width, height, 
      borderRadius: 24, background: '#111', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {/* Spotlight Gradient Layer (Internal Glow) */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        background: `radial-gradient(600px circle at ${spotX}px ${spotY}px, ${color}, transparent 40%)`,
        zIndex: 1, pointerEvents: 'none'
      }} />

      {/* Border Spotlight (via mask) */}
      {/* 这是一个高级技巧：使用一个绝对定位的 div 模拟发光的边框 */}
      <div style={{
        position: 'absolute', inset: -2, borderRadius: 26, 
        padding: 2, 
        background: `radial-gradient(400px circle at ${spotX}px ${spotY}px, ${color}, transparent 60%)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', // 只保留边框区域
        zIndex: 2, pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ 
        position: 'relative', zIndex: 3, height: '100%', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
      }}>
        <h2 style={{ fontSize: 70, color: '#fff', marginBottom: 20 }}>{title}</h2>
        <p style={{ fontSize: 30, color: '#aaa' }}>{subtitle}</p>
      </div>

      {/* Noise Texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
    </div>
  );
};

/**
 * 9. 个人资料卡 (Profile Card)
 * 仿制精美 UI 的用户资料卡，包含大圆角、阴影和 verified 认证标。
 * 
 * 使用方式 (ShowcaseProps):
 * - title -> name
 * - subtitle -> role
 * - items[0] -> imageUrl
 * - items[1] -> stats object { followers, following }
 */
export const ProfileCard: React.FC<{ 
  name: string; 
  role: string; 
  imageUrl?: string; 
  stats?: { followers: string; following: string }; 
}> = ({ 
  name, 
  role, 
  imageUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', // Default portrait
  stats = { followers: '312', following: '48' }
}) => {
  return (
    <div style={{
      width: 460,
      background: '#ffffff',
      borderRadius: 40,
      padding: 16,
      boxShadow: '0 40px 100px rgba(0,0,0,0.5)', // Strong shadow for float effect
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Inter", "Noto Sans SC", sans-serif',
      color: '#1a1a1a'
    }}>
      {/* Profile Image Container */}
      <div style={{
        width: '100%',
        height: 420,
        borderRadius: 32,
        overflow: 'hidden',
        background: '#f0f0f0',
        marginBottom: 24
      }}>
         <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="profile" />
      </div>

      {/* Content Area */}
      <div style={{ padding: '0 12px 12px 12px' }}>
         {/* Name Row */}
         <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#000' }}>{name}</h2>
            {/* Verified Badge Icon (Green rosette with check) */}
            <div style={{ width: 28, height: 28, color: '#27c93f' }}>
               <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
               </svg>
            </div>
         </div>

         {/* Role/Description */}
         <p style={{ 
           fontSize: 20, color: '#666', lineHeight: 1.4, margin: 0, marginBottom: 30, fontWeight: 500 
         }}>
           {role}
         </p>

         {/* Bottom Row */}
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 20 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700 }}>
                  <span style={{ color: '#999', fontSize: 20 }}>👤</span> {stats.followers}
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700 }}>
                  <span style={{ color: '#999', fontSize: 20 }}>☑️</span> {stats.following}
               </div>
            </div>

            {/* Follow Button */}
            <div style={{
               padding: '12px 28px',
               background: '#f2f2f2',
               borderRadius: 24,
               fontSize: 18,
               fontWeight: 700,
               cursor: 'pointer',
               transition: 'background 0.2s',
               display: 'flex',
               alignItems: 'center',
               gap: 5
            }}>
               Follow <span style={{fontSize: 20}}>+</span>
            </div>
         </div>
      </div>
    </div>
  );
};
