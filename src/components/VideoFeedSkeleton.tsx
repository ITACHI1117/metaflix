"use client";
import {
  Video,
  Heart,
  MessageCircle,
  VolumeX,
  Search,
  MoreHorizontal,
  Menu,
  Plus,
} from "lucide-react";

export default function VideoFeedSkeleton() {
  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent pt-safe">
        <div className="flex items-center justify-between p-4 pt-8">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-16 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-muted-foreground/50" />
            <MoreHorizontal className="w-6 h-6 text-muted-foreground/50" />
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="w-full h-full bg-muted/30">
        {/* Video placeholder with subtle pattern */}
        <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/40 relative">
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-pulse opacity-50" />

          {/* Play button placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-6">
        {/* Like button */}
        <div className="flex flex-col items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-6 h-3 mt-2" />
        </div>

        {/* Comment button */}
        <div className="flex flex-col items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-8 h-3 mt-2" />
        </div>

        {/* Share button */}
        <div className="flex flex-col items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-10 h-3 mt-2" />
        </div>

        {/* Remix button */}
        <div className="flex flex-col items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-12 h-3 mt-2" />
        </div>

        {/* More actions */}
        <div className="flex flex-col items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>

        {/* Creator avatar */}
        <div className="mt-2">
          <Skeleton className="w-12 h-12 rounded-full border-2 border-muted" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
        {/* User info and subscribe */}
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-7 rounded-full" />
        </div>

        {/* Description lines */}
        <div className="space-y-2 mb-3">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>

        {/* Music/sound info */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-32 h-3" />
        </div>

        {/* Hashtags */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-18 h-3" />
          <Skeleton className="w-14 h-3" />
        </div>
      </div>

      {/* Loading pulse overlay for extra effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

export const DesktopVideoSkeletonLoader = () => {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-6">
        {/* Logo */}
        <Skeleton className="w-8 h-8 rounded-full" />

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4">
          <Menu className="w-6 h-6 text-muted-foreground/50" />
          <Search className="w-6 h-6 text-muted-foreground/50" />
          <Plus className="w-6 h-6 text-muted-foreground/50" />
        </div>

        {/* Bottom section */}
        <div className="flex-1 flex flex-col justify-end space-y-4">
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Video Player Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-2xl aspect-video">
            {/* Video Container */}
            <div className="w-full h-full bg-muted/30 rounded-lg overflow-hidden relative">
              {/* Video placeholder with gradient */}
              <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/40 relative">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-pulse opacity-50" />

                {/* Play button placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-16 h-16 rounded-full" />
                </div>

                {/* Video controls placeholder */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <Skeleton className="w-full h-1 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Video info below player */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-20 h-3" />
                  </div>
                </div>
                <Skeleton className="w-20 h-8 rounded-full" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-3/4 h-3" />
                <Skeleton className="w-1/2 h-3" />
              </div>

              {/* Tags */}
              <div className="flex space-x-2">
                <Skeleton className="w-16 h-6 rounded-full" />
                <Skeleton className="w-20 h-6 rounded-full" />
                <Skeleton className="w-18 h-6 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-16 flex flex-col items-center justify-center space-y-8 py-8 border-l border-border">
          {/* Like button */}
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-4 h-3" />
          </div>

          {/* Comment button */}
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-4 h-3" />
          </div>

          {/* Share button */}
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-8 h-3" />
          </div>

          {/* Remix button */}
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-8 h-3" />
          </div>

          {/* More actions */}
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>

          {/* Creator avatar at bottom */}
          <div className="flex-1 flex flex-col justify-end">
            <Skeleton className="w-12 h-12 rounded-full border-2 border-muted" />
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />
    </div>
  );
};

// Skeleton component (assuming this is available from Shadcn)
const Skeleton = ({ className = "" }) => {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
};
