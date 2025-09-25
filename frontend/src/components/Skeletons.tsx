const shimmer = 'animate-pulse bg-slate-200/70'

export const PropertyCardSkeleton = () => (
  <div className="card-surface h-full overflow-hidden">
    <div className={`h-48 w-full ${shimmer}`} />
    <div className="space-y-3 p-6">
      <div className={`h-4 w-3/4 rounded-full ${shimmer}`} />
      <div className={`h-3 w-full rounded-full ${shimmer}`} />
      <div className={`h-3 w-5/6 rounded-full ${shimmer}`} />
      <div className="flex gap-2">
        <div className={`h-6 w-20 rounded-full ${shimmer}`} />
        <div className={`h-6 w-16 rounded-full ${shimmer}`} />
      </div>
    </div>
  </div>
)

export const TableRowSkeleton = () => (
  <div className="grid grid-cols-6 gap-4 border-b border-slate-100 px-4 py-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className={`h-3 w-full rounded-full ${shimmer}`} />
    ))}
  </div>
)

export const ModalSkeleton = () => (
  <div className="space-y-4">
    <div className={`h-5 w-1/3 rounded-full ${shimmer}`} />
    <div className={`h-3 w-full rounded-full ${shimmer}`} />
    <div className={`h-3 w-5/6 rounded-full ${shimmer}`} />
    <div className={`h-3 w-2/3 rounded-full ${shimmer}`} />
  </div>
)
