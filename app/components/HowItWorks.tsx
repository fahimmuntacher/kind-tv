import React from "react";

const HowItWorks = () => {
  return (
    <>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            How It Works 🚀
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Create Your Account
              </h3>
              <p className="text-gray-600">
                Sign up as an admin or parent. Set up your preferences and kid
                profiles in seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-400 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Build Your Channels
              </h3>
              <p className="text-gray-600">
                Add content from YouTube, Vimeo, or upload directly. Schedule
                programming with our visual timeline.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-400 to-emerald-400 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Start Watching
              </h3>
              <p className="text-gray-600">
                Launch the TV interface on any device. Kids enjoy safe,
                scheduled content while you have peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
