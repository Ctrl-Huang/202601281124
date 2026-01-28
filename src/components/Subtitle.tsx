import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SubtitleProps } from '../types';

/**
 * 字幕组件 (Subtitle)
 * 用于显示单行或多行强调文本，通常用于章节过渡或补充说明。
 */
export const Subtitle: React.FC<SubtitleProps & { textColor: string }> = ({
  text,
  textColor,
}) => {
  const frame = useCurrentFrame();

  // 简单的淡入淡出动画
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: '0 100px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          color: textColor,
          fontSize: 90,
          fontWeight: 400,
          opacity,
          transform: `translateY(${translateY}px)`,
          lineHeight: 1.5,
          textShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        {text}
      </h2>
    </div>
  );
};
