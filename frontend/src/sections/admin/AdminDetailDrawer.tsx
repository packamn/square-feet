import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import PropertyCard from '../../components/PropertyCard'
import type { Property } from '../../types/property'

type AdminDetailDrawerProps = {
  property: Property | null
  onClose: () => void
}

export const AdminDetailDrawer = ({ property, onClose }: AdminDetailDrawerProps) => {
  return (
    <Transition.Root show={Boolean(property)} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-base font-semibold text-slate-900">Listing detail</Dialog.Title>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                    >
                      Close
                    </button>
                  </div>
                  {property ? (
                    <div className="mt-4 space-y-4 text-sm text-slate-600">
                      <PropertyCard property={property} />
                      <div>
                        <p className="font-semibold text-slate-900">Seller:</p>
                        <p className="text-xs text-slate-500">{property.sellerId}</p>
                      </div>
                      <p>{property.description}</p>
                    </div>
                  ) : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
