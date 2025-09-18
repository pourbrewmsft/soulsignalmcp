'use client';

import React, { useState, useEffect } from 'react';
import { PartnerList } from '@/components/PartnerList';
import { BiometricOverview } from '@/components/MetricCard';
import { PrayerTrendsChart, HeartRateVariabilityChart, MeditationBreakdown, SleepAnalysisChart } from '@/components/Charts';
import { PrayerInsights } from '@/components/PrayerInsights';
import { BiometricDataService } from '@/lib/api';
import { DashboardData, PrayerPartner } from '@/types';
import { Calendar, RefreshCw, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [partners, setPartners] = useState<PrayerPartner[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const dataService = new BiometricDataService({
          ouraToken: 'demo-token',
          museToken: 'demo-token',
        });
        const partnersList = await dataService.getPartnersList();
        setPartners(partnersList);
        if (partnersList.length > 0) {
          setSelectedPartnerId(partnersList[0].id);
        }
      } catch (error) {
        console.error('Failed to load partners:', error);
      }
    };

    loadPartners();
  }, []);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!selectedPartnerId) return;
      
      setLoading(true);
      try {
        const dataService = new BiometricDataService({
          ouraToken: 'demo-token',
          museToken: 'demo-token',
        });
        const data = await dataService.getDashboardData(selectedPartnerId, selectedDate);
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [selectedPartnerId, selectedDate]);

  const handleRefresh = () => {
    if (selectedPartnerId) {
      setLoading(true);
      const dataService = new BiometricDataService({
        ouraToken: 'demo-token',
        museToken: 'demo-token',
      });
      dataService.getDashboardData(selectedPartnerId, selectedDate)
        .then(setDashboardData)
        .finally(() => setLoading(false));
    }
  };

  const getBiometricOverviewData = () => {
    if (!dashboardData) return null;

    const latestInsight = dashboardData.recentInsights[0];
    if (!latestInsight) return null;

    return {
      heartRate: latestInsight.metrics.averageHeartRate,
      sleepScore: latestInsight.metrics.sleepQuality,
      activityScore: dashboardData.ouraData?.activity.score || 75,
      meditationMinutes: latestInsight.metrics.meditationDuration,
      stressLevel: latestInsight.metrics.stressLevel,
    };
  };

  const getHeartRateData = () => {
    if (!dashboardData?.appleData) return [];
    
    return dashboardData.appleData.heartRate.samples.map(sample => ({
      time: sample.timestamp,
      hrv: sample.value + Math.random() * 10 - 5, // Simulate HRV data
      context: sample.context,
    }));
  };

  const getMeditationBreakdownData = () => {
    if (!dashboardData?.appleData) return { meditation: 0, prayer: 0, breathing: 0 };
    
    const sessions = dashboardData.appleData.mindfulness.sessions;
    return sessions.reduce((acc, session) => {
      acc[session.type] += session.duration;
      return acc;
    }, { meditation: 0, prayer: 0, breathing: 0 });
  };

  const getSleepData = () => {
    if (!dashboardData?.ouraData) return { deep: 0, rem: 0, light: 0, awake: 0 };
    
    const sleep = dashboardData.ouraData.sleep;
    return {
      deep: sleep.deep_sleep_duration,
      rem: sleep.rem_sleep_duration,
      light: sleep.light_sleep_duration,
      awake: sleep.total_sleep_duration - (sleep.deep_sleep_duration + sleep.rem_sleep_duration + sleep.light_sleep_duration),
    };
  };

  const biometricData = getBiometricOverviewData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SoulSignal MCP</h1>
              <span className="ml-2 text-sm text-gray-500">Prayer Partner Insights</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PartnerList
              partners={partners}
              selectedPartnerId={selectedPartnerId}
              onSelectPartner={setSelectedPartnerId}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading dashboard data...</span>
              </div>
            )}

            {!loading && dashboardData && (
              <>
                {/* Biometric Overview */}
                {biometricData && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Today&apos;s Overview</h2>
                    <BiometricOverview data={biometricData} />
                  </div>
                )}

                {/* Prayer Insights */}
                <PrayerInsights data={dashboardData} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <PrayerTrendsChart insights={dashboardData.recentInsights} />
                  <HeartRateVariabilityChart data={getHeartRateData()} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <MeditationBreakdown data={getMeditationBreakdownData()} />
                  <SleepAnalysisChart data={getSleepData()} />
                </div>
              </>
            )}

            {!loading && !dashboardData && selectedPartnerId && (
              <div className="text-center py-12">
                <p className="text-gray-600">No data available for the selected date.</p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {!selectedPartnerId && (
              <div className="text-center py-12">
                <p className="text-gray-600">Select a prayer partner to view their insights.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;