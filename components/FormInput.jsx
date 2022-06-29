import { useState } from "react";

export default function FormInput({ name, type, label, value, isRequired, noEdit }) {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  if (isRequired) {
    return (
      <div className="flex flex-col items-center">
        <label className="my-2">
          {noEdit ? `${label}` : `${label} (required)`}:
        </label>
        {!noEdit ? (
          <input
            name={name}
            type={type}
            value={inputValue}
            onChange={handleChange}
            className="text-black bg-amber-200 text-center"
            required
          />
        ) : (
          <span>
            {inputValue}
          </span>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <label className="my-2">
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