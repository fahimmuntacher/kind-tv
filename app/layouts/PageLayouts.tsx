import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface PageLayoutsProps {
  children: React.ReactNode;
}

const PageLayouts = ({ children }: PageLayoutsProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PageLayouts;
