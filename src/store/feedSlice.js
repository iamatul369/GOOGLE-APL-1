import { createSlice } from '@reduxjs/toolkit';

const initialPosts = [
  {
    id: 'post_1',
    author: { name: 'Thala Fan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thala', team: 'CSK' },
    type: 'meme',
    contentUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
    text: 'When Thala hits a six in the last over! 🚁💥',
    reactions: { '🔥': 120, '😂': 5, '🏆': 40 },
    comments: [
      { id: 'c1', user: 'CSK_Blood', text: 'Thala for a reason!' }
    ],
    timestamp: Date.now() - 3600000,
  },
  {
    id: 'post_2',
    author: { name: 'King Kohli Supporter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kohli', team: 'RCB' },
    type: 'meme',
    contentUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600&auto=format&fit=crop',
    text: 'Ee Sala Cup Namde! The aggression is real! 😡🏏',
    reactions: { '🔥': 200, '😂': 50, '💥': 30 },
    comments: [],
    timestamp: Date.now() - 7200000,
  },
  {
    id: 'post_3',
    author: { name: 'Hitman Army', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit', team: 'MI' },
    type: 'meme',
    contentUrl: 'https://images.unsplash.com/photo-1511516170669-e68a3563914a?q=80&w=600&auto=format&fit=crop',
    text: 'Pull shot perfection! 💙',
    reactions: { '🏆': 150, '💥': 80 },
    comments: [],
    timestamp: Date.now() - 10800000,
  }
];

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: initialPosts,
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    addReaction: (state, action) => {
      const { postId, emoji } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (post.reactions[emoji]) {
          post.reactions[emoji]++;
        } else {
          post.reactions[emoji] = 1;
        }
      }
    },
    addComment: (state, action) => {
      const { postId, user, text } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (!post.comments) post.comments = [];
        post.comments.push({ id: 'c_' + Date.now(), user, text });
      }
    }
  },
});

export const { addPost, addReaction, addComment } = feedSlice.actions;
export default feedSlice.reducer;
