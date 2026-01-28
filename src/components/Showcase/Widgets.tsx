
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon } from '../Icon';

// 8. 键盘按键 (Keyboard Shortcut)
export const KeyboardShortcut: React.FC<{ keys: string[] }> = ({ keys }) => (
  <div style={{ display: 'flex', gap: 20 }}>
    {keys.map((k, i) => (
      <div key={i} style={{
        minWidth: 100, height: 100, padding: '0 30px',
        background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
        borderRadius: 12, boxShadow: '0 8px 0 #bbb, 0 10px 10px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#333', fontSize: 40, fontWeight: 'bold', fontFamily: 'sans-serif'
      }}>
        {k}
      </div>
    ))}
  </div>
);

// 9. 鼠标光标 (Mouse Cursor)
export const MouseCursor: React.FC<{ x: number; y: number; label?: string }> = ({ x, y, label }) => (
  <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 100 }}>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="#00E5FF" stroke="none" />
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" stroke="white" strokeWidth="2" />
    </svg>
    {label && (
      <div style={{ 
        position: 'absolute', left: 25, top: 25, 
        background: '#00E5FF', color: '#000', 
        padding: '4px 12px', borderRadius: 20, 
        fontSize: 18, fontWeight: 'bold', whiteSpace: 'nowrap' 
      }}>
        {label}
      </div>
    )}
  </div>
);

// 10. 文件树 (File Tree)
export const FileTree: React.FC<{ files: string[] }> = ({ files }) => (
  <div style={{ fontSize: 30, color: '#ccc', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: 10 }}>
    {files.map((f, i) => {
      const depth = f.split('/').length - 1;
      const name = f.split('/').pop();
      const isFolder = !name?.includes('.');
      return (
        <div key={i} style={{ paddingLeft: depth * 40, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ opacity: 0.5 }}>{isFolder ? '📁' : '📄'}</span>
          <span style={{ color: isFolder ? '#fff' : '#aaa' }}>{name}</span>
        </div>
      );
    })}
  </div>
);

// 11. 科技徽章 (Tech Badge)
export const TechBadge: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ 
    padding: '10px 30px', borderRadius: 50, 
    background: `${color}20`, border: `2px solid ${color}`,
    color: color, fontSize: 24, fontWeight: 'bold',
    display: 'flex', alignItems: 'center', gap: 10
  }}>
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
    {text}
  </div>
);

// 12. 贡献热力图 (Activity Heatmap)
export const ActivityHeatmap: React.FC = () => (
  <div style={{ display: 'flex', gap: 6 }}>
    {Array.from({ length: 15 }).map((_, col) => (
      <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Array.from({ length: 5 }).map((_, row) => {
          const intensity = Math.random();
          const color = intensity > 0.7 ? '#27c93f' : intensity > 0.4 ? '#27c93f80' : intensity > 0.2 ? '#27c93f40' : '#333';
          return <div key={row} style={{ width: 20, height: 20, borderRadius: 3, background: color }} />;
        })}
      </div>
    ))}
  </div>
);

// 13. 通知气泡 (Notification Toast)
export const NotificationToast: React.FC<{ title: string; message: string }> = ({ title, message }) => (
  <div style={{ 
    width: 500, background: '#222', borderRadius: 16, padding: 25, 
    display: 'flex', gap: 20, alignItems: 'flex-start',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)', borderLeft: '6px solid #00E5FF'
  }}>
    <div style={{ fontSize: 30 }}>🔔</div>
    <div>
      <div style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{title}</div>
      <div style={{ color: '#aaa', fontSize: 20 }}>{message}</div>
    </div>
  </div>
);

// 14. 核心指标卡 (Metric Card)
export const MetricCard: React.FC<{ label: string; value: string; trend?: string }> = ({ label, value, trend }) => (
  <div style={{ background: '#1e1e1e', padding: 40, borderRadius: 20, minWidth: 300 }}>
    <div style={{ color: '#888', fontSize: 24, marginBottom: 10 }}>{label}</div>
    <div style={{ color: '#fff', fontSize: 80, fontWeight: 'bold' }}>{value}</div>
    {trend && <div style={{ color: '#27c93f', fontSize: 24, marginTop: 10 }}>▲ {trend}</div>}
  </div>
);

// 15. 环形进度条 (Circular Progress)
export const CircularProgress: React.FC<{ progress: number; size?: number; color?: string }> = ({ progress, size = 200, color = '#00E5FF' }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#333" strokeWidth="10" fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth="10" fill="none" 
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span style={{ position: 'absolute', color: '#fff', fontSize: size * 0.25, fontWeight: 'bold' }}>{progress}%</span>
    </div>
  );
};

// 15.5 Git 提交图 (Git Graph)
export const GitGraph: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
    {[0, 1, 2].map(i => (
      <React.Fragment key={i}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', border: '4px solid #fff', background: '#111' }} />
        <div style={{ width: 80, height: 4, background: '#444' }} />
      </React.Fragment>
    ))}
    <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#00E5FF' }} />
  </div>
);

/**
 * 16. 毛玻璃 Dock 栏 (GlassDock) - NEW
 * 模仿 macOS 的底部应用栏，具有平滑的弹簧进场动画
 * 适用于展示技术栈、工具链图标
 */
export const GlassDock: React.FC<{ items?: string[] }> = ({ items = ['TS', 'React', 'Next', 'Node', 'Vite'] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{
      height: 120, padding: '0 40px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: 40,
      border: '1px solid rgba(255,255,255,0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', gap: 20
    }}>
      {items.map((item, i) => {
        // 依次弹出的动画
        const spr = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 15, stiffness: 120 }
        });
        
        return (
          <div key={i} style={{
            width: 80, height: 80,
            background: 'linear-gradient(180deg, #444, #222)',
            borderRadius: 20,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: 24,
            transform: `scale(${spr}) translateY(${(1-spr) * 50}px)`, // 从下方弹出
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            borderTop: '1px solid rgba(255,255,255,0.2)'
          }}>
            {item}
          </div>
        );
      })}
    </div>
  );
};
