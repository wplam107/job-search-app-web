import { useState } from "react";

export default function InputItem({ itemType, type, name, label, value, size, isRequired }) {
  const [inputValue, setInputValue] = useState(value !== null ? value : "");

  const handleOnChange = (e) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };

  if (itemType === "value") {
    return (
      <li className="flex flex-col items-start">
        <label className="text-sky-600 font-bold">
          {label}:
        </label>
        <span className={`h-6 w-${size}`}>
          {value}
        </span>
      </li>
    );
  }

  return (
    <li className="flex flex-col items-start">
      <label className="text-sky-600 font-bold">
        {label}<span className="text-amber-500">{isRequired && " (required)"}</span>:
      </label>
      {isRequired
        ? <input
          className={`text-black h-6 w-${size} bg-amber-200`}
          type={type}
          name={name}
          value={inputValue}
          onChange={handleOnChange}
          required />
        : <input
          className={`text-black h-6 w-${size} bg-amber-200`}
          type={type}
          name={name}
          value={inputValue}
          onChange={handleOnChange} />}
    </li>
  );
};
