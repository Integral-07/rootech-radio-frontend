import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { EpisodeDetail } from './pages/EpisodeDetail'
import { PodcastList } from './pages/PodcastList'
import { Trends } from './pages/Trends'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<EpisodeDetail />} />
          <Route path="/podcasts" element={<PodcastList />} />
          <Route path="/trends" element={<Trends />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
