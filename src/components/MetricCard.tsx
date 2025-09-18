import React from 'react';
import { Heart, Activity, Moon, Brain } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  icon, 
  color 
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-full`} style={{ backgroundColor: `${color}20` }}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `h-6 w-6`,
            style: { color }
          })}
        </div>
      </div>
      {trend && (
        <div className={`mt-2 text-sm ${getTrendColor()}`}>
          {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} vs last week
        </div>
      )}
    </div>
  );
};

interface BiometricOverviewProps {
  data: {
    heartRate: number;
    sleepScore: number;
    activityScore: number;
    meditationMinutes: number;
    stressLevel: number;
  };
}

export const BiometricOverview: React.FC<BiometricOverviewProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <MetricCard
        title="Resting Heart Rate"
        value={data.heartRate}
        unit="bpm"
        trend="neutral"
        icon={<Heart />}
        color="#e11d48"
      />
      <MetricCard
        title="Sleep Score"
        value={data.sleepScore}
        unit="/100"
        trend="up"
        icon={<Moon />}
        color="#3b82f6"
      />
      <MetricCard
        title="Activity Score"
        value={data.activityScore}
        unit="/100"
        trend="up"
        icon={<Activity />}
        color="#10b981"
      />
      <MetricCard
        title="Meditation"
        value={data.meditationMinutes}
        unit="min"
        trend="up"
        icon={<Brain />}
        color="#8b5cf6"
      />
      <MetricCard
        title="Stress Level"
        value={data.stressLevel}
        unit="/100"
        trend="down"
        icon={<Activity />}
        color="#f59e0b"
      />
    </div>
  );
};