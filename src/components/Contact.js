import React, { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import validator from 'email-validator';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const formRef = useRef(null);

  // Hold a message in state to handle the response from the API.
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [hasValidEmail, setValidEmail] = useState(false);

  const { isDirty, isValid } = formState;

  const subscribe = async (data, e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        comments: data.comments,
        email: data.email,
        honey: data.honey,
        name: data.name,
        artist: data.artist,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      setErrorMessage(error);

      return;
    }

    formRef.current.reset();
    setSuccessMessage(
      'Thanks so much and we will be in touch soon! Be sure to add rob@robrichardsmastering.com to your contact list so our email does not go to your spam folder!'
    );
  };

  const validateEmail = (e) => {
    setValidEmail(validator.validate(e.target.value));
  };

  const disableAutoComplete = (e) => {
    if (e.target.autocomplete) {
      e.target.autocomplete = 'nerp';
    }
  };

  return (
    <div className="antialiased px-6" id="contact">
      <div className="max-w-xl mx-auto pt-10 lg:py-12 md:max-w-2xl">
        <div className="lg:text-center mb-10">
          <p className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Book a Session
          </p>
          <p className="mt-4 text-lg leading-6 text-zinc-500">
            Fill out your information below and say hello! I&apos;d love to
            hear more about your project and see how I can help! If you just want to connect and/or talk shop, that's cool too! Can't wait to hear form you.
          </p>
        </div>
        {errorMessage && (
          <div className="my-3 text-red-600">{errorMessage}</div>
        )}
        {successMessage ? (
          <div className="h-96 flex content-center justify-center">
            <Transition
              className="flex items-top mt-10"
              show={successMessage !== ''}
            >
              <Transition.Child
                className="inline-block"
                enter="transition-opacity duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="inline-block w-10 h-10 mr-4">
                  <svg
                    className="text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </Transition.Child>
              <Transition.Child
                className="inline-block"
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="inline-block text-xl">{successMessage}</div>
              </Transition.Child>
            </Transition>
          </div>
        ) : (
          <form onSubmit={handleSubmit(subscribe)} ref={formRef}>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 items-start">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="block text-sm font-medium text-zinc-700">
                    Name
                    <span className="text-red-600">*</span>
                  </span>
                  <input
                    className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    id="name-input"
                    name="name"
                    onChange={() => {}}
                    onFocus={disableAutoComplete}
                    type="text"
                    {...register('name', {
                      required: true,
                    })}
                  />
                  <span className="text-red-600 text-xs">
                    {errors.name?.type === 'required' && 'Name is required'}
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="block text-sm font-medium text-zinc-700">
                    Email
                    <span className="text-red-600">*</span>
                  </span>
                  <input
                    className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    id="email-input"
                    name="email"
                    onChange={validateEmail}
                    onFocus={disableAutoComplete}
                    type="email"
                    {...register('email', { required: true })}
                  />
                  <span className="text-red-600 text-xs">
                    {errors.email?.type === 'required' && 'Email is required'}
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:col-span-2">
                <label className="block">
                  <span className="block text-sm font-medium text-zinc-700">Artist name</span>
                  <input
                    className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    id="artist-input"
                    name="artist"
                    onChange={() => {}}
                    onFocus={disableAutoComplete}
                    type="text"
                    {...register('artist')}
                  />
                </label>
              </div>
              <div className="hidden">
                <label className="block">
                  <input
                    id="honey-input"
                    name="honey"
                    onChange={() => {}}
                    onFocus={disableAutoComplete}
                    type="text"
                    {...register('honey')}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 col-span-2 gap-6">
                <label className="block">
                  <span className="block text-sm font-medium text-zinc-700">
                    Tell me about your project!
                  </span>
                  <textarea
                    className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-300 focus:ring-sky-500"
                    name="comments"
                    rows="5"
                    {...register('comments')}
                  />
                </label>
                <div className="my-5">
                  <button
                    // disabled={!isValid || !hasValidEmail}
                    type="submit"
                    className={`inline-flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 `}
                  >
                    Submit
                  </button>
                </div>
                <div className="mb-10">
                  <span className="text-red-600 text-size">*</span> ={' '}
                  <span className="text-sm">Required field</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
