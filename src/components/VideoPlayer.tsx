import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { getUser, LogUserOut } from "@/store/AuthStore";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Play,
  Search,
  Volume2,
  VolumeOff,
  ThumbsDown,
  Share,
  Zap,
  MoreHorizontal,
  Pause,
  Maximize,
  Menu,
  Plus,
  Mic,
  ThumbsUp,
  MoreVertical,
  Home,
  Compass,
  Film,
  User,
  TrendingUp,
  Share2,
  Bookmark,
  LogOut,
  Layout,
  Hash,
  MessageSquare,
  Headphones,
  HeadphoneOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import CommentSection from "./CommentSection";
import { setVideoId } from "@/store/CommentStore";
import { useGetLikes, useLikeVideo } from "@/queries/likes.queries";
import { useGetComments } from "@/queries/comment.queries";
import { SearchComponent } from "./SearchComponent";
import { motion } from "framer-motion";
import BottomDrawer from "./BottomDrawer";
import LogOutConfirmation from "./LogOutConfirmation";

export const VideoPlayer = ({
  AllVideos,
  setView,
  view,
}: {
  AllVideos: UseQueryResult<any, Error>;
  setView?: Dispatch<SetStateAction<string>>;
  view?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showControls, setShowControls] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");

  const router = useRouter();

  // user details
  const user = getUser();

  const {
    containerRef,
    videoRefs,
    setVolume,
    setVideoStates,
    likedVideos,
    followedUsers,
    videoDurations,
    videoProgress,
    loadedVideos,
    videoStates,
    videosToLoad,
    isMuted,
    isPlaying,
    currentVideoIndex,
    toggleFollow,
    handleScroll,
    handleVideoLoaded,
    handleVideoPlay,
    handleVideoPause,
    handleVideoEnded,
    handleVideoProgress,
    handleVideoDuration,
    handleVideoError,
    togglePlayPause,
    toggleMute,
    seekTo,
  } = useVideoPlayer({ AllVideos });

  const videoId = AllVideos && AllVideos.data[currentVideoIndex].id;
  const Likes = useGetLikes(videoId);
  const LikeVideo = useLikeVideo(videoId);
  const Comments = useGetComments(videoId, { enabled: true });

  const navigationItems = [
    { name: "Home", icon: Home },
    { name: "Discover", icon: Compass },
    { name: "Following", icon: Heart },
    { name: "Live", icon: Film },
    { name: "Profile", icon: User },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-hide controls on mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, showControls]);

  const isVideoLiked = (Likes, LikeVideo) => {
    if (LikeVideo?.data?.isLiked !== undefined) return LikeVideo.data.isLiked;
    if (!Likes.isPending && Likes?.data?.isLiked !== undefined)
      return Likes.data.isLiked;
    return false;
  };

  if (isSearchOpen) {
    return <SearchComponent setIsSearchOpen={setIsSearchOpen} />;
  }

  const currentVideo = AllVideos.data?.[currentVideoIndex];

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Desktop/Tablet Layout */}
      {!isMobile ? (
        <div className="flex h-full">
          {/* Left sidebar - Desktop only */}
          <div className="w-20 bg-card flex flex-col items-center justify-center py-6 space-y-6 z-10">
            {/* Logo */}
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-lg">
                M
              </span>
            </div>

            {/* Navigation Icons */}
            {/* {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    activeNav === item.name
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })} */}

            {/* dashboard  */}
            <button
              onClick={() => router.push("/creator/my-dashboard")}
              className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary text-primary  flex items-center justify-center hover:bg-primary cursor-pointer hover:text-foreground  transition-all duration-200 "
            >
              <Layout className="w-6 h-6 rotate-360deg" />
            </button>
            {/* Search */}
            <button
              onClick={() => router.push("/search")}
              className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary text-primary  flex items-center justify-center text-muted-foreground hover:bg-primary cursor-pointer hover:text-foreground hover:bg-muted transition-all duration-200 "
            >
              <Search className="w-6 h-6" />
            </button>
            {/* Log out */}
            <button
              onClick={() => setIsLogoutOpen((prev) => !prev)}
              className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary text-primary  flex items-center justify-center  hover:bg-primary cursor-pointer hover:text-foreground  transition-all duration-200 "
            >
              <LogOut className="w-6 h-6 rotate-360deg" />
            </button>

            {/* Create */}
            <button
              onClick={() => router.push("/creator/upload")}
              className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all duration-200"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          {/* Main video area */}
          <div className="flex-1 flex">
            {/* Video container */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
              <div
                ref={containerRef}
                className="relative w-full max-w-md h-full overflow-y-auto snap-y snap-mandatory"
                onScroll={handleScroll}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {AllVideos.data?.map((video, index) => (
                  <div
                    key={video.id}
                    className="w-full h-full snap-start relative bg-black flex items-center justify-center"
                  >
                    {videosToLoad.has(index) ? (
                      <div className="relative w-full h-full max-w-md">
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={video?.videoUrl}
                          className="w-full h-full object-contain rounded-lg"
                          muted={isMuted}
                          loop
                          playsInline
                          preload="metadata"
                          onLoadedData={() => handleVideoLoaded(index)}
                          onPlay={() => handleVideoPlay(index)}
                          onPause={() => handleVideoPause(index)}
                        />

                        {/* Bottom Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {currentVideo?.userName?.[0] || "A"}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-semibold">
                                  {currentVideo.userName}
                                </p>
                                <p className="text-gray-300 text-sm">
                                  {currentVideo.creator}
                                </p>
                              </div>
                              <button className="ml-auto bg-primary hover:bg-primary/80 text-primary-foreground px-4  rounded-full text-sm font-medium transition-colors">
                                MetaFlix Creator🔔
                              </button>
                            </div>

                            <h1 className="text-white text-sm leading-relaxed">
                              {currentVideo.title}
                            </h1>
                            <p className="text-white text-sm leading-relaxed">
                              {currentVideo.description}
                            </p>

                            {/* Trending Audio */}
                            <div className="flex items-center space-x-2 text-white">
                              <Hash className="w-4 h-4" />
                              <span className="text-sm flex gap-2">
                                {video?.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-white text-sm"
                                  >
                                    #{tag}
                                  </span>
                                )) || <></>}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Progress bar at bottom of video */}
                        {videoProgress[index] && videoDurations[index] && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <div
                              className="w-full bg-white/30 rounded-full h-1 cursor-pointer"
                              onClick={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                const percent =
                                  (e.clientX - rect.left) / rect.width;
                                const seekTime =
                                  percent * videoDurations[index];
                                seekTo(index, seekTime);
                              }}
                            >
                              <div
                                className="bg-red-500 rounded-full h-1 transition-all duration-300"
                                style={{
                                  width: `${
                                    (videoProgress[index].played || 0) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full max-w-md h-96 bg-gray-900 rounded-lg flex items-center justify-center">
                        <div className="text-white/60 text-center">
                          <div className="text-sm">{video.title}</div>
                          <div className="text-xs mt-1">Loading...</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar with actions */}
            <div className="w-20 flex flex-col items-center justify-center space-y-6  bg-card/50 backdrop-blur-sm">
              {/* Like */}
              <div className="flex flex-col items-center group">
                <button
                  onClick={() => LikeVideo.mutate()}
                  className={`w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center
                     text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 group-hover:scale-110`}
                >
                  <Heart className="w-7 h-7" />
                </button>
                <span className="text-foreground text-xs font-medium mt-2">
                  {currentVideo.likes || "10"}
                </span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center group">
                <button
                  onClick={() => {
                    setSelectedVideoId(currentVideo?.id);
                    setIsOpen(true);
                  }}
                  className="w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 group-hover:scale-110"
                >
                  <MessageSquare className="w-7 h-7" />
                </button>
                <span className="text-foreground text-xs font-medium mt-2">
                  {currentVideo.comments}
                </span>
              </div>

              <div className="flex flex-col items-center group">
                <button
                  className={`w-14 h-14 rounded-full bg-muted/80 backdrop-blur-sm flex items-center justify-center text-foreground ${
                    !isMuted && "bg-primary"
                  } hover:bg-primary cursor-pointer hover:text-primary-foreground transition-all duration-200 group-hover:scale-110`}
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeOff className="w-7 h-7" />
                  ) : (
                    <Volume2 className="w-7 h-7" />
                  )}
                </button>
              </div>

              {/* Creator Avatar */}
              <div className="mt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-primary flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">
                    {currentVideo?.userName?.[0].toUpperCase() || "X"}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="w-20 bg-primary flex flex-col items-center justify-center space-y-6 py-8">
              
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 ${
                    isVideoLiked(Likes, LikeVideo)
                      ? "bg-primary text-white-"
                      : "text-white"
                  } transition-colors`}
                  onClick={() => LikeVideo.mutate()}
                >
                  <ThumbsUp className={`w-6 h-6 `} />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  {Likes?.data?.totalLikes || "7.4K"}
                </span>
              </motion.div>

              
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setSelectedVideoId(currentVideo?.id);
                    setIsOpen(true);
                  }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  {Comments?.data?.length || "97"}
                </span>
              </motion.div>

             
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Share className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  Share
                </span>
              </motion.div>

              
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Zap className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  Remix
                </span>
              </motion.div>

              
              <div className="mt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentVideo?.userName?.[0]}
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        /* Mobile Layout */
        <div
          className="h-full relative"
          onClick={() => setShowControls(!showControls)}
        >
          {/* Mobile top bar */}

          <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent pt-safe">
            <div className="flex items-center justify-between p-4 pt-8">
              <div className="flex items-center space-x-2 ">
                <div className="w-10 h-10 rounded-full bg-primary mr-4  flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {(user && user.username[0]) || "T"}
                  </span>
                </div>
                <Search
                  onClick={() => router.push("/search")}
                  className="w-6 h-6 text-white"
                />
              </div>
              <div className="flex items-center space-x-4">
                {user && user.role == "Consumer" ? (
                  <button
                    onClick={() => setIsLogoutOpen((prev) => !prev)}
                    className="w-6 h-6 text-white   "
                  >
                    <LogOut className="w-6 h-6 rotate-360deg" />
                  </button>
                ) : (
                  <Menu
                    onClick={() => setIsDrawerOpen((prev) => !prev)}
                    className="w-6 h-6 text-white"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Video feed */}
          <div
            ref={containerRef}
            className="h-full overflow-y-scroll snap-y snap-mandatory"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {AllVideos.data?.map((video, index) => (
              <div
                key={video.id}
                className="w-full h-full snap-start relative bg-black flex items-center justify-center"
              >
                {videosToLoad.has(index) ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video?.videoUrl}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleVideoLoaded(index)}
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-white/60 text-center">
                      <div className="text-sm">{video.title}</div>
                      <div className="text-xs mt-1">Loading...</div>
                    </div>
                  </div>
                )}

                {/* Play/Pause overlay */}

                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    isPlaying ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <button
                    onClick={togglePlayPause}
                    className="bg-black/60 rounded-full p-6"
                  >
                    <Play className="w-12 h-12 text-white fill-white" />
                  </button>
                </div>

                {/* Right side actions - Mobile */}
                <div className=" absolute right-0 p-2 py-6 rounded-l-4xl bottom-10 flex flex-col items-center z-10 space-y-6">
                  {/* Creator avatar */}
                  <div className="mt-2">
                    <div className="w-13 h-13 rounded-full bg-primary border-2 border-foreground flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {video?.userName?.[0].toUpperCase() || "T"}
                      </span>
                    </div>
                    <p
                      className="text-sm mt-2 truncate max-w-[100px]"
                      title={video.userName}
                    >
                      {video.userName.length > 7
                        ? video.userName.slice(0, 7) + "..."
                        : video.userName}
                    </p>
                  </div>

                  {/* Like button */}
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isVideoLiked(Likes, LikeVideo)
                          ? "bg-primary text-white"
                          : "bg-black/40"
                      }`}
                      onClick={() => LikeVideo.mutate()}
                    >
                      <Heart className={`w-7 h-7 `} />
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      {Likes?.data?.totalLikes || "0"}
                    </span>
                  </motion.div>

                  {/* Comments button */}
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40"
                      onClick={() => {
                        setSelectedVideoId(video.id);
                        setIsOpen(true);
                      }}
                    >
                      <MessageSquare className="w-7 h-7 text-white" />
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      {Comments?.data?.length || "0"}
                    </span>
                  </motion.div>

                  {/* Volume button */}
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <HeadphoneOff className="w-6 h-6 text-white" />
                      ) : (
                        <Headphones className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </motion.div>
                </div>

                {/* Bottom content - Mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white text-lg font-medium">
                      @{video?.userName || ""}
                    </span>
                    <button className="bg-primary text-white text-sm px-3 py-1 font-medium">
                      MetaFlix Creator 🔔
                    </button>
                  </div>

                  <p className="text-white text-lg mb-2 leading-relaxed">
                    {video?.description || "Don't worry, we got you 😉"}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {video?.tags?.map((tag) => (
                      <span key={tag} className="text-white text-lg">
                        #{tag}
                      </span>
                    )) || <></>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CommentSection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedVideoId={videoId}
      />

      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        user={user}
      />

      {/* Log out Dialog */}
      <LogOutConfirmation
        isLogoutOpen={isLogoutOpen}
        setIsLogoutOpen={setIsLogoutOpen}
      />
    </div>
  );
};
