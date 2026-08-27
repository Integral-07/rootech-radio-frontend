import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import axios from "axios"

interface Trend {
  title: string
  url: string
  source: string
  score: number
  timestamp: string
  summary: string
  author: string
  subreddit?: string
  num_comments?: number
  tags?: string[]
  stocks_count?: number
  emoji?: string
  article_type?: string
}

interface TrendsData {
  reddit: Trend[]
  qiita: Trend[]
  zenn: Trend[]
  total_count: number
}

export const Trends = () => {
  const [trends, setTrends] = useState<TrendsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true)
        const response = await axios.get<TrendsData>('http://localhost:8000/api/trends/')
        setTrends(response.data)
      } catch (err) {
        console.error('Failed to fetch trends:', err)
        setError('トレンドの読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchTrends()
  }, [])

  if (loading) {
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

  if (error || !trends) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="pt-20 pb-12 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-destructive">{error || 'データが見つかりません'}</div>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">トレンド</h1>
            <p className="text-muted-foreground">Reddit、Qiita、Zennからの最新トレンド（合計: {trends.total_count}件）</p>
          </div>

          {/* Reddit トレンド */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">Reddit</span>
              <span className="text-sm text-muted-foreground">({trends.reddit.length}件)</span>
            </h2>
            <div className="space-y-4">
              {trends.reddit.map((trend, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <a href={trend.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {trend.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="flex gap-4 flex-wrap">
                      <span>r/{trend.subreddit}</span>
                      <span>👤 {trend.author}</span>
                      <span>⬆️ {trend.score}</span>
                      <span>💬 {trend.num_comments}</span>
                      <span>{new Date(trend.timestamp).toLocaleString('ja-JP')}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{trend.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Qiita トレンド */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">Qiita</span>
              <span className="text-sm text-muted-foreground">({trends.qiita.length}件)</span>
            </h2>
            <div className="space-y-4">
              {trends.qiita.map((trend, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <a href={trend.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {trend.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="flex gap-4 flex-wrap">
                      <span>👤 {trend.author}</span>
                      <span>❤️ {trend.score}</span>
                      <span>📚 {trend.stocks_count}</span>
                      <span>{new Date(trend.timestamp).toLocaleString('ja-JP')}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {trend.tags?.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-foreground border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{trend.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Zenn トレンド */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">Zenn</span>
              <span className="text-sm text-muted-foreground">({trends.zenn.length}件)</span>
            </h2>
            <div className="space-y-4">
              {trends.zenn.map((trend, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {trend.emoji && <span className="text-2xl">{trend.emoji}</span>}
                      <a href={trend.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {trend.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="flex gap-4 flex-wrap">
                      <span>👤 {trend.author}</span>
                      <span>❤️ {trend.score}</span>
                      <span>{new Date(trend.timestamp).toLocaleString('ja-JP')}</span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
