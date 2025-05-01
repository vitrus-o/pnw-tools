# PNW Tools

A collection of utility tools for Politics & War game.

## Features
- **War Loot Calculator**: Calculate total value of war spoils based on current market prices
- **Espionage Calculator**: Calculate spy operation results and potential resource gains
- **Bank Deposit Helper**: Automatically calculate and generate prefilled alliance bank deposit links
- **Mistrade Finder**: Monitor trade market for profitable opportunities (runs independently)

## Technologies
- Node.js
- Inquirer.js (CLI interface)
- Politics and War GraphQL API
- Open package (for opening URLs)
- Node-fetch for API requests
- Pusher.js for real-time trade monitoring

## Prerequisites
- Node.js v16 or higher
- Politics & War API key
- Your nation ID
- Your alliance ID

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/pnw-tools.git
cd pnw-tools
```

2. Install dependencies:
```bash
npm install inquirer dotenv node-fetch open pusher-js
```

## Configuration
Before using the tools, you need to configure your credentials. You can do this in two ways:

1. Using environment variables:
   - Create a `.env` file in the root directory
   - Add your credentials:
```plaintext
API_KEY=your_api_key_here
NATION_ID=your_nation_id_here
ALLIANCE_ID=your_alliance_id_here
```

2. Through the CLI interface:
   - Run `node main.js`
   - Select 'Configure Settings' from the main menu
   - Enter your API key, nation ID, and alliance ID when prompted
   - Run `node main.js` once more

## Usage

### Main Tools
Run the main program:
```bash
node main.js
```

This will open an interactive menu where you can select:
1. **War Loot Calculator**: Input war result text to calculate total value
2. **Espionage Calculator**: Input spy operation results to calculate gains
3. **Bank Deposit Helper**: Calculate optimal bank deposits based on city count
4. **Configure Settings**: Update your credentials
5. **Exit**: Close the program

### Mistrade Finder (Independent Tool)
Run the mistrade finder in a dedicated window:
```bash
mistrade.bat
```

## Tool Details

### War Loot Calculator
- Calculates total value of war spoils based on current market prices
- Supports both war and raid loot strings
- Automatically fetches current market prices

### Espionage Calculator
- Calculates potential gains from spy operations
- Shows value of resources that can be stolen
- Accounts for 14% steal rate
- Uses current market prices for value calculation

### Bank Deposit Helper
- Automatically calculates optimal bank deposits
- Keeps configurable amounts per city
- Generates prefilled alliance bank deposit links
- Uses alliance ID from configuration

### Mistrade Finder
- Monitors trade market in real-time
- Calculates potential profits automatically
- Opens profitable trades in browser
- Runs in dedicated window
- Persistent connection to trade socket

## License
MIT