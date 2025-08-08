"use client";
import VideoFeedSkeleton, {
  DesktopVideoSkeletonLoader,
} from "@/components/VideoFeedSkeleton";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useAllVideos } from "@/hooks/useAllVideos";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HTML5VideoFeed() {
  const { AllVideos } = useAllVideos();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (AllVideos.isPending) {
    if (isDesktop) {
      return <DesktopVideoSkeletonLoader />;
    } else return <VideoFeedSkeleton />;
  }

  return <VideoPlayer AllVideos={AllVideos} />;
}
