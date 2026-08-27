import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Topic {
  id: number
  title: string
  content: string
  order: number
}

export interface Episode {
  id: number
  title: string
  youtube_url: string
  published_at: string
  script: string
  topics: Topic[]
  created_at: string
  updated_at: string
}

export interface EpisodeListItem {
  id: number
  title: string
  youtube_url: string
  published_at: string
  topics: string[]
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// 最新のエピソードを取得
export const getLatestEpisode = async (): Promise<Episode> => {
  const response = await api.get<Episode>('/episodes/latest/')
  return response.data
}

// エピソード一覧を取得（ページネーション付き）
export const getEpisodes = async (page: number = 1): Promise<PaginatedResponse<EpisodeListItem>> => {
  const response = await api.get<PaginatedResponse<EpisodeListItem>>(`/episodes/?page=${page}`)
  return response.data
}

// エピソード詳細を取得
export const getEpisode = async (id: number): Promise<Episode> => {
  const response = await api.get<Episode>(`/episodes/${id}/`)
  return response.data
}

export default api
