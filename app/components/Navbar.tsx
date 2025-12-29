"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl">🌈</span>
            <span className="ml-1 text-2xl font-bold text-gray-800">
              Kind Children
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="nav-link text-gray-600 hover:text-purple-600 font-medium"
            >
              Features
            </a>
            <a
              href="#for-parents"
              className="nav-link text-gray-600 hover:text-purple-600 font-medium"
            >
              For Parents
            </a>
            <a
              href="#how-it-works"
              className="nav-link text-gray-600 hover:text-purple-600 font-medium"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="nav-link text-gray-600 hover:text-purple-600 font-medium"
            >
              Pricing
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="text-purple-600 font-semibold px-6 py-2 rounded-full hover:bg-purple-50 transition-all">
              Sign In
            </button>
            <button className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-purple-700 transition-all shadow-lg">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 pb-4">
            <a
              href="#features"
              className="block py-2 text-gray-600 hover:text-purple-600"
            >
              Features
            </a>
            <a
              href="#for-parents"
              className="block py-2 text-gray-600 hover:text-purple-600"
            >
              For Parents
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-gray-600 hover:text-purple-600"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block py-2 text-gray-600 hover:text-purple-600"
            >
              Pricing
            </a>

            <div className="flex flex-col space-y-2 mt-4">
              <button className="text-purple-600 font-semibold px-6 py-2 rounded-full border-2 border-purple-600">
                Sign In
              </button>
              <button className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
