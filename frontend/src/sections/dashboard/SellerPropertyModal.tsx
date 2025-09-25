import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

import type { Property } from '../../types/property'

export type SellerPropertyModalProps = {
  isOpen: boolean
  property?: Property | null
  onClose: () => void
  children: ReactNode
}

export const SellerPropertyModal = ({ isOpen, property, onClose, children }: SellerPropertyModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Transition appear show={isOpen} as={Dialog} static onClose={onClose} className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl"
              >
                <Dialog.Title className="text-lg font-semibold text-slate-900">
                  {property ? 'Edit listing' : 'New property'}
                </Dialog.Title>
                <p className="mt-2 text-sm text-slate-500">
                  {property
                    ? 'Update details and set the appropriate status before publishing.'
                    : 'Fill out the form to create a new listing.'}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-6 top-6 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                  Close
                </button>

                <div className="mt-6 space-y-4 text-sm text-slate-600">{children}</div>
              </Transition.Child>
            </div>
          </div>
        </Transition>
      )}
    </AnimatePresence>
  )
}
