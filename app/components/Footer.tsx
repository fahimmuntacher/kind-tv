import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-3xl">🌈</span>
              <span className="ml-2 text-2xl font-bold text-white">
                Kind Children
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Safe, scheduled, and child-friendly TV experiences designed for
              modern families.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Parents */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Parents</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#for-parents" className="hover:text-white">
                  Parental Controls
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Screen Time Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          © 2025 Kind Children. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
