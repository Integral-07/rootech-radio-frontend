import { useEffect, useState } from "react"
import { VideoPlayer } from "../components/VideoPlayer"
import { ScriptViewer } from "../components/ScriptViewer"
import { getLatestEpisode, Episode } from "../lib/api"

export const EpisodeDetail: React.FC = () => {
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestEpisode = async () => {
      try {
        setLoading(true)
        const data = await getLatestEpisode()
        setEpisode(data)
      } catch (err) {
        console.error('Failed to fetch episode:', err)
        setError('エピソードの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestEpisode()
  }, [])

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="text-center text-muted-foreground">読み込み中...</div>
        </div>
      </main>
    )
  }

  if (error || !episode) {
    return (
      <main className="pt-20 min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="text-center text-destructive">{error || 'エピソードが見つかりません'}</div>
        </div>
      </main>
    )
  }
  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* エピソードタイトルカード */}
        <div className="mb-8 md:mb-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg shadow-primary/5 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* バッジと日時を横並び */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* 最新のポッドキャストバッジ */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold">
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                最新のポッドキャスト
              </div>

              {/* 日付 */}
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
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
                    className="text-primary"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                {new Date(episode.published_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-card-foreground">
              {episode.title}
            </h1>
          </div>
        </div>

        {/* ビデオプレイヤー */}
        <div className="mb-8 md:mb-12">
          <VideoPlayer
            videoUrl={episode.youtube_url}
            title={episode.title}
          />
        </div>

        {/* スクリプト表示 */}
        <ScriptViewer
          script={episode.script}
          topics={episode.topics}
        />
      </div>
    </main>
  )
}
