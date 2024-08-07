import React, { useReducer } from 'react';
import Head from 'next/head';
import { Link as RsLink } from 'react-scroll';
import { Container } from '@/components/Container';
import BPMToMs from '@/components/producers-cheat-sheet/BPMToMs';
import TapTempo from '@/components/producers-cheat-sheet/TapTempo';
import NoteToFrequency from '@/components/producers-cheat-sheet/NoteToFrequency';
import Contact from '@/components/Contact';

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
    <>
      <Head>
        <title>Cheat Sheet | Rob Richards Mastering</title>
        <meta
          name="description"
          content="Know the details of your song. BPM to Milliseconds. Note to frequency. Tap tempo."
        />
      </Head>
      <Container nospace={true}>
        <div className="mx-auto my-10 px-0 pb-10">
          <div className="h-auto rounded-br-lg rounded-bl-lg bg-white p-0 pt-0 text-gray-900">
            <div className="relative grid grid-flow-row grid-cols-5 grid-rows-1 gap-4">
              <section className="col-span-5 p-5 pl-0 pr-0 sm:col-span-1 sm:mb-6">
                <div className="sticky top-6">
                  <ul className="inline-block w-1/2 list-inside sm:mb-8 sm:w-full">
                    <li className="font-bold">Time</li>
                    <ul className="border-l-4 pl-3 pr-6">
                      <li className="py-1">
                        {renderScrollLink('Tap Tempo', 'tap-tempo')}
                      </li>
                      <li className="pb-1">
                        {renderScrollLink('BPM to Milliseconds', 'bpm-ms')}
                      </li>
                    </ul>
                  </ul>
                  <ul className="inline-block w-1/2 list-inside align-top sm:mb-8 sm:w-full">
                    <li className="font-bold">Frequency</li>
                    <ul className="border-l-4 pl-3">
                      <li className="py-1">
                        {renderScrollLink(
                          'Note to Frequency',
                          'note-frequency'
                        )}
                      </li>
                      {/* <li className="pb-1">
                        {renderScrollLink('EQ Presets', 'eq-presets')}
                      </li> */}
                    </ul>
                  </ul>
                  <ul className="inline-block w-full list-inside align-top">
                    <li className="hidden font-bold md:block">Book</li>
                    <ul className="border-0 pl-3 md:border-l-4">
                      <li className="py-1">
                        <p className="hidden md:block">
                          {renderScrollLink('Book a Session', 'contact')}
                        </p>

                        <p className="block sm:hidden">
                          <RsLink
                            activeClass="active"
                            className="ml-auto mr-auto mt-8 block w-40 flex-none rounded-lg bg-sky-500 p-2 text-center font-semibold text-white shadow-md hover:bg-sky-600 active:bg-sky-800"
                            to={'contact'}
                            spy
                            smooth
                            offset={0}
                            duration={500}
                            saveHashHistory={false}
                          >
                            Book a Session
                          </RsLink>
                        </p>
                      </li>
                      {/* <li className="pb-1">
                        {renderScrollLink('EQ Presets', 'eq-presets')}
                      </li> */}
                    </ul>
                  </ul>
                </div>
              </section>
              <section className="col-span-5 rounded-l px-5 pb-5 shadow-lg sm:col-span-4">
                {/* <h2 className="text-4xl px-4 sm:px-6 font-bold w-full text-left">
                  Producers Cheat Sheet
                </h2> */}
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
        <hr className="b-1" />
        <Contact />
      </Container>
    </>
  );
}
