import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function TapTempo({
  deafultBPM,
  defaultDuration,
  updateBPM,
  updateDuration,
}) {
  const [numTaps, getNumTaps] = useState(0);
  const [startTapTime, getStartTapTime] = useState(null);
  const [typedBPM, updateTypedBPM] = useState(deafultBPM);
  const tempoRef = useRef();
  let averageBPM;

  // Reset input when the user clicks off of the bpm input
  const resetInput = () => {
    updateDuration(0.25);
    getNumTaps(0);
    updateBPM(120);
    getStartTapTime(null);
    updateTypedBPM(120);
  };

  useEffect(() => {
    const tapToTempo = (e) => {
      // Spacebar and enter tap
      if (e.code === ('Space' || 'Enter)')) {
        updateDuration(0.25);

        if (numTaps === 0) {
          const setStartTapTime = new Date().getTime();
          getStartTapTime(setStartTapTime);
        }

        const updateTaps = numTaps + 1;
        getNumTaps(updateTaps);

        console.log('numTaps :>> ', numTaps);

        const now = new Date().getTime();
        const ms = now - startTapTime;
        const min = ms / 60000;
        averageBPM = Math.round(numTaps / min);

        updateBPM(averageBPM);
        updateTypedBPM(averageBPM);
      }

      return averageBPM;
    };

    const body = document.querySelector('body');
    if (typeof window) {
      body.onkeydown = (e) => {
        // Spacebar pressed
        if (e.code === 'Space') {
          e.preventDefault();
          tempoRef.current.blur();

          tapToTempo(e);
        }

        // Enter key pressed
        if (e.code === 'Enter') {
          updateBPM(parseInt(typedBPM, 10));
          updateDuration(0.25);
        }
      };
    }
    return () => (body.onkeydown = () => {});
  }, [
    numTaps,
    getNumTaps,
    startTapTime,
    getStartTapTime,
    typedBPM,
    updateTypedBPM,
  ]);

  const handleTempoSubmit = () => {
    getNumTaps(0);
    updateBPM(parseInt(typedBPM, 10));
    updateDuration(0.25);
  };

  const getFractionalBPM = (clickedDuration) => {
    const durations = [0.5, 0.25, 0.125];

    if (clickedDuration !== defaultDuration) {
      // Get the number of steps from the selected duration
      const clickedIndex = durations.indexOf(clickedDuration);
      const defaultIndex = durations.indexOf(defaultDuration);
      const indexDistance = clickedIndex - defaultIndex;

      switch (indexDistance) {
        case -2:
          updateDuration(defaultDuration * 4);
          updateBPM(deafultBPM * 4);
          break;
        case -1:
          updateDuration(defaultDuration * 2);
          updateBPM(deafultBPM * 2);
          break;
        case 1:
          updateDuration(defaultDuration / 2);
          updateBPM(deafultBPM / 2);
          break;
        case 2:
          updateDuration(defaultDuration / 4);
          updateBPM(deafultBPM / 4);
          break;
        default:
          return '';
      }
    }

    return true;
  };

  return (
    <div className="border-b" id="tap-tempo" name="tap-tempo">
      <div className="text-grey-700 mt-8 text-center text-4xl font-thin tracking-tight">
        Tap Tempo
      </div>
      <div className="mt-2 text-center font-sans italic text-gray-500 sm:px-20">
        Tap the spacebar to get tempo or enter it in the text box below
      </div>
      <div className="mx-auto mb-16 w-full text-center sm:px-32">
        <div className="mr-2 mb-4 mt-8 inline-block w-full align-middle text-8xl font-light">
          {deafultBPM}
          <span className="ml-1 text-lg font-bold">bpm</span>
        </div>
        <div className="my-5 inline-block w-full">
          <ul className="m-auto w-max rounded-lg border text-sm text-gray-500">
            <li className="inline-block">
              <input
                className="bpmInput w-24 rounded-tl-lg rounded-bl-lg py-2 px-4 text-center text-lg outline-none"
                maxLength={3}
                onChange={(e) =>
                  updateTypedBPM(parseInt(e.target.value, 10) || 0)
                }
                pattern="[0-9]*"
                placeholder={typedBPM}
                ref={tempoRef}
                type="text"
                value={typedBPM}
              />
            </li>
            <li className="inline-block border-l align-top">
              <button
                className="rounded-tr-lg rounded-br-lg py-3 px-4 outline-none hover:shadow-inner focus:outline-none"
                type="button"
                onClick={() => handleTempoSubmit()}
                // disabled={deafultBPM === typedBPM}
              >
                Submit
              </button>
            </li>
          </ul>
        </div>
        <ul className="m-auto w-max rounded-lg border text-sm text-gray-500">
          <li className="inline-block">
            <button
              className="inline-block rounded-tl-lg rounded-bl-lg py-2 px-4 shadow-md hover:shadow-inner focus:outline-none"
              type="button"
              onClick={resetInput}
            >
              Reset
            </button>
          </li>
          <li className="inline-block border-l border-r">
            <button
              className={`${
                defaultDuration !== 0.5
                  ? 'shadow-md'
                  : 'font-semibold text-sky-500 shadow-inner'
              } inline-block py-2 px-4 shadow-md hover:shadow-inner focus:outline-none`}
              type="button"
              onClick={() => getFractionalBPM(0.5)}
            >
              1/8
            </button>
          </li>
          <li className="inline-block border-r">
            <button
              className={`${
                defaultDuration !== 0.25
                  ? 'shadow-md'
                  : 'font-semibold text-sky-500 shadow-inner'
              } inline-block py-2 px-4 shadow-md hover:shadow-inner focus:outline-none`}
              type="button"
              onClick={() => getFractionalBPM(0.25)}
            >
              1/4
            </button>
          </li>
          <li className="inline-block">
            <button
              className={`${
                defaultDuration !== 0.125
                  ? 'shadow-md'
                  : 'font-semibold text-sky-500 shadow-inner'
              } inline-block rounded-tr-lg rounded-br-lg py-2 px-4 shadow-md hover:shadow-inner focus:outline-none `}
              type="button"
              onClick={() => getFractionalBPM(0.125)}
            >
              1/2
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

TapTempo.propTypes = {
  deafultBPM: PropTypes.number.isRequired,
  defaultDuration: PropTypes.number.isRequired,
  updateBPM: PropTypes.func.isRequired,
  updateDuration: PropTypes.func.isRequired,
};
