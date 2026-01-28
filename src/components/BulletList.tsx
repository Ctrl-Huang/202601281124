import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BulletsProps } from '../types';
import { springConfig } from '../utils/animationHelpers';
import { Icon } from './Icon';

export const BulletList: React.FC<BulletsProps & { accentColor: string; textColor: string }> = ({
  title,
  items,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', paddingLeft: 100 }}>
      {title && (
        <h2
          style={{
            fontSize: 100,
            color: accentColor,
            marginBottom: 80,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {title}
        </h2>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
        {items.map((item, i) => {
          const delay = 15 * i + 10;
          const spr = spring({
            frame: frame - delay,
            fps,
            config: springConfig,
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                opacity: spr,
                transform: `translateX(${50 * (1 - spr)}px)`,
              }}
            >
              {/* 图标容器 */}
              <div
                style={{
                  width: 80,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 30,
                  transform: `scale(${spr})`,
                }}
              >
                {item.icon ? (
                  <Icon icon={item.icon} size={60} color={item.color || accentColor} />
                ) : (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: item.color || accentColor,
                      borderRadius: 4,
                      transform: `rotate(${spr * 90}deg)`,
                    }}
                  />
                )}
              </div>
              
              <span style={{ fontSize: 70, color: textColor, fontWeight: 500 }}>
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
