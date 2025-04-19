// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Main handler function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse the request body
    const body = await req.json();
    const { endpoint, username } = body;
    
    if (!endpoint || !username) {
      return new Response(JSON.stringify({ error: 'Missing endpoint or username' }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      });
    }
    
    // Base URL for Instagram web API
    const baseUrl = `https://www.instagram.com/${username}/`;

    // Custom headers to mimic a browser request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
    };

    // Fetch Instagram page
    const response = await fetch(baseUrl, { headers });
    const html = await response.text();

    // Extract shared data from page
    const dataMatch = html.match(/<script type="text\/javascript">window\._sharedData = (.+?);<\/script>/);
    
    if (!dataMatch) {
      throw new Error('Could not extract Instagram data');
    }

    const sharedData = JSON.parse(dataMatch[1]);
    const userData = sharedData.entry_data?.ProfilePage?.[0]?.graphql?.user;

    if (!userData) {
      throw new Error('Could not find user data');
    }

    // Process data based on endpoint
    switch (endpoint) {
      case 'profile':
        return await handleProfileRequest(userData);
      case 'posts':
        return await handlePostsRequest(userData);
      case 'stories':
        return await handleStoriesRequest(userData);
      case 'highlights':
        return await handleHighlightsRequest(userData);
      case 'reels':
        return await handleReelsRequest(userData);
      default:
        return new Response(JSON.stringify({ error: 'Invalid endpoint' }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    });
  }
});

// Handler for profile data requests
async function handleProfileRequest(userData: any) {
  const profile = {
    username: userData.username,
    fullName: userData.full_name,
    profilePicture: userData.profile_pic_url_hd,
    bio: userData.biography,
    followers: userData.edge_followed_by.count,
    following: userData.edge_follow.count,
    postsCount: userData.edge_owner_to_timeline_media.count,
    isPrivate: userData.is_private
  };
  
  return new Response(JSON.stringify(profile), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Handler for posts data requests
async function handlePostsRequest(userData: any) {
  const posts = userData.edge_owner_to_timeline_media.edges.map((edge: any) => ({
    id: edge.node.id,
    mediaType: edge.node.is_video ? 'VIDEO' : edge.node.__typename === 'GraphSidecar' ? 'CAROUSEL' : 'IMAGE',
    mediaUrl: edge.node.display_url,
    caption: edge.node.edge_media_to_caption.edges[0]?.node.text,
    likes: edge.node.edge_liked_by.count,
    comments: edge.node.edge_media_to_comment.count,
    timestamp: new Date(edge.node.taken_at_timestamp * 1000).toISOString(),
    thumbnail: edge.node.thumbnail_src
  }));
  
  return new Response(JSON.stringify({ posts }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Handler for stories data requests
async function handleStoriesRequest(userData: any) {
  console.log(`Fetching stories for ${userData.username}`);
  
  try {
    // For now, return mock data - in production you would integrate with Instagram API
    const stories = Array(3).fill(null).map((_, index) => ({
      id: `story${index + 1}`,
      mediaType: index === 2 ? 'VIDEO' : 'IMAGE',
      mediaUrl: index === 2 
        ? 'https://player.vimeo.com/external/394276111.sd.mp4?s=1ed0f6082ebbfe8e6b0aa56b200011609f3da00d&profile_id=164&oauth2_token_id=57447761'
        : `https://source.unsplash.com/random/800x1000?sig=${index + 100}`,
      timestamp: new Date(Date.now() - (index + 1) * 3600000).toISOString(),
      username: userData.username
    }));
    
    return new Response(JSON.stringify({ stories }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(`Error fetching stories for ${userData.username}:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stories data' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

// Handler for highlights data requests
async function handleHighlightsRequest(userData: any) {
  console.log(`Fetching highlights for ${userData.username}`);
  
  try {
    // For now, return mock data - in production you would integrate with Instagram API
    const highlights = Array(2).fill(null).map((_, index) => ({
      id: `highlight${index + 1}`,
      mediaType: 'IMAGE',
      mediaUrl: `https://source.unsplash.com/random/800x1000?sig=${index + 300}`,
      timestamp: new Date(Date.now() - (index + 30) * 86400000).toISOString(),
      username: userData.username
    }));
    
    return new Response(JSON.stringify({ highlights }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(`Error fetching highlights for ${userData.username}:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch highlights data' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
}

// Handler for reels data requests
async function handleReelsRequest(userData: any) {
  console.log(`Fetching reels for ${userData.username}`);
  
  try {
    // For now, return mock data - in production you would integrate with Instagram API
    const reels = Array(2).fill(null).map((_, index) => ({
      id: `reel${index + 1}`,
      mediaType: 'VIDEO',
      mediaUrl: [
        'https://player.vimeo.com/external/470407576.sd.mp4?s=df3223786cca6e471c3bec83e0d027be46899ea2&profile_id=164&oauth2_token_id=57447761',
        'https://player.vimeo.com/external/371713390.sd.mp4?s=4106e58353bd6bdc303deaaa3faa8e26b1a0098e&profile_id=164&oauth2_token_id=57447761'
      ][index],
      caption: ['Beach day! #summervibes', 'Coffee art #barista'][index],
      likes: Math.floor(Math.random() * 6000),
      comments: Math.floor(Math.random() * 300),
      timestamp: new Date(Date.now() - (index + 7) * 86400000).toISOString(),
      thumbnail: `https://source.unsplash.com/random/1080x1920?sig=${index + 400}`
    }));
    
    return new Response(JSON.stringify({ reels }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(`Error fetching reels for ${userData.username}:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch reels data' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
