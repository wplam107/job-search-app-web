export default function FilterInput({ name, type, value, label, setter }) {
  return (
    <div className="flex flex-col items-center">
      <label>
        {label}:
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="text-black bg-amber-200"
      />
    </div>
  );
}