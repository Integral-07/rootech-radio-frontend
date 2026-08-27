import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface Topic {
  title: string
  content: string
}

interface ScriptViewerProps {
  script: string
  topics?: Topic[]
}

export const ScriptViewer: React.FC<ScriptViewerProps> = ({ script, topics }) => {
  return (
    <div className="space-y-8">
      {/* トピック一覧 */}
      {topics && topics.length > 0 && (
        <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg shadow-primary/5 overflow-hidden">
          <div className="border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                  <path d="M7 7h.01" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-primary">トピック</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {topics.map((topic, index) => {
                const opacity = [15, 20, 10][index % 3]
                return (
                  <div
                    key={index}
                    className="group p-5 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: `linear-gradient(to bottom right, oklch(from var(--color-primary) l c h / ${opacity}%), oklch(from var(--color-primary) l c h / 5%))`,
                      borderColor: `oklch(from var(--color-primary) l c h / ${opacity + 20}%)`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `oklch(from var(--color-primary) l c h / ${opacity + 40}%)`
                      e.currentTarget.style.boxShadow = `0 10px 25px -5px oklch(from var(--color-primary) l c h / 20%)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `oklch(from var(--color-primary) l c h / ${opacity + 20}%)`
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div
                        className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mt-0.5 transition-all duration-300"
                        style={{
                          background: `oklch(from var(--color-primary) l c h / ${opacity + 15}%)`,
                          color: 'var(--color-primary)'
                        }}
                      >
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-base leading-tight flex-1">{topic.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-9">{topic.content}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* スクリプト本文 */}
      <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg shadow-primary/5 overflow-hidden">
        <div className="border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-primary">スクリプト</h2>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="prose prose-base max-w-none">
            <div className="whitespace-pre-wrap text-card-foreground/90 leading-[1.8] text-base">
              {script}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
