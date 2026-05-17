import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PlusSquare, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--glass-border)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        maxWidth: '480px',
        margin: '0 auto'
      }}
    >
      <NavItem to="/feed" icon={<Home size={24} />} label="Feed" />
      <NavItem to="/create" icon={<PlusSquare size={28} />} label="Create" isCenter />
      <NavItem to="/leaderboard" icon={<Trophy size={24} />} label="Rank" />
    </motion.nav>
  );
};

const NavItem = ({ to, icon, label, isCenter }) => (
  <NavLink 
    to={to} 
    style={({ isActive }) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
      transition: 'all 0.3s ease',
      transform: isCenter ? 'translateY(-15px)' : 'none',
    })}
  >
    {({ isActive }) => (
      <>
        <div style={{
          width: isCenter ? '60px' : 'auto',
          height: isCenter ? '60px' : 'auto',
          borderRadius: isCenter ? '50%' : '0',
          background: isCenter ? 'linear-gradient(135deg, var(--primary), var(--accent))' : 'transparent',
          color: isCenter ? 'var(--bg-main)' : 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isCenter ? '0 10px 20px rgba(0,0,0,0.3)' : 'none',
          marginBottom: '4px'
        }}>
          {icon}
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400, opacity: isCenter ? 0 : 1 }}>
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default Navigation;
