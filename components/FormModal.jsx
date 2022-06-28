import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "./FormInput";

export default function FormModal({ children, buttonStyle, element, dataColumns, purpose, handleSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={buttonStyle}
      >
        {purpose}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {purpose}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-2 text-sm text-gray-500">
                        {dataColumns.map((col) => (
                          <FormInput
                            name={col.name}
                            type={col.type}
                            label={col.label}
                            value={element ? element[col.name] : ''}
                            isRequired={col.required}
                          />
                        ))}
                      </div>
                      <div className="mt-4 flex flex-row justify-between">
                        <button
                          type="submit"
                          className="inline-flex mx-2 justify-center rounded-md bg-amber-200 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
                        >
                          Submit
                        </button>
                        {children}
                        <button
                          type="button"
                          className="inline-flex mx-2 justify-center rounded-md bg-amber-200 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}