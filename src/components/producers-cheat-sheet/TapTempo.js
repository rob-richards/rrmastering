import React, { useRef, useState } from 'react';
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

  const tapToTempo = (e) => {
    const code = e.keyCode || e.charCode;

    // Spacebar and enter tap
    if (code === 32) {
      updateDuration(0.25);

      if (numTaps === 0) {
        const setStartTapTime = new Date().getTime();
        getStartTapTime(setStartTapTime);
      }

      const updateTaps = numTaps + 1;
      getNumTaps(updateTaps);

      const now = new Date().getTime();
      const ms = now - startTapTime;
      const min = ms / 60000;
      averageBPM = Math.round(numTaps / min);

      updateBPM(averageBPM);
      updateTypedBPM(averageBPM);
    }

    return averageBPM;
  };

  // Reset input when the user clicks off of the bpm input
  const resetInput = () => {
    updateDuration(0.25);
    getNumTaps(0);
    updateBPM(120);
    getStartTapTime(null);
    updateTypedBPM(120);
  };

  if (process.browser) {
    const body = document.querySelector('body');
    body.onkeydown = (e) => {
      const code = e.keyCode || e.charCode;

      // Spacebar pressed
      if (code === 32) {
        if (!e.metaKey) {
          e.preventDefault();
          tempoRef.current.blur();
        }

        tapToTempo(e);
      }

      // Enter key pressed
      if (code === 13) {
        updateBPM(parseInt(typedBPM, 10));
        updateDuration(0.25);
      }
    };
  }

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
      <div className="text-4xl tracking-tight font-thin text-grey-700 text-center mt-8">
        Tap Tempo
      </div>
      <div className="sm:px-20 text-center italic font-sans text-gray-500 mt-2">
        Tap the spacebar to get tempo or enter it in the text box below
      </div>
      <div className="mx-auto w-full sm:px-32 text-center mb-16">
        <div className="font-light text-8xl inline-block mr-2 align-middle w-full mb-4 mt-8">
          {deafultBPM}
          <span className="text-lg font-bold ml-1">bpm</span>
        </div>
        <div className="inline-block w-full my-5">
          <ul className="border rounded-lg w-max text-gray-500 text-sm m-auto">
            <li className="inline-block">
              <input
                className="w-24 py-2 px-4 rounded-tl-lg rounded-bl-lg outline-none text-center text-lg"
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
                className="py-3 px-4 rounded-tr-lg rounded-br-lg outline-none focus:outline-none hover:shadow-inner"
                type="button"
                onClick={() => handleTempoSubmit()}
                // disabled={deafultBPM === typedBPM}
              >
                Submit
              </button>
            </li>
          </ul>
        </div>
        <ul className="border rounded-lg w-max text-gray-500 text-sm m-auto">
          <li className="inline-block">
            <button
              className="inline-block rounded-tl-lg rounded-bl-lg py-2 px-4 focus:outline-none shadow-md hover:shadow-inner"
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
                  : 'text-sky-500 shadow-inner font-semibold'
              } inline-block py-2 px-4 shadow-md focus:outline-none hover:shadow-inner`}
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
                  : 'text-sky-500 shadow-inner font-semibold'
              } inline-block py-2 px-4 shadow-md focus:outline-none hover:shadow-inner`}
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
                  : 'text-sky-500 shadow-inner font-semibold'
              } inline-block rounded-tr-lg rounded-br-lg py-2 px-4 shadow-md focus:outline-none hover:shadow-inner `}
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
