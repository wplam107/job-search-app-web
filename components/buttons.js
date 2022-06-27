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