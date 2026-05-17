import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Trophy, Medal, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import leaderboardMusicUrl from '../assets/YTDown_Shorts_IPL-Slowmotion-bgm-IPL-Emotional-bgm-Shr_Media_fTecnRHRx8A_008_128k.mp3';

const Leaderboard = () => {
  const currentUser = useSelector(state => state.app.user);
  const selectedTeam = useSelector(state => state.app.selectedTeam);
  const soundEnabled = useSelector(state => state.app.soundEnabled);

  useEffect(() => {
    let leaderboardSound = null;
    if (soundEnabled) {
      leaderboardSound = new Howl({
        src: [leaderboardMusicUrl],
        volume: 0.4,
        loop: true,
        html5: true,
      });
      leaderboardSound.play();
    }
    
    return () => {
      if (leaderboardSound) {
        leaderboardSound.stop();
        leaderboardSound.unload();
      }
    };
  }, [soundEnabled]);

  const [showConfetti, setShowConfetti] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000); // Show confetti for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Mock leaderboard data mixed with current user
  const mockUsers = [
    { id: 'user_1', name: 'Mahi_07', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mahi', team: 'CSK', points: 2540 },
    { id: 'user_2', name: 'Virat_Fan_18', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=virat', team: 'RCB', points: 2310 },
    { id: 'user_3', name: 'Hitman_45', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit', team: 'MI', points: 1950 },
    { id: 'user_4', name: 'Russell_Muscle', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=russell', team: 'KKR', points: 1820 },
    { id: 'user_5', name: 'Gill_Prince', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gill', team: 'GT', points: 1600 },
    { ...currentUser, team: selectedTeam } // Inject current user
  ];

  // Sort by points descending
  const leaderboard = [...mockUsers].sort((a, b) => b.points - a.points);

  const getRankStyle = (index) => {
    switch(index) {
      case 0: return { color: '#FFD700', bg: 'rgba(255, 215, 0, 0.1)', icon: <Trophy size={20} color="#FFD700" /> };
      case 1: return { color: '#C0C0C0', bg: 'rgba(192, 192, 192, 0.1)', icon: <Medal size={20} color="#C0C0C0" /> };
      case 2: return { color: '#CD7F32', bg: 'rgba(205, 127, 50, 0.1)', icon: <Medal size={20} color="#CD7F32" /> };
      default: return { color: 'var(--text-muted)', bg: 'transparent', icon: <span style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>{index + 1}</span> };
    }
  };

  return (
    <div style={{ padding: '20px 16px', paddingBottom: '90px' }}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />}
      <header style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Leaderboard</h2>
        <Flame color="var(--primary)" size={28} />
      </header>

      <div className="glass-panel" style={{ padding: '8px' }}>
        {leaderboard.map((user, index) => {
          const rankStyle = getRankStyle(index);
          const isCurrentUser = user.id === currentUser.id;

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                marginBottom: '8px',
                borderRadius: '16px',
                background: isCurrentUser ? 'linear-gradient(90deg, var(--glass-bg), rgba(255,255,255,0.05))' : rankStyle.bg,
                border: isCurrentUser ? '1px solid var(--primary)' : '1px solid transparent',
              }}
            >
              <div style={{ width: '30px', display: 'flex', justifyContent: 'center', marginRight: '12px' }}>
                {rankStyle.icon}
              </div>
              
              <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', marginRight: '16px' }} />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontWeight: isCurrentUser ? 800 : 600, color: isCurrentUser ? 'var(--primary)' : 'var(--text-main)' }}>
                  {user.name} {isCurrentUser && '(You)'}
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.team} Fan</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: isCurrentUser ? 'var(--primary)' : 'var(--text-main)' }}>
                  {user.points.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PTS</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
