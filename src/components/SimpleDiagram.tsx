import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { DiagramProps } from '../types';
import { springConfig } from '../utils/animationHelpers';

export const SimpleDiagram: React.FC<DiagramProps & { accentColor: string; textColor: string }> = ({
  nodes,
  edges,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 坐标转换 0-100 -> pixels
  const getX = (p: number) => (p / 100) * (width - 200); // padding safe area
  const getY = (p: number) => (p / 100) * (height - 400);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
        viewBox={`0 0 ${width - 200} ${height - 400}`}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>

        {/* 绘制连线 */}
        {edges.map((edge, i) => {
          const from = nodes.find((n) => n.id === edge.fromId);
          const to = nodes.find((n) => n.id === edge.toId);
          if (!from || !to) return null;

          const spr = spring({
            frame: frame - 20 - i * 5,
            fps,
            config: springConfig,
          });

          return (
            <g key={i} style={{ opacity: spr }}>
              <line
                x1={getX(from.x)}
                y1={getY(from.y)}
                x2={getX(to.x)}
                y2={getY(to.y)}
                stroke="#666"
                strokeWidth="4"
                markerEnd="url(#arrowhead)"
                strokeDasharray="100%"
                strokeDashoffset={`${(1 - spr) * 100}%`}
              />
              {edge.label && (
                <text
                  x={(getX(from.x) + getX(to.x)) / 2}
                  y={(getY(from.y) + getY(to.y)) / 2 - 10}
                  fill="#888"
                  fontSize="30"
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 绘制节点 */}
        {nodes.map((node, i) => {
          const spr = spring({
            frame: frame - i * 5,
            fps,
            config: springConfig,
          });

          return (
            <g
              key={node.id}
              transform={`translate(${getX(node.x)}, ${getY(node.y)}) scale(${spr})`}
            >
              {node.type === 'circle' ? (
                <circle r="80" fill="#252525" stroke={node.color || accentColor} strokeWidth="6" />
              ) : (
                <rect
                  x="-120"
                  y="-60"
                  width="240"
                  height="120"
                  rx="10"
                  fill="#252525"
                  stroke={node.color || accentColor}
                  strokeWidth="6"
                />
              )}
              <text
                dy=".3em"
                fill={textColor}
                fontSize="40"
                textAnchor="middle"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
