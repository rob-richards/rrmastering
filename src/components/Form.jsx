import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Form() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="overflow-hidden bg-white pt-16 px-4 sm:px-6 lg:px-8 lg:pt-24">
      <div className="relative mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Book a Session</h2>
          <p className="mt-4 text-lg leading-6 text-zinc-500">
            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus
            arcu.
          </p>
        </div>
        <div className="mt-12">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-zinc-700">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-zinc-700">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-zinc-700">
                Artist Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="border block w-full rounded-md border-zinc-300 py-3 px-4 shadow-sm focus:border-sky-300 focus:ring-sky-500"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
