import inquirer from 'inquirer';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tools = {
    'Warloot Calculator': 'src\\warloot-calculator.js',
    'Espionage Calculator': 'src\\espionage-calculator.js',
    'Mistrade Finder': 'src\\mistrade-finder.js',
    'Prefill Deposit': 'src\\prefill-deposit.js',
    'Configure Settings': 'config',
    'Exit': 'exit'
};

async function updateEnvFile(apiKey, nationId) {
    const envContent = `API_KEY=${apiKey}\nNATION_ID=${nationId}`;
    await fs.writeFile('.env', envContent);
}

async function configureSettings() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'apiKey',
            message: 'Enter your API key:',
            default: process.env.API_KEY || '',
        },
        {
            type: 'input',
            name: 'nationId',
            message: 'Enter your nation ID:',
            default: process.env.NATION_ID || '',
            validate: (input) => !isNaN(input) || 'Please enter a valid number'
        }
    ]);

    await updateEnvFile(answers.apiKey, answers.nationId);
    console.log('Configuration updated successfully!');
}

const main = async () => {
    try {
        while(true) {
            const { command } = await inquirer.prompt([
                {
                    name: 'command',
                    type: 'list',
                    message: 'Commands',
                    choices: Object.keys(tools)
                }
            ]);

            if(command === 'Exit')
                break;

            if(command === 'Configure Settings') {
                await configureSettings();
                continue;
            }
            if(!process.env.API_KEY || !process.env.NATION_ID) {
                console.log('Please configure your API key and nation ID first.');
                await configureSettings();
                continue;
            }

            const scriptToRun = path.join(__dirname, tools[command]);
            await new Promise((resolve, reject) => {
                const child = exec(`node "${scriptToRun}"`, { stdio: 'inherit' });
            
                child.stdout?.pipe(process.stdout);
                child.stderr?.pipe(process.stderr);
                process.stdin.pipe(child.stdin);
            
                child.on('exit', (code) => {
                    process.stdin.unpipe(child.stdin);
                    child.stdout?.unpipe(process.stdout);
                    child.stderr?.unpipe(process.stderr);
                    resolve();
                });
            
                child.on('error', (error) => {
                    process.stdin.unpipe(child.stdin);
                    child.stdout?.unpipe(process.stdout);
                    child.stderr?.unpipe(process.stderr);
                    reject(error);
                });
            });
        console.log(`\n\n`);
        }
    } catch (error) {
        if (error.name !== 'ExitPromptError') {
            console.error('An error occurred:', error);
        }
        process.exit(0);
    }
};

main();