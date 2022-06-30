import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from 'next/router';

export default function ResponseModal({ purpose, buttonStyle, pText, element, handleAuto, setContext, routing }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleYes(e) {
    e.preventDefault();
    setContext(element);
    handleAuto(element.id);
    closeModal();
    if (routing) {
      router.push(routing);
    }
  }

  function handleNo(e) {
    e.preventDefault();
    setContext(element);
    closeModal();
    if (routing) {
      router.push(routing);
    }
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
                  <p>
                    {pText}
                  </p>
                  <div className="mt-4 flex flex-row justify-between">
                    <button
                      type="button"
                      className="mx-2 rounded-md bg-amber-200 px-4 py-2 text-amber-900 hover:bg-amber-100"
                      onClick={handleYes}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="mx-2 rounded-md bg-amber-200 px-4 py-2 text-amber-900 hover:bg-amber-100"
                      onClick={handleNo}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="mx-2 rounded-md bg-amber-200 px-4 py-2 text-amber-900 hover:bg-amber-100"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
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