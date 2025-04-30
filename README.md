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

## Installation
1. Install dependencies:
```bash
npm install inquirer open node-fetch
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