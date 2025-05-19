import { Video, VideoFormValues } from '@/components/admin/types';

const API_BASE_URL = '/api/admin';

export const api = {
  videos: {
    get: async (): Promise<Video[]> => {
      const response = await fetch(`${API_BASE_URL}/videos`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      return response.json();
    },
    add: async (data: VideoFormValues): Promise<Video> => {
      const response = await fetch(`${API_BASE_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add video');
      }
      return response.json();
    },
    update: async (id: string, data: Partial<VideoFormValues>): Promise<Video> => {
      const response = await fetch(`${API_BASE_URL}/videos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      });
      if (!response.ok) {
        throw new Error('Failed to update video');
      }
      return response.json();
    },
    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/videos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete video');
      }
    },
  },
}; 