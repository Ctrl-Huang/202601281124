import React from 'react';
import { useVideoConfig } from 'remotion';
import { useEnterSpring } from '../utils/animationHelpers';
import { TitleProps } from '../types';

export const AnimatedTitle: React.FC<TitleProps & { themeColor: string; textColor: string }> = ({
  title,
  subtitle,
  variant = 'center',
  themeColor,
  textColor,
}) => {
  const spr = useEnterSpring(0);
  const sprSub = useEnterSpring(10);
  const { width } = useVideoConfig();

  const isLeft = variant === 'left';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isLeft ? 'flex-start' : 'center',
    width: '100%',
    height: '100%',
    textAlign: isLeft ? 'left' : 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 160,
    fontWeight: 800,
    color: textColor,
    transform: `scale(${spr}) translateY(${50 * (1 - spr)}px)`,
    opacity: spr,
    lineHeight: 1.1,
    textShadow: '0 10px 30px rgba(0,0,0,0.3)',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 60,
    fontWeight: 400,
    color: themeColor,
    marginTop: 40,
    transform: `translateY(${50 * (1 - sprSub)}px)`,
    opacity: sprSub,
  };

  // 技术感装饰线
  const lineWidth = isLeft ? 200 : 400;
  const lineStyle: React.CSSProperties = {
    width: lineWidth * spr,
    height: 8,
    backgroundColor: themeColor,
    marginTop: 60,
    borderRadius: 4,
    opacity: spr,
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      {subtitle && <h2 style={subtitleStyle}>{subtitle}</h2>}
      <div style={lineStyle} />
    </div>
  );
};
