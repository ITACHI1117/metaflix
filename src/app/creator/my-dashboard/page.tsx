"use client";
import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Video,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Clock,
  Trash2,
  Edit3,
  MoreVertical,
  Search,
  Grid3X3,
  List,
  Download,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Zap,
  Info,
  ChevronDown,
  Save,
  ArrowLeft,
} from "lucide-react";
import { UploadVideoComponent } from "@/components/creator/UploadVideoComponent";
import { useRouter } from "next/navigation";
import { LogUserOut } from "@/store/AuthStore";
import {
  useDeleteVideoByID,
  useGetAllVideos,
  useGetMyVideos,
} from "@/queries/video.queries";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/VideoPlayer";
import DashboardSkeletonLoader from "@/components/DashboardSkeletonLoader";

export default function CreatorDashboard() {
  const [view, setView] = useState("dashboard"); // dashboard, upload
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState();
  const router = useRouter();

  // Upload form state
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    genre: "",
    ageRating: "General",
    videoYear: new Date().getFullYear(),
    tags: [],
    videoFile: null,
  });
  const [newTag, setNewTag] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Mock user videos data
  const [userVideos, setUserVideos] = useState(null);

  const myVideos = useGetMyVideos();
  useEffect(() => {
    if (myVideos.isSuccess) {
      console.log(myVideos);
      myVideos.data.filter((video) => {
        console.log(video);
      });
      setUserVideos(myVideos.data);
      console.log(myVideos.data?.length);
    }
  }, [myVideos.isSuccess]);

  useEffect(() => {
    if (myVideos.isError) {
      console.log(myVideos.error);
      toast.error("Error Loading videos😢", {
        description:
          "Please check your network and try again. Close this Message to try again",
        // duration: myVideos.isError ? Infinity : 10,
        // onDismiss: myVideos.refetch(),
      });
    }
  }, [myVideos.isError]);

  useEffect(() => {
    myVideos.isPending && console.log("loading");
  }, [myVideos.isPending]);

  const DeleteVideo = useDeleteVideoByID();

  // useEffect(() => {}, []);

  const genres = [
    "Technology",
    "Education",
    "Entertainment",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Lifestyle",
    "Travel",
    "Cooking",
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleVideoUpload = (file) => {
    if (file && file.type.startsWith("video/")) {
      setUploadData((prev) => ({ ...prev, videoFile: file }));
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    // API call would go here
    // DELETE /api/videos/{videoPostId}
    try {
      const promise = DeleteVideo.mutateAsync(videoId);

      toast.promise(promise, {
        success: () => "Video Deleted",
        error: "There was an error deleting the video",
      });

      await promise; // ⬅️ wait for the delete to finish

      // Then update state
      setUserVideos((prev) => prev.filter((video) => video.id !== videoId));
      setShowDeleteModal(false);
      setVideoToDelete(null);
    } catch (error) {
      console.error("Error deleting video:", error);
      // You can show a fallback toast here if needed
    }
  };

  const filteredVideos =
    userVideos != null &&
    userVideos?.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = filterGenre === "all" || video.genre === filterGenre;
      return matchesSearch && matchesGenre;
    });

  // const totalStats =
  //   userVideos != null &&
  //   userVideos.reduce(
  //     (acc, video) => ({
  //       views: acc.views + video.stats.views,
  //       likes: acc.likes + video.stats.likes,
  //       comments: acc.comments + video.stats.comments,
  //       shares: acc.shares + video.stats.shares,
  //     }),
  //     { views: 0, likes: 0, comments: 0, shares: 0 }
  //   );

  // log user out
  const handleLogOut = () => {
    LogUserOut();
    console.log("logged out");
    router.push("auth/login");
    // routerServerGlobal.
  };

  useEffect(() => {
    console.log(view);
    console.log({ data: [selectedVideo] });
  }, [selectedVideo]);

  if (myVideos.isError) {
    return (
      <h1>
        Error loading Videos, please check your network and refresh your browser
      </h1>
    );
  }

  if (myVideos.isPending) {
    return <DashboardSkeletonLoader />;
  }

  if (view === "upload") {
    return <UploadVideoComponent view={view} setView={setView} />;
  }

  if (view == "video") {
    return (
      <VideoPlayer
        AllVideos={{ data: [selectedVideo] }}
        view={view}
        setView={setView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center justify-between px-1 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-md font-bold">My Videos</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Videos Grid/List */}
      <div className="p-6">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {userVideos && userVideos.data.length === 0
                ? "No videos yet"
                : "No videos found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {userVideos && userVideos.data.length === 0
                ? "Upload your first video to get started"
                : "Try adjusting your search or filters"}
            </p>
            {userVideos && userVideos.data.length === 0 && (
              <button
                onClick={() => setView("upload")}
                className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Video</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos &&
                  filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className=" bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div
                        onClick={() => {
                          setSelectedVideo(video);
                          setView("video");
                        }}
                        className="relative aspect-video bg-muted cursor-pointer"
                      >
                        <video
                          src={video.videoUrl}
                          poster={video.thumbnailUrl}
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-lg mb-0 line-clamp-2">
                            {video.title}
                          </h3>
                          <span className="text-sm ">{video.description}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>{formatDate(video.uploadedAt)}</span>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {video.genre}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center space-x-1">
                              {/* <Eye className="w-3 h-3" /> */}
                              {/* <span>{formatNumber(video.stats.views)}</span> */}
                            </span>
                            <span className="flex items-center space-x-1">
                              {/* <Heart className="w-3 h-3" /> */}
                              {/* <span>{formatNumber(video.stats.likes)}</span> */}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setVideoToDelete(video.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVideos &&
                  filteredVideos.map((video) => (
                    <div
                      onClick={() => {
                        setSelectedVideo(video);
                      }}
                      key={video.id}
                      className="bg-card rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4 cursor-pointer">
                        <div
                          onClick={() => {
                            setSelectedVideo(video);
                            setView("video");
                          }}
                          className="relative w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0"
                        >
                          <video
                            src={video.videoUrl}
                            className="w-full h-full object-cover"
                            muted
                            preload="metadata"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white opacity-70" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1 truncate">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {video.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {video.genre}
                            </span>
                            <span>{formatDate(video.uploadedAt)}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setVideoToDelete(video.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2
                              onClick={() => {
                                setVideoToDelete(video.id);
                                setShowDeleteModal(true);
                              }}
                              className="w-6 h-6"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && videoToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Delete Video</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-sm mb-6">
              Are you sure you want to delete "{videoToDelete.title}"? This will
              permanently remove the video and all its data.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setVideoToDelete(null);
                }}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteVideo(videoToDelete)}
                className=" cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="border-b border-border bg-card/50 backdrop-blur-lg sticky bottom-0 z-40">
        <div className="flex items-center justify-center w-full px-3 py-4">
          <button
            onClick={() => setView("upload")}
            className="flex w-full md:w-[60%] items-center justify-center text-center space-x-2 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white px-4 py-2 rounded-full font-medium transition-all"
          >
            <p>+ New video</p>
          </button>
        </div>
      </footer>
    </div>
  );
}
