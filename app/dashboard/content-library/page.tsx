import DashBoardLayout from "@/app/layouts/DashBoardLayout";
import React from "react";
import VideoAddSource from "./(components)/VideoMetadataCard";
import PlaylistCreateSection from "./(components)/PlaylistMake";

const ContentLibrary = () => {
  return (
    <DashBoardLayout panelName="Content Library">
      <div className="flex flex-col space-y-16">
        <VideoAddSource></VideoAddSource>
        <PlaylistCreateSection></PlaylistCreateSection>
      </div>
    </DashBoardLayout>
  );
};

export default ContentLibrary;
