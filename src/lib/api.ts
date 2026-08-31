import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const FEEDBACK_API_BASE_URL = import.meta.env.VITE_FEEDBACK_API_BASE_URL

if (!API_BASE_URL || !FEEDBACK_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL / VITE_FEEDBACK_API_BASE_URL が設定されていません(.env を確認)')
}

const api = axios.create({
  baseURL: API_BASE_URL,
})

const feedbackApi = axios.create({
  baseURL: FEEDBACK_API_BASE_URL,
})

export interface Source {
  title: string
  url: string
}

export interface TodayEpisode {
  id: string
  date: string
  day_of_week: string
  topic: string
  youtube_video_id: string
  youtube_url: string
  script: string
  sources: Source[]
  published_at: string
}

interface TodayResponse {
  episodes: TodayEpisode[]
  count: number
}

// 本日配信の全エピソードを取得(平日は1件、土曜は2件になりうる)。未配信の場合は404
export const getTodayEpisodes = async (): Promise<TodayEpisode[]> => {
  const response = await api.get<TodayResponse>('/today')
  return response.data.episodes
}

export interface FeedbackPayload {
  message: string
  name?: string
  episode_id?: string
}

interface FeedbackResponse {
  status: string
  id: string
}

// 感想・要望を送信。同一IPから60秒以内に3件を超えるとAPI側が429を返す
export const submitFeedback = async (payload: FeedbackPayload): Promise<FeedbackResponse> => {
  const response = await feedbackApi.post<FeedbackResponse>('/', payload)
  return response.data
}

export default api
