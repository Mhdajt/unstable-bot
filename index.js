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
      description: "Intelligent, idealistic, and strategic. Often tries to build kingdoms and protect new players. Former king of the server and the main creator of the Unstable Universe series. Known for planning, alliances, and carrying heavy emotional weight from losses throughout the story."
    },
    wemmbu: {
      name: "Wemmbu",
      role: "Protagonist",
      description: "Competitive, chaotic, and extremely skilled at PvP. Famous for using maces, orbital strike cannons, and constantly picking fights that seem impossible to win. One of the most aggressive and entertaining forces on the server."
    },
    spoke: {
      name: "SpokeIsHere",
      role: "Protagonist / Antagonist",
      description: "Manipulative, cunning, and extremely determined. Frequently schemes on a massive scale. Has led empires, infiltrated groups, and later became deeply tied to the NULL forces. One of the most dangerous strategic minds in the series."
    },
    flame: {
      name: "FlameFrags",
      role: "Protagonist",
      description: "Proud, resilient, and stubborn. An excellent pure fighter who refuses to stay down. Goes through major growth via exile and training. Known for intense rivalries (especially with Wemmbu) and hardcore survival."
    },
    clownpierce: {
      name: "ClownPierce",
      role: "Major Antagonist",
      description: "Ruthless ruler of the Nether Civilization. Controls most of the netherite and potions on the server and is one of the most feared players. Represents organized, overwhelming power."
    },
    princezam: {
      name: "PrinceZam",
      role: "Former Empire Leader",
      description: "Creator of the Zam Empire. His rise, conflict with Wemmbu, and eventual fall became one of the earliest and most important major story arcs in the series."
    }
  },

  arcs: {
    exploit: {
      name: "Exploit Arc",
      description: "Spoke discovers and abuses powerful server exploits (duplication, illegal enchants, world manipulation). He stockpiles illegal gear and uses the 'Wonders' builds as a cover. This arc creates the power imbalance that fuels many later conflicts and ends with Spoke destroying much of his own exploited infrastructure after confrontation."
    },
    empire: {
      name: "Empire Arc (Zam Empire Arc)",
      description: "PrinceZam builds a powerful empire. Wemmbu becomes heavily involved, leading to a complex mix of alliance, rivalry, and betrayal. Spoke’s exploits threaten the balance of power, drawing in Parrot and others. The empire eventually collapses under internal and external pressure. ClownPierce’s appearance near the end helps bridge into later storylines. This is one of the foundational arcs of the entire series."
    },
    mafia: {
      name: "Invisible Mafia Arc",
      description: "One of the biggest and most important arcs. A secretive, highly organized group using invisibility and coordination seizes control of spawn and begins hunting players across the world. The protagonists are forced into uneasy alliances to fight back. Features large-scale battles, destruction of bases and early civilizations, and a permanent darkening of the server’s tone. Multi-POV storytelling shines here."
    },
    pirate: {
      name: "Pirate Arc",
      description: "A Wemmbu-centered arc involving pirate-themed groups, naval-style conflict, betrayal, and chaotic large-scale fights. Serves as a transitional adventure arc after the Mafia era and further builds Wemmbu’s reputation as an unpredictable and dangerous fighter."
    },
    director: {
      name: "Director Arc",
      description: "A highly psychological and character-driven Parrot arc. After the trauma of the Mafia Arc, Parrot isolates himself. He is hunted by a mysterious figure known as The Director. The arc explores paranoia, identity, and trust, culminating in the reveal that the Director is Wifies (who faked his death) and Parrot’s escape from the near-perfect prison called Paragon."
    },
    secretbase: {
      name: "Secret Base Arc",
      description: "A quieter Spoke arc focused on building, protecting, and operating from advanced secret bases. Emphasizes preparation, paranoia, long-term planning, and Spoke’s preference for controlling situations from the shadows rather than open warfare."
    },
    power: {
      name: "Power Arc",
      description: "Wemmbu deliberately pursues strength, better gear, and more aggressive use of orbital strike cannons. The arc explores the consequences of becoming too powerful and the paranoia that comes with it. Later connects into the Farlands Arc."
    },
    farlands: {
      name: "Farlands Arc",
      description: "Wemmbu travels to the distant, corrupted Far Lands — broken terrain with echoes of old civilizations (including distorted remnants related to the Zam Empire). Features a major chase and siege involving Sharpness, void risks, orbital cannons, and unique server glitches. Greatly expands the worldbuilding of Unstable."
    },
    toxic: {
      name: "Toxic War Arc",
      description: "One of FlameFrags’ early defining arcs. Centers on toxic rivalries, personal grudges, revenge, and brutal emotionally charged conflict. Establishes Flame’s early identity as a relentless and proud fighter."
    },
    betrayal: {
      name: "Betrayal Arc",
      description: "Continues Flame’s story with heavy themes of broken trust and shifting loyalties. Allies become enemies and personal relationships are tested, setting up his later desire for real growth in the Training Arc."
    },
    treasure: {
      name: "Treasure Arc",
      description: "Parrot searches for extremely valuable and dangerous stashes left behind by earlier powers (including Mafia-related loot). Mixes exploration, puzzles, competing hunters, and high-stakes combat while continuing Parrot’s recovery from earlier trauma."
    },
    skill: {
      name: "Skill Arc (Skill vs Power Arc)",
      description: "One of the most popular combat arcs. Flame represents pure mechanical skill while Wemmbu represents power (totems, heavy gear, orbital strikes). Features devastating orbital bombardments, an extremely long final duel, temporary team-ups against The Law, and Wemmbu eventually letting go of the 'strongest player' obsession. Directly feeds into the Kings Arc."
    },
    fakeidentity: {
      name: "Fake Identity Arc",
      description: "Wemmbu is forced to rely on disguises, fake names, and deception to survive and operate after becoming a high-priority target. Shows his cunning and strategic side rather than pure combat strength."
    },
    bat: {
      name: "BAT Arc",
      description: "Spoke attempts to join or infiltrate the group known as BAT by completing (and cheating) tasks. He manipulates other players, uses rivalries to his advantage (including involving Flame and Wemmbu), and engages in heavy political maneuvering. Highlights Spoke’s talent for long-term deception."
    },
    kings: {
      name: "Kings Arc",
      description: "A massive political and military turning point. The Law (led by LettuceK) tries to impose order, exiles Flame, and captures Wemmbu. An election for king is announced. The protagonists eventually unite for a huge final battle against The Law. Lettuce is defeated and spared. Parrot wins the restarted election and becomes the first King of the Unstable SMP."
    },
    training: {
      name: "Training Arc",
      description: "After being exiled by The Law, Flame decides he will not return until he has dramatically improved. He seeks training from strong players (including former enemies), learning new styles and embracing growth. Crucial character development that turns him into a more complete fighter."
    },
    election: {
      name: "Election Arc",
      description: "Parrot’s political side of the Kings-era story. Focuses on leadership, public perception, speeches, and the actual election process that results in him becoming the first recognized King of the Unstable SMP."
    },
    kingdoms: {
      name: "Kingdoms Arc (Kingdoms Saga / Civil War Arc)",
      description: "One of the longest and most complex arcs. Multiple kingdoms rise (Wheat Kingdom, Kingdom of the Caves, Cindercrest, Mist Civilization, etc.). The Wraith captures Eggchan and sells him to the Caves, allowing Arachn1d to blackmail Wemmbu into fighting in the civil war. Massive multi-faction battles occur. Eventually Eggchan is freed and Arachn1d is killed. Runs concurrent with Missing Players and Purgatory."
    },
    missing: {
      name: "Missing Players Arc",
      description: "Spoke investigates the disappearance of hundreds (approaching a thousand) of players. He uncovers an organized group called NULL that is systematically capturing people using coordinated hunters and pearl cannon systems. Mapicc is among those taken. Directly leads into Spoke’s own capture and the Purgatory Arc."
    },
    purgatory: {
      name: "Purgatory Arc",
      description: "One of the darkest arcs. Spoke is captured and thrown into a massive prison system run by JamatoP and Null forces. Conditions are brutal (rotten flesh, constant patrols, arena fights, solitary confinement, psychological pressure). Features multiple escape attempts, fragile alliances, and heavy emotional toll. Often praised for atmosphere and tension."
    },
    warriors: {
      name: "Warriors Arc",
      description: "Flame continues his path as a warrior after training and the Kingdoms conflict. Focuses on proving his strength in large-scale fights and personal duels, solidifying the growth he achieved earlier."
    },
    endciv: {
      name: "End Civilization Arc",
      description: "Spoke becomes involved with power structures and civilizations connected to the End dimension. Continues his pattern of engaging with large systems of power — whether by joining, manipulating, or opposing them — while expanding the worldbuilding beyond the Overworld and Nether."
    },
    exile: {
      name: "Exile Arc",
      description: "After his time as king, Parrot faces the political and personal consequences of leadership. He loses his position of authority and is forced away from the center of server power. A more reflective arc about the cost of trying to lead a chaotic world."
    },
    rebirth: {
      name: "Rebirth Arc",
      description: "Flame’s recovery and resurgence. After periods of loss, exile, and intense conflict, he focuses on rebuilding gear, reputation, mindset, and alliances. Positions him for later large-scale conflicts."
    },
    dimensional: {
      name: "Dimensional War / Interdimensional War Arc",
      description: "A later, large-scale conflict involving multiple dimensions (Overworld, Nether, End, Underworld, and other custom areas). Old rivalries and alliances are pulled into a higher-stakes war that goes beyond normal faction fighting. Major involvement from the core protagonists."
    }
  },

  locations: {
    spawn: {
      name: "Spawn",
      description: "The chaotic starting area of the server. Due to the constant influx of new players, spawn is frequently turned into a deadly zone. Control of spawn has been a major objective for groups like the Invisible Mafia and The Law."
    },
    farlands: {
      name: "Far Lands",
      description: "Extremely distant and terrain-corrupted region with broken generation, unique glitches, and remnants of old civilizations. Site of major exploration and fights during Wemmbu’s Farlands Arc."
    },
    underworld: {
      name: "The Underworld",
      description: "A major custom area/dimension with its own power structures and deep lore connections. Becomes more relevant in later dimensional-scale conflicts."
    },
    greatsea: {
      name: "The Great Sea",
      description: "A massive ocean region far from spawn. Important for long-distance travel, escapes, and large-scale events throughout the series."
    },
    nether: {
      name: "Nether Civilization",
      description: "Controlled by ClownPierce. Holds a near-monopoly on netherite and potions, making it one of the most powerful and feared regions on the server."
    },
    capital: {
      name: "Capital City",
      description: "A major central city and power hub that appears across multiple arcs. Often tied to political control and large server events."
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
    .setDescription('Get detailed info about a character')
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
    .setDescription('Get detailed info about an arc (type part of the name)')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Arc name (e.g. mafia, kings, purgatory, kingdoms, director...)')
        .setRequired(true)),

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
    .setDescription('Get a random Unstable character or arc'),

  new SlashCommandBuilder()
    .setName('creators')
    .setDescription('List the main Unstable Universe creators'),

  new SlashCommandBuilder()
    .setName('timeline')
    .setDescription('Overview of major arcs in rough order'),

  new SlashCommandBuilder()
    .setName('arclist')
    .setDescription('List all arcs the bot knows about'),

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
  client.user.setActivity('Unstable SMP', { type: 3 });
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
        .setDescription('Detailed lore bot for the Unstable Universe')
        .addFields(
          { name: '/about', value: 'What is this bot and the series?' },
          { name: '/character <name>', value: 'Detailed character info' },
          { name: '/arc <name>', value: 'Detailed arc info (type part of the name)' },
          { name: '/arclist', value: 'Show every arc the bot knows' },
          { name: '/location <name>', value: 'Location info' },
          { name: '/wiki <query>', value: 'Search the mini-wiki' },
          { name: '/random', value: 'Random character or arc' },
          { name: '/creators', value: 'Main creators' },
          { name: '/timeline', value: 'Major arcs overview' },
          { name: '/logo', value: 'Bot branding' }
        )
        .setFooter({ text: 'Unstable Bot • Fan-made • Rich lore mode' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'about') {
      const embed = new EmbedBuilder()
        .setTitle('About Unstable Bot')
        .setColor(purple)
        .setDescription(
          '**Unstable Bot** is a lore-focused Discord bot for the **Unstable Universe** (Unstable SMP).\n\n' +
          'The series is a scripted, cinematic Minecraft story told through the perspectives of **ParrotX2**, **Wemmbu**, **SpokeIsHere**, and **FlameFrags**.\n\n' +
          'It features empires, the Invisible Mafia, political struggles, dimensional conflicts, massive wars, and deep character moments.\n\n' +
          'This bot contains detailed summaries of characters, arcs, and locations to help you understand the story.'
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
      const query = interaction.options.getString('name').toLowerCase();
      let found = null;

      for (const [key, arc] of Object.entries(wiki.arcs)) {
        if (
          key.includes(query) ||
          arc.name.toLowerCase().includes(query)
        ) {
          found = arc;
          break;
        }
      }

      if (!found) {
        const embed = new EmbedBuilder()
          .setTitle('Arc not found')
          .setColor(purple)
          .setDescription('Try `/arclist` to see every arc the bot knows, or use a clearer name (e.g. `mafia`, `kings`, `purgatory`, `kingdoms`, `director`, `skill`).')
          .setFooter({ text: 'Unstable Bot' });
        return await interaction.reply({ embeds: [embed] });
      }

      const embed = new EmbedBuilder()
        .setTitle(found.name)
        .setColor(purple)
        .setDescription(found.description)
        .setFooter({ text: 'Unstable Universe • Detailed Arc Summary' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'arclist') {
      const list = Object.values(wiki.arcs).map(a => `• ${a.name}`).join('\n');

      const embed = new EmbedBuilder()
        .setTitle('All Arcs in Unstable Bot')
        .setColor(purple)
        .setDescription(list)
        .setFooter({ text: 'Use /arc <name> for full details' });

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
        if (char.name.toLowerCase().includes(query) || key.includes(query) || char.description.toLowerCase().includes(query)) {
          results.push(`**Character:** ${char.name}`);
        }
      }

      for (const [key, arc] of Object.entries(wiki.arcs)) {
        if (arc.name.toLowerCase().includes(query) || key.includes(query) || arc.description.toLowerCase().includes(query)) {
          results.push(`**Arc:** ${arc.name}`);
        }
      }

      for (const [key, loc] of Object.entries(wiki.locations)) {
        if (loc.name.toLowerCase().includes(query) || key.includes(query) || loc.description.toLowerCase().includes(query)) {
          results.push(`**Location:** ${loc.name}`);
        }
      }

      const embed = new EmbedBuilder()
        .setTitle(`Wiki Search: "${query}"`)
        .setColor(purple)
        .setDescription(results.length > 0 ? results.slice(0, 15).join('\n') : 'No results found.')
        .setFooter({ text: 'Use /character, /arc, or /location for full details' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'random') {
      const type = Math.random() > 0.5 ? 'character' : 'arc';
      let embed;

      if (type === 'character') {
        const all = Object.values(wiki.characters);
        const item = all[Math.floor(Math.random() * all.length)];
        embed = new EmbedBuilder()
          .setTitle(`Random Character: ${item.name}`)
          .setColor(purple)
          .setDescription(item.description)
          .addFields({ name: 'Role', value: item.role })
          .setFooter({ text: 'Unstable Universe' });
      } else {
        const all = Object.values(wiki.arcs);
        const item = all[Math.floor(Math.random() * all.length)];
        embed = new EmbedBuilder()
          .setTitle(`Random Arc: ${item.name}`)
          .setColor(purple)
          .setDescription(item.description)
          .setFooter({ text: 'Unstable Universe' });
      }

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'creators') {
      const embed = new EmbedBuilder()
        .setTitle('Main Creators')
        .setColor(purple)
        .setDescription(
          '**ParrotX2** — Series creator, strategist, former king\n' +
          '**Wemmbu** — Chaotic PvP specialist & orbital cannon enjoyer\n' +
          '**SpokeIsHere** — Master manipulator and long-term schemer\n' +
          '**FlameFrags** — Resilient pure fighter and survivor'
        )
        .setFooter({ text: 'The four main perspectives of Unstable Universe' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'timeline') {
      const embed = new EmbedBuilder()
        .setTitle('Major Arcs Overview (Simplified Order)')
        .setColor(purple)
        .setDescription(
          '1. Exploit Arc\n' +
          '2. Empire Arc (Zam Empire)\n' +
          '3. Invisible Mafia Arc\n' +
          '4. Pirate / Director / Secret Base / Power arcs (overlapping)\n' +
          '5. Farlands Arc\n' +
          '6. Toxic War → Betrayal Arc\n' +
          '7. Treasure / Skill / Fake Identity arcs\n' +
          '8. BAT Arc\n' +
          '9. Kings Arc + Training + Election\n' +
          '10. Kingdoms Arc (Civil War)\n' +
          '11. Missing Players Arc → Purgatory Arc\n' +
          '12. Warriors / End Civilization / Exile / Rebirth\n' +
          '13. Dimensional War Arc'
        )
        .setFooter({ text: 'Many arcs run concurrently • Use /arc for full details' });

      await interaction.reply({ embeds: [embed] });
    }

    else if (commandName === 'logo') {
      const embed = new EmbedBuilder()
        .setTitle('Unstable Bot')
        .setColor(purple)
        .setDescription(
          'This bot uses a purple Unstable-themed color scheme.\n\n' +
          'Recommended profile picture: Bold purple text logo saying **UNSTABLE BOT** or **UNSTABLE** with a Minecraft/glitch aesthetic on a dark background.'
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
