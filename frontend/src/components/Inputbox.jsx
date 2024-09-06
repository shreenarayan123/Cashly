export function Inputbox({ label, placeholder, onChange, error, name, type = "text" }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full px-2 py-1 border rounded ${error ? "border-red-500" : "border-slate-200"}`}
      />
      {error && <p className="text-red-500 text-sm flex items-start">{error}</p>}
    </div>
  );
}