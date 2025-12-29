import React from "react";

const CTA = () => {
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create a Safe TV Experience? 🌈
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Join thousands of parents creating healthy screen habits for their
            children.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-gray-800 font-bold px-10 py-4 rounded-full hover:bg-yellow-500 transition">
              Start Free Trial
            </button>
            <button className="bg-white text-purple-600 font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition">
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
