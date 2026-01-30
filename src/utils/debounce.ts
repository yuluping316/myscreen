function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = true
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    if (immediate && !timeout) {
      func(...args);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default debounce;