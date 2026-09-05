import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Feedback } from './pages/Feedback'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

// 過去回一覧(/podcasts)とトレンド(/trends)は取説記載の通り今回のスコープ外。
// 旧バックエンド(localhost:8000)前提のまま残っており、新APIへの移行は別途対応する。

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
