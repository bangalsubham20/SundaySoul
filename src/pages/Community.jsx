import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import { FiHeart, FiMessageCircle, FiShare2, FiX, FiSend } from 'react-icons/fi';

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya Singh',
      avatar: 'https://i.pravatar.cc/48?img=1',
      content: '🏔️ Just completed the Spiti Valley trek! Amazing experience with an incredible group. The frozen landscapes and monasteries were absolutely breathtaking. #WravelCommunity #SpitivalleyTrek',
      image: 'https://images.pexels.com/photos/31307356/pexels-photo-31307356/free-photo-of-spectacular-view-of-key-monastery-in-winter.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      likes: 342,
      liked: false,
      comments: 28,
      timestamp: '2 days ago',
      location: 'Spiti Valley, HP',
    },
    {
      id: 2,
      author: 'Rahul Patel',
      avatar: 'https://i.pravatar.cc/48?img=2',
      content: '🚀 Looking for travel buddies for Ladakh in February! Solo traveler here exploring high altitude deserts and ancient monasteries. Anyone interested in an adventure? 🏕️',
      image: null,
      likes: 156,
      liked: false,
      comments: 42,
      timestamp: '1 day ago',
      location: 'Ladakh, UT',
    },
    {
      id: 3,
      author: 'Anjali Sharma',
      avatar: 'https://i.pravatar.cc/48?img=3',
      content: '🏖️ Kerala backwaters at sunrise = pure magic ✨ The houseboat experience was unforgettable. Nature, food, and incredible company!',
      image: 'https://images.pexels.com/photos/12144055/pexels-photo-12144055.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      likes: 298,
      liked: false,
      comments: 35,
      timestamp: '3 days ago',
      location: 'Kerala',
    },
  ]);

  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handlePost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: 'You',
        avatar: 'https://i.pravatar.cc/48?img=99',
        content: newPostContent,
        image: null,
        likes: 0,
        liked: false,
        comments: 0,
        timestamp: 'just now',
        location: 'World',
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  // Animated background
  const AnimatedBackground = () => (
    <>
      <motion.div className="fixed -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-transparent blur-3xl -z-10"
        animate={{ y: [0, 60, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }} />
      <motion.div className="fixed -bottom-96 -left-96 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent blur-3xl -z-10"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }} />
    </>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white pb-16 overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-12 mb-10"
        >
          <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-widest mb-2">
            🌐 Connect & Share
          </p>
          <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Travel Community
          </h1>
          <p className="text-slate-400 mt-2">Share your adventures, find travel buddies, and inspire others</p>
        </motion.div>

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-white/8 transition-all">
            <div className="flex gap-4 mb-4">
              <img
                src="https://i.pravatar.cc/48?img=99"
                alt="You"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30"
              />
              <textarea
                placeholder="Share your travel story, tips, or find travel buddies... ✈️"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                rows="4"
              />
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePost}
                disabled={!newPostContent.trim()}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiSend size={18} />
                Share Story
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
          className="space-y-6"
        >
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl hover:shadow-3xl hover:border-white/20 hover:bg-white/8 transition-all overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={post.avatar}
                      alt={post.author}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/30 cursor-pointer"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-white hover:text-purple-400 transition cursor-pointer">
                        {post.author}
                      </h3>
                      <p className="text-xs text-slate-500">{post.timestamp} • {post.location}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    className="text-slate-400 hover:text-white transition"
                  >
                    ⋮
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-200 leading-relaxed mb-4 text-base">
                    {post.content}
                  </p>

                  {post.image && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4 rounded-xl overflow-hidden border border-white/10 cursor-pointer group/img"
                    >
                      <motion.img
                        src={post.image}
                        alt="Post"
                        className="w-full h-80 object-cover group-hover/img:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Stats */}
                <div className="px-6 py-3 bg-white/5 border-t border-b border-white/10 flex justify-between text-sm text-slate-400">
                  <span className="hover:text-purple-400 transition cursor-pointer">
                    ❤️ {post.likes} likes
                  </span>
                  <span className="hover:text-blue-400 transition cursor-pointer">
                    💬 {post.comments} comments
                  </span>
                  <span className="hover:text-pink-400 transition cursor-pointer">
                    👁️ {Math.floor(post.likes * 1.5)} views
                  </span>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 flex justify-around text-slate-400">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-all px-4 py-2 rounded-lg ${
                      post.liked
                        ? 'text-red-500 bg-red-500/10'
                        : 'hover:text-red-500 hover:bg-red-500/10'
                    }`}
                  >
                    <FiHeart size={20} fill={post.liked ? 'currentColor' : 'none'} />
                    <span className="text-sm font-semibold">Like</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 hover:text-blue-400 hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all"
                  >
                    <FiMessageCircle size={20} />
                    <span className="text-sm font-semibold">Comment</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 hover:text-green-400 hover:bg-green-500/10 px-4 py-2 rounded-lg transition-all"
                  >
                    <FiShare2 size={20} />
                    <span className="text-sm font-semibold">Share</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
          >
            Load More Stories
          </motion.button>
        </motion.div>
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            >
              <div className="backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Comments</h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={() => setSelectedPost(null)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>

                {/* Post Preview */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                  <div className="flex gap-3">
                    <img
                      src={selectedPost.avatar}
                      alt={selectedPost.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{selectedPost.author}</p>
                      <p className="text-xs text-slate-400">{selectedPost.content.substring(0, 60)}...</p>
                    </div>
                  </div>
                </div>

                {/* Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                  >
                    Post
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Community;
