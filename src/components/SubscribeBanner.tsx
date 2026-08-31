import { SubscribeButton } from "./SubscribeButton"

export const SubscribeBanner: React.FC = () => {
  return (
    <div className="mb-8 md:mb-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <p className="font-bold text-foreground">毎日更新中！チャンネル登録してお見逃しなく</p>
        <p className="text-sm text-muted-foreground">Rootechの技術ラジオ、YouTubeで毎日配信中。見逃した回もチャンネルからいつでも視聴できます！</p>
      </div>
      <SubscribeButton />
    </div>
  )
}
