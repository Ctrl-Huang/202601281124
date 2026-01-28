
import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

// 5. 浏览器窗口 (Browser Window V1 - 极简版)
export const BrowserWindow: React.FC<{ url?: string; children?: React.ReactNode; width?: number; height?: number }> = ({ 
  url = 'https://remotion.dev', children, width = 1200, height = 800 
}) => {
  return (
    <div style={{ width, height, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{ height: 60, background: '#f0f0f0', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 15 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div style={{ flex: 1, height: 36, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 15px', fontSize: 18, color: '#555', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {url}
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, background: '#fff', position: 'relative', overflow: 'hidden' }}>
        {children || <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 40 }}>Web Content</div>}
      </div>
    </div>
  );
};

// 5.5. 高级真实浏览器 (BrowserV2 - 拟真版)
export const BrowserV2: React.FC<{ url?: string; title?: string }> = ({ 
  url = 'google.com', title = 'New Tab' 
}) => {
  const frame = useCurrentFrame();
  const loadProgress = interpolate(frame, [0, 60], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <div style={{ 
      width: 1400, height: 900, background: '#202124', borderRadius: 12, 
      boxShadow: '0 60px 120px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column',
      border: '1px solid #3c4043', overflow: 'hidden'
    }}>
      {/* Tab Bar */}
      <div style={{ height: 45, background: '#202124', display: 'flex', alignItems: 'flex-end', padding: '0 10px' }}>
        {/* Active Tab */}
        <div style={{ 
          width: 240, height: 36, background: '#35363a', 
          borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', padding: '0 15px', gap: 10,
          position: 'relative'
        }}>
           <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', opacity: 0.2 }} />
           <span style={{ color: '#e8eaed', fontSize: 14, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>{title}</span>
           <span style={{ color: '#9aa0a6', fontSize: 16 }}>×</span>
           {/* Bottom blend */}
           <div style={{ position: 'absolute', bottom: 0, left: -8, width: 8, height: 8, background: 'radial-gradient(circle at 0 0, transparent 0, transparent 8px, #35363a 8px)' }} />
           <div style={{ position: 'absolute', bottom: 0, right: -8, width: 8, height: 8, background: 'radial-gradient(circle at 100% 0, transparent 0, transparent 8px, #35363a 8px)' }} />
        </div>
        {/* Inactive Tab */}
        <div style={{ width: 240, height: 36, display: 'flex', alignItems: 'center', padding: '0 15px', gap: 10, opacity: 0.7 }}>
           <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', opacity: 0.1 }} />
           <span style={{ color: '#9aa0a6', fontSize: 14 }}>Loading...</span>
        </div>
      </div>

      {/* Address Bar Area */}
      <div style={{ height: 50, background: '#35363a', display: 'flex', alignItems: 'center', padding: '0 15px', gap: 20, borderBottom: '1px solid #000' }}>
         <div style={{ display: 'flex', gap: 15, color: '#9aa0a6', fontSize: 20 }}>
            <span>←</span><span>→</span><span>↻</span>
         </div>
         {/* Omnibox */}
         <div style={{ 
           flex: 1, height: 32, background: '#202124', borderRadius: 16, 
           display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
           border: '1px solid #5f6368'
         }}>
           <span style={{ fontSize: 14 }}>🔒</span>
           <span style={{ color: '#fff', fontSize: 14 }}>https://<span style={{ color: '#9aa0a6' }}>{url}</span></span>
         </div>
         <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(45deg, #00E5FF, #2979FF)' }} />
      </div>

      {/* Viewport */}
      <div style={{ flex: 1, background: '#111', position: 'relative', padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Simulated Web Content */}
         <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 60, color: '#fff', fontWeight: 'bold', marginBottom: 20 }}>
               Welcome to {title}
            </div>
            <div style={{ width: 200, height: 8, background: '#333', borderRadius: 4, margin: '0 auto' }} />
         </div>
         
         {/* Loading Bar */}
         {loadProgress < 100 && (
           <div style={{ position: 'absolute', top: 0, left: 0, height: 3, width: `${loadProgress}%`, background: '#8ab4f8', boxShadow: '0 0 10px #8ab4f8' }} />
         )}
      </div>
    </div>
  );
};


// 6. 终端窗口 (Terminal)
export const TerminalWindow: React.FC<{ commands: string[]; width?: number }> = ({ commands, width = 1000 }) => {
  return (
    <div style={{ width, minHeight: 400, background: '#1e1e1e', borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', overflow: 'hidden', fontFamily: 'monospace', padding: 30 }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {commands.map((cmd, i) => (
          <div key={i} style={{ fontSize: 28, color: '#fff' }}>
            <span style={{ color: '#27c93f', marginRight: 15 }}>➜</span>
            {cmd}
          </div>
        ))}
        <div style={{ width: 15, height: 30, background: '#fff', opacity: 0.7 }} />
      </div>
    </div>
  );
};

// 6.5 PowerShell 终端 (NEW)
export const PowerShell: React.FC<{ commands?: string[] }> = ({ commands = ['npm install remotion', 'npm run build'] }) => {
  const frame = useCurrentFrame();
  // 简单的光标闪烁
  const cursorOpacity = Math.floor(frame / 30) % 2 === 0 ? 1 : 0;
  
  return (
    <div style={{ 
      width: 1000, minHeight: 400, 
      background: '#012456', // Classic PS Blue
      borderRadius: 4, 
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)', 
      overflow: 'hidden', 
      fontFamily: '"Consolas", "Courier New", monospace', 
      border: '1px solid #aaa'
    }}>
      {/* Title Bar */}
      <div style={{ 
        height: 40, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 10px',
        justifyContent: 'space-between' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
           <div style={{ width: 20, height: 20, background: '#012456', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 'bold' }}>&gt;_</div>
           <span style={{ fontSize: 16, color: '#000' }}>Administrator: Windows PowerShell</span>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
           <div style={{ width: 40, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>_</div>
           <div style={{ width: 40, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>□</div>
           <div style={{ width: 40, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ color: '#fff', fontSize: 24 }}>Windows PowerShell</div>
        <div style={{ color: '#fff', fontSize: 24, marginBottom: 20 }}>Copyright (C) Microsoft Corporation. All rights reserved.</div>

        {commands.map((cmd, i) => (
          <div key={i} style={{ fontSize: 24, color: '#fff' }}>
            <span style={{ color: '#fff', marginRight: 10 }}>PS C:\Users\Admin&gt;</span>
            <span style={{ color: '#f3f480' }}>{cmd}</span>
          </div>
        ))}
        
        <div style={{ fontSize: 24, color: '#fff' }}>
            <span style={{ color: '#fff', marginRight: 10 }}>PS C:\Users\Admin&gt;</span>
            <span style={{ width: 14, height: 24, background: '#fff', display: 'inline-block', opacity: cursorOpacity, verticalAlign: 'text-bottom' }} />
        </div>
      </div>
    </div>
  );
};

// 7. 手机样机 (Mobile Frame)
export const MobileFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ 
      width: 450, height: 900, 
      background: '#000', borderRadius: 60, 
      border: '14px solid #333',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Dynamic Island / Notch */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', width: 150, height: 40, background: '#000', borderRadius: 20, zIndex: 10 }} />
      <div style={{ width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
        {children || <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>App Screen</div>}
      </div>
    </div>
  );
};

// 7.5 iPhone 14 Pro Max 样机 (NEW)
export const IPhoneMockup: React.FC<{ children?: React.ReactNode; wallpaper?: string }> = ({ children, wallpaper }) => {
  return (
    <div style={{ 
      width: 480, height: 980, 
      borderRadius: 68, 
      padding: 16, // Bezel
      background: '#2b2b2b', // Frame Color (Space Black)
      boxShadow: 'inset 0 0 4px 2px rgba(255,255,255,0.3), 0 50px 100px rgba(0,0,0,0.6)',
      position: 'relative'
    }}>
      {/* Inner Black Border (Screen Edge) */}
      <div style={{
         width: '100%', height: '100%',
         background: '#000',
         borderRadius: 56,
         overflow: 'hidden',
         position: 'relative'
      }}>
         {/* Dynamic Island */}
         <div style={{
           position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
           width: 130, height: 38,
           background: '#000',
           borderRadius: 20,
           zIndex: 50,
           display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 10px'
         }}>
            {/* Camera / Sensors */}
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a' }} />
         </div>

         {/* Screen Content */}
         <div style={{ 
           width: '100%', height: '100%', 
           background: wallpaper ? `url(${wallpaper}) center/cover` : 'linear-gradient(180deg, #EAD6EE 0%, #A0F1EA 100%)',
           display: 'flex', alignItems: 'center', justifyContent: 'center'
         }}>
           {children || <div style={{ fontSize: 30, fontWeight: 600, color: '#333' }}>Hello</div>}
         </div>

         {/* Home Indicator */}
         <div style={{
            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
            width: 140, height: 5, background: '#fff', borderRadius: 10, opacity: 0.8
         }} />
      </div>

      {/* Side Buttons (Simulated) */}
      <div style={{ position: 'absolute', top: 200, left: -4, width: 4, height: 40, background: '#333', borderRadius: '4px 0 0 4px' }} /> {/* Mute */}
      <div style={{ position: 'absolute', top: 260, left: -4, width: 4, height: 70, background: '#333', borderRadius: '4px 0 0 4px' }} /> {/* Vol Up */}
      <div style={{ position: 'absolute', top: 350, left: -4, width: 4, height: 70, background: '#333', borderRadius: '4px 0 0 4px' }} /> {/* Vol Down */}
      <div style={{ position: 'absolute', top: 300, right: -4, width: 4, height: 110, background: '#333', borderRadius: '0 4px 4px 0' }} /> {/* Power */}
    </div>
  );
};
