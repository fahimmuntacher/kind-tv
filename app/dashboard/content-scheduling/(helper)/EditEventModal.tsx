import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventInput } from "@fullcalendar/core";

type EditEventModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventInput | null;
  onSave: (event: EventInput) => void;
  onDelete: (eventId: string) => void;
};

export default function EditEventModal({
  open,
  onOpenChange,
  event,
  onSave,
  onDelete,
}: EditEventModalProps) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStartTime(
        event.start instanceof Date
          ? event.start.toISOString().slice(0, 16)
          : ""
      );
      setEndTime(
        event.end instanceof Date ? event.end.toISOString().slice(0, 16) : ""
      );
    }
  }, [event]);

  const handleSave = () => {
    if (!event) return;

    onSave({
      ...event,
      title,
      start: new Date(startTime),
      end: new Date(endTime),
    });
  };

  const handleDelete = () => {
    if (!event?.id) return;
    onDelete(event.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="font-medium mb-1 block">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="font-medium mb-1 block">Start Time</label>
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium mb-1 block">End Time</label>
            <Input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
           
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
