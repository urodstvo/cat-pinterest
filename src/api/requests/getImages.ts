import { CAT_API_KEY, CAT_API_URL } from '@/constants/env';

export const getImagesRequest = () => {
  const url = new URL(CAT_API_URL + '/images/search');
  const searchParams = new URLSearchParams();

  searchParams.append('limit', '15');
  searchParams.append('order', 'desc');
  searchParams.append('size', 'thumb');
  searchParams.append('mime_types', 'jpg');
  searchParams.append('api_key', CAT_API_KEY);

  url.search = searchParams.toString();

  const api_url = url.toString();

  return fetch(api_url);
};
