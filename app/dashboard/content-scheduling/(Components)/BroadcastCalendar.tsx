"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  EventInput,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { EventReceiveArg } from "@fullcalendar/interaction";
import ContentLibrary, { SchedulableContent } from "./ContentLibrary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BroadcastCalendarProps = {
  events: EventInput[];
  onEventAdd: (event: EventInput) => void;
  onEventUpdate: (event: EventInput) => void;
  onEventDelete: (eventId: string) => void;
  libraryContent: SchedulableContent[];
};

export default function BroadcastCalendar({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  libraryContent,
}: BroadcastCalendarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);

  // State for editing events
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventInput | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  /* ==================== Add Video ==================== */
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedStart(selectInfo.start);
    setModalOpen(true);
    selectInfo.view.calendar.unselect();
  };

  const handleAddVideo = (video: SchedulableContent | { url: string }) => {
    if (!selectedStart) return;

    const durationMinutes = "duration" in video ? video.duration || 30 : 30;

    const newEvent: EventInput = {
      id: String(Date.now()),
      title: "title" in video ? video.title : "Video",
      start: selectedStart,
      end: new Date(selectedStart.getTime() + durationMinutes * 60000),
      extendedProps: video,
      allDay: false,
    };

    onEventAdd(newEvent);
    setModalOpen(false);
    setSelectedStart(null);
  };

  /* ==================== Edit Event ==================== */
  const openEditModal = (event: EventInput) => {
    setEditingEvent(event);
    setEditTitle(event.title || "");
    setEditStart(
      event.start ? new Date(event.start).toISOString().slice(0, 16) : ""
    );
    setEditEnd(event.end ? new Date(event.end).toISOString().slice(0, 16) : "");
    setEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!editingEvent) return;

    onEventUpdate({
      ...editingEvent,
      title: editTitle,
      start: new Date(editStart),
      end: new Date(editEnd),
    });

    setEditModalOpen(false);
    setEditingEvent(null);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    openEditModal(clickInfo.event);
  };

  /* ==================== Event Drop ==================== */
  const handleEventDrop = (dropInfo: EventDropArg) => {
    onEventUpdate({ ...dropInfo.event });
  };

  const handleEventReceive = (info: EventReceiveArg) => {
    const start = info.event.start!;
    const end = new Date(start.getTime() + 30 * 60000);
    const newEvent: EventInput = {
      id: info.event.id,
      title: info.event.title,
      start,
      end,
      allDay: false,
    };
    onEventAdd(newEvent);
    info.event.remove();
  };

  return (
    <div className="flex-1 p-4 relative">
      {/* ==================== Calendar ==================== */}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        selectable
        editable
        droppable
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventReceive={handleEventReceive}
        slotDuration="00:30:00"
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        height="100%"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek",
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
      />

      {/* ==================== Add Video Modal ==================== */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Video</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <h4 className="font-medium mb-2">Paste Video URL</h4>
              <Input
                type="text"
                placeholder="https://..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddVideo({
                      url: (e.target as HTMLInputElement).value,
                    });
                  }
                }}
              />
            </div>

            <div>
              <h4 className="font-medium mt-4 mb-2">Or Select from Library</h4>
              <div className="max-h-64 overflow-y-auto">
                <ContentLibrary
                  content={libraryContent}
                  onDragStart={(item) => handleAddVideo(item)}
                />
              </div>
            </div>

            <DialogClose asChild>
              <Button className="mt-4 w-full">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* ==================== Edit Event Modal ==================== */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className="font-medium mb-1 block">Title</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="font-medium mb-1 block">Start Time</label>
              <Input
                type="datetime-local"
                value={editStart}
                onChange={(e) => setEditStart(e.target.value)}
              />
            </div>

            <div>
              <label className="font-medium mb-1 block">End Time</label>
              <Input
                type="datetime-local"
                value={editEnd}
                onChange={(e) => setEditEnd(e.target.value)}
              />
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleEditSave} className="flex-1">
                Save
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (editingEvent) onEventDelete(editingEvent.id!);
                  setEditModalOpen(false);
                  setEditingEvent(null);
                }}
                className="flex-1"
              >
                Delete
              </Button>
              <DialogClose asChild>
                <Button className="flex-1">Cancel</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
