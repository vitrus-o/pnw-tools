# PNW Tools

A collection of utility tools for Politics & War game.

## Features
- **War Loot Calculator**: Calculate total value of war spoils based on current market prices
- **Espionage Calculator**: Calculate spy operation results and potential resource gains
- **Mistrade Finder**: Monitor trade market for profitable opportunities
- **Bank Deposit Helper**: Automatically calculate and generate prefilled alliance bank deposit links

## Technologies
- Node.js
- Inquirer.js (CLI interface)
- Politics and War GraphQL API
- Open package (for opening URLs)
- Node-fetch for API requests

## Prerequisites
- Node.js v16 or higher
- Politics & War API key
- Your nation ID

## Installation
1. Install dependencies:
```bash
npm install inquirer open node-fetch dotenv
```

## Configuration
Before using the tools, you need to configure your API key and nation ID. You can do this in two ways:

1. Through the CLI interface:
   - Select 'Configure Settings' from the main menu
   - Enter your API key and nation ID when prompted

2. Using environment variables:
   - Create a `.env` file in the root directory
   - Add your credentials:
```
API_KEY=your_api_key_here
NATION_ID=your_nation_id_here
```

## Usage
Run the main program:
```bash
node main.js
```

This will open an interactive menu where you can select which tool to use:
1. **War Loot Calculator**: Input war result text to calculate total value
2. **Espionage Calculator**: Input spy operation results to calculate gains
3. **Mistrade Finder**: Monitor trade market for profitable opportunities
4. **Bank Deposit Helper**: Calculate optimal bank deposits based on city count
5. **Configure Settings**: Update your API key and nation ID

## Tool Details

### War Loot Calculator
- Calculates total value of war spoils based on current market prices
- Supports both war and raid loot strings
- Automatically fetches current market prices

### Espionage Calculator
- Calculates potential gains from spy operations
- Shows value of resources that can be stolen
- Accounts for 14% steal rate

### Bank Deposit Helper
- Automatically calculates optimal bank deposits
- Keeps specified amounts per city
- Generates prefilled alliance bank deposit links

### Mistrade Finder
- Monitors trade market for profitable opportunities
- Shows current market prices for all resources