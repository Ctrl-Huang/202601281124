import React from 'react';
import { Composition } from 'remotion';
import { MainComposition, videoConfig } from './Composition';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import './style.css'; // Global reset if needed

// 加载中文字体 (Google Fonts)
// 注意：Alibaba PuHuiTi 不在 Google Fonts，此处作为 Fallback 加载 Noto Sans SC
// 若需使用阿里巴巴普惠体，请下载字体文件放入 public/fonts 并通过 @font-face 引入
const { fontFamily } = loadFont();

export const RemotionRoot: React.FC = () => {
  // 计算总时长
  const totalDuration = videoConfig.scenes.reduce(
    (acc, scene) => acc + scene.durationInFrames,
    0
  );

  return (
    <>
      <Composition
        id="Main"
        component={MainComposition}
        durationInFrames={totalDuration}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
        defaultProps={{}}
      />
    </>
  );
};