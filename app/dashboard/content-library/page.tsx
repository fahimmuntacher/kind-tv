import DashBoardLayout from "@/app/layouts/DashBoardLayout";
import React from "react";
import VideoAddSource from "./(components)/VideoMetadataCard";

const ContentLibrary = () => {
  return (
    <DashBoardLayout panelName="Content Library">
      <div>
          <VideoAddSource></VideoAddSource>
      </div>
    </DashBoardLayout>
  );
};

export default ContentLibrary;
