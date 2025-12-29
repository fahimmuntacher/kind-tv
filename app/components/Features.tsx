import React from "react";

const Features = () => {
  return (
    <>
      {" "}
      {/* Key Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            Everything You Need in One Place ✨
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Powerful tools for administrators and parents to create the perfect
            viewing environment
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">📺</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Scheduled Channels
              </h3>
              <p className="text-gray-600">
                Create 24/7 broadcasts or specific hour programming with
                timezone support. Set it and forget it!
              </p>
            </div>

            <div className="feature-card bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Safe Content
              </h3>
              <p className="text-gray-600">
                Hand-picked videos from YouTube, Vimeo, and direct uploads with
                content moderation workflow.
              </p>
            </div>

            <div className="feature-card bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Parental Controls
              </h3>
              <p className="text-gray-600">
                PIN locks, viewing time limits, and kid profile management for
                complete peace of mind.
              </p>
            </div>

            <div className="feature-card bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Custom Playlists
              </h3>
              <p className="text-gray-600">
                Build personalized channels from approved content library with
                shuffle play support.
              </p>
            </div>

            <div className="feature-card bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Visual Scheduler
              </h3>
              <p className="text-gray-600">
                Drag-and-drop timeline interface with calendar view and
                recurring schedule support.
              </p>
            </div>

            <div className="feature-card bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                All Devices
              </h3>
              <p className="text-gray-600">
                Responsive design optimized for TVs, tablets, and mobile
                devices. Watch anywhere!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
