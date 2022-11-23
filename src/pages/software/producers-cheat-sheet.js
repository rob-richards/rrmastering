import React, { useReducer } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { Link as RsLink } from 'react-scroll';
import BPMToMs from '@/components/producers-cheat-sheet/BPMToMs';
import TapTempo from '@/components/producers-cheat-sheet/TapTempo';
import NoteToFrequency from '@/components/producers-cheat-sheet/NoteToFrequency';

const ACTIONS = {
  BPM: 'bpm',
  DURATION: 'duration',
  KEY: 'key',
  OCTAVE_RANGE: 'range',
  SCALE: 'scale',
};

const initialState = {
  bpm: 120,
  duration: 0.25,
  error: '',
  key: null,
  profileName: 'Default Profile',
  octaveRange: null,
  scale: 'Major',
};

function cheatSheetReducer(state, action) {
  switch (action.type) {
    case ACTIONS.BPM: {
      return {
        ...state,
        bpm: action.bpm,
      };
    }
    case ACTIONS.DURATION: {
      return {
        ...state,
        duration: action.duration,
      };
    }
    case ACTIONS.KEY: {
      return {
        ...state,
        key: action.key,
      };
    }
    case ACTIONS.OCTAVE_RANGE: {
      return {
        ...state,
        octaveRange: action.octaveRange,
      };
    }
    case ACTIONS.SCALE: {
      return {
        ...state,
        scale: action.scale,
      };
    }
    default:
      return state;
  }
}

export default function CheatSheet() {
  const [state, dispatch] = useReducer(cheatSheetReducer, initialState);
  const { bpm, key, scale } = state;

  const updateBPM = (newBPM) => {
    dispatch({
      type: 'bpm',
      bpm: newBPM,
    });
  };

  const updateDuration = (newDuration) => {
    dispatch({
      type: 'duration',
      duration: newDuration,
    });
  };

  const updateKey = (newKey) => {
    dispatch({
      type: 'key',
      key: newKey,
    });
  };

  const updateOctaveRange = (newRange) => {
    dispatch({
      type: 'range',
      octaveRange: newRange,
    });
  };

  const updateScale = (newScale) => {
    dispatch({
      type: 'scale',
      scale: newScale,
    });
  };

  const renderBreadcrumbArrow = (
    <svg
      className="h-5 w-5 text-gray-300"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const linkStyles =
    'text-base font-medium pt-3 hover:text-indigo-700 cursor-pointer';

  const renderScrollLink = (linkText, linkAnchor) => (
    <RsLink
      activeClass="active"
      className={linkStyles}
      to={linkAnchor}
      spy
      smooth
      offset={0}
      duration={500}
      saveHashHistory={false}
    >
      {linkText}
    </RsLink>
  );

  return (
    <div className="container mx-auto my-10 pb-10 px-0">
      <div className="bg-white rounded-br-lg rounded-bl-lg h-auto text-gray-900 p-0 pt-10">
        <div className="grid grid-flow-row grid-cols-5 grid-rows-1 gap-4 relative">
          <section className="sm:mb-6 col-span-5 sm:col-span-1 p-5 pl-0">
            <div className="sticky top-6">
              <ul className="w-1/2 sm:w-full list-inside sm:mb-8 inline-block">
                <li className="font-bold">Time</li>
                <ul className="pl-3 pr-6 border-l-4">
                  <li className="py-1">
                    {renderScrollLink('Tap Tempo', 'tap-tempo')}
                  </li>
                  <li className="pb-1">
                    {renderScrollLink('BPM to Milliseconds', 'bpm-ms')}
                  </li>
                </ul>
              </ul>
              <ul className="w-1/2 sm:w-full list-inside inline-block align-top">
                <li className="font-bold">Frequency</li>
                <ul className="pl-3 border-l-4">
                  <li className="py-1">
                    {renderScrollLink('Note to Frequency', 'note-frequency')}
                  </li>
                  {/* <li className="pb-1">
                    {renderScrollLink('EQ Presets', 'eq-presets')}
                  </li> */}
                </ul>
              </ul>
            </div>
          </section>
          <section className="col-span-5 sm:col-span-4 pb-5 shadow-lg rounded-l px-5">
            <h2 className="text-4xl px-4 sm:px-6 font-bold w-full text-left">
              Producers Cheat Sheet
            </h2>
            <TapTempo
              deafultBPM={bpm || initialState.bpm}
              defaultDuration={state.duration}
              updateBPM={updateBPM}
              updateDuration={updateDuration}
            />
            <BPMToMs bpm={bpm || initialState.bpm} />
            <NoteToFrequency
              selectedKey={key || initialState.key}
              selectedScale={scale || initialState.scale}
              updateKey={updateKey}
              updateOctaveRange={updateOctaveRange}
              updateScale={updateScale}
            />
            {/* <EQPresets defaultKey={key || initialState.key} /> */}
          </section>
        </div>
      </div>
    </div>
  );
}
