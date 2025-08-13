import { getRating, rateVideo } from "@/service/rating.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface rateVideo {
  videoId?: string;
  score?: number;
}
export const useRateVideo = (videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ score }: { score: number }) => rateVideo({ videoId, score }),
    onMutate: async ({ score }: { score: number }) => {
      await queryClient.cancelQueries(["get-rating", videoId]);

      const previousData = queryClient.getQueryData(["get-rating", videoId]);

      queryClient.setQueryData(["get-rating", videoId], (old: any) => {
        if (!old) return old;

        const totalRatings = old.data.totalRatings + 1;
        const averageRating = score;
        //   (old.data.averageRating * old.data.totalRatings + score) /
        //   totalRatings;
        return {
          ...old,
          data: {
            ...old.data,
            averageRating,
            totalRatings,
          },
        };
      });
      return { previousData };
    },
    onError: (error, _vars, context) => {
      queryClient.setQueryData(["get-rating", videoId], context?.previousData);
      toast.error("Could'nt rate video ");
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["get-rating", videoId]);
    },
  });
};

export const useGetRating = (videoId) => {
  return useQuery({
    queryKey: ["get-rating", videoId],
    queryFn: () => {
      return getRating(videoId);
    },
  });
};
