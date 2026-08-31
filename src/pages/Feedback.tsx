import { useEffect, useState } from "react"
import { FeedbackForm } from "../components/FeedbackForm"
import { getTodayEpisodes } from "../lib/api"

export const Feedback: React.FC = () => {
  const [episodeId, setEpisodeId] = useState<string | undefined>(undefined)

  useEffect(() => {
    getTodayEpisodes()
      .then((episodes) => {
        if (episodes.length === 1) {
          setEpisodeId(episodes[0].id)
        }
      })
      .catch(() => {
        // 本日分が未生成などで取得できない場合は、エピソード紐付けなしの一般フィードバックとして扱う
      })
  }, [])

  return (
    <main className="pt-20 min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">感想・要望</h1>
          <p className="text-sm text-muted-foreground">番組への感想や、取り上げてほしい話題があればお気軽にどうぞ。</p>
        </div>
        <FeedbackForm episodeId={episodeId} />
      </div>
    </main>
  )
}
