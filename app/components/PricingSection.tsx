import React from "react";

const PricingSection = () => {
  return (
    <>
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            Simple, Transparent Pricing 💰
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Choose the plan that works best for your family or organization
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-purple-400 transition-all">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Parent Plan
              </h3>
              <div className="text-4xl font-bold text-gray-800 mb-6">
                $9<span className="text-xl text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 3 custom channels
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>5 kid profiles
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Full parental controls
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Access to approved library
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-full hover:bg-gray-300 transition-all">
                Start Free Trial
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-800 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $29<span className="text-xl text-white opacity-80">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <span className="text-yellow-300 mr-2">✓</span>
                  Unlimited custom channels
                </li>
                <li className="flex items-center text-white">
                  <span className="text-yellow-300 mr-2">✓</span>
                  Unlimited kid profiles
                </li>
                <li className="flex items-center text-white">
                  <span className="text-yellow-300 mr-2">✓</span>
                  Advanced scheduling tools
                </li>
                <li className="flex items-center text-white">
                  <span className="text-yellow-300 mr-2">✓</span>
                  Priority content library access
                </li>
                <li className="flex items-center text-white">
                  <span className="text-yellow-300 mr-2">✓</span>
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-full hover:bg-gray-100 transition-all shadow-xl">
                Start Free Trial
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-purple-400 transition-all">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                School / Enterprise
              </h3>
              <div className="text-4xl font-bold text-gray-800 mb-6">
                $99<span className="text-xl text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Unlimited channels & screens
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Admin & teacher accounts
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Central content moderation
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated support
                </li>
              </ul>
              <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-purple-700 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
