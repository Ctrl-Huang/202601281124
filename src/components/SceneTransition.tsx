import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface TransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'wipe' | 'none';
  exit?: boolean;
}

export const SceneTransition: React.FC<TransitionProps> = ({
  children,
  type = 'fade',
  exit = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();

  const transitionDuration = 15;

  let style: React.CSSProperties = {};

  if (type === 'fade') {
    const opacity = interpolate(
      frame,
      [0, transitionDuration],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );
    style = { opacity };
  } else if (type === 'slide') {
    const x = interpolate(
      frame,
      [0, transitionDuration],
      [width, 0],
      { extrapolateRight: 'clamp', easing: (t) => t * (2 - t) } // EaseOutQuad
    );
    style = { transform: `translateX(${x}px)` };
  } else if (type === 'wipe') {
    const percentage = interpolate(
      frame,
      [0, transitionDuration],
      [100, 0],
      { extrapolateRight: 'clamp' }
    );
    // Wipe from left to right (reveal)
    style = { clipPath: `inset(0 ${percentage}% 0 0)` };
  }

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};