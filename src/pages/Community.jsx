import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiShare2, FiX, FiSend, FiImage, FiMapPin, FiMoreHorizontal } from 'react-icons/fi';

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya Singh',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: '🏔️ Just completed the Spiti Valley trek! Amazing experience with an incredible group. The frozen landscapes and monasteries were absolutely breathtaking. #TravelCommunity #SpitivalleyTrek',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop',
      likes: 342,
      liked: false,
      comments: 28,
      timestamp: '2 days ago',
      location: 'Spiti Valley, HP',
    },
    {
      id: 2,
      author: 'Rahul Patel',
      avatar: 'https://i.pravatar.cc/150?img=11',
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
      avatar: 'https://i.pravatar.cc/150?img=5',
      content: '🏖️ Kerala backwaters at sunrise = pure magic ✨ The houseboat experience was unforgettable. Nature, food, and incredible company!',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
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
        avatar: 'https://i.pravatar.cc/150?img=68',
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

  return (
    <div className="min-h-screen bg-teal-900 text-white pb-24 font-sans selection:bg-cyan-500 selection:text-teal-900">

      {/* Hero Banner */}
      <div className="relative h-[30vh] overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-teal-900 z-10" />
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
          alt="Community Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-black text-white mb-2 tracking-tight"
          >
            Community <span className="text-cyan-400">Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-grey-300 max-w-xl font-light"
          >
            Share your adventures, find travel buddies, and inspire others.
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">

        {/* Create Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-teal-800/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex gap-4 mb-4">
              <img
                src="https://i.pravatar.cc/150?img=68"
                alt="You"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/30"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Share your travel story, tips, or find travel buddies... ✈️"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-white placeholder-grey-500 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all min-h-[100px]"
                />
              </div>
            </div>
            <div className="flex justify-between items-center pl-16">
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-white/5 text-cyan-400 transition-colors">
                  <FiImage size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-white/5 text-cyan-400 transition-colors">
                  <FiMapPin size={20} />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePost}
                disabled={!newPostContent.trim()}
                className="px-6 py-2 bg-cyan-500 text-teal-900 font-bold rounded-full hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <FiSend size={16} />
                Post Story
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-teal-800/30 backdrop-blur-xl border border-white/5 rounded-3xl shadow-xl overflow-hidden hover:border-white/10 transition-all duration-300"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-teal-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight cursor-pointer hover:text-cyan-400 transition-colors">
                      {post.author}
                    </h3>
                    <p className="text-xs text-grey-400 flex items-center gap-1">
                      {post.timestamp} • <span className="text-cyan-500">{post.location}</span>
                    </p>
                  </div>
                </div>
                <button className="text-grey-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                  <FiMoreHorizontal size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-4">
                <p className="text-grey-200 leading-relaxed mb-4 text-base font-light">
                  {post.content}
                </p>

                {post.image && (
                  <div className="rounded-2xl overflow-hidden border border-white/5 cursor-pointer group/img relative">
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors z-10" />
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-auto object-cover max-h-[500px]"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500' : 'text-grey-400 hover:text-red-500'}`}
                  >
                    <FiHeart size={20} fill={post.liked ? 'currentColor' : 'none'} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 text-grey-400 hover:text-cyan-400 transition-colors"
                  >
                    <FiMessageCircle size={20} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-grey-400 hover:text-green-400 transition-colors">
                    <FiShare2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white/5 border border-white/10 text-grey-300 font-semibold rounded-full hover:bg-white/10 hover:text-white transition-all">
            Load More Stories
          </button>
        </div>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4"
            >
              <div className="bg-teal-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                  <h2 className="text-xl font-bold text-white">Comments</h2>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-grey-400 hover:text-white transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  {/* Post Preview */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6 flex gap-4">
                    <img
                      src={selectedPost.avatar}
                      alt={selectedPost.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-white text-sm">{selectedPost.author}</p>
                      <p className="text-xs text-grey-400 mt-1 line-clamp-2">{selectedPost.content}</p>
                    </div>
                  </div>

                  {/* Comments Placeholder */}
                  <div className="text-center text-grey-500 py-8">
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 bg-black/20 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder-grey-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                    <button className="px-6 py-3 bg-cyan-500 text-teal-900 font-bold rounded-full hover:bg-cyan-400 transition-all">
                      Post
                    </button>
                  </div>
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
