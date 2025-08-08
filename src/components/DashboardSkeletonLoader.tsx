import React from "react";
import { ArrowLeft, Video, Plus, Search, Grid3X3, List } from "lucide-react";

const DashboardSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-background-50">
      {/* Controls Skeleton */}
      <div className="px-6 py-4 border-b border-background-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-background-400 w-4 h-4" />
              <div className="pl-10 pr-4 py-2 border border-background-200 rounded-lg bg-background-100 animate-pulse w-64 h-10"></div>
            </div>
            <div className="px-3 py-2 border border-background-200 rounded-lg bg-background-100 animate-pulse w-32 h-10"></div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-background-200 rounded-lg animate-pulse">
              <Grid3X3 className="w-4 h-4 text-background-400" />
            </div>
            <div className="p-2 bg-background-200 rounded-lg animate-pulse">
              <List className="w-4 h-4 text-background-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid Skeleton */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-background rounded-lg overflow-hidden shadow-sm border border-background-200"
            >
              {/* Video Thumbnail Skeleton */}
              <div className="relative aspect-video bg-background-200 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-12 h-12 text-background-400" />
                </div>
              </div>

              {/* Video Info Skeleton */}
              <div className="p-4">
                <div className="mb-2">
                  <div className="h-5 bg-background-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-background-200 rounded animate-pulse w-3/4"></div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="h-3 bg-background-200 rounded animate-pulse w-20"></div>
                  <div className="h-5 bg-background-200 rounded-full animate-pulse w-16"></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 bg-background-200 rounded animate-pulse w-12"></div>
                    <div className="h-3 bg-background-200 rounded animate-pulse w-12"></div>
                  </div>
                  <div className="w-6 h-6 bg-background-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeletonLoader;
