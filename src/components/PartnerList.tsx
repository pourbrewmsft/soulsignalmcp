import React from 'react';
import { Users, Smartphone, Watch, Headphones } from 'lucide-react';
import { PrayerPartner } from '@/types';

interface PartnerCardProps {
  partner: PrayerPartner;
  onClick: () => void;
  isSelected: boolean;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onClick, isSelected }) => {
  const getDeviceIcon = (device: string, connected: boolean) => {
    const iconProps = { 
      size: 16, 
      className: connected ? 'text-green-500' : 'text-gray-300' 
    };
    
    switch (device) {
      case 'oura':
        return <div className={`w-4 h-4 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-300'}`} />;
      case 'apple':
        return <Watch {...iconProps} />;
      case 'muse':
        return <Headphones {...iconProps} />;
      default:
        return <Smartphone {...iconProps} />;
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {partner.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {partner.email}
          </p>
        </div>
      </div>
      
      <div className="mt-3">
        <p className="text-xs text-gray-600 mb-2">Connected Devices:</p>
        <div className="flex space-x-3">
          {Object.entries(partner.connectedDevices).map(([device, connected]) => (
            <div key={device} className="flex items-center space-x-1">
              {getDeviceIcon(device, connected)}
              <span className={`text-xs ${connected ? 'text-green-600' : 'text-gray-400'}`}>
                {device === 'oura' ? 'Oura' : device === 'apple' ? 'Apple' : 'Muse'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {partner.prayerSchedule && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600">Prayer Times:</p>
          <p className="text-xs text-gray-800 font-medium">
            {partner.prayerSchedule.preferredTimes.join(', ')} ({partner.prayerSchedule.duration}min)
          </p>
        </div>
      )}
    </div>
  );
};

interface PartnerListProps {
  partners: PrayerPartner[];
  selectedPartnerId: string | null;
  onSelectPartner: (partnerId: string) => void;
}

export const PartnerList: React.FC<PartnerListProps> = ({ 
  partners, 
  selectedPartnerId, 
  onSelectPartner 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Prayer Partners</h2>
      <div className="space-y-4">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            onClick={() => onSelectPartner(partner.id)}
            isSelected={selectedPartnerId === partner.id}
          />
        ))}
      </div>
    </div>
  );
};