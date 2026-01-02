import React from "react";
import Image from "next/image";
import { SchedulableContent } from "../(Components)/ContentLibrary";

type VideoLibraryGridProps = {
  content: SchedulableContent[];
  onSelectVideo: (video: SchedulableContent) => void;
};

export default function VideoLibraryGrid({
  content,
  onSelectVideo,
}: VideoLibraryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-2">
      {content.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-2 bg-gray-50 hover:shadow cursor-pointer transition-shadow"
          onClick={() => onSelectVideo(item)}
        >
          <div className="font-medium text-sm">{item.title}</div>
          {item.thumbnail && (
            <Image
              width={250}
              height={100}
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-20 object-cover rounded mt-1"
            />
          )}
        </div>
      ))}
    </div>
  );
}
