import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CodeProps } from '../types';

interface CodeBlockComponentProps extends CodeProps {
  fontFamily: string;
}

// 简易语法高亮模拟 (不依赖庞大的 prismjs)
const highlightSyntax = (line: string) => {
  const keywords = /\b(const|let|var|function|return|import|from|export|default|class|interface|if|else|async|await)\b/g;
  const types = /\b(string|number|boolean|any|void|React|FC)\b/g;
  const strings = /(['"`].*?['"`])/g;
  const numbers = /\b\d+\b/g;

  // 非常基础的替换，仅用于演示效果。复杂需求建议引入 PrismJS
  const parts = line.split(/(\s+|[(){}[\]=;,:])/g);

  return parts.map((part, i) => {
    let color = '#E0E0E0'; // 默认
    if (keywords.test(part)) color = '#FF79C6'; // Pink
    else if (types.test(part)) color = '#8BE9FD'; // Cyan
    else if (strings.test(part)) color = '#F1FA8C'; // Yellow
    else if (numbers.test(part)) color = '#BD93F9'; // Purple
    else if (/^[A-Z]/.test(part)) color = '#50FA7B'; // PascalCase (Components/Classes)

    return (
      <span key={i} style={{ color }}>
        {part}
      </span>
    );
  });
};

export const CodeBlock: React.FC<CodeBlockComponentProps> = ({
  code,
  fileName,
  fontFamily,
  showLineNumbers = true,
  highlightLines = [],
}) => {
  const frame = useCurrentFrame();
  const lines = code.trim().split('\n');
  
  // 容器进场
  const containerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const containerY = interpolate(frame, [0, 20], [50, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 2400,
        margin: '0 auto',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 顶部标题栏 */}
      <div
        style={{
          backgroundColor: '#2D2D2D',
          padding: '15px 30px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #333',
        }}
      >
        <div style={{ display: 'flex', gap: 12, marginRight: 30 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#27C93F' }} />
        </div>
        <span style={{ color: '#aaa', fontFamily, fontSize: 24 }}>{fileName || 'script.ts'}</span>
      </div>

      {/* 代码区域 */}
      <div style={{ padding: 40, overflow: 'hidden' }}>
        {lines.map((line, index) => {
          // 逐行出现逻辑
          const lineStartFrame = index * 5;
          const lineOpacity = interpolate(frame, [lineStartFrame, lineStartFrame + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });

          const isHighlighted = highlightLines.includes(index + 1);
          const bg = isHighlighted ? 'rgba(255, 255, 255, 0.1)' : 'transparent';

          return (
            <div
              key={index}
              style={{
                opacity: lineOpacity,
                fontFamily,
                fontSize: 48,
                lineHeight: 1.6,
                whiteSpace: 'pre',
                display: 'flex',
                backgroundColor: bg,
                width: '100%',
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    color: '#555',
                    width: 80,
                    textAlign: 'right',
                    marginRight: 30,
                    userSelect: 'none',
                  }}
                >
                  {index + 1}
                </span>
              )}
              <span>{highlightSyntax(line)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
