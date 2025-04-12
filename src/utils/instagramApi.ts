
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

// Instagram Post Data Structure
export interface InstagramPost {
  id: string;
  mediaType: string; // 'IMAGE', 'VIDEO', 'CAROUSEL'
  mediaUrl: string;
  caption?: string;
  likes: number;
  comments: number;
  timestamp: string;
  thumbnail?: string; // For videos or carousels
}

// Instagram Profile Data Structure
export interface InstagramProfile {
  username: string;
  fullName?: string;
  profilePicture?: string;
  bio?: string;
  followers?: number;
  following?: number;
  postsCount?: number;
  isPrivate?: boolean;
}

// Instagram Content Type
export type ContentType = 'STORIES' | 'POSTS' | 'HIGHLIGHTS' | 'REELS';

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
    mediaUrl: 'https://source.unsplash.com/random/800x1000?sig=1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    username: 'travel_photographer'
  },
  {
    id: 'story2',
    mediaType: 'IMAGE',
    mediaUrl: 'https://source.unsplash.com/random/800x1000?sig=2',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    username: 'travel_photographer'
  },
  {
    id: 'story3',
    mediaType: 'VIDEO',
    mediaUrl: 'https://player.vimeo.com/external/394276111.sd.mp4?s=1ed0f6082ebbfe8e6b0aa56b200011609f3da00d&profile_id=164&oauth2_token_id=57447761',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    username: 'travel_photographer'
  }
];

const MOCK_POSTS: InstagramPost[] = [
  {
    id: 'post1',
    mediaType: 'IMAGE',
    mediaUrl: 'https://source.unsplash.com/random/1080x1080?sig=10',
    caption: 'Beautiful sunset #nofilter #travel',
    likes: 1542,
    comments: 42,
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'post2',
    mediaType: 'CAROUSEL',
    mediaUrl: 'https://source.unsplash.com/random/1080x1080?sig=20',
    caption: 'Amazing weekend getaway with friends',
    likes: 2103,
    comments: 78,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    thumbnail: 'https://source.unsplash.com/random/1080x1080?sig=21'
  },
  {
    id: 'post3',
    mediaType: 'VIDEO',
    mediaUrl: 'https://player.vimeo.com/external/363625327.sd.mp4?s=4c475c79473408872518be22d98427a2d7aaa5d2&profile_id=164&oauth2_token_id=57447761',
    caption: 'Waves crashing on the shore #beach #summer',
    likes: 3240,
    comments: 123,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    thumbnail: 'https://source.unsplash.com/random/1080x1080?sig=30'
  },
  {
    id: 'post4',
    mediaType: 'IMAGE',
    mediaUrl: 'https://source.unsplash.com/random/1080x1080?sig=40',
    caption: 'Morning coffee views',
    likes: 986,
    comments: 32,
    timestamp: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 'post5',
    mediaType: 'IMAGE',
    mediaUrl: 'https://source.unsplash.com/random/1080x1080?sig=50',
    caption: 'City lights #nightphotography',
    likes: 1750,
    comments: 68,
    timestamp: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 'post6',
    mediaType: 'VIDEO',
    mediaUrl: 'https://player.vimeo.com/external/434045526.sd.mp4?s=ca619cd8bc93f5c3202f4815684511abc234e0ae&profile_id=164&oauth2_token_id=57447761',
    caption: 'Forest walk #nature',
    likes: 2430,
    comments: 92,
    timestamp: new Date(Date.now() - 518400000).toISOString(),
    thumbnail: 'https://source.unsplash.com/random/1080x1080?sig=60'
  }
];

const MOCK_HIGHLIGHTS: InstagramStory[] = [
  {
    id: 'highlight1',
    mediaType: 'IMAGE',
    mediaUrl: 'https://source.unsplash.com/random/800x1000?sig=100',
    timestamp: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
    username: 'travel_photographer'
  },
  {
    id: 'highlight2',
    mediaType: 'IMAGE',
    mediaUrl: 'https://source.unsplash.com/random/800x1000?sig=101',
    timestamp: new Date(Date.now() - 2678400000).toISOString(), // 31 days ago
    username: 'travel_photographer'
  }
];

const MOCK_REELS: InstagramPost[] = [
  {
    id: 'reel1',
    mediaType: 'VIDEO',
    mediaUrl: 'https://player.vimeo.com/external/470407576.sd.mp4?s=df3223786cca6e471c3bec83e0d027be46899ea2&profile_id=164&oauth2_token_id=57447761',
    caption: 'Beach day! #summervibes',
    likes: 5230,
    comments: 184,
    timestamp: new Date(Date.now() - 604800000).toISOString(),
    thumbnail: 'https://source.unsplash.com/random/1080x1920?sig=200'
  },
  {
    id: 'reel2',
    mediaType: 'VIDEO',
    mediaUrl: 'https://player.vimeo.com/external/371713390.sd.mp4?s=4106e58353bd6bdc303deaaa3faa8e26b1a0098e&profile_id=164&oauth2_token_id=57447761',
    caption: 'Coffee art #barista',
    likes: 3650,
    comments: 97,
    timestamp: new Date(Date.now() - 691200000).toISOString(),
    thumbnail: 'https://source.unsplash.com/random/1080x1920?sig=201'
  }
];

const MOCK_PROFILES: Record<string, InstagramProfile> = {
  'travel_photographer': {
    username: 'travel_photographer',
    fullName: 'Travel Photography',
    profilePicture: 'https://source.unsplash.com/random/150x150?sig=300',
    bio: 'Capturing the world one photo at a time ✨ Travel | Photography | Adventure',
    followers: 24500,
    following: 843,
    postsCount: 127,
    isPrivate: false
  },
  'food_lover': {
    username: 'food_lover',
    fullName: 'Food & Cuisine',
    profilePicture: 'https://source.unsplash.com/random/150x150?sig=301',
    bio: 'Food blogger | Recipe developer | Always hungry',
    followers: 12300,
    following: 572,
    postsCount: 86,
    isPrivate: false
  }
};

/**
 * Fetches Instagram stories 
 * @param username Instagram username to fetch stories for
 * @returns Promise containing Instagram stories
 */
export const fetchInstagramStories = async (username: string): Promise<InstagramStory[]> => {
  const config = getApiConfig();
  
  // If backend integration is not configured, return mock data
  if (!config.useBackend || !config.serverUrl) {
    console.warn('Backend integration not configured, returning mock data for stories');
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

/**
 * Fetches Instagram posts
 * @param username Instagram username to fetch posts for
 * @returns Promise containing Instagram posts
 */
export const fetchInstagramPosts = async (username: string): Promise<InstagramPost[]> => {
  const config = getApiConfig();
  
  // If backend integration is not configured, return mock data
  if (!config.useBackend || !config.serverUrl) {
    console.warn('Backend integration not configured, returning mock data for posts');
    return MOCK_POSTS;
  }
  
  try {
    const response = await fetch(`${config.serverUrl}/api/instagram/posts/${username}`);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.posts || MOCK_POSTS;
    
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    // Return mock data if the API call fails
    return MOCK_POSTS;
  }
};

/**
 * Fetches Instagram highlights
 * @param username Instagram username to fetch highlights for
 * @returns Promise containing Instagram highlights
 */
export const fetchInstagramHighlights = async (username: string): Promise<InstagramStory[]> => {
  const config = getApiConfig();
  
  // If backend integration is not configured, return mock data
  if (!config.useBackend || !config.serverUrl) {
    console.warn('Backend integration not configured, returning mock data for highlights');
    return MOCK_HIGHLIGHTS;
  }
  
  try {
    const response = await fetch(`${config.serverUrl}/api/instagram/highlights/${username}`);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.highlights || MOCK_HIGHLIGHTS;
    
  } catch (error) {
    console.error('Error fetching Instagram highlights:', error);
    return MOCK_HIGHLIGHTS;
  }
};

/**
 * Fetches Instagram reels
 * @param username Instagram username to fetch reels for
 * @returns Promise containing Instagram reels
 */
export const fetchInstagramReels = async (username: string): Promise<InstagramPost[]> => {
  const config = getApiConfig();
  
  // If backend integration is not configured, return mock data
  if (!config.useBackend || !config.serverUrl) {
    console.warn('Backend integration not configured, returning mock data for reels');
    return MOCK_REELS;
  }
  
  try {
    const response = await fetch(`${config.serverUrl}/api/instagram/reels/${username}`);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.reels || MOCK_REELS;
    
  } catch (error) {
    console.error('Error fetching Instagram reels:', error);
    return MOCK_REELS;
  }
};

/**
 * Fetches an Instagram profile
 * @param username Instagram username to fetch profile for
 * @returns Promise containing Instagram profile
 */
export const fetchInstagramProfile = async (username: string): Promise<InstagramProfile | null> => {
  const config = getApiConfig();
  
  // If backend integration is not configured, return mock data
  if (!config.useBackend || !config.serverUrl) {
    console.warn('Backend integration not configured, returning mock data for profile');
    // Return mock profile if it exists, or create a basic one
    return MOCK_PROFILES[username] || {
      username,
      profilePicture: 'https://source.unsplash.com/random/150x150',
      fullName: username,
      postsCount: MOCK_POSTS.length,
      isPrivate: false
    };
  }
  
  try {
    const response = await fetch(`${config.serverUrl}/api/instagram/profile/${username}`);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const profile = await response.json();
    return profile || null;
    
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return MOCK_PROFILES[username] || {
      username,
      profilePicture: 'https://source.unsplash.com/random/150x150',
      fullName: username,
      postsCount: MOCK_POSTS.length,
      isPrivate: false
    };
  }
};
