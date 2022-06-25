const CardControls = ({ label, children }) => {
  return (
    <li className="flex flex-col items-start">
      <label className="text-red-400 font-bold">
        {label}
      </label>
      {children}
    </li>
  );
};

export default CardControls;