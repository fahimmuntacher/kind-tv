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
import { SchedulableContent } from "./ContentLibrary";
import AddVideoModal from "../(helper)/AddVideoModal";
import EditEventModal from "../(helper)/EditEventModal";

type BroadcastCalendarProps = {
  events: EventInput[];
  onEventAdd: (event: EventInput) => void;
  onEventUpdate: (event: EventInput) => void;
  onEventDelete: (eventId: string) => void;
  libraryContent: SchedulableContent[];
};

const eventImplToInput = (event: any): EventInput => ({
  id: event.id,
  title: event.title,
  start: event.start ?? undefined,
  end: event.end ?? undefined,
  allDay: event.allDay,
  extendedProps: event.extendedProps,
});

export default function BroadcastCalendar({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  libraryContent,
}: BroadcastCalendarProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventInput | null>(null);

  /* ==================== Handlers ==================== */
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedStart(selectInfo.start);
    setAddModalOpen(true);
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
    setAddModalOpen(false);
    setSelectedStart(null);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEditingEvent(eventImplToInput(clickInfo.event));
    setEditModalOpen(true);
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    onEventUpdate(eventImplToInput(dropInfo.event));
  };

  const handleEventReceive = (info: EventReceiveArg) => {
    const start = info.event.start;
    if (!start) return;

    const end = new Date(start.getTime() + 30 * 60000);

    onEventAdd({
      id: String(Date.now()),
      title: info.event.title,
      start,
      end,
      allDay: false,
    });

    info.event.remove();
  };

  const handleEditSave = (updatedEvent: EventInput) => {
    onEventUpdate(updatedEvent);
    setEditModalOpen(false);
    setEditingEvent(null);
  };

  const handleEventDelete = (eventId: string) => {
    onEventDelete(eventId);
    setEditModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[90vh] gap-4 overflow-hidden w-full">
      {/* FullCalendar */}
      <div className="flex-1 min-h-[60vh] lg:min-h-0 w-fit">
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
          allDaySlot={false}
          // =================== Header Toolbar ===================
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek",
          }}
          // =================== Custom Title for Responsiveness ===================
          titleFormat={{
            year: "numeric",
            month: "short", // Use short month on small screens
            day: "numeric",
          }}
          // =================== Slot Label Format ===================
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          views={{
            timeGridDay: {
              titleFormat: {
                month: "short",
                day: "numeric",
                weekday: "short",
              },
            },
            timeGridWeek: {
              titleFormat: {
                month: "short",
                day: "numeric",
              },
            },
          }}
        />
      </div>

      {/* Add Video Modal */}
      <AddVideoModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        libraryContent={libraryContent}
        onAddVideo={handleAddVideo}
      />

      {/* Edit Event Modal */}
      <EditEventModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        event={editingEvent}
        onSave={handleEditSave}
        onDelete={handleEventDelete}
      />
    </div>
  );
}
