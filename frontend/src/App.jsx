import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./context/LanguageContext";
import AboutUsPage from "./pages/AboutUsPage";
import ArticlePage from "./pages/ArticlePage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <LanguageProvider>
        <div className="bg-best-neutral-dark min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-16 md:pt-20 lg:pt-24">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:slug" element={<ArticlePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<ArticlePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}
