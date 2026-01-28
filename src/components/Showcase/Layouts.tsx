
import React from 'react';

// 20. 便当盒布局 (Bento Grid)
export const BentoGrid: React.FC<{ children: React.ReactNode[] }> = ({ children }) => (
  <div style={{ 
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', 
    gap: 30, width: 1400, height: 800 
  }}>
    {children.map((child, i) => (
      <div key={i} style={{ 
        background: '#1a1a1a', borderRadius: 24, overflow: 'hidden', padding: 20,
        gridColumn: i === 0 ? 'span 2' : 'span 1',
        gridRow: i === 2 ? 'span 2' : 'span 1',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        {child}
      </div>
    ))}
  </div>
);

// 21. 分屏对比 (Split Screen)
export const SplitScreen: React.FC<{ left: React.ReactNode; right: React.ReactNode }> = ({ left, right }) => (
  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' }}>{left}</div>
    <div style={{ width: 2, background: '#333' }} />
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a' }}>{right}</div>
  </div>
);

// 22. 引语卡片 (Quote Card)
export const QuoteCard: React.FC<{ text: string; author: string }> = ({ text, author }) => (
  <div style={{ maxWidth: 1200, textAlign: 'center' }}>
    <div style={{ fontSize: 120, color: '#333', lineHeight: 0.5, marginBottom: 40 }}>“</div>
    <div style={{ fontSize: 60, color: '#fff', fontStyle: 'italic', lineHeight: 1.4, marginBottom: 40 }}>
      {text}
    </div>
    <div style={{ fontSize: 40, color: '#00E5FF', fontWeight: 'bold' }}>— {author}</div>
  </div>
);
