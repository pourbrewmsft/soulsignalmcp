// Oura Ring data types
export interface OuraRingData {
  sleep: {
    date: string;
    score: number;
    total_sleep_duration: number;
    deep_sleep_duration: number;
    rem_sleep_duration: number;
    light_sleep_duration: number;
    efficiency: number;
  };
  activity: {
    date: string;
    score: number;
    steps: number;
    calories: number;
    active_calories: number;
    average_met_minutes: number;
  };
  readiness: {
    date: string;
    score: number;
    temperature_deviation: number;
    resting_heart_rate: number;
    hrv_balance: number;
  };
}

// Apple Watch/HealthKit data types
export interface AppleHealthData {
  heartRate: {
    date: string;
    samples: Array<{
      timestamp: string;
      value: number;
      context?: 'resting' | 'workout' | 'meditation';
    }>;
  };
  mindfulness: {
    date: string;
    sessions: Array<{
      startTime: string;
      duration: number; // minutes
      type: 'meditation' | 'prayer' | 'breathing';
    }>;
  };
  workouts: {
    date: string;
    activities: Array<{
      type: string;
      duration: number;
      calories: number;
      averageHeartRate?: number;
    }>;
  };
}

// Muse meditation data types
export interface MuseData {
  sessions: Array<{
    date: string;
    startTime: string;
    duration: number; // minutes
    calmScore: number; // 0-100
    focusScore: number; // 0-100
    brainwaves: {
      alpha: number[];
      beta: number[];
      theta: number[];
      delta: number[];
      gamma: number[];
    };
    artifacts: number; // movement/noise interruptions
  }>;
}

// Combined user profile
export interface PrayerPartner {
  id: string;
  name: string;
  email: string;
  timezone: string;
  connectedDevices: {
    oura: boolean;
    apple: boolean;
    muse: boolean;
  };
  prayerSchedule?: {
    preferredTimes: string[]; // e.g., ["06:00", "12:00", "18:00"]
    duration: number; // typical duration in minutes
  };
}

// Analytics and insights types
export interface PrayerInsight {
  date: string;
  partnerId: string;
  metrics: {
    meditationDuration: number;
    averageHeartRate: number;
    hrvVariability: number;
    sleepQuality: number;
    stressLevel: number;
    focusLevel: number;
  };
  correlations: {
    prayerHeartRateChange: number;
    prayerStressReduction: number;
    sleepImpact: number;
  };
}

export interface DashboardData {
  partner: PrayerPartner;
  recentInsights: PrayerInsight[];
  ouraData?: OuraRingData;
  appleData?: AppleHealthData;
  museData?: MuseData;
}