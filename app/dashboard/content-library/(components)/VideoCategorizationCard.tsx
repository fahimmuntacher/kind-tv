"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export type VideoCategorization = {
  category: string;
  tags: string[];
  audience: string;
  language: string;
  visibility: "Public" | "Unlisted" | "Private";
};

type Props = {
  value?: VideoCategorization;
  onChange?: (data: VideoCategorization) => void;
  onSave?: (data: VideoCategorization) => void;
};

export default function VideoCategorizationCard({
  value,
  onChange,
  onSave,
}: Props) {
  const [category, setCategory] = useState(value?.category ?? "");
  const [tags, setTags] = useState<string[]>(value?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [audience, setAudience] = useState(value?.audience ?? "");
  const [language, setLanguage] = useState(value?.language ?? "");
  const [visibility, setVisibility] = useState<
    VideoCategorization["visibility"]
  >(value?.visibility ?? "Public");

  const emitChange = (data?: Partial<VideoCategorization>) => {
    onChange?.({
      category,
      tags,
      audience,
      language,
      visibility,
      ...data,
    });
  };

  const addTag = () => {
    const clean = tagInput.trim();
    if (!clean || tags.includes(clean)) return;
    const updated = [...tags, clean];
    setTags(updated);
    setTagInput("");
    emitChange({ tags: updated });
  };

  const removeTag = (tag: string) => {
    const updated = tags.filter((t) => t !== tag);
    setTags(updated);
    emitChange({ tags: updated });
  };

  return (
    <Card className="w-full rounded-2xl border shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-base font-medium">
          Categorization & Discovery
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-sm">Category</Label>
          <select
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              emitChange({ category: e.target.value });
            }}
          >
            <option value="">Select category</option>
            {[
              "Education",
              "Entertainment",
              "Kids",
              "Documentary",
              "Music",
              "Sports",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Audience & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Primary Audience</Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={audience}
              onChange={(e) => {
                setAudience(e.target.value);
                emitChange({ audience: e.target.value });
              }}
            >
              <option value="">Select audience</option>
              {["R", "PG-13", "R", "NC-17"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Language</Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                emitChange({ language: e.target.value });
              }}
            >
              {["English", "Bangla", "Hindi", "Arabic"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags + Visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Tags */}
          <div className="lg:col-span-2 space-y-2">
            <Label className="text-sm">Tags</Label>

            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={tagInput}
                className="text-sm"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button variant="outline" size="sm" onClick={addTag}>
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-foreground"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label className="text-sm">Visibility</Label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={visibility}
              onChange={(e) => {
                setVisibility(
                  e.target.value as VideoCategorization["visibility"]
                );
                emitChange({
                  visibility: e.target
                    .value as VideoCategorization["visibility"],
                });
              }}
            >
              <option value="Public">Public</option>
              <option value="Unlisted">Unlisted</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={() =>
              onSave?.({ category, tags, audience, language, visibility })
            }
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
