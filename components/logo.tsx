export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8"
        aria-hidden="true"
        fill="none"
      >
        <rect width="40" height="40" rx="6" className="fill-foreground" />
        <path
          d="M11 30V10h4l10 13V10h4v20h-4L15 17v13h-4Z"
          className="fill-background"
        />
        <path d="M11 10h6l-6 8V10Z" className="fill-primary" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-foreground">Nex</span>
        <span className="text-primary">Commerce</span>
      </span>
    </div>
  )
}
