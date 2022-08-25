export interface ApiNew {
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  video_url: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  country: string[];
  category: string[];
  language: string;
}

export interface Response {
  status: string;
  totalResults: number;
  results: ApiNew[];
}

export interface New {
  title: string;
  link: string;
  description: string;
  image: string;
}
