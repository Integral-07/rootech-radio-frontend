import { useEffect, useState } from "react"
import axios from "axios"
import { EpisodeBlock } from "../components/EpisodeBlock"
import { EpisodeBlockSkeleton } from "../components/EpisodeBlockSkeleton"
import { SubscribeBanner } from "../components/SubscribeBanner"
import { getTodayEpisodes, TodayEpisode } from "../lib/api"

export const Home: React.FC = () => {
  const [episodes, setEpisodes] = useState<TodayEpisode[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [notYet, setNotYet] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodayEpisodes = async () => {
      try {
        setLoading(true)
        const data = await getTodayEpisodes()
        setEpisodes(data)
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setNotYet(true)
        } else {
          console.error('Failed to fetch today episodes:', err)
          setError('エピソードの読み込みに失敗しました')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTodayEpisodes()
  }, [])

  return (
    <main className="pt-20 min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-4 md:pt-6">
        <SubscribeBanner />
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-8 md:pb-12">
        {loading && <EpisodeBlockSkeleton />}

        {!loading && notYet && (
          <div className="text-center py-8">
            <p className="text-lg text-foreground font-medium mb-2">本日の配信をお待ちください</p>
            <p className="text-sm text-muted-foreground font-mono">$ status: generating...</p>
          </div>
        )}

        {!loading && !notYet && (error || !episodes || episodes.length === 0) && (
          <div className="text-center py-8">
            <p className="text-lg text-destructive font-medium mb-2">{error || 'エピソードが見つかりません'}</p>
            <p className="text-sm text-muted-foreground font-mono">$ status: {error ? 'error' : 'not_found'}</p>
          </div>
        )}

        {!loading && !notYet && episodes && episodes.length > 0 && !error &&
          episodes.map((episode) => (
            <EpisodeBlock key={episode.id} episode={episode} />
          ))}
      </div>
    </main>
  )
}
