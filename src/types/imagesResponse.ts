export type ImagesResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
  mime_type: string;
  [key: string]: unknown;
}[];
