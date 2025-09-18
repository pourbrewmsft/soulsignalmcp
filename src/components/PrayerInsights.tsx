import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { DashboardData } from '@/types';

interface InsightCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  isPositive: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  description, 
  isPositive 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const getTrendColor = () => {
    if (isPositive) {
      return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
    } else {
      return trend === 'up' ? 'text-red-600' : trend === 'down' ? 'text-green-600' : 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        {isPositive ? 
          <CheckCircle className="w-5 h-5 text-green-500" /> : 
          <AlertCircle className="w-5 h-5 text-orange-500" />
        }
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change !== 0 && (
          <div className={`flex items-center mt-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1 text-sm">
              {Math.abs(change).toFixed(1)}% vs last week
            </span>
          </div>
        )}
        <p className="text-xs text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

interface PrayerInsightsProps {
  data: DashboardData;
}

export const PrayerInsights: React.FC<PrayerInsightsProps> = ({ data }) => {
  const { recentInsights, partner } = data;
  
  if (recentInsights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prayer Insights</h3>
        <p className="text-gray-600">No recent insights available.</p>
      </div>
    );
  }

  const latestInsight = recentInsights[0];
  const previousWeekAvg = recentInsights.slice(1, 8).reduce((acc, insight) => {
    acc.meditation += insight.metrics.meditationDuration;
    acc.heartRate += insight.metrics.averageHeartRate;
    acc.sleep += insight.metrics.sleepQuality;
    acc.stress += insight.metrics.stressLevel;
    acc.focus += insight.metrics.focusLevel;
    return acc;
  }, { meditation: 0, heartRate: 0, sleep: 0, stress: 0, focus: 0 });

  const weekCount = recentInsights.slice(1, 8).length;
  if (weekCount > 0) {
    Object.keys(previousWeekAvg).forEach(key => {
      previousWeekAvg[key as keyof typeof previousWeekAvg] /= weekCount;
    });
  }

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const meditationChange = calculateChange(latestInsight.metrics.meditationDuration, previousWeekAvg.meditation);
  const heartRateChange = calculateChange(latestInsight.metrics.averageHeartRate, previousWeekAvg.heartRate);
  const sleepChange = calculateChange(latestInsight.metrics.sleepQuality, previousWeekAvg.sleep);
  const stressChange = calculateChange(latestInsight.metrics.stressLevel, previousWeekAvg.stress);
  const focusChange = calculateChange(latestInsight.metrics.focusLevel, previousWeekAvg.focus);

  const insights: InsightCardProps[] = [
    {
      title: 'Meditation Duration',
      value: `${latestInsight.metrics.meditationDuration} min`,
      change: meditationChange,
      trend: (meditationChange > 0 ? 'up' : meditationChange < 0 ? 'down' : 'neutral') as 'up' | 'down' | 'neutral',
      description: 'Daily meditation and prayer time',
      isPositive: true,
    },
    {
      title: 'Heart Rate Variability',
      value: `${latestInsight.metrics.hrvVariability} ms`,
      change: heartRateChange,
      trend: (heartRateChange > 0 ? 'up' : heartRateChange < 0 ? 'down' : 'neutral') as 'up' | 'down' | 'neutral',
      description: 'Stress resilience indicator',
      isPositive: true,
    },
    {
      title: 'Sleep Quality',
      value: `${latestInsight.metrics.sleepQuality}/100`,
      change: sleepChange,
      trend: (sleepChange > 0 ? 'up' : sleepChange < 0 ? 'down' : 'neutral') as 'up' | 'down' | 'neutral',
      description: 'Overall sleep score',
      isPositive: true,
    },
    {
      title: 'Stress Level',
      value: `${latestInsight.metrics.stressLevel}/100`,
      change: stressChange,
      trend: (stressChange > 0 ? 'up' : stressChange < 0 ? 'down' : 'neutral') as 'up' | 'down' | 'neutral',
      description: 'Daily stress measurement',
      isPositive: false, // Lower stress is better
    },
    {
      title: 'Focus Level',
      value: `${latestInsight.metrics.focusLevel}/100`,
      change: focusChange,
      trend: (focusChange > 0 ? 'up' : focusChange < 0 ? 'down' : 'neutral') as 'up' | 'down' | 'neutral',
      description: 'Meditation focus score',
      isPositive: true,
    },
  ];

  const correlations = latestInsight.correlations;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Prayer Insights for {partner.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Prayer Impact Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {correlations.prayerHeartRateChange > 0 ? '+' : ''}{correlations.prayerHeartRateChange.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Heart Rate Change</p>
            <p className="text-xs text-gray-500 mt-1">During prayer sessions</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              -{correlations.prayerStressReduction.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Stress Reduction</p>
            <p className="text-xs text-gray-500 mt-1">After prayer sessions</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              +{correlations.sleepImpact.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Sleep Improvement</p>
            <p className="text-xs text-gray-500 mt-1">On prayer days</p>
          </div>
        </div>
      </div>
    </div>
  );
};