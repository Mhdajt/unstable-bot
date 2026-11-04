# Unstable Bot

A detailed lore Discord bot for the **Unstable Universe** (also known as Unstable SMP).

Get rich information about characters, major arcs, locations, and the overall story featuring ParrotX2, Wemmbu, SpokeIsHere, and FlameFrags.

## Features

- Detailed character bios
- **25+ fully written arc summaries** (much deeper than basic wiki blurbs)
- Location information
- Smart search (`/wiki`)
- Random character or arc
- Timeline overview
- Full arc list
- Clean purple-themed embeds

## Commands

| Command | Description |
|---------|-------------|
| `/help` | Show all commands |
| `/about` | What is Unstable Bot & the series |
| `/character <name>` | Detailed character info |
| `/arc <name>` | Detailed arc summary (type part of the name) |
| `/arclist` | List every arc the bot knows |
| `/location <name>` | Location info |
| `/wiki <query>` | Search across everything |
| `/random` | Random character or arc |
| `/creators` | Main creators |
| `/timeline` | Major arcs in rough order |
| `/logo` | Branding info |

## Arcs Included

- Exploit Arc
- Empire Arc (Zam Empire)
- Invisible Mafia Arc
- Pirate Arc
- Director Arc
- Secret Base Arc
- Power Arc
- Farlands Arc
- Toxic War Arc
- Betrayal Arc
- Treasure Arc
- Skill Arc (Skill vs Power)
- Fake Identity Arc
- BAT Arc
- Kings Arc
- Training Arc
- Election Arc
- Kingdoms Arc (Civil War / Kingdoms Saga)
- Missing Players Arc
- Purgatory Arc
- Warriors Arc
- End Civilization Arc
- Exile Arc
- Rebirth Arc
- Dimensional War Arc

## Setup

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application → name it `Unstable Bot`
3. Go to **Bot** → Add Bot → copy the token
4. Copy the **Application ID** (Client ID)
5. In OAuth2 → URL Generator:
   - Scopes: `bot` + `applications.commands`
   - Permissions: Send Messages, Embed Links, Use Slash Commands
6. Invite the bot to your server

### 2. Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/unstable-bot.git
cd unstable-bot
npm install
cp .env.example .env
```

Edit `.env`:

```env
TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

Then start:

```bash
npm start
```

## Project Structure

```
unstable-bot/
├── index.js          # Full bot + all lore data
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Disclaimer

This is a **fan-made** bot and is not officially affiliated with ParrotX2, Wemmbu, SpokeIsHere, FlameFrags, or any official Unstable SMP servers/projects.

## License

MIT
