# PNW Tools

A collection of utility tools for Politics & War game, including war calculators, bank helpers, and market monitoring.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Tools](#tools)

## Features
- **War Loot Calculator**: Calculate total value of war spoils based on current market prices
- **Espionage Calculator**: Calculate spy operation results and potential gains
- **Warchest Calculator**: Calculate needed resources based on city count
- **Bank Deposit Helper**: Auto-generate prefilled alliance bank deposit links
- **Mistrade Finder**: Monitor trade market for profitable opportunities (standalone tool)

## Prerequisites
- Node.js v16 or higher
- Politics & War API key
- Your nation ID
- Your alliance ID

## Installation
1. Clone the repository:
```bash
git clone https://github.com/vitrus-o/pnw-tools.git
cd pnw-tools
```

2. Install dependencies:
```bash
npm install
```

## Configuration
Configure your credentials in one of two ways:

1. Environment Variables (Recommended):
   - Create `.env` file in project root
   - Add your credentials:
```plaintext
API_KEY=your_api_key_here
NATION_ID=your_nation_id_here
ALLIANCE_ID=your_alliance_id_here
```

2. CLI Interface:
```bash
node main.js
# Select 'Configure Settings'
# Follow the prompts
```

## Usage

### Main Menu
Run the interactive menu:
```bash
node main.js
```

### Standalone Mistrade Finder
Run in dedicated window:
```bash
mistrade.bat
```

## Tools

### War Loot Calculator
- Calculates war spoils value using current market prices
- Handles both war and raid results
- Auto-fetches latest market prices

### Warchest Calculator
- Calculates resources needed based on city count
- Shows market value of missing resources
- Customizable resource targets per city

### Bank Deposit Helper
- Calculates optimal bank deposits
- Keeps configurable amounts per city
- Generates prefilled bank deposit links

### Mistrade Finder
- Real-time market monitoring
- Automatic profit calculation
- Sound alerts for profitable trades
- Browser integration for quick trading
```bash
# Run standalone:
mistrade.bat
```

### Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT