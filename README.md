# SoulSignal MCP

A comprehensive web application for understanding prayer partners through biometric data from Oura Ring, Apple Watch, and Muse devices.

## Features

### Biometric Integration
- **Oura Ring**: Sleep quality, heart rate variability, activity tracking, and readiness scores
- **Apple Watch/HealthKit**: Heart rate monitoring, mindfulness sessions, and workout data
- **Muse**: Meditation sessions, focus scores, and brainwave analysis

### Prayer Partner Insights
- Track meditation and prayer correlations with wellness metrics
- Monitor stress reduction and sleep quality improvements
- Analyze heart rate variability during prayer sessions
- Compare trends across multiple prayer partners

### Dashboard Features
- Real-time biometric overview with key metrics
- Interactive charts for trend analysis
- Prayer impact correlation analysis
- Sleep phase breakdown and analysis
- Mindfulness session tracking and categorization

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pourbrewmsft/soulsignalmcp.git
cd soulsignalmcp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Device API Integration

### Oura Ring
The app integrates with the Oura Ring API to fetch:
- Sleep data (duration, phases, efficiency)
- Activity data (steps, calories, heart rate)
- Readiness scores and temperature deviation

### Apple HealthKit
Integration with Apple HealthKit provides:
- Heart rate samples throughout the day
- Mindfulness and meditation session data
- Workout and activity information

### Muse Headband
Muse API integration delivers:
- Meditation session data with duration and quality scores
- Real-time brainwave analysis (alpha, beta, theta, delta, gamma)
- Focus and calm scoring metrics

## Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

### Data Processing
- Mock data generators for development
- API abstraction layer for device integrations
- Real-time correlation analysis between prayer and wellness metrics

### Key Components
- `BiometricOverview`: Daily metrics dashboard
- `PrayerInsights`: Correlation analysis and trends
- `PartnerList`: Prayer partner management
- `Charts`: Interactive data visualizations

## Development

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                # API integration and utilities
├── types/              # TypeScript type definitions
└── globals.css         # Global styles
```

### Mock Data
The application includes comprehensive mock data generators for development and demonstration purposes. In production, these would be replaced with actual API calls to the respective device services.

## Privacy & Security

This application is designed to handle sensitive biometric and personal data. In a production environment, implement:
- OAuth 2.0 authentication for device APIs
- End-to-end encryption for data transmission
- HIPAA-compliant data storage
- User consent management for data sharing
- Regular security audits and compliance reviews

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.