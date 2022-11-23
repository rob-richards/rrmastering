import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const keys = [
  { name: 'Show All' },
  { name: 'C' },
  { name: 'C#/Db' },
  { name: 'D' },
  { name: 'D#/Eb' },
  { name: 'E' },
  { name: 'F' },
  { name: 'F#/Gb' },
  { name: 'G' },
  { name: 'G#/Ab' },
  { name: 'A' },
  { name: 'A#/Bb' },
  { name: 'B' },
];

export default function KeySelect({
  filteredScale,
  selectedScale,
  updateKey,
  updateScale,
}) {
  const [selected, setSelected] = useState(keys[0]);

  const onChangeKey = (selectedKey) => {
    setSelected(selectedKey);
    updateKey(selectedKey.name);

    // Set the default scale if key is changed
    // if (selectedScale === null) {

    // }
    updateScale('Major');

    filteredScale(selectedKey.name);
  };

  return (
    <div className="w-full sm:w-40">
      <div className="text-sm text-gray-600 mb-1">Select Key:</div>
      <Listbox value={selected} onChange={onChangeKey}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {keys.map((key) => (
                <Listbox.Option
                  key={key.name}
                  className={({ active }) =>
                    `${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    } cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={key}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate text-left`}
                      >
                        {key.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

KeySelect.propTypes = {
  updateKey: PropTypes.func.isRequired,
  defaultKey: PropTypes.number,
};
