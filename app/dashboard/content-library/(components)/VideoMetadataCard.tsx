"use client";

import React, { useEffect, useState } from "react";
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
};

/* ======================= Component ======================= */

export default function VideoAddSection() {
  const [source, setSource] = useState<VideoSource>("custom");
  const [thumbnail, setThumbnail] = useState("/placeholder.png");

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(URL.createObjectURL(file));
  };

  const onSubmit = (data: FormValues) => {
    console.log({
      source,
      thumbnail,
      ...data,
    });
  };

  useEffect(() => {
    reset();
  }, [source, reset]);

  return (
    <Card className="rounded-3xl border shadow-lg overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <CardTitle className="text-xl font-semibold">
          🎬 Add Video Content
        </CardTitle>
        <p className="text-sm font-semibold opacity-90 max-w-lg">
          Upload your own video or connect YouTube / Vimeo links for instant
          publishing
        </p>
      </CardHeader>

      <CardContent className="p-8 space-y-10">
        {/* Thumbnail Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Video Thumbnail</Label>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative w-52 h-32 rounded-2xl overflow-hidden border bg-muted shadow-inner">
              <Image
                src={thumbnail}
                alt="Thumbnail preview"
                fill
                className="object-cover"
              />
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="max-w-xs"
            />
          </div>
        </div>

        {/* Source Selector */}
        <div className="space-y-10">
          <Label className="text-sm font-semibold">Video Source</Label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SourceCard
              active={source === "custom"}
              icon={<UploadCloud />}
              label="Custom Upload"
              description="Manually add video details"
              onClick={() => setSource("custom")}
            />

            <SourceCard
              active={source === "youtube"}
              icon={<Youtube />}
              label="YouTube"
              description="Paste a YouTube video link"
              onClick={() => setSource("youtube")}
            />

            <SourceCard
              active={source === "vimeo"}
              icon={<Video />}
              label="Vimeo"
              description="Import video from Vimeo"
              onClick={() => setSource("vimeo")}
            />
          </div>
        </div>

        {/* Form Area */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border bg-muted/40 p-6 space-y-6"
        >
          {/* YouTube / Vimeo */}
          {(source === "youtube" || source === "vimeo") && (
            <div className="space-y-2">
              <Label>
                {source === "youtube" ? "YouTube Video URL" : "Vimeo Video URL"}
              </Label>

              <div className="flex gap-3">
                <Input
                  placeholder="https://..."
                  {...register("videoUrl", { required: true })}
                />
                <Button type="button" variant="secondary" className="cursor-pointer">
                  Fetch
                </Button>
              </div>
            </div>
          )}

          {/* Custom */}
          {source === "custom" && (
            <>
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  placeholder="Enter video title"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Brief description about the video"
                  {...register("description")}
                />
              </div>
            </>
          )}

          <div className="flex justify-end pt-2">
            <Button className="px-10 h-11 rounded-xl bg-black text-white cursor-pointer">
              Save Video
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
        "text-left rounded-2xl border p-5 transition-all",
        "hover:shadow-md",
        active
          ? "bg-white border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg"
          : "bg-white/60 text-muted-foreground"
      )}
    >
      <div
        className={clsx(
          "mb-3 w-8 h-8",
          active ? "text-indigo-600" : "text-gray-400"
        )}
      >
        {icon}
      </div>

      <h4 className="font-medium text-sm">{label}</h4>
      <p className="text-xs mt-1 opacity-80">{description}</p>
    </button>
  );
}
