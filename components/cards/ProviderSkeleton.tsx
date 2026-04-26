"use client";

import { Card } from "@/components/ui/card";

interface ProviderSkeletonProps {
  count?: number;
}

export default function ProviderSkeleton({ count = 6 }: ProviderSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="bg-black/40 backdrop-blur-sm border border-white/5 p-6 space-y-4 animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/5" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-white/5 rounded" />
                <div className="w-20 h-3 bg-white/5 rounded" />
              </div>
            </div>
            <div className="w-16 h-6 bg-white/5 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="w-full h-3 bg-white/5 rounded" />
            <div className="w-3/4 h-3 bg-white/5 rounded" />
            <div className="w-1/2 h-3 bg-white/5 rounded" />
          </div>

          {/* Tags */}
          <div className="flex gap-1.5">
            <div className="w-16 h-5 bg-white/5 rounded" />
            <div className="w-12 h-5 bg-white/5 rounded" />
            <div className="w-14 h-5 bg-white/5 rounded" />
          </div>

          {/* Location */}
          <div className="w-24 h-3 bg-white/5 rounded" />

          {/* Button */}
          <div className="w-full h-9 bg-white/5 rounded-lg" />
        </Card>
      ))}
    </>
  );
}
