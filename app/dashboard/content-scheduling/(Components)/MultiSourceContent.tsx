"use client";

import React, { useState } from "react";
import {
  Trash2,
  PlusCircle,
  Youtube,
  Video,
  Cloud,
  Rss,
  Move,
} from "lucide-react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import dayjs from "dayjs";

type ContentItem = {
  id: string;
  source: "YouTube" | "Vimeo" | "Upload" | "Google Drive" | "Dropbox" | "RSS";
  title: string;
  description: string;
  thumbnail: string;
  scheduledDate?: string;
  scheduledTime?: string;
};

const sourceIcons: Record<string, React.ReactNode> = {
  YouTube: <Youtube className="w-5 h-5 text-red-600" />,
  Vimeo: <Video className="w-5 h-5 text-blue-600" />,
  Upload: <Cloud className="w-5 h-5 text-green-600" />,
  "Google Drive": <Cloud className="w-5 h-5 text-yellow-500" />,
  Dropbox: <Cloud className="w-5 h-5 text-blue-400" />,
  RSS: <Rss className="w-5 h-5 text-orange-500" />,
};

export default function ContentScheduler() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const [form, setForm] = useState({
    source: "YouTube" as ContentItem["source"],
    title: "",
    videoLink: "",
    description: "",
    thumbnail: "🎬",
    scheduledDate: dayjs().format("YYYY-MM-DD"),
    scheduledTime: dayjs().format("HH:mm"),
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setItems(reordered);
  };

  const openModal = (item?: ContentItem) => {
    if (item) {
      setEditingItem(item);
      setForm(item);
    } else {
      setEditingItem(null);
      setForm({
        source: "YouTube",
        title: "",
        videoLink: "",
        description: "",
        thumbnail: "🎬",
        scheduledDate: dayjs().format("YYYY-MM-DD"),
        scheduledTime: dayjs().format("HH:mm"),
      });
    }
    setShowModal(true);
  };

  const saveItem = () => {
    if (editingItem) {
      setItems(
        items.map((i) => (i.id === editingItem.id ? { ...form, id: i.id } : i))
      );
    } else {
      setItems([...items, { ...form, id: (items.length + 1).toString() }]);
    }
    setShowModal(false);
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  return (
    <div className="p-4 sm:p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
          Content Scheduling
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg"
        >
          <PlusCircle className="w-5 h-5" /> Add Content
        </button>
      </div>

      {/* Drag & Drop Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="contentCalendar">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-2xl ${
                        snapshot.isDragging ? "border-indigo-300 border-2" : ""
                      }`}
                    >
                      {/* Thumbnail responsive */}
                      <div className="w-full aspect-video flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-3xl sm:text-4xl text-white">
                        {item.thumbnail}
                      </div>

                      {/* Content Info */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0">
                          <span className="flex items-center gap-2 font-semibold text-gray-700 text-sm sm:text-base">
                            {sourceIcons[item.source]} {item.source}
                          </span>
                          <div className="flex gap-2">
                            <button onClick={() => openModal(item)}>
                              <PlusCircle className="w-5 h-5 text-indigo-600" />
                            </button>
                            <button onClick={() => removeItem(item.id)}>
                              <Trash2 className="w-5 h-5 text-red-500" />
                            </button>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-1 break-words">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 break-words">
                          {item.description}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                          Scheduled: {item.scheduledDate} @ {item.scheduledTime}
                        </p>
                      </div>

                      {/* Drag Handle */}
                      <div
                        {...provided.dragHandleProps}
                        className="p-2 cursor-grab text-gray-400 flex justify-end"
                      >
                        <Move className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">
                {editingItem ? "Edit Content" : "Add New Content"}
              </h3>
            </div>

            <div className="p-6 space-y-4 flex flex-col">
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="w-full px-4 py-2 border rounded-lg resize-none"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Thumbnail Emoji or URL"
                value={form.thumbnail}
                onChange={(e) =>
                  setForm({ ...form, thumbnail: e.target.value })
                }
              />
              <input
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your video URL"
                value={form.videoLink}
                onChange={(e) =>
                  setForm({ ...form, videoLink: e.target.value })
                }
              />
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={form.source}
                onChange={(e) =>
                  setForm({
                    ...form,
                    source: e.target.value as ContentItem["source"],
                  })
                }
              >
                {[
                  "YouTube",
                  "Vimeo",
                  "Upload",
                  "Google Drive",
                  "Dropbox",
                  "RSS",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
                value={form.scheduledDate}
                onChange={(e) =>
                  setForm({ ...form, scheduledDate: e.target.value })
                }
              />
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg"
                value={form.scheduledTime}
                onChange={(e) =>
                  setForm({ ...form, scheduledTime: e.target.value })
                }
              />
            </div>

            <div className="p-6 border-t flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border rounded-lg w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={saveItem}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg w-full sm:w-auto"
              >
                {editingItem ? "Save Changes" : "Add Content"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
