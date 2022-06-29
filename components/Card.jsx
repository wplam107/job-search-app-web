import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function Card({ children, element, dataColumns }) {
  const titleCols = dataColumns.filter((col) => col.isTitle);
  const panelCols = dataColumns.filter((col) => !col.isTitle);

  return (
    <div className="px-4 py-2">
      <div className="mx-auto w-full rounded-2xl bg-sky-200 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center w-full py-1 rounded-lg justify-between bg-sky-300">
                <div className="grid grid-cols-3 w-[95%]">
                  {titleCols.map((col) => (
                    <div key={col.name} className="flex flex-row justify-start">
                      <span className="text-sky-800 px-2 font-bold">{col.label}:</span>
                      <span className="text-zinc-800">{element[col.name]}</span>
                    </div>
                  ))}
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? (
                      'rotate-180 transform'
                    ) : (
                      ''
                    )
                  } h-5 w-5 my-auto fill-zinc-800`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="w-full pt-2">
                <div className="grid grid-cols-3 w-[95%]">
                  {panelCols.map((col) => (
                    <div key={col.name} className="flex justify-start">
                      <span className="text-sky-800 px-2 font-bold">{col.label}:</span>
                      <span className="text-zinc-800">{element[col.name]}</span>
                    </div>
                  ))}
                  <div className="flex justify-start">
                    <span className="text-sky-800 px-2 font-bold">Edit:</span>
                    {children}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}