"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/* =======================
   Types
======================= */

export type VideoMetadata = {
  id: string;
  title: string;
  description: string;
  duration: string;
  source: "YouTube" | "Vimeo" | "Upload";
  thumbnail: string;
};

type Props = {
  video?: VideoMetadata;
  onSave?: (video: VideoMetadata) => void;
};

/* =======================
   Defaults
======================= */

const EMPTY_VIDEO: VideoMetadata = {
  id: "",
  title: "",
  description: "",
  duration: "",
  source: "YouTube",
  thumbnail: "/placeholder.png",
};

/* =======================
   Component
======================= */

export default function VideoMetadataCard({ video, onSave }: Props) {
  const [metadata, setMetadata] = useState<VideoMetadata>(() => ({
    ...EMPTY_VIDEO,
    ...video,
    id: video?.id ?? crypto.randomUUID(),
  }));

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (field: keyof VideoMetadata, value: string) => {
    setMetadata((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setMetadata((prev) => ({
      ...prev,
      thumbnail: url,
    }));
  };

  // Cleanup preview URL (important)
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Card className="w-full rounded-2xl border shadow-sm transition">
      {/* Header */}
      <CardHeader className="rounded-t-2xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <CardTitle className="text-lg font-semibold tracking-wide">
          🎬 Video Metadata
        </CardTitle>
        <p className="text-xs opacity-90">
          Video ID:{" "}
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded">
            {metadata.id}
          </span>
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent className="p-6 space-y-6">
        {/* Thumbnail */}
        <div className="space-y-2">
          <Label>Thumbnail</Label>

          <div className="flex items-center gap-4">
            <div className="relative w-32 h-20 rounded-xl overflow-hidden border bg-muted">
              <Image
                src={metadata.thumbnail || "/placeholder.png"}
                alt="Thumbnail preview"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="max-w-xs cursor-pointer"
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <Label>Title</Label>
          <Input
            placeholder="Enter video title"
            value={metadata.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter video description"
            value={metadata.description}
            rows={4}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        {/* Duration + Source */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Duration (mm:ss)</Label>
            <Input
              placeholder="02:30"
              value={metadata.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Source</Label>
            <select
              className="w-full rounded-lg border px-3 py-2 bg-background"
              value={metadata.source}
              onChange={(e) =>
                handleChange(
                  "source",
                  e.target.value as VideoMetadata["source"]
                )
              }
            >
              <option value="YouTube">YouTube</option>
              <option value="Vimeo">Vimeo</option>
              <option value="Upload">Upload</option>
            </select>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-2">
          <Button
            className="px-6 bg-black"
            onClick={() => onSave?.(metadata)}
          >
            Save Metadata
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
