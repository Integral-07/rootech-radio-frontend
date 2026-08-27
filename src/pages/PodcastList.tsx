import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { getEpisodes, EpisodeListItem } from "../lib/api"

export const PodcastList = () => {
  const [episodes, setEpisodes] = useState<EpisodeListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true)
        const data = await getEpisodes(currentPage)
        setEpisodes(data.results)
        setTotalCount(data.count)
      } catch (err) {
        console.error('Failed to fetch episodes:', err)
        setError('エピソードの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / 6)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getYouTubeThumbnail = (url: string): string => {
    const videoId = url.split('v=')[1]?.split('&')[0] || 'default'
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  if (loading && episodes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="pt-20 pb-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-muted-foreground">読み込み中...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="pt-20 pb-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-destructive">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="pt-20 pb-12 px-4">
        <div className="mx-auto max-w-6xl">
          {/* ページタイトル */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">過去のポッドキャスト</h1>
            <p className="text-muted-foreground">これまでに配信されたエピソード一覧</p>
          </div>

          {/* ポッドキャストリスト */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <Card
                key={episode.id}
                className="overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group"
              >
                {/* サムネイル */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={getYouTubeThumbnail(episode.youtube_url)}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader>
                  <CardDescription className="text-xs">
                    {new Date(episode.published_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {episode.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {episode.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-foreground border border-primary/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              {/* 前へボタン */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border-2 border-primary/30 bg-primary/10 hover:bg-primary/20 hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-foreground font-medium"
              >
                前へ
              </button>

              {/* ページ番号 */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg border-2 font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-primary/30 bg-primary/10 hover:bg-primary/20 hover:border-primary text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* 次へボタン */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border-2 border-primary/30 bg-primary/10 hover:bg-primary/20 hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-foreground font-medium"
              >
                次へ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 以下のモックデータは削除
