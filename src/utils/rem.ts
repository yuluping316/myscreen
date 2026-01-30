// 设计稿宽度（根据你的实际设计稿修改）
const DESIGN_WIDTH = 1920;
// 基准值：1rem = 100px（方便计算）
const BASE_FONT_SIZE = 18;

// 设置根字体大小
function setRem() {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth;
  // 限制最小/最大宽度，避免极端缩放
  const width = Math.min(Math.max(clientWidth, 1366), 1920);
  // 计算当前根字体大小
  const fontSize = (width / DESIGN_WIDTH) * BASE_FONT_SIZE;
  document.documentElement.style.fontSize = `${fontSize}px`;
}

// 初始化
setTimeout(() => {
  setRem();
}, 100);

export default setRem;