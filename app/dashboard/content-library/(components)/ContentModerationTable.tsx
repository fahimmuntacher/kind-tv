"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type ModerationStatus =
  | "Draft"
  | "In Review"
  | "Approved"
  | "Published"
  | "Rejected";

export type ContentItem = {
  id: string;
  title: string;
  status: ModerationStatus;
  note?: string;
};

type Props = {
  items: ContentItem[];
  onUpdate?: (updatedItem: ContentItem) => void; // Made optional if you don't always need it
};

export default function ContentModerationTable({ items, onUpdate }: Props) {
  const [contentList, setContentList] = useState<ContentItem[]>(items);

  const handleStatusChange = (id: string, newStatus: ModerationStatus) => {
    const updated = contentList.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setContentList(updated);

    const changedItem = updated.find((i) => i.id === id);
    if (changedItem && onUpdate) {
      onUpdate(changedItem);
    }
  };

  // Fixed syntax error: removed the stray comma in parameters
  const handleNoteChange = (id: string, note: string) => {
    const updated = contentList.map((item) =>
      item.id === id ? { ...item, note } : item
    );
    setContentList(updated);

    const changedItem = updated.find((i) => i.id === id);
    if (changedItem && onUpdate) {
      onUpdate(changedItem);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableCell className="font-medium">Title</TableCell>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell className="font-medium">Moderator Note</TableCell>
            <TableCell className="font-medium">Actions</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contentList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>

              <TableCell>
                <select
                  className="w-full px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={item.status}
                  onChange={(e) =>
                    handleStatusChange(
                      item.id,
                      e.target.value as ModerationStatus
                    )
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="In Review">In Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Published">Published</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </TableCell>

              <TableCell>
                <Textarea
                  value={item.note || ""}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="Add note..."
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                />
              </TableCell>

              <TableCell>
                <Button
                  size="sm"
                  onClick={() => onUpdate && onUpdate(item)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}