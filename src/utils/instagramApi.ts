/**
 * Instagram API Integration Utility
 * 
 * This file contains helper functions for integrating with Instagram's API via RapidAPI.
 */

// Instagram Story Data Structure
export interface InstagramStory {
  id: string;
  mediaType: string; // 'IMAGE' or 'VIDEO'
  mediaUrl: string;
  timestamp: string;
  username: string;
}

// RapidAPI Configuration
interface RapidAPIConfig {
  apiKey: string;
  baseURL: string;
}

// Local Storage Key for API Key
const RAPID_API_KEY_STORAGE = 'instaview-rapidapi-key';

/**
 * Save the RapidAPI key to localStorage
 * @param apiKey The RapidAPI key to save
 */
export const saveRapidAPIKey = (apiKey: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(RAPID_API_KEY_STORAGE, apiKey);
    console.log('RapidAPI key saved successfully');
  } catch (error) {
    console.error('Error saving RapidAPI key:', error);
  }
};

/**
 * Get the saved RapidAPI key from localStorage
 * @returns The saved RapidAPI key or empty string if not found
 */
export const getRapidAPIKey = (): string => {
  if (typeof window === 'undefined') return '';
  
  try {
    return localStorage.getItem(RAPID_API_KEY_STORAGE) || '';
  } catch (error) {
    console.error('Error retrieving RapidAPI key:', error);
    return '';
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
 * Fetches Instagram stories using RapidAPI
 * @param username Instagram username to fetch stories for
 * @returns Promise containing Instagram stories
 */
export const fetchInstagramStories = async (username: string): Promise<InstagramStory[]> => {
  const apiKey = getRapidAPIKey();
  
  // If no API key is available, return mock data
  if (!apiKey) {
    console.warn('No RapidAPI key found, returning mock data');
    return MOCK_STORIES;
  }
  
  try {
    // Here we would make the actual API call using the RapidAPI key
    // For example with fetch:
    const response = await fetch(`https://instagram-data1.p.rapidapi.com/user/stories?username=${username}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'instagram-data1.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our InstagramStory interface
    // The exact transformation depends on the RapidAPI service response format
    // This is an example transformation:
    const stories = data.stories?.map((item: any) => ({
      id: item.id || `story-${Math.random()}`,
      mediaType: item.media_type === 2 ? 'VIDEO' : 'IMAGE',
      mediaUrl: item.media_url || item.thumbnail_url || 'https://via.placeholder.com/500',
      timestamp: item.timestamp || new Date().toISOString(),
      username: username
    })) || [];
    
    return stories;
    
  } catch (error) {
    console.error('Error fetching Instagram stories:', error);
    // Return mock data if the API call fails
    return MOCK_STORIES;
  }
};
