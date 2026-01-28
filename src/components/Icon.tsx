import React from 'react';

interface IconProps {
  /** 图标内容：可以是 Emoji、SVG path 数据 (以 'M' 开头) 或图片 URL */
  icon: string;
  /** 图标大小 (px) */
  size?: number;
  /** 图标颜色 (仅对 SVG path 有效) */
  color?: string;
  style?: React.CSSProperties;
}

/**
 * 通用图标组件
 * 自动识别 Emoji、SVG Path 或 图片 URL
 */
export const Icon: React.FC<IconProps> = ({ icon, size = 80, color = 'white', style }) => {
  // 判断是否为 SVG Path (简单的判断逻辑：以 M 开头且包含空格)
  const isSvgPath = icon.trim().startsWith('M') && icon.includes(' ');
  // 判断是否为图片 URL
  const isUrl = icon.includes('/') || icon.includes('.');

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  };

  if (isSvgPath) {
    return (
      <div style={containerStyle}>
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill={color}>
          <path d={icon} />
        </svg>
      </div>
    );
  }

  if (isUrl) {
    return (
      <div style={containerStyle}>
        <img
          src={icon}
          alt="icon"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  // 默认为 Emoji 或 文字
  return (
    <div
      style={{
        ...containerStyle,
        fontSize: size * 0.8,
        lineHeight: 1,
      }}
    >
      {icon}
    </div>
  );
};
