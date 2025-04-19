
import { supabase } from "@/integrations/supabase/client";

/**
 * Function to invoke the Instagram Viewer Edge Function
 * @param endpoint The endpoint to call (profile, stories, posts, highlights, reels)
 * @param username The Instagram username to fetch data for
 * @returns Promise with the data
 */
export const invokeInstagramViewerFunction = async (
  endpoint: string,
  username: string
) => {
  try {
    const { data, error } = await supabase.functions.invoke("instagram-viewer", {
      body: { 
        username,
        endpoint 
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (error) {
      console.error(`Error invoking Instagram Viewer function for ${endpoint}:`, error);
      throw new Error(error.message);
    }

    console.log(`Instagram data for ${endpoint} received:`, data);
    return data;
  } catch (error) {
    console.error(`Failed to invoke Instagram Viewer function for ${endpoint}:`, error);
    throw error;
  }
};
