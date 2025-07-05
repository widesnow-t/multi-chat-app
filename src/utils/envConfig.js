// Environment configuration and validation
export const envConfig = {
  // App configuration
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  
  // Development settings
  devMode: import.meta.env.VITE_DEV_MODE === 'false2',
  debug: import.meta.env.VITE_DEBUG === 'true',
  
  // API Keys
  youtubeApiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
  
  // API URLs
  youtubeApiUrl: import.meta.env.VITE_YOUTUBE_API_URL,
};

// Validation functions
export const validateEnvConfig = () => {
  const warnings = [];
  const errors = [];
  
  if (!envConfig.youtubeApiKey && !envConfig.devMode) {
    warnings.push('YouTube API key is not configured');
  }
  
  if (!envConfig.youtubeApiUrl && !envConfig.devMode) {
    warnings.push('YouTube API URL is not configured');
  }
  
  return { warnings, errors };
};


// Log configuration status
export const logEnvStatus = () => {
  if (envConfig.debug) {
    console.log('Environment Configuration:', {
      appName: envConfig.appName,
      appVersion: envConfig.appVersion,
      devMode: envConfig.devMode,
      debug: envConfig.debug,
      apis: {
        youtube: !!envConfig.youtubeApiKey,
      },
    });
  }
};