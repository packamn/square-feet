import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'

import PropertyCard from '../../components/PropertyCard'
import type { Property } from '../../types/property'

const panelMotion = {
  initial: { opacity: 0, x: 120 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 120 },
}

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

type AdminDetailDrawerProps = {
  property: Property | null
  onClose: () => void
}

export const AdminDetailDrawer = ({ property, onClose }: AdminDetailDrawerProps) => {
  return (
    <Transition.Root show={Boolean(property)} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child as={Fragment}>
          <motion.div
            className="fixed inset-0 bg-slate-900/40"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={overlayMotion}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10">
              <Transition.Child as={Fragment}>
                <motion.div
                  className="pointer-events-auto w-screen max-w-md bg-white/95 backdrop-blur p-6 shadow-2xl sm:rounded-l-3xl"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  variants={panelMotion}
                >
                  <div className="flex items-center justify-between gap-3">
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
                    <div className="mt-4 space-y-5 text-sm text-slate-600">
                      <PropertyCard property={property} />
                      <div className="grid gap-2 rounded-2xl bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">Seller</p>
                        <p className="text-xs text-slate-500">{property.sellerId}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-900">Description</p>
                        <p>{property.description}</p>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
