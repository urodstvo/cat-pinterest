import { useQuery } from '@tanstack/react-query';
import { getImagesRequest } from '../requests';
import { ImagesResponse } from '@/types';

export const useGetImages = () =>
  useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const res = await getImagesRequest();
      if (!res.ok) throw new Error('');

      const data = (await res.json()) as ImagesResponse;
      return data;
    },
    retry: false,
  });
