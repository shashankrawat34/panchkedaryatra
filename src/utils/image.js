/**
 * Convert an image path to its WebP equivalent.
 * Example: '/images/kedarnath/kedarnath-1.jpg' → '/images/kedarnath/kedarnath-1.webp'
 */
export function toWebP(src) {
  if (!src) return src;
  return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

/**
 * Generate responsive srcset for images with multiple sizes.
 * Returns space-separated srcsets for optimal delivery.
 */
export function toResponsiveSrcSet(src) {
  if (!src) return '';
  const baseName = src.substring(0, src.lastIndexOf('.'));
  const ext = src.substring(src.lastIndexOf('.'));
  return `${baseName}-small${ext} 480w, ${baseName}-medium${ext} 768w, ${baseName}${ext} 1200w`;
}

/**
 * Generate responsive WebP srcset with multiple sizes.
 */
export function toResponsiveWebPSrcSet(src) {
  if (!src) return '';
  const srcset = toResponsiveSrcSet(src);
  return srcset.replace(/\.(jpe?g|png)/gi, '.webp');
}

/**
 * Get optimal image size based on viewport.
 */
export function getImageSizes() {
  return '(max-width: 480px) 100vw, (max-width: 768px) 90vw, 80vw';
}
