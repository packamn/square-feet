import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import PropertyCard from '../../components/PropertyCard'
import type { Property } from '../../types/property'
import { apiFetch } from '../../utils/api'

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
  onRefresh?: () => void
}

export const AdminDetailDrawer = ({ property, onClose, onRefresh }: AdminDetailDrawerProps) => {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  const handleApprove = async () => {
    if (!property) return

    setIsApproving(true)

    try {
      await apiFetch(`/properties/${property.propertyId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'approved' }),
      })

      toast.success(`${property.title} approved successfully!`)
      onClose()

      if (onRefresh) {
        onRefresh()
      }
    } catch (error) {
      console.error('Failed to approve property:', error)
      toast.error('Failed to approve property. Please try again.')
    } finally {
      setIsApproving(false)
    }
  }

  const handleRejectClick = () => {
    setShowRejectModal(true)
  }

  const handleRejectConfirm = async () => {
    if (!property) return

    setIsRejecting(true)

    try {
      await apiFetch(`/properties/${property.propertyId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: 'rejected',
          rejectionReason: rejectionReason || 'No reason provided',
        }),
      })

      toast.success(`${property.title} rejected.`)
      setShowRejectModal(false)
      setRejectionReason('')
      onClose()

      if (onRefresh) {
        onRefresh()
      }
    } catch (error) {
      console.error('Failed to reject property:', error)
      toast.error('Failed to reject property. Please try again.')
    } finally {
      setIsRejecting(false)
    }
  }

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

                      {/* Action buttons based on current status */}
                      {property.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleApprove}
                            disabled={isApproving}
                            className="flex-1 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
                          >
                            {isApproving ? 'Approving...' : 'Approve'}
                          </button>
                          <button
                            onClick={handleRejectClick}
                            disabled={isRejecting}
                            className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:text-slate-400"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {property.status === 'rejected' && (
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleApprove}
                            disabled={isApproving}
                            className="flex-1 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
                          >
                            {isApproving ? 'Approving...' : 'Reconsider & Approve'}
                          </button>
                        </div>
                      )}

                      {property.status === 'approved' && (
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleRejectClick}
                            disabled={isRejecting}
                            className="flex-1 rounded-full border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-slate-400"
                          >
                            Revoke Approval
                          </button>
                        </div>
                      )}

                      {property.status === 'rejected' && property.rejectionReason && (
                        <div className="rounded-2xl bg-red-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Rejection Reason</p>
                          <p className="mt-1 text-sm text-red-700">{property.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Rejection Reason Modal */}
                  {showRejectModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-slate-900">Reject Listing</h3>
                        <p className="mt-2 text-sm text-slate-600">
                          Provide a reason for rejection (optional):
                        </p>
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          rows={3}
                          placeholder="e.g., Incomplete documentation, pricing issues, etc."
                          className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                        />
                        <div className="mt-4 flex justify-end gap-2">
                          <button
                            onClick={() => setShowRejectModal(false)}
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleRejectConfirm}
                            disabled={isRejecting}
                            className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:bg-red-300"
                          >
                            {isRejecting ? 'Rejecting...' : 'Reject'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
