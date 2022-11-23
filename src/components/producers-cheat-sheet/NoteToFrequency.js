import React, { useState, useEffect, Fragment } from 'react';
import { allNotes, octaveRanges } from '../../data/frequency/440.js';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/24/solid';
import KeySelect from '@/components/producers-cheat-sheet/KeySelect';
import ScaleSelect from '@/components/producers-cheat-sheet/ScaleSelect';

export default function NoteToFrequency({
  updateKey,
  updateOctaveRange,
  updateScale,
  selectedKey,
  selectedScale,
}) {
  const [activeRange, getActiveRange] = useState('All Ranges');
  const [activeScale, getActiveScale] = useState(null);

  const scaleIntervals = (scale) => {
    let scaleIntervals;

    switch (scale) {
      case 'Major':
        scaleIntervals = [0, 2, 2, 1, 2, 2, 2, 1];
        break;
      case 'Natural Minor':
        scaleIntervals = [0, 2, 1, 2, 2, 1, 2, 2];
        break;
      // case 'Harmonic Minor':
      //   scaleIntervals = [0, 2, 1, 2, 2, 1, 3, 1];
      //   break;
      case 'Ionian':
        scaleIntervals = [0, 2, 2, 1, 2, 2, 2, 1];
        break;
      case 'Dorian':
        scaleIntervals = [0, 2, 1, 2, 2, 2, 1, 2];
        break;
      case 'Phrygian':
        scaleIntervals = [0, 1, 2, 2, 2, 1, 2, 2];
        break;
      case 'Lydian':
        scaleIntervals = [0, 2, 2, 2, 1, 2, 2, 1];
        break;
      case 'Mixolydian':
        scaleIntervals = [0, 2, 2, 1, 2, 2, 1, 2];
        break;
      case 'Aeolian':
        scaleIntervals = [0, 2, 1, 2, 2, 1, 2, 2];
        break;
      case 'Locrian':
        scaleIntervals = [0, 1, 2, 2, 1, 2, 2, 2];
        break;
      default:
        scaleIntervals = [];
        break;
    }

    return scaleIntervals;
  };

  const getIntervalName = (interval) => {
    switch (interval) {
      case 1:
        interval = 'Root';
        break;
      case 2:
        interval = '2nd';
        break;
      case 3:
        interval = '3rd';
        break;
      case 4:
        interval = '4th';
        break;
      case 5:
        interval = '5th';
        break;
      case 6:
        interval = '6th';
        break;
      case 7:
        interval = '7th';
        break;
    }

    return interval;
  };

  const filteredScale = (newKey, newScale) => {
    let step = 0;
    let startId = 0;
    let scale;
    const key = newKey || selectedKey;
    const notesInScale = [];
    const intervalOrder = [];
    const noteIntervals = [1, 2, 3, 4, 5, 6, 7];

    if (key === 'Show All') {
      scale = null;
    } else {
      scale = newScale || selectedScale;
    }

    const getSelectedScale = scaleIntervals(scale);

    if (getSelectedScale.length > 0) {
      key !== null &&
        allNotes.find((noteData, i) => {
          if (noteData.octave === 0 && key === noteData.note) {
            startId = i;
          }
        });

      octaveRanges.forEach((octave, i) => {
        let intervalCount = 0;

        getSelectedScale.forEach((interval, i) => {
          step = parseInt(startId) + parseInt(interval);

          if (!notesInScale.includes(allNotes[step]?.note)) {
            notesInScale.push({
              note: allNotes[step]?.note,
              interval: intervalCount,
            });
          }

          if (intervalCount > 7) {
            intervalCount = 0;
          }

          if (noteIntervals[intervalCount] !== undefined) {
            intervalOrder.push(noteIntervals[intervalCount]);
            intervalCount++;
          }

          startId = step;
        });
      });
    }

    getActiveScale(notesInScale);
  };

  const onChangeRange = (selectedRange) => {
    getActiveRange(selectedRange);
    updateOctaveRange(selectedRange);
  };

  const renderFrequencyRow = (note, i) => (
    <tr key={`${note.note}${note.octave}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text text-gray-900">{note.octave}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text text-gray-900">{note.note}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-md text-gray-900">{note.frequency}hz</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text text-gray-900">
          {selectedKey !== null && selectedKey !== 'Show All'
            ? getIntervalName(note.interval + 1)
            : '-'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text text-gray-900">{note.wavelength}cm</div>
      </td>
    </tr>
  );

  const renderFilteredData = () => {
    let filteredData = allNotes;

    if (activeRange !== 'All Ranges') {
      filteredData = filteredData.filter((note) => activeRange === note.octave);
    }

    if (activeScale?.length > 0) {
      filteredData = filteredData.filter((note) =>
        activeScale.some((activeNote) => {
          note.interval = activeNote.interval;
          return activeNote.note === note.note;
        })
      );
    }

    return filteredData.map((note, i) => renderFrequencyRow(note, i));
  };

  return (
    <div className="mb-0" id="note-frequency" name="note-frequency">
      <div className="text-4xl tracking-tight font-thin text-grey-700 text-center pt-8 mt-8">
        Note to Frequency
      </div>
      <div className="sm:px-20 text-center italic font-sans text-gray-500 mt-2 mb-12">
        This displays the frequency value of notes and scale intervals
      </div>
      <div className="w-full mt-5 mb-10 grid grid-cols-5">
        <div className="col-span-5 sm:col-span-3 mb-3 sm:mb-0">
          <div className="text-sm text-gray-600 mb-1 hidden md:inline-block">
            Select octave range to display
          </div>
          <div className="w-full sm:w-40 inline-block md:hidden">
            <div className="text-sm text-gray-600 mb-1">
              Select Octave Range:
            </div>
            <Listbox value={activeRange} onChange={onChangeRange}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm border">
                  <span className="block truncate">{activeRange}</span>
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
                    {octaveRanges.map((range) => (
                      <Listbox.Option
                        key={range}
                        className={({ active }) =>
                          `${
                            active
                              ? 'text-amber-900 bg-amber-100'
                              : 'text-gray-900'
                          } cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={range}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? 'font-medium' : 'font-normal'
                              } block truncate text-left`}
                            >
                              {range}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? 'text-amber-600' : 'text-amber-600'
                                } absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
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
          <ul className="border rounded-lg w-max text-gray-500 text-sm m-auto  hidden md:inline-block">
            {octaveRanges.map((range) => (
              <li
                className="inline-block border-l last:rounded-br-lg last:rounded-tr-lg first:rounded-bl-lg first:rounded-tl-lg overflow-hidden align-bottom"
                key={range}
              >
                <button
                  className={`${
                    activeRange !== range
                      ? 'shadow-md'
                      : 'bg-indigo-600 text-white shadow-inner'
                  } inline-block py-2 px-4 shadow-md focus:outline-none hover:shadow-inner`}
                  type="button"
                  value={range}
                  onClick={() => onChangeRange(range)}
                >
                  {range}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="inline-block m-auto col-span-5 sm:col-auto w-full mb-3 sm:mb-0">
          <KeySelect
            className="inline-block"
            updateKey={updateKey}
            filteredScale={filteredScale}
            selectedScale={selectedScale}
            updateScale={updateScale}
          />
        </div>
        <div className="inline-block m-auto col-span-5 sm:col-auto w-full mb-3 sm:mb-0">
          <ScaleSelect
            className="inline-block"
            selectedScale={selectedScale}
            updateScale={updateScale}
            filteredScale={filteredScale}
            selectedKey={selectedKey}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Octave
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Note
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Frequency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Interval
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Wavelength
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderFilteredData()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
