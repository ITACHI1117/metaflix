import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useGetRating, useRateVideo } from "@/queries/rating.queries";

export const RatingDialog = ({
  isOpen,
  setIsOpen,
  currentVideoId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentVideoId: string;
}) => {
  const [filledStar, setFilledStar] = useState(0);
  const star = [1, 2, 3, 4, 5];

  const useRateVideoQuery = useRateVideo(currentVideoId);

  const handleClick = (index: number) => {
    setFilledStar(index);
    useRateVideoQuery.mutate({
      score: index,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setFilledStar(0);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate Video</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4">
            {star.map((star) => (
              <Star
                key={star}
                className={
                  star <= filledStar ? `text-yellow-500` : `text-white`
                }
                fill={star <= filledStar ? `currentColor` : ""}
                onClick={() => handleClick(star)}
              ></Star>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
