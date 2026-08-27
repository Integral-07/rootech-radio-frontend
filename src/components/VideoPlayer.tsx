import { Card } from "./ui/card"

interface VideoPlayerProps {
  videoUrl: string
  title?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  // YouTube URLからビデオIDを抽出
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : null
  }

  const videoId = getYouTubeId(videoUrl)

  if (!videoId) {
    return (
      <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">動画を読み込めませんでした</p>
      </div>
    )
  }

  return (
    <div className="w-full group">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background p-1 shadow-2xl shadow-primary/10 transition-all duration-300 hover:border-primary/60 hover:shadow-primary/30">
        <div className="w-full h-full rounded-lg overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
