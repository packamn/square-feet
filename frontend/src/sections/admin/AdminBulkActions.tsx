type AdminBulkActionsProps = {
  selectedCount: number
  disabled?: boolean
  onApprove: () => void
  onReject: () => void
  onDelete: () => void
}

export const AdminBulkActions = ({ selectedCount, disabled, onApprove, onReject, onDelete }: AdminBulkActionsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">
        {selectedCount > 0 ? `${selectedCount} selected` : 'Select listings to run approvals or cleanup'}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onApprove}
          disabled={disabled}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={onReject}
          disabled={disabled}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={disabled}
          className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-400 hover:text-red-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
