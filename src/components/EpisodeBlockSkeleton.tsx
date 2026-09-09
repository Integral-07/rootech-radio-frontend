export const EpisodeBlockSkeleton: React.FC = () => {
  return (
    <div className="mb-8 md:mb-16 last:mb-0 animate-pulse">
      <div className="mb-6 md:mb-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg shadow-primary/5 overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="h-7 sm:h-9 w-40 rounded-full bg-muted" />
            <div className="h-7 sm:h-8 w-32 rounded-lg bg-muted" />
            <div className="h-6 w-24 rounded-full bg-muted" />
          </div>
        </div>
        <div className="p-2 md:p-3 border-t-2 border-primary/20">
          <div className="w-full aspect-video rounded-lg bg-muted" />
        </div>
      </div>

      <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg shadow-primary/5 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-muted" />
          <div className="h-5 sm:h-6 w-28 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
