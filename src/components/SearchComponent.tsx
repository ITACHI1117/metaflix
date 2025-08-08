"use client";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Play,
  Sparkles,
  BookOpen,
  Newspaper,
  Dumbbell,
  Plane,
  Utensils,
  Zap,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  Wifi,
  WifiOff,
  Laugh,
  Drama,
  MonitorPlay,
  GalleryVerticalEnd,
  Check,
  Gamepad2,
  Music,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchSkeleton from "./SearchSkeleton";
import { useRouter } from "next/navigation";
import { useSearch } from "@/queries/search.queries";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/store/AuthStore";
import { VideoPlayer } from "./VideoPlayer";
import { motion } from "framer-motion";
import FilterDialog from "./FilterDialog";

// No Results Component
function NoResults({ searchQuery, onClearSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No videos found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {searchQuery
          ? `We couldn't find any videos matching "${searchQuery}". Try adjusting your search or filters.`
          : "No videos match your current filters. Try broadening your search criteria."}
      </p>
      <div className="space-y-3">
        <Button onClick={onClearSearch} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Clear Search
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>Suggestions:</p>
          <ul className="mt-2 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try different keywords</li>
            <li>• Use fewer filters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Error Component
function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
        <WifiOff className="w-12 h-12 text-destructive" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Connection Error</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        We're having trouble loading the searched videos. Please check your
        internet connection and try again.
      </p>
      <div className="space-y-3">
        <Button onClick={onRetry} className="min-w-32">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <AlertTriangle className="w-4 h-4" />
          <span>If the problem persists, contact support</span>
        </div>
      </div>
    </div>
  );
}

export const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();
  const [view, setView] = useState("search");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasFilterChanges, setHasFilterChanges] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const SearchQuery = useSearch(
    {
      query: debouncedSearchQuery,
      genre: selectedGenre === "all" ? "" : selectedGenre,
      year: selectedYear == "all" ? "" : selectedYear,
    },
    {
      enabled:
        searchQuery != "" || selectedGenre != "all" || selectedYear != "all",
    }
  );

  const [isLoading, setIsLoading] = useState(SearchQuery.isPending);
  const [hasError, setHasError] = useState(SearchQuery.isError);

  // get logged in user
  const { user } = useAuthStore();

  const router = useRouter();
  const searchInputRef = useRef(null);

  // Mock data for demonstration
  const mockResults = [
    {
      id: "1",
      title: "Amazing React Tutorial for Beginners 🚀",
      description: "Learn React from scratch with this comprehensive tutorial",
      genre: "Technology",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-23T17:04:16.315Z",
      tags: ["react", "tutorial", "javascript", "webdev"],
      user: {
        username: "@techguru_dev",
        displayName: "Tech Guru",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
      stats: {
        views: 125400,
        likes: 8900,
        comments: 342,
        shares: 156,
      },
    },
    {
      id: "2",
      title: "Epic Gaming Montage 2024 🎮",
      description: "The best gaming moments compiled into one epic video",
      genre: "Gaming",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-22T14:22:33.215Z",
      tags: ["gaming", "montage", "epic", "2024"],
      user: {
        username: "@gamemaster_pro",
        displayName: "GameMaster",
        avatar: "/api/placeholder/40/40",
        verified: false,
      },
      stats: {
        views: 89200,
        likes: 6100,
        comments: 189,
        shares: 94,
      },
    },
    {
      id: "3",
      title: "Cooking Italian Pasta Like a Pro 🍝",
      description: "Master the art of authentic Italian pasta making",
      genre: "Lifestyle",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      videoYear: 2024,
      uploadedAt: "2025-07-21T09:15:47.892Z",
      tags: ["cooking", "italian", "pasta", "chef"],
      user: {
        username: "@chef_mario",
        displayName: "Chef Mario",
        avatar: "/api/placeholder/40/40",
        verified: true,
      },
      stats: {
        views: 67300,
        likes: 4200,
        comments: 198,
        shares: 78,
      },
    },
  ];

  const genres = [
    { value: "all", label: "All Categories", icon: Sparkles },
    { value: "Comedy", label: "Comedy", icon: Laugh },
    { value: "Music", label: "Music", icon: Music },
    { value: "Sports", label: "Sports", icon: Dumbbell },
    { value: "Drama", label: "Drama", icon: Drama },
    { value: "Tutorial", label: "Tutorial", icon: MonitorPlay },
    { value: "Gaming", label: "Gaming", icon: Gamepad2 },
    { value: "Other", label: "Other", icon: GalleryVerticalEnd },
  ];

  const years = [
    { value: "all", label: "All Years" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ];

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim() && selectedGenre === "all" && selectedYear === "all") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setIsSearching(true);
    setHasError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let filteredResults = mockResults.filter((video) => {
        const matchesQuery =
          !query.trim() ||
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.description.toLowerCase().includes(query.toLowerCase()) ||
          video.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          );

        const matchesGenre =
          selectedGenre === "all" || video.genre === selectedGenre;
        const matchesYear =
          selectedYear === "all" || video.videoYear.toString() === selectedYear;

        return matchesQuery && matchesGenre && matchesYear;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      setHasError(true);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedYear("all");
    setSearchResults([]);
    setIsSearching(false);
    setHasFilterChanges(false);
    searchInputRef.current?.focus();
  };

  const clearFilters = () => {
    setSelectedGenre("all");
    setSelectedYear("all");
    setHasFilterChanges(true);
  };

  const saveFilters = () => {
    setIsDrawerOpen(false);
    setHasFilterChanges(false);
    // Trigger search with new filters
    handleSearch();
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    setHasFilterChanges(true);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    setHasFilterChanges(true);
  };

  const hasActiveFilters = selectedGenre !== "all" || selectedYear !== "all";
  const showResults = isSearching && !isLoading;
  const hasResults = SearchQuery && SearchQuery.data?.length > 0;

  // Debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Filters
  useEffect(() => {
    if (!hasFilterChanges) {
      handleSearch();
    }
  }, [selectedGenre, selectedYear]);

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
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-40">
        <div className="container flex items-center gap-4 py-4 px-4 max-w-4xl mx-auto">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                ref={searchInputRef}
                placeholder="Search videos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-12"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <FilterDialog
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            selectedGenre={selectedGenre}
            handleGenreChange={handleGenreChange}
            genres={genres}
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            years={years}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            saveFilters={saveFilters}
          />
          {/* Filter Drawer */}
        </div>
      </header>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="bg-muted/50 border-b">
          <div className="container py-3 px-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {selectedGenre !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {genres.find((g) => g.value === selectedGenre)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedGenre("all")}
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedYear !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedYear}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedYear("all")}
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container py-6 px-4 max-w-4xl mx-auto">
        {!isSearching && !isLoading ? (
          /* Initial State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Discover Content</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Search for videos and creators. Use filters to find exactly what
              you're looking for.
            </p>
          </div>
        ) : searchQuery !== "" && SearchQuery.isPending ? (
          /* Loading State */
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="flex space-x-4">
                  <div className="relative w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 animate-pulse"></div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-5/6 animate-pulse"></div>
                    <div className="flex space-x-4">
                      <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                      <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : hasError ? (
          /* Error State */
          <ErrorState onRetry={handleRetry} />
        ) : !hasResults ? (
          /* No Results */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Videos Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find "{searchQuery}"
            </p>
            <Button variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          </div>
        ) : (
          /* Results List */
          <div className="space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {searchQuery ? `"${searchQuery}" results` : "Search Results"}
                </h2>
                <p className="text-muted-foreground">
                  {SearchQuery && SearchQuery.data?.length} video
                  {SearchQuery && SearchQuery.data?.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {SearchQuery &&
                SearchQuery.data?.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      onClick={() => {
                        setSelectedVideo(video);
                        setView("video");
                      }}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          {/* Video Thumbnail */}
                          <div className="relative w-32 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <video
                              src={video.videoUrl}
                              className="w-full h-full object-cover"
                              muted
                              poster={
                                video.thumbnailUrl ? video.thumbnailUrl : ""
                              }
                              preload="metadata"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 flex items-center justify-center">
                              <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
                                <Play className="h-5 w-5 text-primary fill-primary" />
                              </div>
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="flex-1 min-w-0 space-y-2">
                            <h3 className="font-semibold line-clamp-2">
                              {video.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {video.description}
                            </p>

                            {/* Creator Info */}
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-medium">
                                {video.userName[0]}
                              </div>
                              <span className="text-sm font-medium">
                                {video.userName}
                              </span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex flex-wrap gap-1">
                                {video.tags.slice(0, 2).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    #{tag}
                                  </Badge>
                                ))}
                                {video.tags.length > 2 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    +{video.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
