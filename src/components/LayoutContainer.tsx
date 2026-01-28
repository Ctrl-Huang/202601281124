import React from 'react';
import { AbsoluteFill } from 'remotion';

interface LayoutContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  padding?: number | string;
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  style,
  padding = 80,
}) => {
  return (
    <AbsoluteFill
      style={{
        padding,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
