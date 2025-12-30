import DashBoardLayout from "@/app/layouts/DashBoardLayout";
import React from "react";
import VideoCategorizationCard from "./(components)/VideoCategorizationCard";
import VideoMetadataCard from "./(components)/VideoMetadataCard";
import ContentModerationCard from "./(components)/ContentModerationCard";

const initialItems = [
  { id: "1", title: "Funny Cats Compilation", platform: "YouTube" },
  { id: "2", title: "Vimeo Travel Video", platform: "Vimeo" },
  { id: "3", title: "Direct Upload Cooking Tutorial", platform: "Upload" },
];

const ContentLibrary = () => {
  return (
    <DashBoardLayout panelName="Content Library">
      <div>
        <VideoMetadataCard ></VideoMetadataCard>
      </div>
      <div className="mt-8">
        <VideoCategorizationCard />
      </div>

      <div>
        <ContentModerationCard></ContentModerationCard>
      </div>
    </DashBoardLayout>
  );
};

export default ContentLibrary;
