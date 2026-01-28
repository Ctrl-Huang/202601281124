import React from 'react';
import { useTypingEffect } from '../utils/animationHelpers';

interface TypingTextProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  style?: React.CSSProperties;
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 1.5,
  cursor = true,
  style,
}) => {
  const displayedText = useTypingEffect(text, speed);
  const isDone = displayedText.length === text.length;

  return (
    <span style={style}>
      {displayedText}
      {cursor && !isDone && <span style={{ opacity: 0.7 }}>|</span>}
    </span>
  );
};
