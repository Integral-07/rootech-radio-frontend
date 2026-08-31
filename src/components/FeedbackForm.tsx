import { useState, FormEvent } from "react"
import axios from "axios"
import { submitFeedback } from "../lib/api"

interface FeedbackFormProps {
  episodeId?: string
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ episodeId }) => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim() || submitting) return

    setSubmitting(true)
    setError(null)
    try {
      await submitFeedback({
        message: message.trim(),
        name: name.trim() || undefined,
        episode_id: episodeId,
      })
      setSent(true)
      setMessage("")
      setName("")
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 429) {
        setError("短時間に投稿しすぎです。少し時間をおいてから送ってください。")
      } else if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError("送信に失敗しました。時間をおいて再度お試しください。")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-primary">感想・要望</h2>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {sent ? (
          <div className="text-center py-4">
            <p className="text-foreground font-medium mb-1">送信ありがとうございました！</p>
            <p className="text-sm text-muted-foreground">須藤が確認します。</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-primary hover:underline underline-offset-2"
            >
              もう一件送る
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="feedback-message" className="block text-sm font-medium text-foreground mb-2">
                感想・要望
              </label>
              <textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="番組の感想や、こんな話題を取り上げてほしい、などお気軽にどうぞ"
                className="w-full rounded-lg border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-y"
              />
            </div>

            <div>
              <label htmlFor="feedback-name" className="block text-sm font-medium text-foreground mb-2">
                お名前(任意)
              </label>
              <input
                id="feedback-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名無しさん"
                className="w-full rounded-lg border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting || !message.trim()}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "送信中..." : "送信する"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
