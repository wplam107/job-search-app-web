import { plusCirclePath } from "./icons";

export const LabelledButton = ({ label, align, style, onClick, children }) => {
  return (
    <div className={align}>
      <label className={style}>
        {label}
      </label>
      <button onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export const ControlButton = ({ onClick, type, children }) => {
  return (
    <button 
      className="px-2 mx-1 rounded-full bg-sky-800 text-zinc-200 hover:bg-sky-400"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export const ToggleNewFormButton = ({ onClick, transition, ariaLabel }) => {
  const className = "cursor-pointer " + transition;
  return (
    <button onClick={onClick} className={className} aria-label={ariaLabel}>
      <svg viewBox="0 0 16 16" className="fill-zinc-400 w-6 h-6 hover:fill-orange-400">
        <path d={plusCirclePath} />
      </svg>
    </button>
  );
};