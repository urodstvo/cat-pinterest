import { useInfiniteQuery } from '@tanstack/react-query';
import { getImagesRequest } from '../requests';
import { ImagesResponse } from '@/types';

export const useGetImages = () =>
  useInfiniteQuery({
    queryKey: ['images'],
    queryFn: async ({ pageParam }) => {
      const res = await getImagesRequest(pageParam);
      if (!res.ok) throw new Error('');

      const data = (await res.json()) as ImagesResponse;
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastPage, _allPages, lastPageParam) => lastPageParam + 1,
    retry: false,
  });
