import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const scales = [
  { name: 'Major' },
  { name: 'Natural Minor' },
  // { name: 'Harmoinc Minor' },
  { name: 'Ionian' },
  { name: 'Dorian' },
  { name: 'Phrygian' },
  { name: 'Lydian' },
  { name: 'Mixolydian' },
  { name: 'Aeolian' },
  { name: 'Locrian' },
];

export default function ScaleSelect({
  defaultKey,
  updateScale,
  filteredScale,
  selectedKey,
}) {
  const [selectedScale, setSelectedScale] = useState(scales[0]);
  const isDisabled = selectedKey === null || selectedKey === 'Show All';

  useEffect(() => {
    if (isDisabled) {
      setSelectedScale(scales[0]);
    }
  });

  const onChangeScale = (selectedScale) => {
    setSelectedScale(selectedScale);
    updateScale(selectedScale.name);
    filteredScale(selectedKey, selectedScale.name);
  };

  return (
    <div className="w-full sm:w-40">
      <div className="text-sm text-gray-600 mb-1">Select Scale:</div>
      <Listbox
        disabled={isDisabled}
        value={selectedScale.name || selectedScale}
        onChange={onChangeScale}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border disabled:opacity-50">
            <span className="block truncate">{selectedScale.name}</span>
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
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
              {scales.map((scale) => (
                <Listbox.Option
                  key={scale.name}
                  className={({ active }) =>
                    `${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    } cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={scale}
                >
                  {({ selectedScale, active }) => (
                    <>
                      <span
                        className={`${
                          selectedScale ? 'font-medium' : 'font-normal'
                        } block truncate text-left`}
                      >
                        {scale.name}
                      </span>
                      {selectedScale ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          } absolute inset-y-0 left-0 flex items-center pl-1`}
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

ScaleSelect.propTypes = {
  updateScale: PropTypes.func.isRequired,
  defaultScale: PropTypes.number,
};
