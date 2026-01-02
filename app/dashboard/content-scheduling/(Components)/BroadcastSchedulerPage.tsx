"use client";

import React, { useState, useEffect, useRef } from "react";
import ContentLibrary, { SchedulableContent } from "./ContentLibrary";
import BroadcastCalendar from "./BroadcastCalendar";
import { EventInput } from "@fullcalendar/core";

export default function BroadcastSchedulerPage() {
  const [content, setContent] = useState<SchedulableContent[]>([]);
  const [events, setEvents] = useState<EventInput[]>([]);
  const dragItemRef = useRef<SchedulableContent | null>(null);

  /* Fetch mock data */
  useEffect(() => {
    Promise.all([
      fetch("/mockdata/videolist.json").then((r) => r.json()),
      fetch("/mockdata/playlist.json").then((r) => r.json()),
    ]).then(([videos, playlists]) => setContent([...videos, ...playlists]));
  }, []);

  /* Drag start from library */
  const handleDragStart = (item: SchedulableContent) => {
    dragItemRef.current = item;
  };

  /* Event actions */
  const handleEventAdd = (event: EventInput) => {
    setEvents((prev: EventInput[]) => [...prev, event]);

    if (dragItemRef.current) {
      const draggedId = dragItemRef.current.id;

      setContent(
        (prev) => prev.filter((c) => c && c.id !== draggedId)
      );

      dragItemRef.current = null;
    }
  };

  const handleEventUpdate = (event: EventInput) => {
    setEvents((prev: EventInput[]) =>
      prev.map((e) => (e.id === event.id ? { ...e, ...event } : e))
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((prev: EventInput[]) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <div className="flex h-[90vh] gap-4 overflow-hidden">
      <ContentLibrary content={content} onDragStart={handleDragStart} />
      <BroadcastCalendar
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        libraryContent={content}
      />
    </div>
  );
}
