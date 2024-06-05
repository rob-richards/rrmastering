import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import KeySelect from '@/components/producers-cheat-sheet/KeySelect';
import ScaleSelect from '@/components/producers-cheat-sheet/ScaleSelect';
import { allNotes, octaveRanges } from '../../data/frequency/440.js';

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
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text text-gray-900">{note.octave}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text text-gray-900">{note.note}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-md text-gray-900">{note.frequency}hz</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text text-gray-900">
          {selectedKey !== null && selectedKey !== 'Show All'
            ? getIntervalName(note.interval + 1)
            : '-'}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
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
      <div className="text-grey-700 mt-8 pt-8 text-center text-4xl font-thin tracking-tight">
        Note to Frequency
      </div>
      <div className="mt-2 mb-12 text-center font-sans italic text-gray-500 sm:px-20">
        This displays the frequency value of notes and scale intervals
      </div>
      <div className="mt-5 mb-10 grid w-full grid-cols-12">
        <div className="col-span-5 col-start-1 m-auto mb-3 inline-block w-full sm:mb-0 md:col-span-3 md:col-start-3">
          <KeySelect
            className="inline-block"
            updateKey={updateKey}
            filteredScale={filteredScale}
            selectedScale={selectedScale}
            updateScale={updateScale}
          />
        </div>
        <div className="col-span-5 col-start-8 m-auto mb-3 inline-block w-full sm:mb-0 md:col-span-3 md:col-start-8">
          <ScaleSelect
            className="inline-block"
            selectedScale={selectedScale}
            updateScale={updateScale}
            filteredScale={filteredScale}
            selectedKey={selectedKey}
          />
        </div>
      </div>
      <div className="mt-5 mb-10 w-full">
        <div className="col-span-5 col-start-1 m-auto mb-3 sm:col-span-3 sm:mb-0">
          <div className="m-auto mb-1 inline-block w-full text-center text-sm text-gray-600 md:block">
            Select octave range to display
          </div>
          <div className="inline-block w-full sm:w-40 md:hidden">
            <div className="mb-1 text-sm text-gray-600">
              Select Octave Range:
            </div>
            <Listbox value={activeRange} onChange={onChangeRange}>
              <div className="relative mt-1">
                <Listbox.Button className="focus-visible:ring-offset-orange-300 focus-visible:border-indigo-500 relative w-full cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
                  <span className="block truncate">{activeRange}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
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
                  <Listbox.Options className="ring-black absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                    {octaveRanges.map((range) => (
                      <Listbox.Option
                        key={range}
                        className={({ active }) =>
                          `${
                            active
                              ? 'text-amber-900 bg-amber-100'
                              : 'text-gray-900'
                          } relative cursor-default select-none py-2 pl-10 pr-4`
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
                                  className="h-5 w-5"
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
          <ul className="m-auto hidden w-max rounded-lg border text-sm text-gray-500 md:block">
            {octaveRanges.map((range) => (
              <li
                className={`inline-block overflow-hidden border-l align-bottom first:rounded-bl-lg first:rounded-tl-lg last:rounded-br-lg last:rounded-tr-lg hover:shadow-inner ${
                  activeRange !== range ? 'shadow-md' : ''
                }`}
                key={range}
              >
                <button
                  className={`${
                    activeRange !== range
                      ? 'shadow-md'
                      : 'font-semibold text-sky-500 shadow-inner'
                  } inline-block py-2 px-4 shadow-md focus:outline-none`}
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
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Octave
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Note
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Frequency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Interval
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Wavelength
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
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
