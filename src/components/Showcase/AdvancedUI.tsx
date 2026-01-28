
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

// 34. 真实按钮 (Realistic Button)
// 模拟 3D 按压效果和现代渐变
export const RealisticButton: React.FC<{ label: string; color?: string; style?: React.CSSProperties }> = ({ 
  label, color = '#00E5FF', style 
}) => {
  const frame = useCurrentFrame();
  // 模拟每 60 帧点击一次
  const isPressed = Math.floor(frame / 60) % 2 === 1;
  const pressOffset = isPressed ? 4 : 0;
  
  return (
    <div style={{ position: 'relative', height: 100, width: 300, ...style }}>
      {/* Shadow Layer */}
      <div style={{ 
        position: 'absolute', top: 8, left: 0, width: '100%', height: '100%', 
        background: 'rgba(0,0,0,0.3)', borderRadius: 16 
      }} />
      
      {/* 3D Base Layer */}
      <div style={{ 
        position: 'absolute', top: 8, left: 0, width: '100%', height: '100%', 
        background: '#008ba3', borderRadius: 16 // Darker shade of default
      }} />

      {/* Top Interactive Layer */}
      <div style={{ 
        position: 'absolute', top: pressOffset, left: 0, width: '100%', height: '100%',
        background: `linear-gradient(180deg, ${color} 0%, #00b8cc 100%)`, // Gradient
        borderRadius: 16,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        boxShadow: isPressed ? 'none' : 'inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 0 #008ba3',
        transition: 'top 0.1s'
      }}>
        <span style={{ 
          color: '#000', fontSize: 32, fontWeight: 'bold', 
          textTransform: 'uppercase', letterSpacing: 2 
        }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// 35. 警告/错误框 (Alert Box)
export const AlertBox: React.FC<{ 
  title: string; 
  message: string; 
  type?: 'error' | 'warning' | 'success' | 'info' 
}> = ({ title, message, type = 'error' }) => {
  const colors = {
    error: { bg: '#2c0b0e', border: '#f85149', icon: '⛔' },
    warning: { bg: '#251b08', border: '#d29922', icon: '⚠️' },
    success: { bg: '#0b1d11', border: '#2ea043', icon: '✅' },
    info: { bg: '#0c1626', border: '#58a6ff', icon: 'ℹ️' },
  };
  
  const theme = colors[type];

  return (
    <div style={{ 
      width: 700, padding: 30, background: theme.bg, 
      border: `2px solid ${theme.border}`, borderRadius: 12,
      display: 'flex', alignItems: 'flex-start', gap: 20,
      boxShadow: `0 10px 30px rgba(0,0,0,0.5)`
    }}>
      <div style={{ fontSize: 40 }}>{theme.icon}</div>
      <div>
        <div style={{ color: theme.border, fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
          {title}
        </div>
        <div style={{ color: '#e6edf3', fontSize: 24, lineHeight: 1.5 }}>
          {message}
        </div>
      </div>
    </div>
  );
};

// 36. 提示气泡 (Tooltip)
export const Tooltip: React.FC<{ content: string; direction?: 'top' | 'bottom' | 'left' | 'right' }> = ({ 
  content, direction = 'top' 
}) => {
  const frame = useCurrentFrame();
  const floatY = Math.sin(frame / 15) * 5;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        background: '#333', color: '#fff', padding: '15px 30px', 
        borderRadius: 8, fontSize: 24, whiteSpace: 'nowrap',
        boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
        transform: `translateY(${floatY}px)`,
        position: 'relative'
      }}>
        {content}
        {/* Arrow (Simple CSS triangle) */}
        <div style={{ 
          position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0, 
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #333'
        }} />
      </div>
    </div>
  );
};

// 37. 强调框 (Highlight Box)
// 用于框选某个区域
export const HighlightBox: React.FC<{ width?: number; height?: number; label?: string }> = ({ 
  width = 300, height = 100, label 
}) => {
  const frame = useCurrentFrame();
  const opacity = 0.5 + 0.5 * Math.sin(frame / 10);

  return (
    <div style={{ 
      width, height, 
      border: '4px dashed #FF5F56', 
      background: 'rgba(255, 95, 86, 0.1)',
      position: 'relative',
      borderRadius: 8
    }}>
      {label && (
         <div style={{ 
           position: 'absolute', top: -40, left: 0, 
           background: '#FF5F56', color: '#fff', padding: '5px 15px', 
           borderRadius: 4, fontWeight: 'bold', fontSize: 20 
         }}>
           {label}
         </div>
      )}
      {/* Corner indicators */}
      <div style={{ position: 'absolute', top: -2, left: -2, width: 20, height: 20, borderTop: '4px solid #FF5F56', borderLeft: '4px solid #FF5F56' }} />
      <div style={{ position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderBottom: '4px solid #FF5F56', borderRight: '4px solid #FF5F56' }} />
    </div>
  );
};

// 38. 磨砂面板容器 (Glass Panel) - NEW
// 这是一个通用的容器，用于包裹其他内容，提供高级的磨砂玻璃背景
export const GlassPanel: React.FC<{ children: React.ReactNode; width?: number; height?: number }> = ({ 
  children, width = 800, height = 500 
}) => {
  return (
    <div style={{ 
      width, height,
      background: 'rgba(20, 20, 20, 0.6)',
      backdropFilter: 'blur(30px) saturate(1.8)',
      borderRadius: 24,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Noise Texture */}
       <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />
      <div style={{ zIndex: 1 }}>{children}</div>
    </div>
  );
};
