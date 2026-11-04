# Unstable Bot

A Discord bot dedicated to the **Unstable Universe** (also known as Unstable SMP).

Get quick info about characters, major arcs, locations, and lore from the scripted Minecraft series featuring ParrotX2, Wemmbu, SpokeIsHere, and FlameFrags.

## Features

- Character info commands
- Major arc summaries
- Location information
- Searchable mini-wiki
- Random character/fact
- Timeline overview
- Clean purple-themed embeds

## Commands

| Command | Description |
|---------|-------------|
| `/help` | Show all commands |
| `/about` | What is Unstable Bot & the series |
| `/character <name>` | Info about main characters |
| `/arc <name>` | Major story arcs |
| `/location <name>` | Important locations |
| `/wiki <query>` | Search the mini-wiki |
| `/random` | Random character |
| `/creators` | Main creators list |
| `/timeline` | Arc order overview |
| `/logo` | Branding info |

## Setup

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **New Application** → name it `Unstable Bot`
3. Go to the **Bot** tab → click **Add Bot**
4. Under **Token**, click **Reset Token** / **Copy** and save it
5. Go to **OAuth2 → General** and copy the **Client ID**
6. Go to **OAuth2 → URL Generator**
   - Scopes: `bot` + `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Use Slash Commands`
7. Copy the generated URL and invite the bot to your server

### 2. Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/unstable-bot.git
cd unstable-bot

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

Edit the `.env` file and paste your real values:

```env
TOKEN=your_real_bot_token
CLIENT_ID=your_real_client_id
```

Then start the bot:

```bash
npm start
```

You should see:
```
Registering slash commands...
Commands registered successfully!
Logged in as Unstable Bot#XXXX
```

## Project Structure

```
unstable-bot/
├── index.js          # Main bot file
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Expanding the Bot

All character, arc, and location data lives in the `wiki` object inside `index.js`.  
You can easily add more entries there and create new slash commands.

## Disclaimer

This is a **fan-made** bot and is not officially affiliated with the Unstable Universe creators (ParrotX2, Wemmbu, SpokeIsHere, FlameFrags) or any official Unstable SMP servers.

## License

MIT
