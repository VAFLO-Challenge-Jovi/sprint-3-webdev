import Badge from './Badge.jsx';

export default function SectionHeading({ id, eyebrow, title, description, align = 'center', tone = 'volt', children }) {
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';
  return (
    <header className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <Badge tone={tone}>{eyebrow}</Badge>}
      <h2 id={id} className="text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="text-base text-fg-muted sm:text-lg">{description}</p>}
      {children}
    </header>
  );
}
