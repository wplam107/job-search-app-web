const CardControls = ({ label, children }) => {
  return (
    <li className="flex flex-col items-center">
      <label className="text-red-400 font-bold">
        {label}
      </label>
      <div className="flex flex-row justify-center">
        {children}
      </div>
    </li>
  );
};

export default CardControls;