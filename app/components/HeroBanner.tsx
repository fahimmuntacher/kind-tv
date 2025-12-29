import React from "react";

const HeroBanner = () => {
  return (
    <>
      {/* Hero Section */}
    <section
      className="gradient-bg min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden mt-16"
    >
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-30 bubble"
      ></div>
      <div
        className="absolute bottom-40 right-20 w-32 h-32 bg-pink-300 rounded-full opacity-20 bubble"
        // style="animation-delay: 2s"
      ></div>
      <div
        className="absolute top-40 right-40 w-16 h-16 bg-purple-300 rounded-full opacity-25 bubble"
        // style="animation-delay: 4s"
      ></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
        >
          Safe TV for Happy Kids 🌈
        </h1>
        <p
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow"
        >
          Create scheduled, child-friendly video channels with complete parental
          control. Like traditional TV, but safer and smarter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-lg px-10 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Free Trial 🚀
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-purple-600 font-bold text-lg px-10 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Watch Demo 📺
          </button>
        </div>

    {/* Mockup placeholder */}
        <div
          className="mt-16 bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto"
        >
          <div
            className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl h-64 md:h-96 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="text-center text-white relative z-10">
              <svg
                className="w-24 h-24 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                />
              </svg>
              <p className="text-2xl font-bold">TV Interface Preview</p>
              <p className="text-sm mt-2 opacity-90">
                Full-screen, kid-friendly viewing experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroBanner;
