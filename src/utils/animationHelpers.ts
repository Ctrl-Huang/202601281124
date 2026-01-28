import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * 通用 Spring 动画配置
 */
export const springConfig = {
  damping: 200,
  stiffness: 100,
  mass: 0.5,
};

/**
 * 获取基于当前帧的 0-1 进场动画值
 * @param delay 延迟帧数
 */
export const useEnterSpring = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });
};

/**
 * 简单的淡入淡出
 */
export const useFadeInOut = (durationInFrames: number, fadeDuration = 15) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(
    frame,
    [0, fadeDuration, durationInFrames - fadeDuration, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  return opacity;
};

/**
 * 打字机效果计算
 * @param text 全文本
 * @param speed 每字符帧数
 */
export const useTypingEffect = (text: string, speed: number = 2) => {
  const frame = useCurrentFrame();
  const charsShown = Math.floor(frame / speed);
  return text.substring(0, charsShown);
};
