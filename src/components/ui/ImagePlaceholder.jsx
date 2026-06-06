import './ImagePlaceholder.css';

function ImagePlaceholder({ width, height, alt, src, className }) {
  const truncatedAlt = alt && alt.length > 125 ? alt.slice(0, 125) : alt;

  if (src) {
    return (
      <img
        src={src}
        alt={truncatedAlt || ''}
        width={width}
        height={height}
        className={`image-placeholder__img ${className || ''}`}
        style={{ maxWidth: '100%', height: 'auto', aspectRatio: `${width} / ${height}` }}
      />
    );
  }

  return (
    <div
      className={`image-placeholder ${className || ''}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
        aspectRatio: `${width} / ${height}`,
      }}
      role="img"
      aria-label={truncatedAlt || 'Image placeholder'}
    >
      <svg
        className="image-placeholder__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      {truncatedAlt && (
        <span className="image-placeholder__alt">{truncatedAlt}</span>
      )}
    </div>
  );
}

export default ImagePlaceholder;
