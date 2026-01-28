
import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, random } from 'remotion';

// 23. 社交媒体帖子 (Social Post)
export const SocialPost: React.FC<{ author: string; content: string }> = ({ author, content }) => (
  <div style={{ 
    width: 600, background: '#111', border: '1px solid #333', borderRadius: 16, padding: 30,
    fontFamily: 'sans-serif'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
      <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#555', marginRight: 15 }} />
      <div>
        <div style={{ color: '#fff', fontWeight: 'bold' }}>{author}</div>
        <div style={{ color: '#666', fontSize: 14 }}>@username · 2h</div>
      </div>
    </div>
    <div style={{ color: '#ddd', fontSize: 24, lineHeight: 1.4 }}>{content}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, color: '#666', fontSize: 20 }}>
      <span>💬 12</span><span> 45</span><span>❤️ 128</span><span>📊 1.2k</span>
    </div>
  </div>
);

// 23.5 拟真 Twitter/X 卡片 (TwitterCard)
const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" aria-label="Verified account" fill="#1d9bf0" width="22" height="22" style={{ marginLeft: 4 }}>
    <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.435.71 2.79 1.847 3.63-.145.464-.225.96-.225 1.474 0 2.635 2.135 4.79 4.72 4.79.58 0 1.13-.105 1.638-.3 1.05.98 2.505 1.59 4.088 1.59s3.04-.61 4.09-1.59c.508.195 1.057.3 1.637.3 2.586 0 4.72-2.155 4.72-4.79 0-.514-.08-1.01-.224-1.474 1.137-.84 1.846-2.195 1.846-3.63zM9.763 17.29l-3.62-3.62 1.41-1.415 2.21 2.21 6.556-6.556 1.416 1.415-7.972 7.966z"></path></g>
  </svg>
);

export const TwitterCard: React.FC<{ 
  name: string; 
  handle: string; 
  content: string; 
  avatar?: string;
  verified?: boolean;
  date?: string;
  stats?: { replies: string; retweets: string; likes: string; views: string };
}> = ({ 
  name, 
  handle, 
  content, 
  avatar,
  verified = true, 
  date = '10:00 AM · Jan 1, 2024',
  stats = { replies: '142', retweets: '86', likes: '1.2K', views: '45K' } 
}) => {
  return (
    <div style={{
       width: 650,
       backgroundColor: '#000',
       color: 'white',
       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
       borderRadius: 16,
       border: '1px solid #333',
       padding: 24,
       boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
       display: 'flex',
       flexDirection: 'column',
       gap: 16,
       position: 'relative'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 12 }}>
         {/* Avatar */}
         <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#333', overflow: 'hidden', flexShrink: 0 }}>
            {avatar ? <img src={avatar} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="Avatar" /> : 
             <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 24}}>👤</div>}
         </div>
         {/* Name & Handle */}
         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 17, color: '#e7e9ea' }}>
               {name}
               {verified && <VerifiedIcon />}
            </div>
            <div style={{ color: '#71767b', fontSize: 15 }}>{handle}</div>
         </div>
         {/* X Logo */}
         <div style={{ marginLeft: 'auto', color: '#fff', fontSize: 24, opacity: 0.8 }}>𝕏</div>
      </div>

      {/* Content */}
      <div style={{ fontSize: 23, lineHeight: 1.35, whiteSpace: 'pre-wrap', color: '#e7e9ea' }}>
        {content}
      </div>
      
      {/* Date */}
      <div style={{ color: '#71767b', fontSize: 15, marginTop: 4 }}>
        {date}
      </div>

      <div style={{ height: 1, backgroundColor: '#2f3336', width: '100%', margin: '4px 0' }} />

      {/* Stats/Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71767b', fontSize: 14, padding: '0 8px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>💬</span> {stats.replies}
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>⇄</span> {stats.retweets}
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>♡</span> {stats.likes}
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📊</span> {stats.views}
         </div>
      </div>
    </div>
  );
};

// 24. 极简看板 (Kanban Board)
export const KanbanBoard: React.FC = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    {['To Do', 'In Progress', 'Done'].map((title, i) => (
      <div key={i} style={{ width: 300, background: '#1a1a1a', borderRadius: 12, padding: 15 }}>
        <div style={{ color: '#888', marginBottom: 15, fontWeight: 'bold' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#2a2a2a', padding: 15, borderRadius: 8, color: '#fff' }}>Task A</div>
          {i < 2 && <div style={{ background: '#2a2a2a', padding: 15, borderRadius: 8, color: '#fff' }}>Task B</div>}
        </div>
      </div>
    ))}
  </div>
);

// 25. 音频波形 (Audio Waveform)
export const AudioWaveform: React.FC<{ color?: string }> = ({ color = '#00E5FF' }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 100 }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const height = 30 + 50 * Math.sin((frame / 5) + i);
        return (
          <div key={i} style={{ 
            width: 8, height: Math.abs(height), 
            background: color, borderRadius: 4 
          }} />
        );
      })}
    </div>
  );
};

// 26. 线框地球 (Globe Wireframe)
export const GlobeWireframe: React.FC = () => (
  <div style={{ width: 400, height: 400, border: '2px solid #333', borderRadius: '50%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '100%', height: '40%', borderTop: '2px solid #333', borderBottom: '2px solid #333', position: 'absolute' }} />
    <div style={{ width: '40%', height: '100%', borderLeft: '2px solid #333', borderRight: '2px solid #333', position: 'absolute' }} />
    <div style={{ width: 10, height: 10, background: '#00E5FF', borderRadius: '50%', position: 'absolute', top: '30%', left: '60%', boxShadow: '0 0 10px #00E5FF' }} />
  </div>
);

// 27. 日历事项 (Calendar Event)
export const CalendarEvent: React.FC<{ date: string; title: string }> = ({ date, title }) => (
  <div style={{ width: 300, background: '#fff', borderRadius: 16, overflow: 'hidden', textAlign: 'center' }}>
    <div style={{ background: '#FF5F56', padding: 15, color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{date}</div>
    <div style={{ padding: 30, color: '#333', fontSize: 32, fontWeight: 'bold' }}>{title}</div>
  </div>
);

// 28. 全能搜索栏 (Search Omnibar)
export const SearchOmnibar: React.FC = () => {
    const frame = useCurrentFrame();
    const cursorOpacity = Math.floor(frame / 30) % 2 === 0 ? 1 : 0;
    
    return (
      <div style={{ 
        width: 800, height: 80, background: '#222', borderRadius: 40, 
        display: 'flex', alignItems: 'center', padding: '0 30px', 
        border: '2px solid #444', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <span style={{ fontSize: 30, marginRight: 20 }}>🔍</span>
        <span style={{ fontSize: 30, color: '#fff' }}>How to center a div</span>
        <span style={{ fontSize: 30, color: '#00E5FF', opacity: cursorOpacity }}>|</span>
      </div>
    );
};

// 29. 切换开关 (Toggle Switch)
export const ToggleSwitch: React.FC<{ active?: boolean }> = ({ active = true }) => (
  <div style={{ 
    width: 120, height: 60, background: active ? '#27c93f' : '#444', 
    borderRadius: 30, padding: 5, transition: 'all 0.3s' 
  }}>
    <div style={{ 
      width: 50, height: 50, background: '#fff', borderRadius: '50%', 
      transform: active ? 'translateX(60px)' : 'translateX(0)',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }} />
  </div>
);

// 30. 用户头像组 (Avatar Group)
export const AvatarGroup: React.FC = () => (
  <div style={{ display: 'flex' }}>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} style={{ 
        width: 80, height: 80, borderRadius: '50%', 
        background: `hsl(${i * 60}, 70%, 50%)`, border: '4px solid #111',
        marginLeft: -20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 24, fontWeight: 'bold'
      }}>
        U{i}
      </div>
    ))}
    <div style={{ 
      width: 80, height: 80, borderRadius: '50%', background: '#333', border: '4px solid #111',
      marginLeft: -20, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' 
    }}>+5</div>
  </div>
);

// 31. 定价卡片 (Pricing Tier)
export const PricingTier: React.FC<{ price: string; tier: string }> = ({ price, tier }) => (
  <div style={{ 
    width: 350, padding: 40, background: 'linear-gradient(180deg, #222 0%, #111 100%)', 
    borderRadius: 20, border: '1px solid #333', textAlign: 'center'
  }}>
    <div style={{ color: '#888', fontSize: 20, marginBottom: 10 }}>{tier}</div>
    <div style={{ color: '#fff', fontSize: 60, fontWeight: 'bold', marginBottom: 30 }}>{price}<span style={{fontSize: 20}}>/mo</span></div>
    <div style={{ background: '#00E5FF', color: '#000', padding: '15px', borderRadius: 8, fontWeight: 'bold' }}>Get Started</div>
  </div>
);

// 32. 加载指示器 (Loading Spinner)
export const LoadingSpinner: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ 
      width: 80, height: 80, borderRadius: '50%', border: '8px solid #333', 
      borderTopColor: '#00E5FF', transform: `rotate(${frame * 10}deg)`
    }} />
  );
};

// 33. 进度仪表 (Progress Gauge)
export const ProgressGauge: React.FC<{ value: number }> = ({ value }) => (
  <div style={{ 
    width: 300, height: 150, overflow: 'hidden', position: 'relative',
    display: 'flex', justifyContent: 'center', alignItems: 'flex-end'
  }}>
    <div style={{ 
      width: 300, height: 300, borderRadius: '50%', background: '#333',
      position: 'absolute', top: 0 
    }} />
    <div style={{ 
      width: 300, height: 300, borderRadius: '50%', background: `conic-gradient(from 180deg, #00E5FF ${value * 1.8}deg, transparent 0deg)`,
      position: 'absolute', top: 0, opacity: 0.8
    }} />
    <div style={{ 
      width: 260, height: 260, borderRadius: '50%', background: '#111',
      position: 'absolute', top: 20
    }} />
    <div style={{ position: 'relative', color: '#fff', fontSize: 60, fontWeight: 'bold', bottom: 10 }}>{value}%</div>
  </div>
);

// 34. 电影级字幕 (CinematicText)
export const CinematicText: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 60], [0, 1]);
  const spacing = interpolate(frame, [0, 120], [0, 20], { extrapolateRight: 'clamp' });
  const blur = interpolate(frame, [0, 30], [20, 0], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{ textAlign: 'center', opacity, filter: `blur(${blur}px)` }}>
       <h1 style={{ 
         fontSize: 100, color: '#fff', textTransform: 'uppercase', 
         letterSpacing: spacing, marginBottom: 20, fontWeight: 300
       }}>
         {title}
       </h1>
       {subtitle && (
         <div style={{ fontSize: 30, color: '#888', letterSpacing: 5, textTransform: 'uppercase' }}>
           {subtitle}
         </div>
       )}
    </div>
  );
};

// 41. 电脑爆炸冒烟 (Exploding Laptop)
export const ExplodingLaptop: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame) * 5 * (frame < 30 ? 1 : 0);
  const smokeStart = 20;
  
  return (
    <div style={{ position: 'relative', width: 400, height: 300 }}>
      {/* Laptop SVG */}
      <svg 
        width="400" height="300" viewBox="0 0 400 300" 
        style={{ transform: `translate(${shake}px, ${shake}px)` }}
      >
        <rect x="50" y="50" width="300" height="200" rx="10" fill="#333" />
        <rect x="60" y="60" width="280" height="180" fill="#111" />
        <text x="200" y="160" fill="red" fontSize="40" textAnchor="middle" fontFamily="monospace">FATAL ERROR</text>
        <path d="M20 250 L380 250 L380 270 L20 270 Z" fill="#555" />
      </svg>
      
      {/* Smoke Particles */}
      {frame > smokeStart && Array.from({length: 6}).map((_, i) => {
        const offset = i * 15;
        const localFrame = frame - smokeStart - offset;
        if (localFrame < 0) return null;
        
        const y = interpolate(localFrame, [0, 60], [200, 0]);
        const alpha = interpolate(localFrame, [0, 20, 60], [0, 0.8, 0]);
        const scale = interpolate(localFrame, [0, 60], [0.5, 3]);
        const xOffset = Math.sin(localFrame/10) * 40 + (i - 3) * 20;

        return (
          <div key={i} style={{
            position: 'absolute', top: 0, left: 200,
            width: 50, height: 50, borderRadius: '50%',
            background: '#888',
            transform: `translate(${xOffset}px, ${y}px) scale(${scale})`,
            opacity: alpha,
            filter: 'blur(10px)'
          }} />
        );
      })}
    </div>
  );
};

// 42. 安卓机器人 (Android Mascot)
export const AndroidMascot: React.FC = () => {
  const color = '#3DDC84'; // Official Android Green
  const frame = useCurrentFrame();
  const wave = Math.sin(frame / 5) * 10;

  return (
    <div style={{ position: 'relative', width: 200, height: 250 }}>
      <div style={{
        width: 200, height: 100, 
        background: color, 
        borderRadius: '100px 100px 0 0',
        position: 'absolute', top: 0, left: 0,
        zIndex: 2
      }}>
        <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', top: 40, left: 50 }} />
        <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', top: 40, right: 50 }} />
        <div style={{ 
          width: 6, height: 40, background: color, borderRadius: 3, 
          position: 'absolute', top: -30, left: 40, transform: 'rotate(-30deg)' 
        }} />
        <div style={{ 
          width: 6, height: 40, background: color, borderRadius: 3, 
          position: 'absolute', top: -30, right: 40, transform: 'rotate(30deg)' 
        }} />
      </div>

      <div style={{ height: 10, width: '100%', position: 'absolute', top: 100 }} />

      <div style={{
        width: 200, height: 180,
        background: color,
        borderRadius: '0 0 20px 20px',
        position: 'absolute', top: 110, left: 0,
        zIndex: 2
      }} />

      <div style={{
        width: 40, height: 150, background: color, borderRadius: 20,
        position: 'absolute', top: 110, left: -50,
        transformOrigin: 'top center',
        transform: `rotate(${20 + wave}deg)` 
      }} />
      <div style={{
        width: 40, height: 150, background: color, borderRadius: 20,
        position: 'absolute', top: 110, right: -50,
        transformOrigin: 'top center',
        transform: `rotate(${-20 - wave}deg)`
      }} />
      
      <div style={{ width: 40, height: 80, background: color, borderRadius: 20, position: 'absolute', bottom: -120, left: 40 }} />
      <div style={{ width: 40, height: 80, background: color, borderRadius: 20, position: 'absolute', bottom: -120, right: 40 }} />
    </div>
  );
};

// 46. 故障叠加层 (GlitchOverlay) - NEW
// 模拟 RGB 色散和画面抖动，为整个视频增加不稳定的动感
export const GlitchOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // 随机触发故障 (每 50 帧大概率触发一次)
  const isGlitch = Math.sin(frame * 0.8) > 0.95 || Math.random() > 0.98;
  
  if (!isGlitch) return null;
  
  const xOffset = (Math.random() - 0.5) * 20;
  const yOffset = (Math.random() - 0.5) * 10;
  
  return (
    <div style={{ 
      position: 'absolute', inset: 0, zIndex: 9999, pointerEvents: 'none',
      overflow: 'hidden', mixBlendMode: 'screen' 
    }}>
      {/* 红色通道偏移 */}
      <div style={{ 
        position: 'absolute', inset: 0, background: 'rgba(255,0,0,0.1)',
        transform: `translate(${xOffset}px, ${yOffset}px)`,
      }} />
      {/* 蓝色通道偏移 */}
      <div style={{ 
        position: 'absolute', inset: 0, background: 'rgba(0,0,255,0.1)',
        transform: `translate(${-xOffset}px, ${-yOffset}px)`,
      }} />
      {/* 扫描线干扰 */}
      <div style={{
         position: 'absolute', top: Math.random() * height, left: 0,
         width: '100%', height: Math.random() * 50 + 10,
         background: '#fff', opacity: 0.2
      }} />
    </div>
  );
};
