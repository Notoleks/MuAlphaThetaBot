require('dotenv').config();

const { Client, Events, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

console.log(process.env.KEY);
const token = process.env.KEY;



client.once(Events.ClientReady, readyClient => {
    console.log('ok am in');
});


client.login(token);
