"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { refreshAccessToken } from "../api/auth"; // you added this already in auth.ts

function Button({ size = "default", className, children, ...props }: any) {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeClass = size === "icon" ? "p-2" : "px-4 py-2";
  return (
    <button className={`${base} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ChatInputProps {
  onSend: (text: string) => void;
  ticketId: string;
  onImageUpload?: (fileUrl: string) => void;
  sending?: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export function ChatInput({ onSend, ticketId, sending = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !sending) {
      onSend(message);
      setMessage("");
      setImagePreview(null);
    }
  };

  const doUpload = async (formData: FormData) => {
    // helper to post the form (returns axios response or throws)
    return await axios.post(
      `${API_BASE}/api/tickets/${ticketId}/attachments`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("relatedModel", "Ticket");
    formData.append("prompt", "Describe this image in detail.");

    try {
      setUploading(true);

      // First try upload
      try {
        const res = await doUpload(formData);
        if (res.data?.success) {
          console.log("✅ Uploaded:", res.data.data);
          // Optionally notify parent
        } else {
          console.warn("Upload responded but success=false", res.data);
        }
      } catch (err: any) {
        // If unauthorized, try refresh and retry once
        if (err.response?.status === 401) {
          console.warn("Upload got 401 — attempting token refresh");
          const refreshed = await refreshAccessToken();
          if (refreshed?.success) {
            // retry
            try {
              const retry = await doUpload(formData);
              if (retry.data?.success) {
                console.log("✅ Uploaded after refresh:", retry.data.data);
              } else {
                console.log("Upload after refresh failed:", retry.data);
              }
            } catch (retryErr) {
              console.error("Retry upload failed:", retryErr);
              // optionally prompt login
            }
          } else {
            console.warn("Refresh failed — user likely must login again");
            // Optionally redirect to login or show toast
          }
        } else {
          console.error("Upload error:", err);
        }
      }
    } finally {
      setUploading(false);
      // clear preview and revoke object URL to avoid leaks
      setImagePreview(null);
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {console.warn("Failed to revoke object URL");}
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-gray-700 bg-gray-800/95 p-4">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="relative flex items-end gap-3">
          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message AI Assistant..."
              rows={1}
              className="w-full resize-none rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 pr-12 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-600 hover:text-gray-200"
              aria-label="Upload file"
              disabled={uploading}
            >
              <Icon icon={uploading ? "mdi:loading" : "mdi:paperclip"} className={`h-5 w-5 ${uploading ? "animate-spin" : ""}`} />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <Button
            type="submit"
            size="icon"
            className={cn(
              "h-10 w-10 shrink-0 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors",
              (!message.trim() || sending) && "opacity-50 cursor-not-allowed"
            )}
            disabled={!message.trim() || sending}
          >
            {sending ? (
              <Icon icon="mdi:loading" className="h-5 w-5 animate-spin" />
            ) : (
              <Icon icon="mdi:send" className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>

      {imagePreview && (
        <div className="mt-3 flex items-center gap-3">
          <img
            src={imagePreview}
            alt="preview"
            className="h-20 w-20 rounded-md border border-gray-600 object-cover"
          />
          <p className="text-sm text-gray-400">Preview — will send to AI for analysis...</p>
        </div>
      )}
    </div>
  );
}
