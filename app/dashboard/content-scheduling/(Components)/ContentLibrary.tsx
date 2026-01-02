"use client";

import React from "react";
import Image from "next/image";
import { Film, ListVideo } from "lucide-react";
import {
  Draggable,
  DragDropContext,
  Droppable,
  DraggableProvided,
} from "@hello-pangea/dnd";

export type SchedulableContent = {
  id: string;
  title: string;
  thumbnail: string;
  type: "video" | "playlist";
  duration?: number; // minutes
  totalDuration?: number; // for playlist
  videos?: any[];
};

type ContentLibraryProps = {
  content: SchedulableContent[];
  onDragStart: (item: SchedulableContent) => void;
};

export default function ContentLibrary({
  content,
  onDragStart,
}: ContentLibraryProps) {
  const videos = content.filter((c) => c.type === "video");
  const playlists = content.filter((c) => c.type === "playlist");

  return (
    <div className="w-80 border-r bg-white p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Content Library</h3>

      <DragDropContext
        onDragStart={(start) => {
          const item = content.find((c) => c.id === start.draggableId);
          if (item) onDragStart(item);
        }}
        onDragEnd={() => {
            // nothing
        }}
      >
        {/* Videos */}
        {videos.length > 0 && (
          <Droppable droppableId="videos" isDropDisabled={true}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mb-4"
              >
                <h4 className="text-sm font-medium mb-1">Videos</h4>
                {videos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: DraggableProvided) => (
                      <div
                        className="flex gap-3 p-2 rounded-lg border hover:shadow cursor-pointer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={60}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            <Film size={12} className="inline" /> Video
                          </p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}

        {/* Playlists */}
        {playlists.length > 0 && (
          <Droppable droppableId="playlists" isDropDisabled={true}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4 className="text-sm font-medium mb-1">Playlists</h4>
                {playlists.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: DraggableProvided) => (
                      <div
                        className="flex gap-3 p-2 rounded-lg border hover:shadow cursor-pointer"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={60}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            <ListVideo size={12} className="inline" /> Playlist
                          </p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
}
