/**
 * Navigation Types Configuration
 * Phase 1 & 2 Compatible
 * 
 * @description Centralized navigation and app-wide type definitions
 * @version 1.0.0
 */

// ============================================
// NAVIGATION PARAM LISTS
// ============================================

/**
 * Root stack navigation parameters
 */
export const RootStackParamList = {
  Splash: {
    description: 'App loading/splash screen',
    params: undefined
  },
  MainTabs: {
    description: 'Main tab navigation container',
    params: {
      screen: 'Home', // Default tab
      params: undefined
    }
  },
  Auth: {
    description: 'Authentication flow',
    params: undefined
  },
  Onboarding: {
    description: 'User onboarding flow',
    params: undefined
  }
};

/**
 * Bottom tab navigation parameters
 */
export const TabParamList = {
  Home: {
    description: 'Home feed tab',
    params: undefined,
    icon: 'home',
    label: 'Home'
  },
  Saved: {
    description: 'Saved items tab',
    params: undefined,
    icon: 'bookmark',
    label: 'Saved'
  },
  Settings: {
    description: 'Settings tab',
    params: undefined,
    icon: 'settings',
    label: 'Settings'
  },
  Profile: {
    description: 'User profile tab',
    params: undefined,
    icon: 'person',
    label: 'Profile'
  }
};

/**
 * Home stack navigation parameters
 */
export const HomeStackParamList = {
  HomeScreen: {
    description: 'Main home screen with feed',
    params: undefined,
    requiresAuth: false
  },
  MediaPreview: {
    description: 'Media preview/detail screen',
    params: {
      mediaId: { 
        type: 'string', 
        required: true,
        description: 'Unique identifier for the media item'
      },
      mediaType: {
        type: 'string',
        required: false,
        description: 'Type of media (image, video, audio)'
      },
      sourceScreen: {
        type: 'string',
        required: false,
        description: 'Previous screen for navigation context'
      }
    },
    requiresAuth: true
  },
  Comments: {
    description: 'Comments section for media',
    params: {
      mediaId: { type: 'string', required: true },
      commentCount: { type: 'number', required: false }
    },
    requiresAuth: true
  },
  Search: {
    description: 'Search screen with filters',
    params: {
      query: { type: 'string', required: false },
      category: { type: 'string', required: false }
    },
    requiresAuth: false
  }
};

/**
 * Auth stack navigation parameters
 */
export const AuthStackParamList = {
  Login: {
    description: 'User login screen',
    params: {
      redirectTo: { type: 'string', required: false }
    }
  },
  Register: {
    description: 'User registration screen',
    params: {
      email: { type: 'string', required: false }
    }
  },
  ForgotPassword: {
    description: 'Password reset screen',
    params: {
      email: { type: 'string', required: false }
    }
  }
};

// ============================================
// APP-WIDE TYPES (Runtime)
// ============================================

/**
 * User-related types
 */
export const UserTypes = {
  User: {
    id: { type: 'string', required: true },
    username: { type: 'string', required: true },
    email: { type: 'string', required: true },
    avatar: { type: 'string', required: false },
    bio: { type: 'string', required: false },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: false },
    preferences: {
      type: 'object',
      required: false,
      properties: {
        theme: { type: 'string', default: 'light' },
        notifications: { type: 'boolean', default: true }
      }
    }
  },
  UserRole: {
    Admin: 'admin',
    User: 'user',
    Moderator: 'moderator'
  }
};

/**
 * Media-related types
 */
export const MediaTypes = {
  MediaItem: {
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    url: { type: 'string', required: true },
    thumbnail: { type: 'string', required: false },
    type: { 
      type: 'string', 
      required: true,
      enum: ['image', 'video', 'audio', 'document']
    },
    duration: { type: 'number', required: false },
    size: { type: 'number', required: false },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: false },
    userId: { type: 'string', required: true },
    likes: { type: 'number', default: 0 },
    comments: { type: 'number', default: 0 },
    tags: { type: 'array', default: [] }
  }
};

// ============================================
// API RESPONSE TYPES
// ============================================

export const ApiResponseTypes = {
  Success: {
    success: { type: 'boolean', default: true },
    data: { type: 'object', required: false },
    message: { type: 'string', required: false }
  },
  Error: {
    success: { type: 'boolean', default: false },
    error: { type: 'string', required: true },
    statusCode: { type: 'number', required: true },
    details: { type: 'object', required: false }
  },
  Paginated: {
    data: { type: 'array', required: true },
    pagination: {
      type: 'object',
      required: true,
      properties: {
        page: { type: 'number' },
        limit: { type: 'number' },
        total: { type: 'number' },
        totalPages: { type: 'number' }
      }
    }
  }
};

// ============================================
// REDUX/STATE TYPES
// ============================================

export const StateTypes = {
  AppState: {
    isLoading: { type: 'boolean', default: false },
    isAuthenticated: { type: 'boolean', default: false },
    theme: { type: 'string', default: 'light' },
    error: { type: 'string', default: null }
  },
  MediaState: {
    items: { type: 'array', default: [] },
    selectedItem: { type: 'object', default: null },
    isLoading: { type: 'boolean', default: false },
    error: { type: 'string', default: null },
    pagination: {
      type: 'object',
      default: {
        page: 1,
        limit: 20,
        hasMore: true
      }
    }
  },
  UserState: {
    currentUser: { type: 'object', default: null },
    isLoggedIn: { type: 'boolean', default: false },
    token: { type: 'string', default: null },
    preferences: { type: 'object', default: {} }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Validates if an object matches a type definition
 * @param {Object} obj - Object to validate
 * @param {Object} typeDef - Type definition
 * @returns {Object} Validation result
 */
export const validateType = (obj, typeDef) => {
  const errors = [];
  
  for (const [key, def] of Object.entries(typeDef)) {
    if (def.required && (obj[key] === undefined || obj[key] === null)) {
      errors.push(`Missing required property: ${key}`);
    }
    
    if (obj[key] !== undefined && def.type) {
      const actualType = typeof obj[key];
      if (actualType !== def.type && !(def.type === 'array' && Array.isArray(obj[key]))) {
        errors.push(`Property ${key} should be of type ${def.type}, got ${actualType}`);
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Gets default values for a type definition
 * @param {Object} typeDef - Type definition
 * @returns {Object} Default values
 */
export const getDefaults = (typeDef) => {
  const defaults = {};
  
  for (const [key, def] of Object.entries(typeDef)) {
    if (def.default !== undefined) {
      defaults[key] = def.default;
    } else if (def.required && def.type === 'object') {
      defaults[key] = {};
    } else if (def.required && def.type === 'array') {
      defaults[key] = [];
    }
  }
  
  return defaults;
};

// ============================================
// EXPORT CONFIGURATIONS
// ============================================

export default {
  RootStackParamList,
  TabParamList,
  HomeStackParamList,
  AuthStackParamList,
  UserTypes,
  MediaTypes,
  ApiResponseTypes,
  StateTypes,
  validateType,
  getDefaults
};
