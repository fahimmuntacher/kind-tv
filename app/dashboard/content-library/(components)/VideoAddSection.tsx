"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Youtube, Video, UploadCloud } from "lucide-react";
import clsx from "clsx";

/* ======================= Types ======================= */

type VideoSource = "custom" | "youtube" | "vimeo";

type FormValues = {
  title: string;
  description: string;
  videoUrl: string;
  videoFile?: FileList;
  thumbnailFile?: FileList;
};

/* ======================= Helpers ======================= */

// ✅ Extract YouTube ID
function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match?.[1] ?? null;
}

/* ======================= Component ======================= */

export default function VideoAddSection() {
  const [source, setSource] = useState<VideoSource>("custom");
  const [thumbnail, setThumbnail] = useState("/placeholder.png");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  /* ---------- Source Change (NO EFFECT) ---------- */
  const handleSourceChange = (next: VideoSource) => {
    setSource(next);
    setThumbnail("/placeholder.png");
    setUploadProgress(0);
    setUploading(false);

    reset({
      title: "",
      description: "",
      videoUrl: "",
      videoFile: undefined,
      thumbnailFile: undefined,
    });
  };

  /* ---------- Thumbnail Upload ---------- */
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(URL.createObjectURL(file));
  };

  /* ---------- YouTube Thumbnail Auto Fetch ---------- */
  const handleYouTubeUrlBlur = (url: string) => {
    const id = getYouTubeId(url);
    if (!id) return;

    setThumbnail(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
  };

  /* ---------- Upload Progress Simulation ---------- */
  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
      }
    }, 300);
  };

  /* ---------- Submit ---------- */
  const onSubmit = (data: FormValues) => {
    const payload = {
      source,
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      videoFile: data.videoFile?.[0] ?? null,
      thumbnailFile: data.thumbnailFile?.[0] ?? null,
      thumbnail,
    };

    console.log("FINAL PAYLOAD 👉", payload);

    if (source === "custom") simulateUpload();
  };

  return (
    <Card className="rounded-3xl border shadow-lg overflow-hidden">
      <CardHeader className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <CardTitle className="text-xl font-semibold">
          🎬 Add Video Content
        </CardTitle>
        <p className="text-sm opacity-90">
          Upload video or connect YouTube / Vimeo
        </p>
      </CardHeader>

      <CardContent className="p-8 space-y-10">
        {/* Thumbnail */}
        {source !== "vimeo" && (
          <div className="space-y-3">
            <Label>Video Thumbnail</Label>
            <div className="flex sm:flex-row flex-col-reverse gap-6 items-center">
              <div className="relative w-52 h-32 rounded-2xl overflow-hidden border">
                <Image
                  src={thumbnail}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>

              {source === "custom" && (
                <Input
                  type="file"
                  accept="image/*"
                  {...register("thumbnailFile")}
                  onChange={handleThumbnailUpload}
                />
              )}
            </div>
          </div>
        )}

        {/* Source Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SourceCard
            active={source === "custom"}
            icon={<UploadCloud />}
            label="Custom"
            description="Upload video"
            onClick={() => handleSourceChange("custom")}
          />
          <SourceCard
            active={source === "youtube"}
            icon={<Youtube />}
            label="YouTube"
            description="Paste link"
            onClick={() => handleSourceChange("youtube")}
          />
          <SourceCard
            active={source === "vimeo"}
            icon={<Video />}
            label="Vimeo"
            description="Paste link"
            onClick={() => handleSourceChange("vimeo")}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-2xl p-6 space-y-6"
        >
          {(source === "youtube" || source === "vimeo") && (
            <Input
              placeholder="https://..."
              {...register("videoUrl", { required: true })}
              onBlur={(e) =>
                source === "youtube" && handleYouTubeUrlBlur(e.target.value)
              }
            />
          )}

          {source === "custom" && (
            <>
              <Input
                type="file"
                accept="video/*"
                {...register("videoFile", { required: true })}
              />
              <Input
                placeholder="Title"
                {...register("title", { required: true })}
              />
              <Textarea
                placeholder="Description"
                {...register("description")}
              />
            </>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">
                Uploading… {uploadProgress}%
              </div>
              <div className="h-2 w-full bg-muted rounded">
                <div
                  className="h-2 bg-indigo-600 rounded transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button disabled={uploading}>
              {uploading ? "Uploading…" : "Save Video"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

/* ======================= Source Card ======================= */

function SourceCard({
  active,
  icon,
  label,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-2xl border p-5 text-left transition",
        active
          ? "border-indigo-500 ring-2 ring-indigo-500/30"
          : "text-muted-foreground"
      )}
    >
      <div className={active ? "text-indigo-600" : "text-gray-400"}>{icon}</div>
      <h4 className="text-sm font-medium">{label}</h4>
      <p className="text-xs">{description}</p>
    </button>
  );
}
