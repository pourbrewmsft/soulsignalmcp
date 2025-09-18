import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { PrayerInsight } from '@/types';

interface PrayerTrendsChartProps {
  insights: PrayerInsight[];
}

export const PrayerTrendsChart: React.FC<PrayerTrendsChartProps> = ({ insights }) => {
  const chartData = insights.slice().reverse().map(insight => ({
    date: new Date(insight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    meditation: insight.metrics.meditationDuration,
    heartRate: insight.metrics.averageHeartRate,
    sleepQuality: insight.metrics.sleepQuality,
    stressLevel: insight.metrics.stressLevel,
    focusLevel: insight.metrics.focusLevel,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Prayer & Wellness Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="meditation" stroke="#8b5cf6" strokeWidth={2} name="Meditation (min)" />
            <Line type="monotone" dataKey="heartRate" stroke="#e11d48" strokeWidth={2} name="Heart Rate (bpm)" />
            <Line type="monotone" dataKey="sleepQuality" stroke="#3b82f6" strokeWidth={2} name="Sleep Quality" />
            <Line type="monotone" dataKey="focusLevel" stroke="#10b981" strokeWidth={2} name="Focus Level" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface HeartRateVariabilityChartProps {
  data: Array<{ time: string; hrv: number; context?: string }>;
}

export const HeartRateVariabilityChart: React.FC<HeartRateVariabilityChartProps> = ({ data }) => {
  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Rate Variability</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatTime}
              interval="preserveStartEnd"
            />
            <YAxis label={{ value: 'HRV (ms)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              labelFormatter={(time) => formatTime(time as string)}
              formatter={(value: number) => [`${value} ms`, 'HRV']}
            />
            <Line 
              type="monotone" 
              dataKey="hrv" 
              stroke="#e11d48" 
              strokeWidth={2}
              dot={{ fill: '#e11d48', strokeWidth: 1, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface MeditationBreakdownProps {
  data: {
    meditation: number;
    prayer: number;
    breathing: number;
  };
}

export const MeditationBreakdown: React.FC<MeditationBreakdownProps> = ({ data }) => {
  const pieData = [
    { name: 'Meditation', value: data.meditation, color: '#8b5cf6' },
    { name: 'Prayer', value: data.prayer, color: '#3b82f6' },
    { name: 'Breathing', value: data.breathing, color: '#10b981' },
  ];

  const total = data.meditation + data.prayer + data.breathing;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mindfulness Breakdown</h3>
      <div className="flex items-center">
        <div className="h-40 w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={70}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} min`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="ml-6 flex-1">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 flex-1">{item.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.value} min ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-900">
              Total: {total} minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SleepAnalysisChartProps {
  data: {
    deep: number;
    rem: number;
    light: number;
    awake: number;
  };
}

export const SleepAnalysisChart: React.FC<SleepAnalysisChartProps> = ({ data }) => {
  const barData = [
    { phase: 'Deep', minutes: data.deep, color: '#1e40af' },
    { phase: 'REM', minutes: data.rem, color: '#7c3aed' },
    { phase: 'Light', minutes: data.light, color: '#06b6d4' },
    { phase: 'Awake', minutes: data.awake, color: '#dc2626' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep Phase Analysis</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="phase" type="category" width={60} />
            <Tooltip formatter={(value: number) => [`${value} min`, 'Duration']} />
            <Bar dataKey="minutes">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};