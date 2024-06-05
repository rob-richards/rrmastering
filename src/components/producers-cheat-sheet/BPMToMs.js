import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function BPMToMs({ bpm }) {
  const [durationValue, updateDurationValue] = useState('note');

  function getDurationValue(e) {
    updateDurationValue(e.target.value);
  }

  const roundDecial = (value) => parseFloat(value).toFixed(2);

  const minute = 60000;
  const minuteTriplet = 40000;
  const minuteDotted = 90000;

  const quarterMin = minute / bpm;
  const tripletMin = minuteTriplet / bpm;
  const dottedMin = minuteDotted / bpm;

  const noteData = [
    {
      note: {
        whole: roundDecial(quarterMin * 4),
        half: roundDecial(quarterMin * 2),
        quarter: roundDecial(quarterMin),
        eighth: roundDecial(quarterMin / 2),
        sixteenth: roundDecial(quarterMin / 4),
        thirtysecond: roundDecial(quarterMin / 8),
      },
      triplet: {
        whole: roundDecial(tripletMin * 4),
        half: roundDecial(tripletMin * 2),
        quarter: roundDecial(tripletMin),
        eighth: roundDecial(tripletMin / 2),
        sixteenth: roundDecial(tripletMin / 4),
        thirtysecond: roundDecial(tripletMin / 8),
      },
      dotted: {
        whole: roundDecial(dottedMin * 4),
        half: roundDecial(dottedMin * 2),
        quarter: roundDecial(dottedMin),
        eighth: roundDecial(dottedMin / 2),
        sixteenth: roundDecial(dottedMin / 4),
        thirtysecond: roundDecial(dottedMin / 8),
      },
    },
  ];

  return (
    <div className="w-full border-b" id="bpm-ms" name="bpm-ms">
      <div className="text-grey-700 mt-8 pt-8 text-center text-4xl font-thin tracking-tight">
        BPM to Milliseconds
      </div>
      <div className="mt-2 mb-12 text-center font-sans italic text-gray-500 sm:px-20">
        This displays the length of the note in the selected BPM
      </div>
      <div className="mt-5 mb-10">
        <ul className="m-auto w-max rounded-lg border text-sm text-gray-500 ">
          <li className="inline-block">
            <button
              className={`inline-block rounded-tl-lg rounded-bl-lg py-2 px-4 hover:shadow-inner focus:outline-none ${
                durationValue === 'note'
                  ? 'font-semibold text-sky-500 shadow-inner'
                  : 'shadow-md'
              }`}
              onClick={getDurationValue}
              type="button"
              value="note"
            >
              Note
            </button>
          </li>
          <li className="inline-block border-l border-r">
            <button
              className={`inline-block py-2 px-4 hover:shadow-inner focus:outline-none ${
                durationValue === 'triplet'
                  ? 'font-semibold text-sky-500 shadow-inner'
                  : 'shadow-md'
              }`}
              onClick={getDurationValue}
              type="button"
              value="triplet"
            >
              Triplet
            </button>
          </li>
          <li className="inline-block">
            <button
              className={`inline-block rounded-tr-lg rounded-br-lg py-2 px-4 hover:shadow-inner focus:outline-none ${
                durationValue === 'dotted'
                  ? 'font-semibold text-sky-500 shadow-inner'
                  : 'shadow-md'
              }`}
              onClick={getDurationValue}
              type="button"
              value="dotted"
            >
              Dotted
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col pb-20">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Whole
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Half
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Quarter
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Eighth
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Sixteenth
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Thirtysecond
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {noteData.map((note) => (
                    <tr key={note[durationValue].whole}>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="text-md text-gray-900">
                          {note[durationValue].whole}
                          ms
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="text-md text-gray-900">
                          {note[durationValue].half}
                          ms
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="text-md text-gray-900">
                          {note[durationValue].quarter}
                          ms
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="text-md text-gray-900">
                          {note[durationValue].eighth}
                          ms
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="text-md text-gray-900">
                          {note[durationValue].sixteenth}
                          ms
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="text-md text-gray-900">
                          {note[durationValue].thirtysecond}
                          ms
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BPMToMs.propTypes = {
  bpm: PropTypes.number.isRequired,
};
