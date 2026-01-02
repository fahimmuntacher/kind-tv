import DashBoardLayout from "@/app/layouts/DashBoardLayout";
import React from "react";
import PlaylistCreateSection from "./(components)/PlaylistMake";
import VideoAddSection from "./(components)/VideoAddSection";

const ContentLibrary = () => {
  return (
    <DashBoardLayout panelName="Content Library">
      <div className="flex flex-col space-y-16">
        <VideoAddSection></VideoAddSection>
        <PlaylistCreateSection></PlaylistCreateSection>
      </div>
    </DashBoardLayout>
  );
};

export default ContentLibrary;
