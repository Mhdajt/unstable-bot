require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ========== WIKI DATA ==========
const wiki = {
  characters: {
    parrot: {
      name: "ParrotX2",
      role: "Protagonist / Series Creator",
      description: "Intelligent, idealistic, and strategic. Often tries to build kingdoms and protect new players. Former king of the server and the main creator of the Unstable Universe series."
    },
    wemmbu: {
      name: "Wemmbu",
      role: "Protagonist",
      description: "Competitive, chaotic, and extremely skilled at PvP. Known for using maces, orbital strike cannons, and constantly picking fights that seem impossible to win."
    },
    spoke: {
      name: "SpokeIsHere",
      role: "Protagonist / Antagonist",
      description: "Manipulative, cunning, and extremely determined. Frequently schemes on a massive scale. Has led empires and later the NULL forces."
    },
    flame: {
      name: "FlameFrags",
      role: "Protagonist",
      description: "Proud, resilient, and stubborn. An excellent fighter who refuses to stay down. Known for hardcore survival and intense rivalries throughout the series."
    },
    clownpierce: {
      name: "ClownPierce",
      role: "Major Antagonist",
      description: "Ruthless ruler of the Nether Civilization. Controls most of the netherite and potions on the server and is one of the most feared players."
    },
    princezam: {
      name: "PrinceZam",
      role: "Former Empire Leader",
      description: "Creator of the Zam Empire. His actions and eventual conflict with Wemmbu became one of the earliest major story arcs."
    }
  },
  arcs: {
    empire: {
      name: "Empire Arc (Zam Empire Arc)",
      description: "The first major arc of the series. Focuses on the rise of the Zam Empire, early exploits, and Wemmbu's conflict with PrinceZam."
    },
    mafia: {
      name: "Invisible Mafia Arc",
      description: "The Invisible Mafia takes control of large parts of the server, including spawn, and hunts players. The protagonists form alliances to fight back."
    },
    farlands: {
      name: "Farlands Arc",
      description: "Centers around the distant and broken Far Lands terrain. Features major exploration, power struggles, and unique civilizations."
    },
    null: {
      name: "NULL Arc",
      description: "Spoke gains massive influence through NULL. Involves missing players, Null Hunters, and large-scale control of the server."
    },
    kings: {
      name: "Kings Arc",
      description: "Focuses on leadership, prisons, The Law, and power struggles over who rules different parts of the server."
    },
    purgatory: {
      name: "Purgatory Arc",
      description: "Spoke is trapped in a massive prison system controlled by Null forces. Features intense survival, alliances, and escape attempts."
    }
  },
  locations: {
    spawn: {
      name: "Spawn",
      description: "The chaotic starting area of the server. Due to the constant influx of new players, spawn is often made extremely dangerous."
    },
    farlands: {
      name: "Far Lands",
      description: "Extremely distant and terrain-corrupted region. Home to unique builds, civilizations, and high-risk exploration."
    },
    underworld: {
      name: "The Underworld",
      description: "A major custom area/dimension with its own power structures and deep lore connections."
    },
    greatsea: {
      name: "The Great Sea",
      description: "A massive ocean region far from spawn. Important for long-distance travel, escapes, and large-scale events."
    },
    nether: {
      name: "Nether Civilization",
      description: "Controlled by ClownPierce. Holds a near-monopoly on netherite and potions, making it one of the most powerful regions."
    },
    capital: {
      name: "Capital City",
      description: "A major central city and power hub that appears across multiple arcs of the series."
    }
  }
};

// ========== SLASH COMMANDS ==========
const commands = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all Unstable Bot commands'),

  new SlashCommandBuilder()
    .setName('about')
    .setDescription('What is Unstable Bot and Unstable SMP?'),

  new SlashCommandBuilder()
    .setName('character')
    .setDescription('Get info about a character')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Character name')
        .setRequired(true)
        .addChoices(
          { name: 'ParrotX2', value: 'parrot' },
          { name: 'Wemmbu', value: 'wemmbu' },
          { name: 'SpokeIsHere', value: 'spoke' },
          { name: 'FlameFrags', value: 'flame' },
          { name: 'ClownPierce', value: 'clownpierce' },
          { name: 'PrinceZam', value: 'princezam' }
        )),

  new SlashCommandBuilder()
    .setName('arc')
    .setDescription('Get info about a major arc')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Arc name')
        .setRequired(true)
        .addChoices(
          { name: 'Empire Arc', value: 'empire' },
          { name: 'Invisible Mafia Arc', value: 'mafia' },
          { name: 'Farlands Arc', value: 'farlands' },
          { name: 'NULL Arc', value: 'null' },
          { name: 'Kings Arc', value: 'kings' },
          { name: 'Purgatory Arc', value: 'purgatory' }
        )),

  new SlashCommandBuilder()
    .setName('location')
    .setDescription('Get info about a location')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Location name')
        .setRequired(true)
        .addChoices(
          { name: 'Spawn', value: 'spawn' },
          { name: 'Far Lands', value: 'farlands' },
          { name: 'The Underworld', value: 'underworld' },
          { name: 'The Great Sea', value: 'greatsea' },
          { name: 'Nether Civilization', value: 'nether' },
          { name: 'Capital City', value: 'capital' }
        )),

  new SlashCommandBuilder()
    .setName('wiki')
    .setDescription('Search the Unstable mini-wiki')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('What are you looking for?')
        .setRequired(true)),

  new SlashCommandBuilder()
    .setName('random')
    .setDescription('Get a random Unstable character'),

  new SlashCommandBuilder()
    .setName('creators')
    .setDescription('List the main Unstable Universe creators'),

  new SlashCommandBuilder()
    .setName('timeline')
    .setDescription('Quick overview of major arcs in order'),

  new SlashCommandBuilder()
    .setName('logo')
    .setDescription('Unstable Bot branding info')
];

// ========== REGISTER COMMANDS ==========
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error('Failed to register commands:', error);
  }
})();

// ========== BOT READY ==========
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('Unstable SMP', { type: 3 }); // Watching Unstable SMP
});

// ========== COMMAND HANDLER ==========
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const purple = 0x9B59B6;

  try {
    if (commandName === 'help') {
      const embed = new EmbedBuilder()
        .setTitle('Unstable Bot Commands')
        .setColor(purple)
        .setDescription('All available commands for the Unstable Universe')
        .addFields(
          { name: '/about', value: 'What is this bot and the series?' },
          { name: '/character <name>', value: 'Info about main characters' },
          { name: '/arc <name>', value: 'Major story arcs' },
          { name: '/location <name>', value: 'Important locations' },
          { name: '/wiki <query>', value: 'Search the mini-wiki' },
          { name: '/random', value: 'Random character' },
          { name: '/creators', value: 'Main creators' },
          { name: '/timeline', value: 'Arc order overview' },
          { name: '/logo', value: 'Bot branding info' }
        )
        .setFooter({ text: 'Unstable Bot • Fan-made' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'about') {
      const embed = new EmbedBuilder()
        .setTitle('About Unstable Bot')
        .setColor(purple)
        .setDescription(
          '**Unstable Bot** is a Discord bot dedicated to the **Unstable Universe** (also known as Unstable SMP).\n\n' +
          'Unstable Universe is a scripted, cinematic Minecraft series told through the perspectives of **ParrotX2**, **Wemmbu**, **SpokeIsHere**, and **FlameFrags**.\n\n' +
          'The series features large-scale wars, empires, betrayals, unique terrain (Farlands, Great Sea, Underworld), and constant chaos.\n\n' +
          'This bot gives you quick access to characters, arcs, locations, and lore.'
        )
        .setFooter({ text: 'Fan-made bot • Not officially affiliated' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'character') {
      const key = interaction.options.getString('name');
      const char = wiki.characters[key];

      const embed = new EmbedBuilder()
        .setTitle(char.name)
        .setColor(purple)
        .addFields(
          { name: 'Role', value: char.role },
          { name: 'Description', value: char.description }
        )
        .setFooter({ text: 'Unstable Universe' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'arc') {
      const key = interaction.options.getString('name');
      const arc = wiki.arcs[key];

      const embed = new EmbedBuilder()
        .setTitle(arc.name)
        .setColor(purple)
        .setDescription(arc.description)
        .setFooter({ text: 'Unstable Universe Arcs' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'location') {
      const key = interaction.options.getString('name');
      const loc = wiki.locations[key];

      const embed = new EmbedBuilder()
        .setTitle(loc.name)
        .setColor(purple)
        .setDescription(loc.description)
        .setFooter({ text: 'Unstable Universe Locations' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'wiki') {
      const query = interaction.options.getString('query').toLowerCase();
      const results = [];

      for (const [key, char] of Object.entries(wiki.characters)) {
        if (
          char.name.toLowerCase().includes(query) ||
          key.includes(query) ||
          char.description.toLowerCase().includes(query)
        ) {
          results.push(`**Character:** ${char.name}`);
        }
      }

      for (const [key, arc] of Object.entries(wiki.arcs)) {
        if (
          arc.name.toLowerCase().includes(query) ||
          key.includes(query) ||
          arc.description.toLowerCase().includes(query)
        ) {
          results.push(`**Arc:** ${arc.name}`);
        }
      }

      for (const [key, loc] of Object.entries(wiki.locations)) {
        if (
          loc.name.toLowerCase().includes(query) ||
          key.includes(query) ||
          loc.description.toLowerCase().includes(query)
        ) {
          results.push(`**Location:** ${loc.name}`);
        }
      }

      const embed = new EmbedBuilder()
        .setTitle(`Wiki Search: "${query}"`)
        .setColor(purple)
        .setDescription(results.length > 0 ? results.join('\n') : 'No results found. Try a different search term.')
        .setFooter({ text: 'Use /character, /arc, or /location for full info' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'random') {
      const allChars = Object.values(wiki.characters);
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];

      const embed = new EmbedBuilder()
        .setTitle(`Random: ${randomChar.name}`)
        .setColor(purple)
        .setDescription(randomChar.description)
        .addFields({ name: 'Role', value: randomChar.role })
        .setFooter({ text: 'Unstable Universe' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'creators') {
      const embed = new EmbedBuilder()
        .setTitle('Main Creators')
        .setColor(purple)
        .setDescription(
          '**ParrotX2** — Series creator, strategist, former king\n' +
          '**Wemmbu** — Chaotic PvP specialist\n' +
          '**SpokeIsHere** — Master manipulator and schemer\n' +
          '**FlameFrags** — Resilient fighter and survivor'
        )
        .setFooter({ text: 'The four main perspectives of Unstable Universe' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'timeline') {
      const embed = new EmbedBuilder()
        .setTitle('Major Arcs Overview')
        .setColor(purple)
        .setDescription(
          '1. **Empire Arc** — Rise and fall of the Zam Empire\n' +
          '2. **Invisible Mafia Arc** — Mafia takes control\n' +
          '3. **Farlands Arc** — Exploration of the Far Lands\n' +
          '4. **Kings Arc** — Power struggles and The Law\n' +
          '5. **NULL Arc** — Spoke and the Null forces\n' +
          '6. **Purgatory Arc** — Prison and escape'
        )
        .setFooter({ text: 'Simplified timeline • Many smaller arcs exist between these' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'logo') {
      const embed = new EmbedBuilder()
        .setTitle('Unstable Bot')
        .setColor(purple)
        .setDescription(
          'This bot uses a purple Unstable-themed color scheme.\n\n' +
          'For the bot profile picture, use a bold purple **"UNSTABLE"** or **"UNSTABLE BOT"** text logo with a Minecraft / glitch aesthetic.\n\n' +
          'Suggested prompt for AI image generators:\n' +
          '`Bold purple text logo saying UNSTABLE BOT, Minecraft style, dark background, subtle glitch effect`'
        )
        .setFooter({ text: 'Unstable Bot' });

      await interaction.reply({ embeds: [embed] });
    }

  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Something went wrong while running that command.', ephemeral: true }).catch(() => {});
  }
});

// ========== LOGIN ==========
client.login(process.env.TOKEN);
