/**
 * 估算文本阅读所需时间（秒）
 * 用于辅助设置 Scene 的 durationInFrames
 * 
 * 假设：
 * - 中文阅读速度：约 4-6 字/秒
 * - 英文阅读速度：约 2-3 词/秒
 */
export const estimateReadingTime = (text: string): number => {
  const cnMatch = text.match(/[\u4e00-\u9fa5]/g);
  const enMatch = text.match(/[a-zA-Z0-9]+/g);

  const cnCount = cnMatch ? cnMatch.length : 0;
  const enCount = enMatch ? enMatch.length : 0;

  // 基础反应时间 1秒 + 中文耗时 + 英文耗时
  const seconds = 1 + (cnCount / 5) + (enCount / 2.5);
  return Math.ceil(seconds);
};

/**
 * 将长文本按最大宽度（字符数估算）分割为多行
 * 简单的换行逻辑，适用于 Subtitle 或 Steps 描述
 */
export const wordWrap = (text: string, maxCharsPerLine: number = 20): string[] => {
  const words = text.split('');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((char) => {
    // 简单估算：汉字算2宽，英文算1宽
    const charWidth = /[\u4e00-\u9fa5]/.test(char) ? 2 : 1;
    const currentWidth = currentLine.split('').reduce((acc, c) => acc + (/[\u4e00-\u9fa5]/.test(c) ? 2 : 1), 0);

    if (currentWidth + charWidth > maxCharsPerLine * 2) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine += char;
    }
  });
  if (currentLine) lines.push(currentLine);

  return lines;
};
