import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArtworks, fetchArtworkById, createArtwork, deleteArtworkCloud } from "@/services";
import { type Artwork, type Medium } from "@/types/artwork";

export const ARTWORKS_QUERY_KEY = ["artworks"] as const;

export function useArtworksQuery(medium?: Medium | "all") {
  return useQuery({
    queryKey: [...ARTWORKS_QUERY_KEY, medium || "all"],
    queryFn: () => fetchArtworks(medium),
    staleTime: 1000 * 60 * 10, // 10 minutes cache freshness
    gcTime: 1000 * 60 * 60, // Keep in memory 60 mins
  });
}

export function useArtworkDetailQuery(id: string) {
  return useQuery({
    queryKey: [...ARTWORKS_QUERY_KEY, "detail", id],
    queryFn: () => fetchArtworkById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateArtworkMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, token }: { formData: FormData; token: string }) =>
      createArtwork(formData, token),
    onSuccess: (newArtwork) => {
      // Invalidate all artwork queries so gallery/home/detail refresh immediately
      queryClient.invalidateQueries({ queryKey: ARTWORKS_QUERY_KEY });
    },
  });
}

export function useDeleteArtworkMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }: { id: string; token?: string }) => deleteArtworkCloud(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ARTWORKS_QUERY_KEY });
    },
  });
}
