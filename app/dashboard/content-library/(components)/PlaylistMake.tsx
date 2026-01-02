"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shuffle,
  ListOrdered,
  Plus,
  Trash2,
  Pencil,
  Share2,
} from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

/* ================= Types ================= */
type PlaylistMode = "ordered" | "shuffle";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

type Playlist = {
  id: string;
  name: string;
  videos: Video[];
};

/* ================= Component ================= */
export default function PlaylistBuilder() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mode, setMode] = useState<PlaylistMode>("ordered");

  // Pagination
  const [page, setPage] = useState(1);
  const videosPerPage = 5;

  const activePlaylist = playlists.find((p) => p.id === activeId);

  /* ================= Fetch Videos ================= */
  useEffect(() => {
    fetch("/mockdata/videolist.json")
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  /* ================= Playlist Actions ================= */
  const createPlaylist = () => {
    const id = crypto.randomUUID();
    const newPlaylist: Playlist = {
      id,
      name: `Playlist ${playlists.length + 1}`,
      videos: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
    setActiveId(id);
  };

  const updatePlaylist = (updater: (p: Playlist) => Playlist) => {
    setPlaylists((prev) =>
      prev.map((p) => (p.id === activeId ? updater(p) : p))
    );
  };

  const addVideo = (video: Video) => {
    if (!activePlaylist) return;
    if (activePlaylist.videos.some((v) => v.id === video.id)) return;

    updatePlaylist((p) => ({
      ...p,
      videos: [...p.videos, video],
    }));
  };

  const removeVideo = (id: string) => {
    updatePlaylist((p) => ({
      ...p,
      videos: p.videos.filter((v) => v.id !== id),
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !activePlaylist) return;

    const items = Array.from(activePlaylist.videos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    updatePlaylist((p) => ({ ...p, videos: items }));
  };

  /* ================= Video Pagination ================= */
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const paginatedVideos = videos.slice(
    (page - 1) * videosPerPage,
    page * videosPerPage
  );

  return (
    <div className="w-full overflow-x-hidden">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 p-4 lg:p-8 bg-gray-100 rounded-2xl">
        {/* LEFT – Playlists */}
        <Card className="w-full">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>📂 Playlists</CardTitle>
            <Button size="icon" onClick={createPlaylist}>
              <Plus />
            </Button>
          </CardHeader>

          <CardContent className="space-y-2">
            {playlists.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-6">
                No playlists yet. Create one to get started 🎵
              </p>
            ) : playlists.length === 1 ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveId(playlists[0].id)}
                  className={clsx(
                    "flex-1 text-left px-3 py-2 rounded-lg",
                    activeId === playlists[0].id
                      ? "bg-purple-200 text-purple-800 font-medium"
                      : "hover:bg-muted"
                  )}
                >
                  {playlists[0].name} ({playlists[0].videos.length})
                </button>
              </div>
            ) : (
              <div className="relative">
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={activeId}
                  onChange={(e) => setActiveId(e.target.value)}
                >
                  {playlists.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.videos.length})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Playlist Thumbnail Preview */}
            {activePlaylist && activePlaylist.videos.length > 0 && (
              <div className="mt-4 rounded-xl overflow-hidden border bg-white">
                <div className="relative aspect-video">
                  <Image
                    src={activePlaylist.videos[0].thumbnail}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {activePlaylist.videos.length} videos
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CENTER – Video Library */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>🎞 Video Library</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {paginatedVideos.map((video) => (
              <div
                key={video.id}
                className="flex gap-3 border rounded-xl p-2 items-center bg-white"
              >
                <div className="relative w-20 h-12 rounded overflow-hidden">
                  <Image src={video.thumbnail} alt="" fill />
                </div>
                <p className="flex-1 text-sm">{video.title}</p>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40"
                  disabled={activePlaylist?.videos.some(
                    (v) => v.id === video.id
                  )}
                  onClick={() => addVideo(video)}
                >
                  Add
                </Button>
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-2">
                <Button
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </Button>
                <span className="text-sm px-2 py-1 border rounded">{page}</span>
                <Button
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* RIGHT – Playlist Queue */}
        <Card className="w-full">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                value={activePlaylist?.name || ""}
                onChange={(e) =>
                  updatePlaylist((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Playlist name"
              />
              {/* Playlist action icons */}
              {activePlaylist && (
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify(activePlaylist)
                      );
                      alert("Playlist copied to clipboard!");
                    }}
                  >
                    <Share2 size={16} />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => {
                      const name = prompt(
                        "Rename playlist",
                        activePlaylist.name
                      );
                      if (!name) return;
                      updatePlaylist(() => ({ ...activePlaylist, name }));
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => {
                      setPlaylists((prev) =>
                        prev.filter((p) => p.id !== activePlaylist.id)
                      );
                      setActiveId("");
                    }}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <IconButton
                active={mode === "ordered"}
                onClick={() => setMode("ordered")}
              >
                <ListOrdered size={16} />
              </IconButton>
              <IconButton
                active={mode === "shuffle"}
                onClick={() => setMode("shuffle")}
              >
                <Shuffle size={16} />
              </IconButton>

              {mode === "shuffle" && (
                <div className="flex items-center gap-1 text-purple-700 text-xs ml-2">
                  <Shuffle size={14} /> Drag to prioritize videos (playback will
                  shuffle)
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {!activePlaylist || activePlaylist.videos.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Add videos to playlist
              </p>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="playlist">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {activePlaylist.videos.map((video, index) => (
                        <Draggable
                          key={video.id}
                          draggableId={video.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex gap-3 items-center border rounded-xl p-2 mb-2 bg-white"
                            >
                              <div className="relative w-16 h-10 rounded overflow-hidden">
                                <Image src={video.thumbnail} alt="" fill />
                              </div>
                              <p className="flex-1 text-sm">{video.title}</p>
                              <button
                                onClick={() => removeVideo(video.id)}
                                className="text-xs text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ================= Helpers ================= */
function IconButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-2 rounded-full border transition",
        active ? "bg-purple-600 text-white border-purple-600" : "hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}
