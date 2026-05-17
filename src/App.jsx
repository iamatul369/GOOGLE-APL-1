import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

// We will create these components next
import Onboarding from './components/Onboarding';
import Feed from './components/Feed';
import Creator from './components/Creator';
import Leaderboard from './components/Leaderboard';
import Navigation from './components/Navigation';

function App() {
  const selectedTeam = useSelector((state) => state.app.selectedTeam);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If no team is selected, force onboarding
    if (!selectedTeam && location.pathname !== '/') {
      navigate('/');
    } else if (selectedTeam && location.pathname === '/') {
      navigate('/feed');
    }
  }, [selectedTeam, location.pathname, navigate]);

  return (
    <div className="app-container" data-theme={selectedTeam || 'Default'}>
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Onboarding />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/create" element={<Creator />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Show navigation only if team is selected and we are not on onboarding */}
      {selectedTeam && location.pathname !== '/' && <Navigation />}
    </div>
  );
}

export default App;
