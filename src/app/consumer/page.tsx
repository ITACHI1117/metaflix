"use client";
import { useEffect } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import VideoFeedSkeleton from "@/components/VideoFeedSkeleton";
import { useGetAllVideos } from "@/queries/video.queries";
import { toast } from "sonner";
import { LogUserOut } from "@/store/AuthStore";

export default function HTML5VideoFeed() {
  const AllVideos = useGetAllVideos();

  useEffect(() => {
    if (AllVideos.isSuccess) {
      console.log(AllVideos);
      console.log(AllVideos.data?.length);
    }
  }, [AllVideos.isSuccess]);

  useEffect(() => {
    AllVideos.isError && console.log(AllVideos.error);
  }, [AllVideos.isError]);

  useEffect(() => {
    AllVideos.isPending && console.log("loading");
  }, [AllVideos.isPending]);

  useEffect(() => {
    if (AllVideos.isSuccess && AllVideos.data.length <= 0) {
      toast.info("There are no videos Available, We are logging you out");
      setTimeout(() => {
        LogUserOut();
      }, 5000);
    }
  }, [AllVideos.isSuccess]);

  if (AllVideos.isPending) return <VideoFeedSkeleton />;

  if (AllVideos.data.length <= 0) {
    return <VideoFeedSkeleton />;
  }

  return <VideoPlayer AllVideos={AllVideos} />;
}
