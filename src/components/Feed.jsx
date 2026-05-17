import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReaction, addComment, addPost } from '../store/feedSlice';
import { addPoints } from '../store/appSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { Share2, MessageCircle, Send, Sparkles, Image as ImageIcon, Type } from 'lucide-react';

const sounds = {
  '🔥': new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'], volume: 0.5 }), // cheer
  '😂': new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], volume: 0.5 }), // using pop sound instead as laugh was buggy
  '🏆': new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], volume: 0.5 }), // pop
  '💥': new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'], volume: 0.5 }), // bat hit mock
  '🏏': new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'], volume: 0.5 }), // bat hit mock
  'cheer': new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'], volume: 0.8 }),
};

const EMOJIS = ['🔥', '😂', '🏆', '💥', '🏏'];

const Feed = () => {
  const posts = useSelector((state) => state.feed.posts);
  const soundEnabled = useSelector((state) => state.app.soundEnabled);
  const user = useSelector((state) => state.app.user);
  const selectedTeam = useSelector((state) => state.app.selectedTeam);
  const dispatch = useDispatch();

  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  // Post Creator State
  const [postMode, setPostMode] = useState('ai'); // 'ai', 'text', 'upload'
  const [postText, setPostText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleReact = (postId, emoji) => {
    dispatch(addReaction({ postId, emoji }));
    dispatch(addPoints(5));
    if (soundEnabled && sounds[emoji]) sounds[emoji].play();
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;
    dispatch(addComment({ postId, user: user.name, text: commentText }));
    dispatch(addPoints(10));
    setCommentText('');
    setActiveCommentPost(null);
    showToast('Comment added! +10 Points');
  };

  const handleShare = (postId) => {
    navigator.clipboard.writeText(`Check out this meme on IPL Meme League! https://ipl-meme-league.app/post/${postId}`);
    showToast('Link copied to clipboard!');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFileUrl(url);
    }
  };

  const submitPost = () => {
    if (postMode === 'ai') {
      if (!aiPrompt.trim()) return;
      setIsGeneratingAi(true);
      
      const generatedImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt + " cricket meme funny")}?width=600&height=600&seed=${Date.now()}&nologo=true`;
      
      const img = new window.Image();
      img.referrerPolicy = "no-referrer";
      img.onload = () => {
        const newPost = {
          id: 'post_' + Date.now(),
          author: { name: user.name, avatar: user.avatar, team: selectedTeam },
          type: 'meme',
          contentUrl: generatedImageUrl,
          text: postText.trim() ? postText : `🤖 AI Generated: "${aiPrompt}" - Powered by Gemini`,
          reactions: {},
          comments: [],
          timestamp: Date.now(),
        };
        dispatch(addPost(newPost));
        finishPosting();
      };
      
      img.onerror = () => {
        const newPost = {
          id: 'post_' + Date.now(),
          author: { name: user.name, avatar: user.avatar, team: selectedTeam },
          type: 'meme',
          contentUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
          text: postText.trim() ? postText : `🤖 AI Generated: "${aiPrompt}" (Fallback)`,
          reactions: {},
          comments: [],
          timestamp: Date.now(),
        };
        dispatch(addPost(newPost));
        finishPosting();
      };
      
      img.src = generatedImageUrl;
    } else if (postMode === 'text') {
      if (!postText.trim()) return;
      const newPost = {
        id: 'post_' + Date.now(),
        author: { name: user.name, avatar: user.avatar, team: selectedTeam },
        type: 'text',
        contentUrl: null,
        text: postText,
        reactions: {},
        comments: [],
        timestamp: Date.now(),
      };
      dispatch(addPost(newPost));
      finishPosting();
    } else if (postMode === 'upload') {
      if (!selectedFileUrl) return showToast("Please select an image");
      const newPost = {
        id: 'post_' + Date.now(),
        author: { name: user.name, avatar: user.avatar, team: selectedTeam },
        type: 'meme',
        contentUrl: selectedFileUrl,
        text: postText || "My Custom IPL Meme! 🏏",
        reactions: {},
        comments: [],
        timestamp: Date.now(),
      };
      dispatch(addPost(newPost));
      finishPosting();
    }
  };

  const finishPosting = () => {
    dispatch(addPoints(50));
    if (soundEnabled) sounds['cheer'].play();
    setIsGeneratingAi(false);
    setAiPrompt('');
    setPostText('');
    setSelectedFileUrl(null);
    showToast('Post created! +50 Points');
  };

  return (
    <div style={{ padding: '20px 16px', paddingBottom: '90px' }}>
      {toastMessage && (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
          style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'var(--bg-main)', padding: '10px 20px', borderRadius: '20px', zIndex: 1000, fontWeight: 'bold' }}>
          {toastMessage}
        </motion.div>
      )}

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Live Feed</h2>
        <div style={{ background: 'var(--primary)', color: 'var(--bg-main)', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
          LIVE
        </div>
      </header>

      {/* Post Creator Area */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <button onClick={() => setPostMode('ai')} style={{ flex: 1, background: postMode === 'ai' ? 'var(--primary)' : 'transparent', color: postMode === 'ai' ? 'var(--bg-main)' : 'var(--text-main)', border: '1px solid var(--primary)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Sparkles size={16} /> AI Meme
          </button>
          <button onClick={() => setPostMode('text')} style={{ flex: 1, background: postMode === 'text' ? 'var(--primary)' : 'transparent', color: postMode === 'text' ? 'var(--bg-main)' : 'var(--text-main)', border: '1px solid var(--primary)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            <Type size={16} /> Text
          </button>
          <button onClick={() => setPostMode('upload')} style={{ flex: 1, background: postMode === 'upload' ? 'var(--primary)' : 'transparent', color: postMode === 'upload' ? 'var(--bg-main)' : 'var(--text-main)', border: '1px solid var(--primary)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            <ImageIcon size={16} /> Upload
          </button>
        </div>

        {postMode === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input type="text" placeholder="Prompt Google AI (e.g. Kohli hitting six)" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} disabled={isGeneratingAi} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }} />
            <input type="text" placeholder="Add a caption... (optional)" value={postText} onChange={(e) => setPostText(e.target.value)} disabled={isGeneratingAi} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }} />
            <button onClick={submitPost} disabled={isGeneratingAi || !aiPrompt.trim()} className="btn btn-primary" style={{ padding: '12px 16px', borderRadius: '12px', background: isGeneratingAi ? 'var(--secondary)' : '', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {isGeneratingAi ? (
                <>
                  <div className="drs-loader"></div>
                  <span>Third Umpire Reviewing DRS... 🚦</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Generate & Post
                </>
              )}
            </button>
          </div>
        )}

        {postMode === 'text' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="Share your thoughts..." value={postText} onChange={(e) => setPostText(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }} />
            <button onClick={submitPost} disabled={!postText.trim()} className="btn btn-primary" style={{ padding: '0 16px', borderRadius: '12px' }}><Send size={20} /></button>
          </div>
        )}

        {postMode === 'upload' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input type="file" accept="image/*,video/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => fileInputRef.current.click()} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px dashed var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', cursor: 'pointer' }}>
                {selectedFileUrl ? "Image Selected - Click to change" : "Tap to Select Image/Video"}
              </button>
              <button onClick={submitPost} disabled={!selectedFileUrl} className="btn btn-primary" style={{ padding: '0 16px', borderRadius: '12px' }}><Send size={20} /></button>
            </div>
            <input type="text" placeholder="Add a caption..." value={postText} onChange={(e) => setPostText(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} layout className="glass-panel" style={{ overflow: 'hidden' }}>
              
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={post.author.avatar} alt="avatar" referrerPolicy="no-referrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff' }} />
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1rem', margin: 0 }}>{post.author.name}</h4>
                  <p style={{ color: 'var(--primary)', fontSize: '0.8rem', margin: 0, fontWeight: 'bold' }}>{post.author.team} Fan</p>
                </div>
              </div>

              {post.contentUrl && (
                <div style={{ width: '100%', backgroundColor: '#000', position: 'relative' }}>
                  {post.type === 'video' ? (
                    <video src={post.contentUrl} autoPlay loop muted style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                  ) : (
                    <img 
                      src={post.contentUrl} 
                      alt="meme" 
                      referrerPolicy="no-referrer"
                      style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', background: '#222' }} 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop';
                      }}
                    />
                  )}
                </div>
              )}

              <div style={{ padding: '16px' }}>
                {post.text && (
                  <p style={{ marginBottom: '16px', fontSize: post.type === 'text' ? '1.5rem' : '1rem', lineHeight: '1.4', fontWeight: post.type === 'text' ? 'bold' : 'normal' }}>
                    {post.text}
                  </p>
                )}
                
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
                  {EMOJIS.map(emoji => (
                    <motion.button key={emoji} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleReact(post.id, emoji)} style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
                      <span style={{ fontWeight: 600 }}>{post.reactions[emoji] || 0}</span>
                    </motion.button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <button onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)} style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <MessageCircle size={20} />
                    <span>{post.comments?.length || 0} Comments</span>
                  </button>
                  <button onClick={() => handleShare(post.id)} style={{ background: 'none', border: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>

                <AnimatePresence>
                  {activeCommentPost === post.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', marginBottom: '12px' }}>
                        {post.comments?.map((c, i) => (
                          <div key={i} style={{ marginBottom: '8px' }}>
                            <span style={{ fontWeight: 'bold', marginRight: '6px', fontSize: '0.9rem' }}>{c.user}:</span>
                            <span style={{ fontSize: '0.9rem' }}>{c.text}</span>
                          </div>
                        ))}
                        {(!post.comments || post.comments.length === 0) && <p style={{ fontSize: '0.8rem', color: 'gray' }}>No comments yet. Be the first!</p>}
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="text" placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }} />
                        <button onClick={() => handleAddComment(post.id)} className="btn btn-primary" style={{ padding: '0 16px', borderRadius: '20px' }}><Send size={16} /></button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        .spin { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        .drs-loader { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Feed;
