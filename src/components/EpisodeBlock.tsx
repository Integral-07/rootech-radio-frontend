import { VideoPlayer } from "./VideoPlayer"
import { ScriptViewer } from "./ScriptViewer"
import { Sources } from "./Sources"
import { TodayEpisode } from "../lib/api"

interface EpisodeBlockProps {
  episode: TodayEpisode
}

export const EpisodeBlock: React.FC<EpisodeBlockProps> = ({ episode }) => {
  return (
    <div className="mb-8 md:mb-16 last:mb-0">
      {/* エピソード情報カード + ビデオプレイヤー */}
      <div className="mb-6 md:mb-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card shadow-lg shadow-primary/5 overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-4 sm:h-4"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              本日のポッドキャスト
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary font-medium">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary sm:w-4 sm:h-4"
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

            <span className="text-xs px-2.5 py-1 sm:px-3 rounded-full bg-primary/10 text-foreground border border-primary/20">
              {episode.topic}
            </span>
          </div>
        </div>

        <VideoPlayer
          videoUrl={episode.youtube_url}
          title={`Rootech Radio - ${episode.topic}`}
        />
      </div>

      {/* スクリプト表示 */}
      <ScriptViewer script={episode.script} />

      {/* 参考文献 */}
      <Sources sources={episode.sources} />
    </div>
  )
}
