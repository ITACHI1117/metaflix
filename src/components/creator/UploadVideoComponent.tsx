import { useCreateVideoPosts } from "@/queries/video.queries";
import { getUploadStatus } from "@/store/VideoUpload";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Tag,
  Upload,
  X,
  Video,
  FileText,
  Calendar,
  Users,
  Hash,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export const UploadVideoComponent = ({
  view,
  setView,
}: {
  view?: string;
  setView?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [MAX_FILE_SIZE_MB] = useState(200);

  const router = useRouter();

  // Upload form state
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    genre: "Other",
    ageRating: "Restricted",
    videoYear: new Date().getFullYear(),
    tags: [],
    videoFile: null,
  });
  const [newTag, setNewTag] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [step, setStep] = useState(1);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const UploadVideo = useCreateVideoPosts((progress) => {
    setUploadProgress(progress);
  });

  const genres = ["Comedy", "Music", "Sports", "Drama", "Tutorial", "Other"];
  const ageRatings = ["Everyone", "Teens", "Mature", "Restricted"];

  const handleVideoUpload = (file) => {
    if (file && file.type.startsWith("video/")) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error("Upload a smaller file!", {
          description: "Uploaded videos must be 250MB or less.",
        });
      } else {
        setUploadData((prev) => ({ ...prev, videoFile: file }));
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleVideoUpload(files[0]);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !uploadData.tags.includes(newTag.trim())) {
      setUploadData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setUploadData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleUpload = async () => {
    if (!uploadData.title || !uploadData.genre || !uploadData.videoFile) return;

    setIsUploading(true);
    await UploadVideo.mutateAsync(uploadData);

    // Reset form after successful upload
    setUploadData({
      title: "",
      description: "",
      genre: "Other",
      ageRating: "Restricted",
      videoYear: new Date().getFullYear(),
      tags: [],
      videoFile: null,
    });
    setVideoPreview(null);
    setIsUploading(false);
    setUploadProgress("0");
    router.back();
  };

  useEffect(() => {
    UploadVideo.isSuccess && toast.success("Video Uploaded");
  }, [UploadVideo.isSuccess]);

  useEffect(() => {
    UploadVideo.isError &&
      toast.error("Failed to upload video, Please try again");
  }, [UploadVideo.isError]);

  const isFormValid =
    uploadData.title && uploadData.genre && uploadData.videoFile;

  return (
    <div className="w-full flex flex-col items-center bg-background">
      {/* Upload Progress */}
      {isUploading && (
        <div className="border-b bg-muted/50 px-0 py-0 w-full sticky mt-0 top-0 z-20">
          <div className=" flex items-center justify-center ">
            <Progress value={Number(uploadProgress)} className="h-2 w-full" />
            <div className="flex-1"></div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-2 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                view ? setView && setView("dashboard") : router.back()
              }
              className="h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Upload className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Upload</h1>
                <p className="text-sm text-muted-foreground">
                  Upload videos for others to see
                </p>
              </div>
            </div>
          </div>
          <div>
            {isUploading && (
              <span className="text-sm text-muted-foreground">
                {uploadProgress}%
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="container py-6 px-4 md:px-0 mt-5">
        <div className="grid gap-6 lg:grid-cols-1">
          {/* step 1 */}
          {/* Video Upload Section */}
          {step == 1 ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Video Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!videoPreview ? (
                    <div
                      className={`relative flex aspect-[9/16] w-full max-w-sm mx-auto cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-muted-foreground/25 hover:border-muted-foreground/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">
                          Upload a video
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Drag and drop your video here, or click to browse
                        </p>
                        <Button variant="secondary">Select File</Button>
                        <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                          <p>Supports: MP4, MOV, AVI, WebM</p>
                          <p>Maximum size: 300MB</p>
                          <p>Vertical videos work best for mobile</p>
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          e.target.files[0] &&
                          handleVideoUpload(e.target.files[0])
                        }
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-muted">
                      <video
                        ref={videoRef}
                        src={videoPreview}
                        className="h-full w-full object-cover"
                        controls
                        muted
                      />
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-2 top-2 h-8 w-8"
                        onClick={() => {
                          setVideoPreview(null);
                          setUploadData((prev) => ({
                            ...prev,
                            videoFile: null,
                          }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Video Preview Info */}
              {videoPreview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Video Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File size:</span>
                      <span>
                        {uploadData.videoFile
                          ? `${(
                              uploadData.videoFile.size /
                              (1024 * 1024)
                            ).toFixed(2)} MB`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span>{uploadData.videoFile?.type || "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            //    {/* step 2 */}
            // {/* Form Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Video Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Textarea
                      id="title"
                      placeholder="Give your video a catchy title..."
                      value={uploadData.title}
                      onChange={(e) =>
                        setUploadData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="min-h-[80px] resize-none"
                      maxLength={150}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>A good title helps people find your video</span>
                      <span>{uploadData.title.length}/150</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell viewers what your video is about..."
                      value={uploadData.description}
                      onChange={(e) =>
                        setUploadData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="min-h-[100px] resize-none"
                      maxLength={500}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {uploadData.description.length}/500
                    </div>
                  </div>

                  <Separator />

                  {/* Category and Age Rating */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="genre">Category *</Label>
                      <Select
                        value={uploadData.genre}
                        onValueChange={(value) =>
                          setUploadData((prev) => ({ ...prev, genre: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ageRating">Age Rating</Label>
                      <Select
                        value={uploadData.ageRating}
                        onValueChange={(value) =>
                          setUploadData((prev) => ({
                            ...prev,
                            ageRating: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ageRatings.map((rating) => (
                            <SelectItem key={rating} value={rating}>
                              {rating}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <Label htmlFor="year" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      min="1900"
                      max="2030"
                      value={uploadData.videoYear}
                      onChange={(e) =>
                        setUploadData((prev) => ({
                          ...prev,
                          videoYear: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      className="flex-1"
                    />
                    <Button onClick={addTag} size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {uploadData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Tags help people discover your content. Add relevant
                    keywords.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div className="w-full px-4 md:px-10">
          {step == 1 ? (
            <Button
              onClick={() => setStep((prev) => prev + 1)}
              className="gap-2 w-full mt-10 cursor-pointer"
            >
              Next
            </Button>
          ) : (
            <div className="flex gap-4 w-full mt-10 items-center justify-center px-10">
              <Button
                onClick={() => setStep((prev) => prev - 1)}
                variant={"outline"}
                className=""
              >
                Back
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!isFormValid || isUploading}
                className="gap-2  cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Publish
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
