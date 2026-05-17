import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTeam } from '../store/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import iplSoundUrl from '../assets/ipl.mp3';

const iplSound = new Howl({
  src: [iplSoundUrl],
  volume: 0.7,
});

const teams = [
  { id: 'CSK', name: 'Chennai Super Kings', color: '#F9CD05', logo: 'https://documents.iplt20.com/ipl/CSK/logos/Logooutline/CSKoutline.png' },
  { id: 'RCB', name: 'Royal Challengers Bengaluru', color: '#EC1C24', logo: 'https://documents.iplt20.com/ipl/RCB/Logos/Logooutline/RCBoutline.png' },
  { id: 'MI', name: 'Mumbai Indians', color: '#004BA0', logo: 'https://documents.iplt20.com/ipl/MI/Logos/Logooutline/MIoutline.png' },
  { id: 'KKR', name: 'Kolkata Knight Riders', color: '#3A225D', logo: 'https://documents.iplt20.com/ipl/KKR/Logos/Logooutline/KKRoutline.png' },
  { id: 'SRH', name: 'Sunrisers Hyderabad', color: '#FF822A', logo: 'https://documents.iplt20.com/ipl/SRH/Logos/Logooutline/SRHoutline.png' },
  { id: 'DC', name: 'Delhi Capitals', color: '#00008B', logo: 'https://documents.iplt20.com/ipl/DC/Logos/LogoOutline/DCoutline.png' },
  { id: 'RR', name: 'Rajasthan Royals', color: '#EA1A85', logo: 'https://documents.iplt20.com/ipl/RR/Logos/Logooutline/RRoutline.png' },
  { id: 'PBKS', name: 'Punjab Kings', color: '#ED1B24', logo: 'https://documents.iplt20.com/ipl/PBKS/Logos/Logooutline/PBKSoutline.png' },
  { id: 'GT', name: 'Gujarat Titans', color: '#0B4973', logo: 'https://documents.iplt20.com/ipl/GT/Logos/Logooutline/GToutline.png' },
  { id: 'LSG', name: 'Lucknow Super Giants', color: '#F9A436', logo: 'https://documents.iplt20.com/ipl/LSG/Logos/Logooutline/LSGoutline.png' },
];

const Onboarding = () => {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Play sound on mount
    iplSound.play();
    
    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      iplSound.stop();
    };
  }, []);

  const handleSelectTeam = (teamId) => {
    iplSound.stop();
    dispatch(setTeam(teamId));
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360] 
              }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              style={{ fontSize: '5rem', marginBottom: '20px' }}
            >
              🏏
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', textAlign: 'center', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
            >
              IPL Meme League
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div 
            key="onboarding"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}
          >
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px', textAlign: 'center' }} className="text-gradient">
              Choose Your Team
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', textAlign: 'center' }}>
              Personalize your experience with team themes!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              {teams.map((team, index) => (
                <motion.button
                  key={team.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectTeam(team.id)}
                  style={{
                    padding: '20px 10px',
                    borderRadius: '16px',
                    border: 'none',
                    background: `linear-gradient(135deg, ${team.color}dd, ${team.color})`,
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src={team.logo} 
                    alt={team.id} 
                    referrerPolicy="no-referrer"
                    style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '8px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {team.id}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
