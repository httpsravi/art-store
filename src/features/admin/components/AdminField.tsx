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
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--cp-muted)",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="cyber-input"
      />
      {error && (
        <p
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--cp-red)",
          }}
        >
          // {error}
        </p>
      )}
    </div>
  );
}
