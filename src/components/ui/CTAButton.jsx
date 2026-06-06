import './CTAButton.css';

/**
 * CTAButton - A call-to-action button component.
 * Renders as <a> if href is provided, <button> if onClick is provided.
 *
 * @param {Object} props
 * @param {string} props.label - Button text content
 * @param {string} [props.href] - Link URL (renders as <a>)
 * @param {Function} [props.onClick] - Click handler (renders as <button>)
 * @param {'primary'|'secondary'|'phone'} [props.variant='primary'] - Visual variant
 */
function CTAButton({ label, href, onClick, variant = 'primary' }) {
  const className = `cta-button cta-button--${variant}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default CTAButton;
