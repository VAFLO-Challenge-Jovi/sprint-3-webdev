export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`rounded-3xl border border-white/8 bg-ink-850 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
