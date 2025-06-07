const { Client, Events, GatewayIntentBits} = require('discord.js');
require('dotenv').config()
console.log(process.env.key)
const token = process.env.key

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log('ok am in');
});

client.login(token);
