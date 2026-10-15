import Badge from './Badge.jsx';

export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col items-start gap-3">
        {eyebrow && <Badge tone="volt">{eyebrow}</Badge>}
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && <p className="max-w-2xl text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </header>
  );
}
