import { envConfig } from '../utils/envConfig';

export class YouTubeApiService {
  constructor() {
    this.apiKey = envConfig.youtubeApiKey;
    this.apiUrl = envConfig.youtubeApiUrl;
  }

  async searchVideos(query, maxResults = 5) {
    if (!this.apiKey) {
      throw new Error('YouTube API key is not configured');
    }

    try {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: maxResults.toString(),
        key: this.apiKey
      });

      const response = await fetch(`${this.apiUrl}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt
      }));
    } catch (error) {
      console.error('YouTube API search error:', error);
      throw error;
    }
  }

  async getVideoDetails(videoIds) {
    if (!this.apiKey) {
      throw new Error('YouTube API key is not configured');
    }

    try {
      const params = new URLSearchParams({
        part: 'snippet,statistics',
        id: videoIds.join(','),
        key: this.apiKey
      });

      const response = await fetch(`${this.apiUrl}/videos?${params}`);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount
      }));
    } catch (error) {
      console.error('YouTube API video details error:', error);
      throw error;
    }
  }

  isConfigured() {
    return !!(this.apiKey && this.apiUrl);
  }
}

export const youtubeApi = new YouTubeApiService();