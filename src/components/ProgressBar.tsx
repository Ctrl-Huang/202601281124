import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

interface ProgressBarProps {
  color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ color }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const progress = frame / (durationInFrames - 1);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 10,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
