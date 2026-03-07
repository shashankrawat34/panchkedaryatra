import { toWebP, toResponsiveWebPSrcSet, toResponsiveSrcSet, getImageSizes } from '../utils/image';

/**
 * Renders a <picture> element with WebP source, responsive srcset, and original fallback.
 * Optimized for performance with lazy loading, async decoding, and multiple image sizes.
 * Accepts all standard <img> props.
 */
export default function OptimizedImage({ 
  src, 
  alt = '', 
  className = '', 
  loading = 'lazy',
  responsive = true,
  ...rest 
}) {
  const webpSrc = toWebP(src);
  const webpSrcSet = responsive ? toResponsiveWebPSrcSet(src) : webpSrc;
  const srcSet = responsive ? toResponsiveSrcSet(src) : src;
  const sizes = responsive ? getImageSizes() : undefined;

  return (
    <picture>
      {responsive && webpSrcSet && (
        <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
      )}
      {responsive && srcSet && (
        <source srcSet={srcSet} sizes={sizes} />
      )}
      {!responsive && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        sizes={sizes}
        {...rest}
      />
    </picture>
  );
}
