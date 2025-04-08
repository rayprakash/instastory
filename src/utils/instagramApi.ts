
/**
 * Instagram API Integration Utility
 * 
 * This file contains helper functions for integrating with Instagram's API.
 * For full implementation details, see the guide at src/utils/instagramApi.md
 */

// Instagram Story Data Structure
export interface InstagramStory {
  id: string;
  mediaType: string; // 'IMAGE' or 'VIDEO'
  mediaUrl: string;
  timestamp: string;
  username: string;
}

// Local Storage Key for API configuration
const INSTAGRAM_API_CONFIG_STORAGE = 'instaview-api-config';

// API Configuration type
export interface InstagramApiConfig {
  serverUrl?: string;
  useBackend: boolean;
}

/**
 * Save the Instagram API config to localStorage
 * @param config The API configuration to save
 */
export const saveApiConfig = (config: InstagramApiConfig): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(INSTAGRAM_API_CONFIG_STORAGE, JSON.stringify(config));
    console.log('Instagram API config saved successfully');
  } catch (error) {
    console.error('Error saving Instagram API config:', error);
  }
};

/**
 * Get the saved API config from localStorage
 * @returns The saved API config or default values if not found
 */
export const getApiConfig = (): InstagramApiConfig => {
  if (typeof window === 'undefined') return { useBackend: false };
  
  try {
    const config = localStorage.getItem(INSTAGRAM_API_CONFIG_STORAGE);
    return config ? JSON.parse(config) : { useBackend: false };
  } catch (error) {
    console.error('Error retrieving Instagram API config:', error);
    return { useBackend: false };
  }
};

// Mock data for development purposes when API is not available
const MOCK_STORIES: InstagramStory[] = [
  {
    id: 'story1',
    mediaType: 'IMAGE',
    mediaUrl: 'https://via.placeholder.com/500',
    timestamp: new Date().toISOString(),
    username: 'demo_user'
  },
  {
    id: 'story2',
    mediaType: 'IMAGE',
    mediaUrl: 'https://via.placeholder.com/500',
    timestamp: new Date().toISOString(),
    username: 'demo_user'
  }
];

/**
 * Fetches Instagram stories 
 * @param username Instagram username to fetch stories for
 * @returns Promise containing Instagram stories
 */
export const fetchInstagramStories = async (username: string): Promise<InstagramStory[]> => {
  const config = getApiConfig();
  
  // If backend integration is not configured, return mock data
  if (!config.useBackend || !config.serverUrl) {
    console.warn('Backend integration not configured, returning mock data');
    return MOCK_STORIES;
  }
  
  try {
    // Make call to your backend server which handles Instagram API securely
    const response = await fetch(`${config.serverUrl}/api/instagram/stories/${username}`);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.stories || MOCK_STORIES;
    
  } catch (error) {
    console.error('Error fetching Instagram stories:', error);
    // Return mock data if the API call fails
    return MOCK_STORIES;
  }
};
