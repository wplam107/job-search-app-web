import InputItem from '../components/cardItem';
import CardControls from './cardControls';

export default function Card({ cardKey, element, title, handleSubmit, itemType, cols, hidden, children }) {
  const className = title ? "p-4 bg-zinc-700" : "p-4 hover:bg-zinc-800";

  const CenterCol = ({ children }) => {
    return (
      <div className="col-start-2 col-end-2">
        {children}
      </div>
    );
  };

  return (
    <li className={hidden ? "hidden" : ""}>
      <h1 className="text-center text-xl text-red-400 font-bold">{title}</h1>
      <form className={className} onSubmit={handleSubmit}>
        <ul className="grid grid-cols-3">
          {cols.map((col, idx) => {
            let value;
            if (element) {
              value = element[col.name];
            } else {
              value = ""
            }
            console.log(idx);
            return (
              <InputItem
                key={`${cardKey}-${col.name}`}
                itemType={col.noEdit ? "value" : itemType}
                type={col.type}
                name={col.name}
                label={col.label}
                value={value}
                size={48}
                isRequired={col.required}
              />
            );
          })}
          {(cols.length + 1) % 3 !== 0
            ? <CenterCol>
                <CardControls key={`${cardKey}-controls`} label="Submit/Edit:">
                  {children}
                </CardControls>
              </CenterCol>
            : <CardControls key={`${cardKey}-controls`} label="Submit/Edit:">
                {children}
              </CardControls>
          }
        </ul>
      </form>
    </li>
  );
};

