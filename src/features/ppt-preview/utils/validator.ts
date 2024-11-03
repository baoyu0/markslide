export function isValidPPT(content: string): boolean {
  // 检查是否包含幻灯片分隔符
  const hasSlides = content.includes('---');
  
  // 检查每个幻灯片是否有内容
  const slides = content.split('---').map(slide => slide.trim());
  const hasContent = slides.every(slide => slide.length > 0);
  
  return hasSlides && hasContent;
}

export function validateTransition(transition: string): boolean {
  const validTransitions = ['none', 'fade', 'slide', 'convex', 'concave', 'zoom'];
  return validTransitions.includes(transition);
}

export function validatePlaybackSpeed(speed: number): boolean {
  return speed >= 0.5 && speed <= 2;
} 