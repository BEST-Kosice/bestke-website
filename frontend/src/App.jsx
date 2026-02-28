import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import NewsPage from './pages/NewsPage'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="bg-best-neutral-dark min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20 lg:pt-24">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<ArticlePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  )
}
