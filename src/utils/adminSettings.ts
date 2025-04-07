
// Type definitions for admin settings
export interface AdUnit {
  id: string;
  name: string;
  code: string;
  location: string;
  enabled: boolean;
}

export interface AdminSettings {
  adUnits: AdUnit[];
  googleLanguageApi?: string;
  // Add other settings as needed
}

const ADMIN_SETTINGS_KEY = 'instaview-admin-settings';

// Default admin settings
const defaultSettings: AdminSettings = {
  adUnits: [
    {
      id: '1',
      name: 'Ad Unit 1',
      code: '<!-- Ad code for slot 1 -->',
      location: 'After Search Section',
      enabled: true,
    },
    {
      id: '2',
      name: 'Ad Unit 2',
      code: '<!-- Ad code for slot 2 -->',
      location: 'After How It Works',
      enabled: true,
    },
    {
      id: '3',
      name: 'Ad Unit 3',
      code: '<!-- Ad code for slot 3 -->',
      location: 'After Features',
      enabled: true,
    },
    {
      id: '4',
      name: 'Ad Unit 4',
      code: '<!-- Ad code for slot 4 -->',
      location: 'After Testimonials',
      enabled: true,
    },
    {
      id: '5',
      name: 'Ad Unit 5',
      code: '<!-- Ad code for slot 5 -->',
      location: 'After FAQ',
      enabled: true,
    },
  ],
  googleLanguageApi: '',
};

// Get settings from localStorage or use defaults
export const getAdminSettings = (): AdminSettings => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const savedSettings = localStorage.getItem(ADMIN_SETTINGS_KEY);
    
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    
    // Save defaults to localStorage
    localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(defaultSettings));
    
    return defaultSettings;
  } catch (error) {
    console.error("Error retrieving admin settings:", error);
    return defaultSettings;
  }
};

// Save settings to localStorage
export const saveAdminSettings = (settings: AdminSettings): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving admin settings:", error);
  }
};

// Update specific settings
export const updateAdminSettings = (partialSettings: Partial<AdminSettings>): AdminSettings => {
  const currentSettings = getAdminSettings();
  const updatedSettings = { ...currentSettings, ...partialSettings };
  saveAdminSettings(updatedSettings);
  return updatedSettings;
};

// Get ad units
export const getAdUnits = (): AdUnit[] => {
  return getAdminSettings().adUnits;
};

// Save ad units
export const saveAdUnits = (adUnits: AdUnit[]): void => {
  const settings = getAdminSettings();
  settings.adUnits = adUnits;
  saveAdminSettings(settings);
};

// Get Google Language API key
export const getGoogleLanguageApi = (): string => {
  return getAdminSettings().googleLanguageApi || '';
};

// Save Google Language API key
export const saveGoogleLanguageApi = (apiKey: string): void => {
  const settings = getAdminSettings();
  settings.googleLanguageApi = apiKey;
  saveAdminSettings(settings);
};
