import { useState } from "react";

export default function FormInput({ name, type, label, value, isRequired }) {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  if (isRequired) {
    return (
      <div className="flex flex-col items-center">
        <label>
          {`${label} (required)`}:
        </label>
        <input
          name={name}
          type={type}
          value={inputValue}
          onChange={handleChange}
          className="text-black bg-amber-200 text-center"
          required
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <label>
          {label}:
        </label>
        <input
          name={name}
          type={type}
          value={inputValue}
          onChange={handleChange}
          className="text-black bg-amber-200 text-center"
        />
      </div>
    );
  }
}