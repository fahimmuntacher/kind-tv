"use client";

import React from "react";
import ContentModerationTable, {
  ContentItem,
} from "./ContentModerationTable"; // adjust path if needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockItems: ContentItem[] = [
  {
    id: "1",
    title: "Funny Cats Compilation",
    status: "Draft",
    note: "",
  },
  {
    id: "2",
    title: "Travel Vlog - Japan 2025",
    status: "In Review",
    note: "Waiting for copyright clearance",
  },
  {
    id: "3",
    title: "Cooking Tutorial - Pasta",
    status: "Approved",
    note: "Looks good!",
  },
];

export default function ContentModerationCard() {
  const handleUpdate = (updatedItem: ContentItem) => {
    console.log("Item updated:", updatedItem);
    // Here you would typically send this to your backend/API
    // e.g., await fetch(`/api/content/${updatedItem.id}`, { method: "PATCH", body: JSON.stringify(updatedItem) })
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Content Moderation</CardTitle>
      </CardHeader>
      <CardContent>
        <ContentModerationTable items={mockItems} onUpdate={handleUpdate} />
      </CardContent>
    </Card>
  );
}