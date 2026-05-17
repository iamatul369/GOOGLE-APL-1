import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../store/feedSlice';
import { addPoints } from '../store/appSlice';
import { Camera, Image as ImageIcon, Sparkles, Send, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

const cheerSound = new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'], volume: 0.8 });

const Creator = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.app.user);
  const selectedTeam = useSelector(state => state.app.selectedTeam);
  const soundEnabled = useSelector(state => state.app.soundEnabled);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fallback for mock if camera fails (e.g. no permission or not https)
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageUrl = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(imageUrl);
      stopCamera();
    } else if (!stream) {
      // Fallback image if camera fails
      setCapturedImage('https://images.unsplash.com/photo-1511516170669-e68a3563914a?q=80&w=600&auto=format&fit=crop');
    }
  };

  const generateMeme = () => {
    setIsGenerating(true);
    // Mock Gemini Vision AI call
    setTimeout(() => {
      // Create a meme overlay using canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Add IPL Meme Overlay
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
        
        ctx.font = 'bold 30px "Outfit", sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        
        const jokes = [
          "Me watching the last over thriller 🥵",
          `When ${selectedTeam} hits a boundary! 💥`,
          "Umpire gives it wide 🤦‍♂️",
          "Waiting for the third umpire like... ⏳"
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        ctx.fillText(randomJoke, canvas.width / 2, canvas.height - 40);
        
        setGeneratedMeme(canvas.toDataURL('image/jpeg'));
        setIsGenerating(false);
      };
      img.src = capturedImage;
    }, 2000);
  };

  const shareMeme = () => {
    const newPost = {
      id: 'post_' + Date.now(),
      author: { name: user.name, avatar: user.avatar, team: selectedTeam },
      type: 'meme',
      contentUrl: generatedMeme,
      text: `Just created this using Gemini AI! Powered by ${selectedTeam} energy! 🚀`,
      reactions: {},
      timestamp: Date.now(),
    };
    
    dispatch(addPost(newPost));
    dispatch(addPoints(50)); // Big points for creating!
    
    if (soundEnabled) {
      cheerSound.play();
    }

    navigate('/feed');
  };

  const reset = () => {
    setCapturedImage(null);
    setGeneratedMeme(null);
    startCamera();
  };

  return (
    <div style={{ padding: '20px 16px', paddingBottom: '90px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Creator Studio</h2>
        <p style={{ color: 'var(--text-muted)' }}>Powered by GoogleAI ✨</p>
      </header>

      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '16px' }}>
        
        {/* Camera / Preview Area */}
        <div style={{ 
          flex: 1, 
          background: '#000', 
          borderRadius: '16px', 
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        }}>
          {!capturedImage ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              {!stream && <p style={{ position: 'absolute', color: '#fff' }}>Camera not available. Will use placeholder.</p>}
            </>
          ) : (
            <img src={generatedMeme || capturedImage} alt="Captured" referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          )}

          {isGenerating && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Sparkles size={48} color="var(--primary)" />
              </motion.div>
              <p style={{ marginTop: '16px', fontWeight: 'bold', color: '#fff' }}>Gemini Vision Analyzing...</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Finding the perfect cricket meme template</p>
            </div>
          )}
        </div>

        {/* Controls Area */}
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {!capturedImage ? (
            <button className="btn btn-primary" onClick={captureImage} style={{ width: '100%', padding: '16px' }}>
              <Camera size={24} />
              Capture Reaction
            </button>
          ) : !generatedMeme ? (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={reset} style={{ flex: 1 }}>
                <RefreshCw size={20} />
                Retake
              </button>
              <button className="btn btn-primary" onClick={generateMeme} style={{ flex: 2, background: 'linear-gradient(135deg, #4285F4, #9B72CB)' }}>
                <Sparkles size={20} />
                AI Generate Meme
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={reset} style={{ flex: 1 }}>
                <RefreshCw size={20} />
              </button>
              <button className="btn btn-primary" onClick={shareMeme} style={{ flex: 3 }}>
                <Send size={20} />
                Share to Feed (+50 Pts)
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Creator;
