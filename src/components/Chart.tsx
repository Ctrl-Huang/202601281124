import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { ChartProps } from '../types';
import { springConfig } from '../utils/animationHelpers';

export const Chart: React.FC<ChartProps & { accentColor: string; textColor: string }> = ({
  type,
  data,
  title,
  yAxisLabel,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxHeight = 800;
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {title && <h2 style={{ fontSize: 80, color: textColor, marginBottom: 60 }}>{title}</h2>}
      
      <div style={{ display: 'flex', alignItems: 'flex-end', height: maxHeight, gap: 40, position: 'relative' }}>
        {/* Y-Axis Label */}
        {yAxisLabel && (
           <div style={{ position: 'absolute', left: -100, top: 0, color: '#888', fontSize: 30 }}>{yAxisLabel}</div>
        )}

        {data.map((d, i) => {
          const spr = spring({
            frame: frame - i * 5,
            fps,
            config: springConfig,
          });

          const height = (d.value / maxValue) * maxHeight;

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 120 }}>
              {/* Value Label */}
              <div style={{ fontSize: 36, color: '#aaa', marginBottom: 10, opacity: spr }}>
                {d.value}
              </div>
              
              {/* Bar */}
              <div
                style={{
                  width: '100%',
                  height: height * spr,
                  backgroundColor: d.color || accentColor,
                  borderRadius: '8px 8px 0 0',
                }}
              />
              
              {/* X-Axis Label */}
              <div style={{ fontSize: 30, color: textColor, marginTop: 20, opacity: spr }}>
                {d.label}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ width: '80%', height: 2, backgroundColor: '#444', marginTop: 0 }} />
    </div>
  );
};
