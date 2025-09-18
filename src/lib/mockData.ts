import { OuraRingData, AppleHealthData, MuseData, PrayerPartner, PrayerInsight } from '@/types';

// Mock data generators for development and demonstration
export const generateMockOuraData = (date: string): OuraRingData => ({
  sleep: {
    date,
    score: Math.floor(Math.random() * 40) + 60, // 60-100
    total_sleep_duration: Math.floor(Math.random() * 120) + 360, // 6-8 hours in minutes
    deep_sleep_duration: Math.floor(Math.random() * 60) + 60,
    rem_sleep_duration: Math.floor(Math.random() * 60) + 45,
    light_sleep_duration: Math.floor(Math.random() * 120) + 180,
    efficiency: Math.floor(Math.random() * 20) + 80, // 80-100%
  },
  activity: {
    date,
    score: Math.floor(Math.random() * 30) + 70,
    steps: Math.floor(Math.random() * 5000) + 5000, // 5k-10k steps
    calories: Math.floor(Math.random() * 800) + 1800,
    active_calories: Math.floor(Math.random() * 400) + 200,
    average_met_minutes: Math.floor(Math.random() * 60) + 30,
  },
  readiness: {
    date,
    score: Math.floor(Math.random() * 30) + 70,
    temperature_deviation: (Math.random() - 0.5) * 2, // -1 to +1 degree
    resting_heart_rate: Math.floor(Math.random() * 20) + 50, // 50-70 bpm
    hrv_balance: Math.floor(Math.random() * 40) + 30, // 30-70ms
  },
});

export const generateMockAppleData = (date: string): AppleHealthData => {
  const sessions = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
    startTime: `${String(Math.floor(Math.random() * 12) + 6).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    duration: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
    type: ['meditation', 'prayer', 'breathing'][Math.floor(Math.random() * 3)] as 'meditation' | 'prayer' | 'breathing',
  }));

  return {
    heartRate: {
      date,
      samples: Array.from({ length: 24 }, (_, i) => ({
        timestamp: `${String(i).padStart(2, '0')}:00`,
        value: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
        context: i >= 6 && i <= 22 ? (['resting', 'workout', 'meditation'][Math.floor(Math.random() * 3)] as 'resting' | 'workout' | 'meditation') : 'resting',
      })),
    },
    mindfulness: {
      date,
      sessions,
    },
    workouts: {
      date,
      activities: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => ({
        type: ['Running', 'Walking', 'Cycling', 'Swimming'][Math.floor(Math.random() * 4)],
        duration: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
        calories: Math.floor(Math.random() * 400) + 200,
        averageHeartRate: Math.floor(Math.random() * 60) + 120, // 120-180 bpm
      })),
    },
  };
};

export const generateMockMuseData = (date: string): MuseData => ({
  sessions: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
    const duration = Math.floor(Math.random() * 20) + 10; // 10-30 minutes
    const dataPoints = duration * 4; // 4 readings per minute
    
    return {
      date,
      startTime: `${String(Math.floor(Math.random() * 12) + 6).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      duration,
      calmScore: Math.floor(Math.random() * 40) + 60, // 60-100
      focusScore: Math.floor(Math.random() * 40) + 60, // 60-100
      brainwaves: {
        alpha: Array.from({ length: dataPoints }, () => Math.random() * 50 + 25),
        beta: Array.from({ length: dataPoints }, () => Math.random() * 30 + 15),
        theta: Array.from({ length: dataPoints }, () => Math.random() * 40 + 20),
        delta: Array.from({ length: dataPoints }, () => Math.random() * 20 + 10),
        gamma: Array.from({ length: dataPoints }, () => Math.random() * 15 + 5),
      },
      artifacts: Math.floor(Math.random() * 5), // 0-4 interruptions
    };
  }),
});

export const generateMockPrayerPartner = (id: string): PrayerPartner => ({
  id,
  name: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'][Math.floor(Math.random() * 4)],
  email: `partner${id}@example.com`,
  timezone: 'UTC-8',
  connectedDevices: {
    oura: Math.random() > 0.3,
    apple: Math.random() > 0.2,
    muse: Math.random() > 0.5,
  },
  prayerSchedule: {
    preferredTimes: ['06:00', '12:00', '20:00'],
    duration: 15,
  },
});

export const generateMockInsights = (partnerId: string, date: string): PrayerInsight => ({
  date,
  partnerId,
  metrics: {
    meditationDuration: Math.floor(Math.random() * 30) + 15, // 15-45 minutes
    averageHeartRate: Math.floor(Math.random() * 30) + 65, // 65-95 bpm
    hrvVariability: Math.floor(Math.random() * 40) + 30, // 30-70ms
    sleepQuality: Math.floor(Math.random() * 30) + 70, // 70-100
    stressLevel: Math.floor(Math.random() * 40) + 20, // 20-60 (lower is better)
    focusLevel: Math.floor(Math.random() * 30) + 70, // 70-100
  },
  correlations: {
    prayerHeartRateChange: (Math.random() - 0.7) * 20, // -20 to +6 bpm change
    prayerStressReduction: Math.random() * 30 + 10, // 10-40% reduction
    sleepImpact: Math.random() * 20 + 5, // 5-25% improvement
  },
});