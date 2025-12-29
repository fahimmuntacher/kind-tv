import React from "react";

const ForParents = () => {
  return (
    <>
      {/* For Parents Section  */}
      <section id="for-parents" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-pink-200 text-pink-800 px-4 py-2 rounded-full text-sm font-semibold">
              FOR PARENTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6 mb-4">
              Your Personal Control Center 👨‍👩‍👧‍👦
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Create custom channels, manage viewing time, and curate the
              perfect content for your children
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="feature-card bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🎪</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Custom Channels
              </h3>
              <p className="text-gray-700">
                Build personalized channels from the approved content library
                tailored to your child's interests and age.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 shadow-lg">
              <div className="text-5xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Playlist Magic
              </h3>
              <p className="text-gray-700">
                Create dynamic playlists with shuffle play. Mix educational
                content with entertainment perfectly.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-lg">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Time Limits
              </h3>
              <p className="text-gray-700">
                Set healthy viewing time limits and schedules. Automatic
                reminders help maintain balance.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Complete Parental Control Suite
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-2xl mr-3">👶</span>
                    <span>
                      Manage multiple kid profiles with individual settings
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3">🔐</span>
                    <span>PIN protection for content access and settings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3">✔️</span>
                    <span>Approve or reject content from the library</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    <span>Track viewing history and preferences</span>
                  </li>
                </ul>
              </div>
              <div className="bg-linear-to-bl from-purple-400 via-purple-600 to-purple-800 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-6xl mb-4 text-center">🛡️</div>
                <p className="text-center text-lg">
                  Rest easy knowing your children are watching safe,
                  age-appropriate content you've personally approved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForParents;
