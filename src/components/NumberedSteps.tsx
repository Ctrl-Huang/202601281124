import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { StepsProps } from '../types';
import { springConfig } from '../utils/animationHelpers';

export const NumberedSteps: React.FC<StepsProps & { accentColor: string; textColor: string }> = ({
  steps,
  currentStepIndex,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        paddingTop: 200,
      }}
    >
      {steps.map((step, i) => {
        const delay = i * 10;
        const spr = spring({ frame: frame - delay, fps, config: springConfig });
        
        const isActive = currentStepIndex === undefined || currentStepIndex === i;
        const isPast = currentStepIndex !== undefined && i < currentStepIndex;
        
        const opacity = isActive ? 1 : 0.4;
        const scale = isActive ? 1.1 : 1;

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              opacity: spr * opacity,
              transform: `scale(${spr * scale})`,
              position: 'relative',
            }}
          >
            {/* 连接线 (except last) */}
            {i < steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  left: '50%',
                  width: '100%',
                  height: 6,
                  backgroundColor: isPast ? accentColor : '#444',
                  zIndex: -1,
                }}
              />
            )}

            {/* 圆圈数字 */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: isActive || isPast ? accentColor : '#333',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 60,
                fontWeight: 'bold',
                marginBottom: 40,
                border: `4px solid ${isActive ? '#fff' : 'transparent'}`,
                boxShadow: isActive ? `0 0 40px ${accentColor}80` : 'none',
              }}
            >
              {i + 1}
            </div>

            {/* 标题与描述 */}
            <h3 style={{ fontSize: 50, color: textColor, margin: 0, textAlign: 'center' }}>
              {step.title}
            </h3>
            {step.description && (
              <p style={{ fontSize: 32, color: '#888', textAlign: 'center', marginTop: 15, maxWidth: '80%' }}>
                {step.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
