import { useEffect, useRef } from "react"

declare global {
  interface Window {
    gapi?: {
      ytsubscribe?: {
        go: (container?: HTMLElement) => void
      }
    }
  }
}

const CHANNEL_ID = "UCyjTSKLiCrw8kmd3kBVCiBQ"
const PLATFORM_JS_SRC = "https://apis.google.com/js/platform.js"

export const SubscribeButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // SPAではDOM挿入時にはウィジェットのdivがまだ存在しないことがあるため、
    // divを描画した後にスクリプトを読み込む(または既存スクリプトに再スキャンさせる)
    if (window.gapi?.ytsubscribe) {
      window.gapi.ytsubscribe.go(containerRef.current ?? undefined)
      return
    }

    if (document.querySelector(`script[src="${PLATFORM_JS_SRC}"]`)) {
      return
    }

    const script = document.createElement("script")
    script.src = PLATFORM_JS_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div ref={containerRef} className="flex items-center">
      <div
        className="g-ytsubscribe"
        data-channelid={CHANNEL_ID}
        data-layout="full"
        data-count="default"
      />
    </div>
  )
}
