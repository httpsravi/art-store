export function AdminField({
  label,
  name,
  type = "text",
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
