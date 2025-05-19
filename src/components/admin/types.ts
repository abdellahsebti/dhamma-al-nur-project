import { Timestamp } from 'firebase/firestore';

export interface Benefit {
  id: string;
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

export interface CoffeeStory {
  id: string;
  title: string;
  author: string;
  summary: string;
  cover?: string;
  chaptersCount: number;
}

export interface Chapter {
  id: string;
  storyId: string;
  title: string;
  orderNumber: number;
  content: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  views: number;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  episodeNumber: number;
  season: number;
  guests?: string[];
  showNotes?: string;
  audioUrl: string;
  coverUrl: string;
  listens: number;
  featured: boolean;
  youtubeUrl?: string;
  spotifyUrl?: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  status: 'new' | 'read' | 'replied';
}

export interface BenefitFormValues {
  bookName: string;
  volumeAndPage: string;
  benefitText: string;
  scholarComment?: string;
  category: string;
}

export interface CoffeeStoryFormValues {
  title: string;
  author: string;
  summary: string;
  coverFile?: FileList;
}

export interface ChapterFormValues {
  title: string;
  orderNumber: number;
  content: string;
}

export interface VideoFormValues {
  title: string;
  description: string;
  category: string;
  duration: string;
  youtubeUrl: string;
}

export interface PodcastFormValues {
  title: string;
  description: string;
  category: string;
  duration: string;
  episodeNumber?: number;
  season?: number;
  guests?: string;
  showNotes?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
} 