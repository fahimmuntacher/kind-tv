import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PageLayouts = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default PageLayouts;
