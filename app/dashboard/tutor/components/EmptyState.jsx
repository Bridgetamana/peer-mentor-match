export function EmptyState({ title, message }) {
  return (
    <div className="box-shadow bg-background p-6">
      <p className="text-muted">{title}</p>
      {message && <p className="text-sm text-muted">{message}</p>}
    </div>
  );
}
