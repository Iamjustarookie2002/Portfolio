import { useState, useEffect } from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import Journey from './components/Journey';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import KnowMeMore from './components/KnowMeMore';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState<'intro' | 'journey'>('intro');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cameFromJourney, setCameFromJourney] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJourneyClick = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentSection('journey');
      setCameFromJourney(false);
      setFading(false);
    }, 500); // match CSS transition duration
  };

  const handleGoBackToIntro = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentSection('intro');
      setCameFromJourney(true);
      setFading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header currentSection={currentSection === 'intro' ? 'anime' : 'journey'} />
      <div className="section-switcher">
        <div className={`section-fade${currentSection === 'intro' && !fading ? '' : ' hide'}`}>
          <Intro fromJourney={cameFromJourney} onJourneyClick={handleJourneyClick} />
        </div>
        <div className={`section-fade${currentSection === 'journey' && !fading ? '' : ' hide'}`}>
          <Journey onGoBack={handleGoBackToIntro} />
        </div>
      </div>
      <About />
      <Projects />
      <Skills />
      <KnowMeMore />
      <Contact />
      <Footer />
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[var(--primary)] text-[var(--text-main)] shadow-lg hover:bg-[var(--hover-btn)] transition-colors duration-200"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default App;