import { Link } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { buttonClasses } from './buttonStyles.js';

/**
 * One button for the whole app. Renders a <Link> with `to`, an <a> with `href`,
 * otherwise a <button>.
 */
export default function Button({
  variant,
  size,
  block,
  className,
  to,
  href,
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled,
  children,
  ...rest
}) {
  const classes = buttonClasses({ variant, size, block, className });
  const content = (
    <>
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : Icon && <Icon className="size-4" aria-hidden="true" />}
      {children}
      {IconRight && <IconRight className="size-4" aria-hidden="true" />}
    </>
  );

  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>;
  return (
    <button type="button" className={classes} disabled={loading || disabled} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
