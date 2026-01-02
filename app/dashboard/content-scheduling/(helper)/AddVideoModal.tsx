import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SchedulableContent } from "../(Components)/ContentLibrary";
import VideoLibraryGrid from "./VideoLibraryGrid";

type AddVideoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  libraryContent: SchedulableContent[];
  onAddVideo: (video: SchedulableContent | { url: string }) => void;
};

export default function AddVideoModal({
  open,
  onOpenChange,
  libraryContent,
  onAddVideo,
}: AddVideoModalProps) {
  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = (e.target as HTMLInputElement).value;
      if (url.trim()) {
        onAddVideo({ url });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          <div>
            <h4 className="font-medium mb-2">Paste Video URL</h4>
            <Input
              type="text"
              placeholder="https://..."
              onKeyDown={handleUrlKeyDown}
            />
          </div>

          <div>
            <h4 className="font-medium mb-2">Select from Library</h4>
            <VideoLibraryGrid
              content={libraryContent}
              onSelectVideo={onAddVideo}
            />
          </div>

          <DialogClose asChild>
            <Button className="mt-4 w-full">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
