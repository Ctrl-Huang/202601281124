import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

interface HighlightOverlayProps {
  /** 高亮区域 X 坐标 */
  x: number;
  /** 高亮区域 Y 坐标 */
  y: number;
  /** 高亮区域宽度 */
  width: number;
  /** 高亮区域高度 */
  height: number;
  /** 高亮颜色 */
  color?: string;
  /** 线条宽度 */
  strokeWidth?: number;
  /** 内边距 */
  padding?: number;
  /** 动画标签（用于重新触发动画） */
  label?: string;
}

/**
 * 高亮框组件 (HighlightOverlay)
 * 用于在屏幕特定位置绘制一个带有呼吸效果的边框，强调代码块或图表区域。
 */
export const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  x,
  y,
  width,
  height,
  color = '#FFD700',
  strokeWidth = 6,
  padding = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 呼吸动画计算 (使用正弦波)
  const opacity = 0.6 + 0.4 * Math.sin((frame / fps) * Math.PI * 2); // 1秒一次呼吸循环
  
  // 简单的进场扩张动画
  const expansion = Math.min(1, frame / 10); // 前10帧展开
  const currentPadding = padding * expansion;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - currentPadding,
        top: y - currentPadding,
        width: width + currentPadding * 2,
        height: height + currentPadding * 2,
        border: `${strokeWidth}px solid ${color}`,
        borderRadius: 12,
        opacity: opacity,
        pointerEvents: 'none', // 确保不阻挡底层交互（虽然视频是静态的，但在预览中很有用）
        boxShadow: `0 0 20px ${color}40`, // 添加淡淡的发光效果
        zIndex: 999, // 确保在最上层
      }}
    />
  );
};
