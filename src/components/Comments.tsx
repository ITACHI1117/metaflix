"use client";
import { getUser } from "@/store/AuthStore";
import { Heart, MoreHorizontal } from "lucide-react";
import { useState } from "react";

// Comment Component
export const Comment = ({ comment, onLike }) => {
  // const [isLiked, setIsLiked] = useState(comment.isLiked);
  // const [likes, setLikes] = useState(comment.likes);

  // const handleLike = () => {
  //   setIsLiked(!isLiked);
  //   setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  //   onLike(comment.id, !isLiked);
  // };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInHours = Math.floor((now - commentTime) / (1000 * 60 * 60));

    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="flex space-x-3 py-4">
      <div className="w-8 h-8 border-2 border-gray rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white font-bold text-md">
        {comment.userName[0]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm text-foreground">
            {comment.userName}
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-foreground mb-2">{comment.content}</p>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
