import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { supabase } from "../pages/api/supabaseClient";
import FormInput from "./FormInput";
import ListBoxInputs from "./ListBoxInputs";

export default function InterviewModal({ children, buttonStyle, element, dataColumns, handleSubmit, setter, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ? true : false);
  const [companies, setCompanies] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [appliedDates, setAppliedDates] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [selectedAppliedDate, setSelectedAppliedDate] = useState('');

  useEffect(() => {
    retrieveCompanies();
  }, []);

  useEffect(() => {
    if (selectedAppliedDate !== '') {
      setter(selectedAppliedDate.job_id);
    }
  }, [selectedAppliedDate]);

  async function retrieveCompanies() {
    const { data, error } = await supabase.rpc('user_companies');
    if (error) {
      alert(`Error: ${error["message"]}`)
    }
    setCompanies(data);
  }

  useEffect(() => {
    retrieveJobTitles();
  }, [selectedCompany]);

  async function retrieveJobTitles() {
    if (selectedCompany !== '') {
      const { data, error } = await supabase.rpc('company_job_titles', { company_name: selectedCompany.company });
      if (error) {
        alert(`Error: ${error["message"]}`)
      }
      setJobTitles(data);
    }
  }

  async function retrieveAppliedDates() {
    if (selectedCompany !== '' && selectedJobTitle !== '') {
      const { data, error } = await supabase
        .rpc('company_applied_dates', { company_name: selectedCompany.company, company_job_title: selectedJobTitle.job_title });
      if (error) {
        alert(`Error: ${error["message"]}`)
      }
      setAppliedDates(data);
    }
  }

  useEffect(() => {
    retrieveAppliedDates();
  }, [selectedCompany, selectedJobTitle]);

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
        Add New Interview
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Interview
                  </Dialog.Title>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col justify-between h-[300px]"
                    >
                      <div>
                        <div className="grid grid-cols-4 text-sm text-gray-500">
                          <ListBoxInputs
                            listOptions={companies}
                            optionTitle="company"
                            selected={selectedCompany}
                            setSelected={setSelectedCompany}
                            label="Company (required)"
                          />
                          <ListBoxInputs
                            listOptions={jobTitles}
                            optionTitle="job_title"
                            selected={selectedJobTitle}
                            setSelected={setSelectedJobTitle}
                            label="Job Title (required)"
                          />
                          <ListBoxInputs
                            listOptions={appliedDates}
                            optionTitle="applied_at"
                            selected={selectedAppliedDate}
                            setSelected={setSelectedAppliedDate}
                            label="Applied Date (required)"
                          />
                          {dataColumns.filter((col) => !col.noEdit).map((col) => (
                            <FormInput
                              key={col.name}
                              name={col.name}
                              type={col.type}
                              label={col.label}
                              value={element ? (
                                element[col.name] !== null || undefined ? (
                                  element[col.name]
                                ) : (
                                  '' 
                                )
                              ) : (
                                ''
                              )}
                              isRequired={col.required}
                            />
                          ))}
                        </div>
                      </div>  
                      <div className="mt-4 flex flex-row justify-between">
                        <button
                          type="submit"
                          className="mx-2 rounded-md bg-amber-200 px-4 py-2 text-amber-900 hover:bg-amber-100"
                          onClick={closeModal}
                        >
                          Submit
                        </button>
                        {children}
                        <button
                          type="button"
                          className="mx-2 rounded-md bg-amber-200 px-4 py-2 text-amber-900 hover:bg-amber-100"
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