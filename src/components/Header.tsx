import { Link } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-foreground">
              Rootech Radio
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:flex items-center gap-1 font-mono tracking-tight">
              <span className="text-primary">$</span>
              <span>sudo rootech --daily</span>
              <span className="inline-block w-[0.5em] h-[1em] bg-primary/70 animate-[terminal-blink_1s_steps(1)_infinite]" />
            </p>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            to="/feedback"
            className="flex items-center gap-2 h-9 px-3 rounded-lg border-2 border-primary/30 bg-primary/10 hover:bg-primary/20 hover:border-primary transition-colors text-sm font-medium text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="hidden sm:inline">感想・要望</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
